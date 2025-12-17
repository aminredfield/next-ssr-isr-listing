'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ProductGrid, EmptyState } from '../../src/components';
import { ProductFiltersComponent } from '../../src/components/ProductFiltersComponent';
import { fetchProducts } from '../../src/lib/products';
import type { Product } from '../../src/types/product';
import type { ProductFilters } from '../../src/types/filters';

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const allProductsRef = useRef<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      allProductsRef.current = data;
      setFilteredProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const handleFiltersChange = useCallback((filters: ProductFilters) => {
    let result = [...allProductsRef.current];

    // Поиск по названию
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchLower)
      );
    }

    // Фильтр по цене
    if (filters.minPrice !== undefined) {
      result = result.filter((product) => product.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((product) => product.price <= filters.maxPrice!);
    }

    // Фильтр по рейтингу
    if (filters.minRating !== undefined && filters.minRating > 0) {
      result = result.filter(
        (product) => product.rating !== undefined && product.rating !== null && product.rating >= filters.minRating!
      );
    }

    // Сортировка
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating-desc':
          result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case 'title-asc':
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
      }
    }

    setFilteredProducts(result);
  }, []);

  if (loading) {
    return null; // Используем loading.tsx
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        Products
      </Typography>

      <Grid container spacing={3}>
        {/* Фильтры - слева */}
        <Grid item xs={12} md={3}>
          <ProductFiltersComponent onFiltersChange={handleFiltersChange} />
        </Grid>

        {/* Товары - справа */}
        <Grid item xs={12} md={9}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </Typography>

          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <EmptyState message="No products match your filters. Try adjusting your search criteria." />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}