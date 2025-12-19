'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ProductGrid, EmptyState } from '../../src/components';
import { ProductFiltersBar } from '../../src/components/ProductFiltersBar';
import { useProductsAPI } from '../../src/hooks/useProductsAPI';
import type { Product } from '../../src/types/product';
import type { ProductFilters } from '../../src/types/filters';

const ITEMS_PER_PAGE = 20;

export default function ProductsPage() {
  const { fetchProducts, searchProducts, fetchProductsByCategory } = useProductsAPI();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<ProductFilters>({});

  const observerTarget = useRef<HTMLDivElement>(null);

  // Загрузка первоначальных товаров
  useEffect(() => {
    loadInitialProducts();
  }, []);

  const loadInitialProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchProducts(ITEMS_PER_PAGE, 0);

      setProducts(data.products);
      setFilteredProducts(data.products);
      setHasMore(data.products.length < data.total);
      setPage(1);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка дополнительных товаров
  const loadMoreProducts = useCallback(async () => {
    if (loadingMore || !hasMore || filters.search || filters.category) return;

    try {
      setLoadingMore(true);

      const data = await fetchProducts(ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

      setProducts(prev => [...prev, ...data.products]);
      setFilteredProducts(prev => {
        const newFiltered = applyFilters([...prev, ...data.products], filters);
        return newFiltered;
      });
      setHasMore(products.length + data.products.length < data.total);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error('Error loading more products:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, page, products.length, filters, fetchProducts]);

  // Intersection Observer для бесконечного скролла
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMoreProducts();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loadingMore, loadMoreProducts]);

  // Применение фильтров
  const handleFiltersChange = useCallback(async (newFilters: ProductFilters) => {
    const filtersChanged = JSON.stringify(filters) !== JSON.stringify(newFilters);
    if (!filtersChanged) return;

    setFilters(newFilters);

    // Если есть поиск или категория, делаем новый запрос
    if (newFilters.search) {
      try {
        setLoadingMore(true);
        setError(null);
        const data = await searchProducts(newFilters.search);
        const filtered = applyFilters(data.products, newFilters);
        setFilteredProducts(filtered);
        setHasMore(false);
      } catch (err) {
        console.error(err);
        setError('Failed to search products. Please try again.');
      } finally {
        setLoadingMore(false);
      }
    } else if (newFilters.category) {
      try {
        setLoadingMore(true);
        setError(null);
        const data = await fetchProductsByCategory(newFilters.category);
        const filtered = applyFilters(data.products, newFilters);
        setFilteredProducts(filtered);
        setHasMore(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load category products. Please try again.');
      } finally {
        setLoadingMore(false);
      }
    } else {
      const filtered = applyFilters(products, newFilters);
      setFilteredProducts(filtered);
      setHasMore(true);
    }
  }, [products, filters, searchProducts, fetchProductsByCategory]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        Products
      </Typography>

      <ProductFiltersBar onFiltersChange={handleFiltersChange} />

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
      </Typography>

      <Box sx={{ minHeight: '50vh' }}>
        {error ? (
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={loadInitialProducts} startIcon={<RefreshIcon />}>
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        ) : loadingMore && filteredProducts.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : filteredProducts.length > 0 ? (
          <>
            <ProductGrid products={filteredProducts} />

            {(hasMore && !filters.search && !filters.category) || loadingMore ? (
              <Box
                ref={observerTarget}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  py: 4
                }}
              >
                {loadingMore && <CircularProgress />}
              </Box>
            ) : null}
          </>
        ) : (
          <EmptyState message="No products match your filters. Try adjusting your search criteria." />
        )}
      </Box>
    </Box>
  );
}


function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  let result = [...products];

  if (filters.minPrice !== undefined) {
    result = result.filter((product) => product.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter((product) => product.price <= filters.maxPrice!);
  }

  if (filters.minRating !== undefined && filters.minRating > 0) {
    result = result.filter(
      (product) => product.rating !== null && product.rating >= filters.minRating!
    );
  }

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

  return result;
}
