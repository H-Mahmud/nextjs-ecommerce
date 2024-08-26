'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import db from '@/prisma/db';
import { notFound } from 'next/navigation';
import { useTransition } from 'react';

export function ActiveTogglerDropdownItem({
  id,
  isAvailableForPurchase,
}: {
  id: string;
  isAvailableForPurchase: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await togglerProductAvailability(id, !isAvailableForPurchase);
        });
      }}
    >
      {isAvailableForPurchase ? 'Deactivate' : 'Activate'}
    </DropdownMenuItem>
  );
}

export function DeleteDropdownItem({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      variant='destructive'
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => await deleteProduct(id));
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}

async function togglerProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } });
}

async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } });
  if (product == null) return notFound();
}
