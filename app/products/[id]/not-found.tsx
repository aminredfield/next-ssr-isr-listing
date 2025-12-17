import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-semibold mb-2">Product not found</h2>
      <p className="text-gray-600 mb-4">The product you are looking for does not exist.</p>
      <Link href="/products" className="text-blue-600 hover:underline">
        Back to products
      </Link>
    </div>
  );
}