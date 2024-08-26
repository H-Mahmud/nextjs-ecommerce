'use server';

import db from '@/prisma/db';
import { notFound } from 'next/navigation';
import fs from 'fs/promises';

export async function togglerProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } });
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } });
  if (product == null) return notFound();

  await fs.unlink(product.filePath);
  await fs.unlink(`public${product.imagePath}`);
}
