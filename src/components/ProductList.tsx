'use client';

import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';
import ProductCard from './ProductCard';

type Product = {
  id: number;
  name: string;
  price: number;
  unit: string;
  in_stock: number;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (error) console.error('Error fetching:', error);
      else setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
