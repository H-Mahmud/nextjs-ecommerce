'use server';

import db from '@/prisma/db';
import { notFound } from 'next/navigation';

export async function deleteOrder(id: string) {
  const order = await db.order.delete({ where: { id } });

  if (order == null) notFound();

  return order;
}
