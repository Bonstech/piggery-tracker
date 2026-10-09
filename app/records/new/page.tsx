import { db } from '@/db';
import { pigs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { createRecord } from '../actions';

import { requireAuth } from '@/lib/session';

export const dynamic = 'force-dynamic';



const RECORD_TYPES = [
  'Weaning',
  'Castration',
  'Vaccination',
  'Deworming',
  'Ear Tagging',
  'Tail Docking',
  'Teeth Clipping',
  'Iron Injection',
  'Other',
];

export default async function NewRecordPage() {
  await requireAuth();
  const activePigs = await db
    .select()
    .from(pigs)
    .where(eq(pigs.status, 'Active'));

  return (
    <main className="p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Add Record</h1>
      <form action={createRecord} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select Pig *</label>
          <select
            name="pigId"
            required
            className="bg-black border p-2 w-full rounded"
          >
            <option value="">Choose a pig...</option>
            {activePigs.map((pig) => (
              <option key={pig.id} value={pig.id}>
                {pig.tagNumber} {pig.name ? `— ${pig.name}` : ''}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Record Type *</label>
          <select
            name="type"
            required
            className="bg-black border p-2 w-full rounded"
          >
            <option value="">Choose type...</option>
            {RECORD_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            name="date"
            type="date"
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            name="notes"
            rows={3}
            className="border p-2 w-full rounded"
            placeholder="Any additional details..."
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Save Record
          </button>
          <Link href="/records" className="text-gray-600 px-4 py-2 hover:underline">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}