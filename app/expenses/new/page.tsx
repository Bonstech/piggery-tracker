import Link from 'next/link';
import { createExpense } from '../actions';
import { requireAuth } from '@/lib/session';
export const dynamic = 'force-dynamic';

await requireAuth();
const EXPENSE_CATEGORIES = [
  'Feed',
  'Medicine',
  'Vet',
  'Equipment',
  'Housing',
  'Transport',
  'Labor',
  'Water',
  'Other',
];

export default function NewExpensePage() {
  return (
    <main className="p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Add Expense</h1>

      <form action={createExpense} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Description *</label>
          <input
            name="description"
            type="text"
            required
            placeholder="e.g., Bought 5 bags of feed"
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Amount (GHS) *</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            min="0"
            required
            placeholder="0.00"
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category *</label>
          <select
            name="category"
            required
            defaultValue="Feed"
            className="bg-blue-600 border p-2 w-full rounded"
          >
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            name="notes"
            rows={3}
            placeholder="Optional details..."
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Expense
          </button>
          <Link
            href="/expenses"
            className="text-gray-600 px-4 py-2 hover:underline"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}