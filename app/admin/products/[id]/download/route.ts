import db from '@/prisma/db';
import fs from 'fs/promises';
import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const product = await db.product.findUnique({
    where: { id },
    select: { name: true, filePath: true },
  });

  if (product == null) notFound();

  const { size } = await fs.stat(product.filePath);
  const file = await fs.readFile(product.filePath);
  const extension = product.filePath.split('.').pop();

  return new NextResponse(file, {
    headers: {
      'Content-Disposition': `attachment; filename="${product.name}.${extension}"`,
      'Content-Length': size.toString(),
    },
  });
}
