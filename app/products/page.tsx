import type { Metadata } from 'next';
import { fetchProducts } from '../../src/lib/products';
import { EmptyState, ProductGrid } from '../../src/components';


/**
 * Number of seconds between ISR revalidations. After this period the
 * cached HTML for this page will be considered stale and a new render
 * triggered in the background on the next request. See the README for
 * instructions on how to verify ISR behaviour.
 */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Products',
    description: 'Browse our product catalogue rendered via SSR and ISR',
    alternates: {
      canonical: '/products',
    },
  };
}

/**
 * Server component for the products listing. Fetches products on the
 * server, normalises them and renders a grid or empty state. Because
 * this component does not use the `use client` directive, it will be
 * rendered on the server and sent to the client as HTML.
 */
export default async function ProductsPage() {
  const products = await fetchProducts();
  if (!products || products.length === 0) {
    return <EmptyState />;
  }
  return <ProductGrid products={products} />;
}