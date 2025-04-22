'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CartItem, useCartStore } from '@/stores/cart';
import supabase from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

type Product = {
  id: number;
  name: string;
  price: number;
  image_url?: string;
};

export default function CartPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  const cartItems = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, image_url');
      if (!error && data) setProducts(data);
    };

    fetchProducts();
  }, []);

  const mergedItems = cartItems
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product
        ? {
            ...item,
            ...product,
            subtotal: product.price * item.quantity,
          }
        : null;
    })
    .filter(Boolean) as (CartItem & Product & { subtotal: number })[];

  const total = mergedItems.reduce((acc, item) => acc + item.subtotal, 0);

  const handleDelete = () => {
    if (cartItems.length === 0) {
      toast.info('🛒 There are no items to delete');
    } else {
      clearCart();
      toast.success('🧹 All items have been removed from your cart');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.info('🛒 There are no items to checkout');
    } else {
      router.push('/checkout');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-center mb-8">My Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Cart Table */}
        <div className="md:col-span-2 space-y-6">
          <table className="w-full text-sm border border-gray-200">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-4">PRODUCT</th>
                <th className="p-4">PRICE</th>
                <th className="p-4">QUANTITY</th>
                <th className="p-4">SUBTOTAL</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {mergedItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4 flex items-center gap-3">
                    <Image
                      src={item.image_url || '/no-image.png'}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <span>{item.name}</span>
                  </td>
                  <td className="p-4">${item.price.toFixed(2)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="w-6 h-6 border rounded"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(item.quantity - 1, 1)
                          )
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="w-6 h-6 border rounded"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-4">${item.subtotal.toFixed(2)}</td>
                  <td className="p-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 text-xl"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bottom Buttons */}
          <div className="flex justify-between">
            <Link
              href="/"
              className="px-4 py-2 border rounded hover:bg-gray-100 text-sm"
            >
              Return to shop
            </Link>
            <Button
              onClick={handleDelete}
              className="px-4 py-2 border rounded text-sm"
            >
              Delete All
            </Button>
          </div>

          {/* Coupon */}
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Enter code"
              className="border px-3 py-2 text-sm rounded w-60"
            />
            <Button className="bg-black text-white px-4 py-2 text-sm rounded">
              Apply Coupon
            </Button>
          </div>
        </div>

        {/* Cart Total Box */}
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold">Cart Total</h2>
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span className="text-green-500 font-medium">Free</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button
            onClick={handleCheckout}
            className="w-full bg-green-500 text-white py-2 flex items-center justify-center rounded hover:bg-green-600"
          >
            Proceed to checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
