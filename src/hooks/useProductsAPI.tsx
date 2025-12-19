import { useState, useCallback } from 'react';
import {
    fetchProducts as apiFetchProducts,
    searchProducts as apiSearchProducts,
    fetchProductsByCategory as apiFetchProductsByCategory,
    fetchCategories as apiFetchCategories,
} from '../lib/products';

export function useProductsAPI() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Получить товары с пагинацией
    const fetchProducts = useCallback(async (limit: number = 20, skip: number = 0) => {
        try {
            setLoading(true);
            setError(null);
            const data = await apiFetchProducts(limit, skip);
            return data;
        } catch (err) {
            const message = 'Failed to load products';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Поиск товаров
    const searchProducts = useCallback(async (query: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await apiSearchProducts(query);
            return data;
        } catch (err) {
            const message = 'Failed to search products';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Получить товары по категории
    const fetchProductsByCategory = useCallback(async (category: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await apiFetchProductsByCategory(category);
            return data;
        } catch (err) {
            const message = 'Failed to load category products';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Получить категории
    const fetchCategories = useCallback(async () => {
        try {
            const categories = await apiFetchCategories();
            // Преобразуем в массив строк (slug)
            const categorySlugs = categories.map((cat: any) =>
                typeof cat === 'string' ? cat : cat.slug || cat.name
            );
            return categorySlugs as string[];
        } catch (err) {
            console.error('Error loading categories:', err);
            return [];
        }
    }, []);

    return {
        loading,
        error,
        fetchProducts,
        searchProducts,
        fetchProductsByCategory,
        fetchCategories,
    };
}