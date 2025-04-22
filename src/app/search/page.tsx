'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import supabase from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

type Product = {
  id: number;
  name: string;
  price: number;
  unit: string;
  image_url: string;
  in_stock: number;
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('q')?.toLowerCase() || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!keyword) return;

      setLoading(true);
      const { data } = await supabase
        .from('products')
        .select('id, name, price, unit, image_url, in_stock')
        .ilike('name', `%${keyword}%`);

      setProducts(data || []);
      setLoading(false);
    };

    fetchProducts();
  }, [keyword]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for &quot;{keyword}&quot;
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
