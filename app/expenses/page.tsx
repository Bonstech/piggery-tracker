import { db } from '@/db';
import { expenses } from '@/db/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';
import { deleteExpense } from './actions';
import DeleteButton from '@/app/components/DeleteButton';
import { requireAuth } from '@/lib/session';

export const dynamic = 'force-dynamic';
await requireAuth();
export default async function ExpensesPage() {
  const allExpenses = await db.select().from(expenses).orderBy(desc(expenses.date));

  const total = allExpenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <Link
          href="/expenses/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Expense
        </Link>
      </div>

      <div className="mb-4 text-lg">
        <strong>Total Expenses:</strong> GHS {total.toFixed(2)}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600">
              <th className="border p-3 text-left">Date</th>
              <th className="border p-3 text-left">Description</th>
              <th className="border p-3 text-left">Category</th>
              <th className="border p-3 text-right">Amount (GHS)</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allExpenses.length === 0 ? (
              <tr>
                <td colSpan={5} className="border p-4 text-center text-gray-500">
                  No expenses recorded yet.
                </td>
              </tr>
            ) : (
              allExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-red-200">
                  <td className="border p-3">
                    <time suppressHydrationWarning>
                      {new Date(expense.date as unknown as string).toLocaleDateString()}
                    </time>
                  </td>
                  <td className="border p-3">{expense.description}</td>
                  <td className="border p-3">
                    <span className="px-2 py-1 rounded text-sm">
                      {expense.category}
                    </span>
                  </td>
                  <td className="border p-3 text-right font-mono">
                    {parseFloat(expense.amount).toFixed(2)}
                  </td>
                  <td className="border p-3">
                    <DeleteButton
                      action={deleteExpense}
                      id={expense.id}
                      confirmMessage="Delete this expense?"
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