import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { fetchProductById } from '../../../src/lib/products';

interface Params {
  id: string;
}

/**
 * Revalidate the product detail page at the same interval as the list.
 * When visiting /products/[id] the page will be regenerated in the
 * background after this many seconds.
 */
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = await fetchProductById(params.id);
  if (!product) {
    return {
      title: 'Product not found',
    };
  }
  return {
    title: `${product.title}`,
    description: `Details for ${product.title}`,
    alternates: {
      canonical: `/products/${product.id}`,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const product = await fetchProductById(params.id);
  if (!product) {
    notFound();
  }
  // At this point product is defined
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{product!.title}</h1>
      <div className="relative w-full h-64 mb-4">
        <Image
          src={product!.image}
          alt={product!.title}
          fill
          className="object-contain"
        />
      </div>
      <p className="mb-2">Price: ${product!.price.toFixed(2)}</p>
      {product!.rating != null && (
        <p className="mb-2">Rating: {product!.rating}</p>
      )}
    </div>
  );
}