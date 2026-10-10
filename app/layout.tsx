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
        <nav className="bg-white border-b px-4 sm:px-6 py-3 sm:py-4">
          {/* Top row: brand + lock button */}
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="text-black font-bold text-base sm:text-lg whitespace-nowrap"
            >
              🐷 Piggery@Kaluri
            </Link>
            <form action={logout}>
              <button className="text-sm sm:text-base text-gray-700 hover:text-red-600 whitespace-nowrap">
                Lock
              </button>
            </form>
          </div>

          {/* Bottom row: nav links, wraps on small screens */}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm sm:text-base">
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
          </div>
        </nav>

        <div>{children}</div>
      </body>
    </html>
  );
}