'use client';

import { useState } from 'react';

export default function DeleteButton({
  action,
  id,
  label = 'Delete',
  confirmMessage = 'Are you sure?',
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: number | string;
  label?: string;
  confirmMessage?: string;
}) {
  const [pending, setPending] = useState(false);

  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault();
          return;
        }
        setPending(true);
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={pending}
        className="text-red-600 hover:underline disabled:opacity-50"
      >
        {pending ? 'Deleting...' : label}
      </button>
    </form>
  );
}