'use server';

import { db } from '@/db';
import { sales } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createSale(formData: FormData) {
  const pigId = parseInt(formData.get('pigId') as string);
  const amount = formData.get('amount') as string;
  const buyer = formData.get('buyer') as string;
  const notes = formData.get('notes') as string;

  await db.insert(sales).values({
    pigId,
    amount,
    buyer: buyer || null,
    notes: notes || null,
  });

  // Mark the pig as Sold
  const { pigs } = await import('@/db/schema');
  await db.update(pigs).set({ status: 'Sold' }).where(eq(pigs.id, pigId));

  revalidatePath('/sales');
  revalidatePath('/pigs');
  revalidatePath('/');
  redirect('/sales');
}

export async function deleteSale(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  await db.delete(sales).where(eq(sales.id, id));
  revalidatePath('/sales');
  revalidatePath('/');
}