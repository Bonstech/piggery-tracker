import { NextResponse } from 'next/server';
import { db } from '@/db';
import { expenses } from '@/db/schema';

export async function POST(request: Request) {
  const { description, amount } = await request.json();
  await db.insert(expenses).values({ description, amount: amount.toString() });
  return NextResponse.json({ success: true });
}