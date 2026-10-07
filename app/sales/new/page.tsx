import { db } from '@/db';
import { pigs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { createSale } from '../actions';

export const dynamic = 'force-dynamic';

export default async function NewSalePage() {
  const activePigs = await db
    .select()
    .from(pigs)
    .where(eq(pigs.status, 'Active'));

  return (
    <main className="p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Record Sale</h1>
      <form action={createSale} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select Pig *</label>
          <select
            name="pigId"
            required
            className="border p-2 w-full rounded"
          >
            <option value="">Choose a pig...</option>
            {activePigs.map((pig) => (
              <option key={pig.id} value={pig.id}>
                {pig.tagNumber} {pig.name ? `— ${pig.name}` : ''}
              </option>
            ))}
          </select>
          {activePigs.length === 0 && (
            <p className="text-sm text-gray-500 mt-1">
              No active pigs. <Link href="/pigs/new" className="text-blue-600">Add one first</Link>.
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Sale Amount (GHS) *</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            required
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Buyer</label>
          <input
            name="buyer"
            type="text"
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            name="notes"
            rows={3}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={activePigs.length === 0}
          >
            Save Sale
          </button>
          <Link href="/sales" className="text-gray-600 px-4 py-2 hover:underline">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}