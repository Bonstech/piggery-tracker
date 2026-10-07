import { db } from '@/db';
import { records, pigs } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import Link from 'next/link';
import { deleteRecord } from './actions';
import DeleteButton from '@/app/components/DeleteButton';

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

export default async function RecordsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; pigId?: string }>;
}) {
  const { type, pigId } = await searchParams;

  const allRecords = await db
    .select({
      id: records.id,
      type: records.type,
      date: records.date,
      notes: records.notes,
      pigTag: pigs.tagNumber,
      pigName: pigs.name,
    })
    .from(records)
    .leftJoin(pigs, eq(records.pigId, pigs.id))
    .orderBy(desc(records.date));

  // Filter in memory for simplicity
  const filteredRecords = allRecords.filter((r) => {
    if (type && r.type !== type) return false;
    if (pigId && r.pigTag !== pigId) return false;
    return true;
  });

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pig Records</h1>
        <Link
          href="/records/new"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Add Record
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4 items-center">
        <form className="flex gap-2 items-center">
          <label className="font-medium">Filter by type:</label>
          <select
            name="type"
            defaultValue={type || ''}
            className="bg-black border p-2 rounded"
          >
            <option value="">All types</option>
            {RECORD_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700"
          >
            Apply
          </button>
          {type && (
            <Link href="/records" className="text-blue-600 hover:underline">
              Clear
            </Link>
          )}
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-600">
              <th className="border p-3 text-left">Date</th>
              <th className="border p-3 text-left">Pig</th>
              <th className="border p-3 text-left">Type</th>
              <th className="border p-3 text-left">Notes</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan={5} className="border p-4 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-red-200">
                  <td className="border p-3">
                    <time suppressHydrationWarning>
                    {new Date(record.date as unknown as string).toLocaleDateString()}
                   </time>
                  </td>
                  <td className="border p-3">
                    {record.pigTag || '—'} {record.pigName ? `(${record.pigName})` : ''}
                  </td>
                  <td className="border p-3">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                      {record.type}
                    </span>
                  </td>
                  <td className="border p-3">{record.notes || '—'}</td>
                  <td className="border p-3">
                    <DeleteButton
                    action={deleteRecord}
                    id={record.id}
                    confirmMessage="Delete this record?"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    </main>
  );
}