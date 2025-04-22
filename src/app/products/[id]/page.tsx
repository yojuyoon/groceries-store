'use client';

import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';
import Image from 'next/image';
import { useCartStore } from '@/stores/cart';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { use } from 'react';

type Props = {
  params: Promise<{ id: string }>;
};

export default function ProductDetailPage({ params }: Props) {
  const { id } = use(params);
  const [quantity, setQuantity] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productId = Number(id);

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = () => {
    if (product) {
      addToCart(Number(product.id), quantity);
      toast.success(`✅ ${product.name} (x${quantity}) added to cart!`);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('products')
        .select(
          `id, name, price, unit, description, image_url, in_stock, categories(name)`
        )
        .eq('id', productId)
        .single();

      if (error) {
        console.error('Failed to fetch product:', error.message);
        setError(error.message);
        setProduct(null);
      } else {
        setProduct(data);
        setError(null);
      }

      setLoading(false);
    };

    if (productId) fetchProduct();
  }, [productId]);

  const increment = () => {
    if (product && quantity < product.in_stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error || !product) return <p>Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
      <Image
        src={product.image_url || '/no-image.png'}
        alt={product.name}
        width={400}
        height={400}
        className="rounded object-contain"
      />

      <div>
        <p className="text-sm text-gray-500 mb-2">
          <span className="font-medium text-amber-900 bg-amber-100 px-2 py-1 rounded">
            {product.categories?.name || 'Uncategorized'}
          </span>
        </p>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        <p className="text-base text-gray-700 mb-6">
          {product.description || 'No description available.'}
        </p>
        <div className="flex items-center gap-6">
          <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-2">{product.unit}</p>
        </div>
        <p
          className={`mb-6 ${
            product.in_stock > 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {product.in_stock > 0
            ? `${product.in_stock} in stock`
            : 'Out of Stock'}
        </p>

        {/* 수량 선택 */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={decrement}
            className="w-8 h-8 flex items-center justify-center rounded border border-gray-400 text-xl hover:bg-gray-100"
          >
            -
          </button>
          <span className="text-lg font-medium w-6 text-center">
            {quantity}
          </span>
          <button
            onClick={increment}
            className="w-8 h-8 flex items-center justify-center rounded border border-gray-400 text-xl hover:bg-gray-100"
          >
            +
          </button>
        </div>

        <Button
          onClick={handleAdd}
          disabled={product.in_stock === 0}
          className={`px-6 py-3 rounded text-white font-semibold w-full ${
            product.in_stock > 0
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Add {quantity} to Cart
        </Button>
      </div>
    </div>
  );
}
