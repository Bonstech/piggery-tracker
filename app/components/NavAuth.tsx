'use client';

import { useSession, signOut } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NavAuth() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) return null;

  if (!session) {
    return (
      <div className="ml-auto flex gap-4">
        <Link href="/sign-in" className="text-gray-700 hover:text-blue-600">
          Sign In
        </Link>
        <Link href="/sign-up" className="text-gray-700 hover:text-blue-600">
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="ml-auto flex gap-4 items-center">
      <span className="text-sm text-gray-600">{session.user.email}</span>
      <button
        onClick={async () => {
          await signOut();
          router.push('/sign-in');
          router.refresh();
        }}
        className="text-gray-700 hover:text-red-600"
      >
        Sign Out
      </button>
    </div>
  );
}