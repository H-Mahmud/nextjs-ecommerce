import ProductCard, { ProductCardSkeleton } from '@/components/ProductCard';
import { cache } from '@/lib/cache';
import db from '@/prisma/db';
import { Suspense } from 'react';

const getProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: 'asc' },
  });
}, ['/products', 'getProducts']);

export default function ProductsPage() {
  return (
    <main className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductsSuspense />
      </Suspense>
    </main>
  );
}
async function ProductsSuspense() {
  return (await getProducts()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
