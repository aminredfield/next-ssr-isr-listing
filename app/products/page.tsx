import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { fetchProducts } from '../../src/lib/products';
import { EmptyState, ProductGrid } from '../../src/components';

/**
 * ISR revalidation interval - 60 секунд.
 * После этого периода страница будет перегенерирована в фоне.
 */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Products',
    description: 'Browse our product catalogue with SSR and ISR',
    alternates: {
      canonical: '/products',
    },
  };
}

/**
 * Главная страница каталога товаров.
 * Использует SSR с ISR для оптимальной производительности.
 */
export default async function ProductsPage() {
  const products = await fetchProducts();

  if (!products || products.length === 0) {
    return <EmptyState />;
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Our Products
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover our collection of {products.length} carefully selected items
        </Typography>
      </Box>

      <ProductGrid products={products} />
    </Box>
  );
}