import { db } from '@/db';
import { sales, pigs } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import Link from 'next/link';
import { deleteSale } from './actions';
import DeleteButton from '@/app/components/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function SalesPage() {
  const allSales = await db
    .select({
      id: sales.id,
      amount: sales.amount,
      buyer: sales.buyer,
      date: sales.date,
      notes: sales.notes,
      pigTag: pigs.tagNumber,
      pigName: pigs.name,
    })
    .from(sales)
    .leftJoin(pigs, eq(sales.pigId, pigs.id))
    .orderBy(desc(sales.date));

  const total = allSales.reduce((sum, s) => sum + parseFloat(s.amount), 0);

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sales</h1>
        <Link
          href="/sales/new"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Record Sale
        </Link>
      </div>

      <div className="mb-4 text-lg">
        <strong>Total Sales:</strong> GHS {total.toFixed(2)}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600">
              <th className="border p-3 text-left">Date</th>
              <th className="border p-3 text-left">Pig</th>
              <th className="border p-3 text-left">Buyer</th>
              <th className="border p-3 text-right">Amount (GHS)</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allSales.length === 0 ? (
              <tr>
                <td colSpan={5} className="border p-4 text-center text-gray-500">
                  No sales recorded yet.
                </td>
              </tr>
            ) : (
              allSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-red-200">
                  <td className="border p-3">
                    <time suppressHydrationWarning>
                    {new Date(sale.date as unknown as string).toLocaleDateString()}
                  </time>
                  </td>
                  <td className="border p-3">
                    {sale.pigTag || '—'} {sale.pigName ? `(${sale.pigName})` : ''}
                  </td>
                  <td className="border p-3">{sale.buyer || '—'}</td>
                  <td className="border p-3 text-right font-mono">
                    {parseFloat(sale.amount).toFixed(2)}
                  </td>
                  <td className="border p-3">
                   <DeleteButton
                    action={deleteSale}
                    id={sale.id}
                    confirmMessage="Delete this sale?"
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