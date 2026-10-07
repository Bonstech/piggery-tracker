import { db } from '@/db';
import { pigs } from '@/db/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';
import { deletePig } from './actions';
import DeleteButton from '@/app/components/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function PigsPage() {
  const allPigs = await db.select().from(pigs).orderBy(desc(pigs.createdAt));

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pig Registry</h1>
        <Link
          href="/pigs/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Pig
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600">
              <th className="border p-3 text-left">Tag #</th>
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Gender</th>
              <th className="border p-3 text-left">Birth Date</th>
              <th className="border p-3 text-left">Status</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allPigs.length === 0 ? (
              <tr>
                <td colSpan={6} className="border p-4 text-center text-gray-500">
                  No pigs registered yet. Click &quot;Add New Pig&quot; to start.
                </td>
              </tr>
            ) : (
              allPigs.map((pig) => (
                <tr key={pig.id} className="hover:bg-red-200">
                  <td className="border p-3 font-mono">{pig.tagNumber}</td>
                  <td className="border p-3">{pig.name || '—'}</td>
                  <td className="border p-3">{pig.gender || '—'}</td>
                  <td className="border p-3">
                    {pig.birthDate ? new Date(pig.birthDate).toLocaleDateString() : '—'}
                  </td>
                  <td className="border p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        pig.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : pig.status === 'Sold'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {pig.status}
                    </span>
                  </td>
                  <td className="border p-3">
                    <div className="flex gap-2">
                     
                      <Link
                        href={`/pigs/${pig.id}/edit`}
                        className="text-yellow-600 hover:underline"
                      >
                        Edit
                      </Link>
                     <DeleteButton
                        action={deletePig}
                        id={pig.id}
                        confirmMessage="Delete this pig?"
                        />
                    </div>
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
