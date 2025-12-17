import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '../types/product';

/**
 * Displays a single product. Shows an image, title, price, optional
 * rating and a link to the product details page. Uses next/image for
 * optimised loading and next/link for client‑side navigation.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white flex flex-col">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
      <p className="text-gray-600 mb-1">Price: ${product.price.toFixed(2)}</p>
      {product.rating != null && (
        <p className="text-gray-600 mb-2">Rating: {product.rating}</p>
      )}
      <Link
        href={`/products/${product.id}`}
        className="mt-auto inline-block text-blue-600 hover:underline"
      >
        Open
      </Link>
    </div>
  );
}