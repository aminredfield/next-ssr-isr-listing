import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Product Demo</h1>
      <p className="text-gray-700 mb-4">
        This project demonstrates server‑side rendering (SSR) and incremental
        static regeneration (ISR) in Next.js.
      </p>
      <Link href="/products" className="text-blue-600 hover:underline">
        Go to Products
      </Link>
    </div>
  );
}