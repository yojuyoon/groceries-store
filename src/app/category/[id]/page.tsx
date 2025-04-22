// app/category/[id]/page.tsx
import ProductCard from '@/components/ProductCard';
import supabase from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: { id: string };
};

export default async function CategoryPage({ params }: Props) {
  const categoryId = Number(params.id);

  // Step 1. 카테고리 정보 가져오기
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('id, name')
    .eq('id', categoryId)
    .single();

  if (!category) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-xl font-semibold text-red-600">
          Category not found
        </h1>
      </div>
    );
  }

  // Step 2. 해당 카테고리의 상품 목록 조회
  const { data: products, error: productError } = await supabase
    .from('products')
    .select('id, name, price, unit, in_stock, image_url')
    .eq('category_id', categoryId);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Category: {category.name}</h1>

      {products && products.length > 0 ? (
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
