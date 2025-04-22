'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import supabase from '@/lib/supabase';
import Link from 'next/link';

type Category = {
  id: number;
  name: string;
  image_url: string;
};

export const categoryImageMap: Record<string, string> = {
  Vegetables: '/categories/fresh.png',
  'Meat & Fish': '/categories/meatandfish.png',
  Beverages: '/categories/beverage.png',
};

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) {
        console.error('Error fetching categories:', error.message);
      } else {
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="px-6 py-10 bg-white mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Popular Categories</h2>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/category/${cat.id}`}>
            <div className="w-full md:w-80 border hover:border-green-500 rounded-lg p-4 flex flex-col items-center justify-center gap-2 text-center cursor-pointer transition hover:shadow-md shadow-md">
              <Image
                src={categoryImageMap[cat.name] || '/no-image.png'}
                alt={cat.name}
                width={80}
                height={80}
                className="object-contain"
              />
              <p className="text-sm font-medium text-gray-800 hover:text-green-600">
                {cat.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
