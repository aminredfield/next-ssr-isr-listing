import { ProductSkeleton, ProductsLoadingState } from "../../src/components";

/**
 * Страница загрузки для /products.
 * Отображается автоматически Next.js во время SSR/ISR.
 */
export function ProductPageLoading() {
  return <ProductSkeleton />;
}
export default function Loading() {
  return <ProductsLoadingState />;
}
