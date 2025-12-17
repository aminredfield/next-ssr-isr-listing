import { ProductsLoadingState } from '../../src/components/ProductsLoadingState';

/**
 * Страница загрузки для /products.
 * Отображается автоматически Next.js во время SSR/ISR.
 */
export default function Loading() {
  return <ProductsLoadingState />;
}