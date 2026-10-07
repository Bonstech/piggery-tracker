import { db } from '@/db';
import { expenses, sales } from '@/db/schema';
import { sql } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch total expenses
  const totalExpensesResult = await db
    .select({ sum: sql<string>`sum(${expenses.amount})` })
    .from(expenses);
  const totalExpenses = parseFloat(totalExpensesResult[0]?.sum || '0');

  // Fetch total sales
  const totalSalesResult = await db
    .select({ sum: sql<string>`sum(${sales.amount})` })
    .from(sales);
  const totalSales = parseFloat(totalSalesResult[0]?.sum || '0');

  const profit = totalSales - totalExpenses;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-lg font-semibold text-gray-600">Total Expenses</h2>
          <p className="text-3xl font-bold text-red-600">
            GHS {totalExpenses.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-lg font-semibold text-gray-600">Total Sales</h2>
          <p className="text-3xl font-bold text-green-600">
            GHS {totalSales.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-lg font-semibold text-gray-600">Profit / Loss</h2>
          <p className={`text-3xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            GHS {profit.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
      <a href="/expenses/new" className="bg-blue-600 text-white px-4 py-2 rounded">Add Expense</a>
      <a href="/expenses" className="bg-blue-100 text-blue-800 px-4 py-2 rounded">View Expenses</a>
      <a href="/records" className="bg-purple-600 text-white px-4 py-2 rounded">Records</a>
      <a href="/sales/new" className="bg-green-600 text-white px-4 py-2 rounded">Record Sale</a>
      <a href="/sales" className="bg-green-100 text-green-800 px-4 py-2 rounded">View Sales</a>
      <a href="/pigs" className="bg-yellow-600 text-white px-4 py-2 rounded">Pig Registry</a>
    </div>
    </main>
  );
}
