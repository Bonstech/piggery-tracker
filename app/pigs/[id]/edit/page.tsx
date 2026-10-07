import { db } from '@/db';
import { pigs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { updatePig } from '../../actions';
import { requireAuth } from '@/lib/session';
    
export const dynamic = 'force-dynamic';

await requireAuth();

export default async function EditPigPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pigId = parseInt(id);

  const [pig] = await db.select().from(pigs).where(eq(pigs.id, pigId));

  if (!pig) {
    notFound();
  }

  return (
    <main className="p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Edit Pig: {pig.tagNumber}</h1>
      <form action={updatePig} className="space-y-4">
        <input type="hidden" name="id" value={pig.id} />

        <div>
          <label className="block mb-1 font-medium">Tag Number *</label>
          <input
            name="tagNumber"
            type="text"
            required
            defaultValue={pig.tagNumber}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            type="text"
            defaultValue={pig.name || ''}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Birth Date</label>
          <input
            name="birthDate"
            type="date"
            defaultValue={pig.birthDate || ''}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <select
            name="gender"
            defaultValue={pig.gender || ''}
            className="border p-2 w-full rounded"
          >
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            defaultValue={pig.status || 'Active'}
            className="border p-2 w-full rounded"
          >
            <option value="Active">Active</option>
            <option value="Sold">Sold</option>
            <option value="Deceased">Deceased</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            name="notes"
            rows={3}
            defaultValue={pig.notes || ''}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Pig
          </button>
          <Link
            href="/pigs"
            className="text-gray-600 px-4 py-2 hover:underline"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}