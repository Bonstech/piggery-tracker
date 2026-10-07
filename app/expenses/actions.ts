'use server';

import { db } from '@/db';
import { expenses } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createExpense(formData: FormData) {
  const description = formData.get('description') as string;
  const amount = formData.get('amount') as string;
  const category = formData.get('category') as string;
  const notes = formData.get('notes') as string;

  await db.insert(expenses).values({
    description,
    amount,
    category: category || 'Other',
    notes: notes || null,
  });

  revalidatePath('/expenses');
  revalidatePath('/');
  redirect('/expenses');
}

export async function deleteExpense(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  await db.delete(expenses).where(eq(expenses.id, id));
  revalidatePath('/expenses');
  revalidatePath('/');
}