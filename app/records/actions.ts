'use server';

import { db } from '@/db';
import { records } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createRecord(formData: FormData) {
  const pigId = parseInt(formData.get('pigId') as string);
  const type = formData.get('type') as string;
  const date = formData.get('date') as string;
  const notes = formData.get('notes') as string;

  await db.insert(records).values({
    pigId,
    type,
    date: date ? new Date(date) : undefined,
    notes: notes || null,
  });

  revalidatePath('/records');
  redirect('/records');
}

export async function deleteRecord(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  await db.delete(records).where(eq(records.id, id));
  revalidatePath('/records');
}