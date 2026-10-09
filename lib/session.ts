import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { accessCodes } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('piggery_access')?.value;

  if (!token) {
    redirect('/login');
  }

  const rows = await db
    .select()
    .from(accessCodes)
    .where(eq(accessCodes.code, token!));

  const match = rows[0];

  if (!match) {
    redirect('/login');
  }

  return match;
}