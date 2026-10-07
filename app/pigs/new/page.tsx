import Link from 'next/link';
import { createPig } from '../actions';
import { requireAuth } from '@/lib/session';

export const dynamic = 'force-dynamic';

await requireAuth();

export default function NewPigPage() {
  return (
    <main className="p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Add New Pig</h1>
      <form action={createPig} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Tag Number *</label>
          <input
            name="tagNumber"
            type="text"
            required
            placeholder="e.g., PIG-001"
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Name (optional)</label>
          <input
            name="name"
            type="text"
            placeholder="e.g., Spot"
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Birth Date</label>
          <input
            name="birthDate"
            type="date"
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <select name="gender" className="bg-black border p-2 w-full rounded">
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            name="notes"
            rows={3}
            className="border p-2 w-full rounded"
            placeholder="Any additional notes..."
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Pig
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