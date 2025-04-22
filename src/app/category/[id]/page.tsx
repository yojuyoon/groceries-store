'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import supabase from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

type Product = {
  id: number;
  name: string;
  price: number;
  unit: string;
  in_stock: number;
  image_url: string;
};

export default function CategoryPage() {
  const params = useParams();
  const categoryId = Number(params.id);

  const [categoryName, setCategoryName] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data: category } = await supabase
        .from('categories')
        .select('id, name')
        .eq('id', categoryId)
        .single();

      if (category) {
        setCategoryName(category.name);

        const { data: products } = await supabase
          .from('products')
          .select('id, name, price, unit, in_stock, image_url')
          .eq('category_id', categoryId);

        setProducts(products || []);
      }

      setLoading(false);
    };

    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Category: {categoryName}</h1>

      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
}
