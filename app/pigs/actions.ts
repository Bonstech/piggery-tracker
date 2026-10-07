'use server';

import { db } from '@/db';
import { pigs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPig(formData: FormData) {
  const tagNumber = formData.get('tagNumber') as string;
  const name = formData.get('name') as string;
  const birthDate = formData.get('birthDate') as string;
  const gender = formData.get('gender') as string;
  const notes = formData.get('notes') as string;

  await db.insert(pigs).values({
    tagNumber,
    name: name || null,
    birthDate: birthDate || null,
    gender: gender || null,
    notes: notes || null,
  });

  revalidatePath('/pigs');
  redirect('/pigs');
}

export async function updatePig(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  const tagNumber = formData.get('tagNumber') as string;
  const name = formData.get('name') as string;
  const birthDate = formData.get('birthDate') as string;
  const gender = formData.get('gender') as string;
  const status = formData.get('status') as string;
  const notes = formData.get('notes') as string;

  await db
    .update(pigs)
    .set({
      tagNumber,
      name: name || null,
      birthDate: birthDate || null,
      gender: gender || null,
      status,
      notes: notes || null,
    })
    .where(eq(pigs.id, id));

  revalidatePath('/pigs');
  redirect('/pigs');
}

export async function deletePig(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  await db.delete(pigs).where(eq(pigs.id, id));
  revalidatePath('/pigs');
}