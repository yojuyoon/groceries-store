'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/stores/cart';
import supabase from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type ProductInfo = {
  id: number;
  name: string;
  in_stock: number;
  price: number;
  image_url?: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductInfo[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('id, name, price, in_stock, image_url');
      if (data) setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = [];
    if (!form.name.trim()) newErrors.push('Name is required');
    if (!form.address.trim()) newErrors.push('Address is required');
    if (!form.mobile.match(/^04\d{8}$/))
      newErrors.push('Valid Australian mobile number required');
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.push('Valid email required');
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const unavailable = cartItems.filter((item) => {
      const found = products.find((p) => p.id === item.productId);
      return !found || item.quantity > found.in_stock;
    });

    if (unavailable.length > 0) {
      toast.error('Some items are out of stock. Redirecting to cart...');
      setTimeout(() => router.push('/cart'), 2000);
      return;
    }

    const total = cartItems.reduce((sum, item) => {
      const p = products.find((p) => p.id === item.productId);
      return p ? sum + p.price * item.quantity : sum;
    }, 0);

    const { error: orderError, data: orderData } = await supabase
      .from('orders')
      .insert([
        {
          user_email: form.email,
          recipient_name: form.name,
          address_street: form.address,
          address_city: 'Sydney',
          address_state: 'NSW',
          mobile: form.mobile,
          total_amount: total,
        },
      ])
      .select()
      .single();

    if (orderError) {
      toast.error('Order failed. Please try again.');
      setLoading(false);
      return;
    }

    const orderId = orderData.id;

    const orderItems = cartItems.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      return {
        order_id: orderId,
        product_id: item.productId,
        quantity: item.quantity,
        unit_price: product.price,
      };
    });

    await supabase.from('order_items').insert(orderItems);

    for (const item of cartItems) {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        console.log(`❌ Product not found for ID: ${item.productId}`);
        continue;
      }

      const newStock = product.in_stock - item.quantity;
      console.log(
        `🛒 Updating stock: ${product.name} | ${product.in_stock} → ${newStock}`
      );

      const { error } = await supabase
        .from('products')
        .update({ in_stock: newStock })
        .eq('id', product.id);

      if (error) {
        console.error(`❌ Failed to update stock for ${product.name}`, error);
      }
    }

    toast.success('✅ Order placed successfully!');
    clearCart();
    router.push('/thank-you');
  };

  const mergedItems = cartItems
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product
        ? {
            ...item,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
            subtotal: item.quantity * product.price,
          }
        : null;
    })
    .filter(Boolean);

  const total = mergedItems.reduce(
    (sum, item) => sum + (item?.subtotal || 0),
    0
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="mb-6 border rounded p-4 bg-white shadow">
        <h2 className="text-lg font-semibold mb-3">Your Order</h2>
        <ul className="divide-y">
          {mergedItems.map((item) => (
            <li
              key={item?.productId}
              className="py-3 flex justify-between items-center text-sm"
            >
              <div className="flex gap-2 items-center">
                {item?.image_url && (
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="object-cover rounded"
                  />
                )}
                <div>
                  <p className="font-medium">{item?.name}</p>
                  <p className="text-gray-500">Qty: {item?.quantity}</p>
                </div>
              </div>
              <p className="font-semibold">${item?.subtotal.toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <hr className="my-3" />
        <div className="flex justify-between font-bold text-base">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-4">
        <input
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="mobile"
          placeholder="Mobile (e.g. 0412345678)"
          value={form.mobile}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="address"
          placeholder="Street address"
          value={form.address}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        {errors.length > 0 && (
          <div className="bg-red-100 border text-red-700 p-3 rounded">
            <ul className="list-disc ml-5 text-sm">
              {errors.map((e, idx) => (
                <li key={idx}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        <Button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700"
        >
          {loading ? 'Placing order...' : 'Place Order'}
        </Button>
      </div>
    </div>
  );
}
