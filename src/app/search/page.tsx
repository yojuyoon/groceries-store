// app/search/page.tsx
import ProductCard from '@/components/ProductCard';
import supabase from '@/lib/supabase';
import Image from 'next/image';

type SearchParams = {
  searchParams: {
    q: string;
  };
};

export default async function SearchPage({ searchParams }: SearchParams) {
  const keyword = searchParams.q?.toLowerCase() || '';

  const { data, error } = await supabase
    .from('products')
    .select('id, name, price, unit, image_url, in_stock')
    .ilike('name', `%${keyword}%`);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{keyword}"
      </h1>

      {data?.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
