'use client';

import { useEffect } from 'react';

/**
 * Error boundary UI for the products listing. When an error is thrown
 * during rendering or data fetching, this component is rendered by
 * Next.js. The `reset` function allows users to retry the operation.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error so developers can inspect it in the console.
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="p-4 text-center">
      <h2 className="text-lg font-semibold mb-2">Something went wrong!</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}