'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddExpense() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, amount: parseFloat(amount) }),
    });
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Add Expense</h1>
      <div className="mb-4">
        <label className="block mb-1">Description (e.g., Feed, Medicine)</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Amount (GHS)</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Expense
      </button>
    </form>
  );
}