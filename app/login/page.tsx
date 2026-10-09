import { verifyCode } from '@/app/actions/auth';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Enter Access Code</h1>
        <form action={verifyCode} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Access Code</label>
            <input
              name="code"
              type="password"
              required
              autoFocus
              className="border p-2 w-full rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
          >
            Unlock
          </button>
        </form>
      </div>
    </main>
  );
}