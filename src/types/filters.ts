/**
 * Параметры фильтрации товаров
 */
export interface ProductFilters {
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sortBy?: 'price-asc' | 'price-desc' | 'rating-desc' | 'title-asc';
}

/**
 * Опции сортировки
 */
export const SORT_OPTIONS = [
    { value: 'title-asc', label: 'Name (A-Z)' },
    { value: 'price-asc', label: 'Price (Low to High)' },
    { value: 'price-desc', label: 'Price (High to Low)' },
    { value: 'rating-desc', label: 'Rating (High to Low)' },
] as const;