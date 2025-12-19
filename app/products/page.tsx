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
import type { Product } from '../../src/types/product';
import type { ProductFilters } from '../../src/types/filters';

const API_BASE = 'https://dummyjson.com';
const ITEMS_PER_PAGE = 20;

export default function ProductsPage() {
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

      const response = await fetch(
        `${API_BASE}/products?limit=${ITEMS_PER_PAGE}&skip=0`
      );

      if (!response.ok) throw new Error('Failed to fetch products');

      const data = await response.json();
      const normalized = data.products.map(normalizeProduct);

      setProducts(normalized);
      setFilteredProducts(normalized);
      setHasMore(normalized.length < data.total);
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

      const response = await fetch(
        `${API_BASE}/products?limit=${ITEMS_PER_PAGE}&skip=${page * ITEMS_PER_PAGE}`
      );

      if (!response.ok) throw new Error('Failed to fetch more products');

      const data = await response.json();
      const normalized = data.products.map(normalizeProduct);

      setProducts(prev => [...prev, ...normalized]);
      setFilteredProducts(prev => {
        const newFiltered = applyFilters([...prev, ...normalized], filters);
        return newFiltered;
      });
      setHasMore(products.length + normalized.length < data.total);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error('Error loading more products:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, page, products.length, filters]);

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
    // Проверяем, изменились ли фильтры, чтобы избежать лишних запросов
    const filtersChanged = JSON.stringify(filters) !== JSON.stringify(newFilters);
    if (!filtersChanged) return;

    setFilters(newFilters);

    // Если есть поиск или категория, делаем новый запрос
    if (newFilters.search) {
      try {
        setLoadingMore(true); // Используем loadingMore вместо loading
        setError(null);
        const response = await fetch(
          `${API_BASE}/products/search?q=${encodeURIComponent(newFilters.search)}`
        );

        if (!response.ok) throw new Error('Failed to search products');

        const data = await response.json();
        const normalized = data.products.map(normalizeProduct);
        const filtered = applyFilters(normalized, newFilters);
        setFilteredProducts(filtered);
        setHasMore(false); // Отключаем бесконечный скролл для поиска
      } catch (err) {
        console.error(err);
        setError('Failed to search products. Please try again.');
      } finally {
        setLoadingMore(false);
      }
    } else if (newFilters.category) {
      try {
        setLoadingMore(true); // Используем loadingMore вместо loading
        setError(null);
        const response = await fetch(
          `${API_BASE}/products/category/${newFilters.category}`
        );

        if (!response.ok) throw new Error('Failed to fetch category products');

        const data = await response.json();
        const normalized = data.products.map(normalizeProduct);
        const filtered = applyFilters(normalized, newFilters);
        setFilteredProducts(filtered);
        setHasMore(false); // Отключаем бесконечный скролл для категорий
      } catch (err) {
        console.error(err);
        setError('Failed to load category products. Please try again.');
      } finally {
        setLoadingMore(false);
      }
    } else {
      // Применяем фильтры к загруженным товарам (мгновенно, без loading)
      const filtered = applyFilters(products, newFilters);
      setFilteredProducts(filtered);
      setHasMore(true); // Включаем бесконечный скролл обратно
    }
  }, [products, filters]);

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

      {/* Фильтры - всегда доступны */}
      <ProductFiltersBar onFiltersChange={handleFiltersChange} />

      {/* Счётчик товаров */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
      </Typography>

      {/* Область товаров с loading/error внутри */}
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
          // Loading только при первой загрузке с фильтром
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : filteredProducts.length > 0 ? (
          <>
            <ProductGrid products={filteredProducts} />

            {/* Индикатор загрузки дополнительных товаров */}
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

// Вспомогательные функции
function normalizeProduct(raw: any) {
  return {
    id: String(raw.id),
    title: raw.title,
    price: raw.price,
    rating: raw.rating || null,
    image: raw.thumbnail || raw.images?.[0] || '',
    images: raw.images || [raw.thumbnail],
    description: raw.description || '',
    category: raw.category || '',
    brand: raw.brand || '',
    stock: raw.stock || 0,
    slug: raw.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  };
}

function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  let result = [...products];

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
      (product) => product.rating !== null && product.rating >= filters.minRating!
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

  return result;
}
