import Grid from '@mui/material/Grid';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';

/**
 * ProductGrid - адаптивная сетка товаров с использованием MUI Grid.
 * Автоматически подстраивается под разные размеры экранов.
 */
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}