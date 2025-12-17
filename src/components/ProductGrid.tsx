import { Product } from '../types/product';
import { ProductCard } from './ProductCard.tsx';

/**
 * Renders a responsive grid of products. Adjusts the number of columns
 * based on screen size using Tailwind CSS grid utilities. Each product
 * card manages its own layout.
 */
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}