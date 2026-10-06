import { NextResponse } from 'next/server';
import { db } from '@/db';
import { sales } from '@/db/schema';

export async function POST(request: Request) {
  const { pigId, amount } = await request.json();
  await db.insert(sales).values({ pigId, amount: amount.toString() });
  return NextResponse.json({ success: true });
}