'use client';

import { firework } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ThankYouPage() {
  const router = useRouter();
  useEffect(() => {
    firework();
  }, []);

  return (
    <div className="h-screen bg-neutral-900 text-white flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4">🎉 Thank You!</h1>
      <p className="text-lg mb-6">
        Your order has been placed successfully.
        <br />
        We’ll send you a confirmation email soon.
      </p>
      <button
        onClick={() => router.push('/')}
        className="mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
      >
        Back to Home
      </button>
    </div>
  );
}
