import { Suspense } from 'react';

import SearchPageClient from '@/components/SearchPageClient';

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-center py-10">Loading search...</p>}>
      <SearchPageClient />
    </Suspense>
  );
}
