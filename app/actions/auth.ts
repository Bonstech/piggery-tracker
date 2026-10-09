'use server';

import { db } from '@/db';
import { accessCodes } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function verifyCode(formData: FormData) {
  const submitted = (formData.get('code') as string).trim();

  const [match] = await db
    .select()
    .from(accessCodes)
    .where(eq(accessCodes.code, submitted));

  if (!match) {
    redirect('/login?error=invalid');
  }

  (await cookies()).set('piggery_access', match.code, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });

  redirect('/');
}

export async function logout() {
  (await cookies()).delete('piggery_access');
  redirect('/login');
}