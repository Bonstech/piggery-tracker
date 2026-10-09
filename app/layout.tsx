import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { logout } from '@/app/actions/auth';

export const metadata: Metadata = {
  title: 'Piggery Tracker',
  description: 'Track pigs, expenses, sales, and records',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-white border-b px-6 py-4 flex gap-6 items-center">
          <Link href="/" className="text-black font-bold text-lg">
            🐷 Piggery@Kaluri
          </Link>
          <Link href="/pigs" className="text-gray-700 hover:text-blue-600">
            Pigs
          </Link>
          <Link href="/expenses" className="text-gray-700 hover:text-blue-600">
            Expenses
          </Link>
          <Link href="/sales" className="text-gray-700 hover:text-blue-600">
            Sales
          </Link>
          <Link href="/records" className="text-gray-700 hover:text-blue-600">
            Records
          </Link>

         <form action={logout} className="ml-auto">
            <button className="text-gray-700 hover:text-red-600">
              Lock
            </button>
          </form>
        </nav>
        <div>{children}</div>
      </body>
    </html>
  );
}