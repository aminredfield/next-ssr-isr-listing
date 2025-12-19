import type { Product } from '../types/product';
import type { RawProduct, ProductsResponse, CategoriesResponse } from '../data/products';

const API_BASE = 'https://dummyjson.com';

/**
 * Custom error class representing failures during product fetching
 */
export class ProductsFetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProductsFetchError';
  }
}

/**
 * Creates a URL‑friendly slug from a given string
 */
function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Normalises a raw product object from API into a fully typed Product
 */
export function normalizeProduct(raw: RawProduct): Product {
  if (!raw || typeof raw !== 'object') {
    throw new ProductsFetchError('Invalid product data');
  }

  const { id, title, price, rating, thumbnail, images, description, category, brand, stock } = raw;

  if (
    typeof id !== 'number' ||
    typeof title !== 'string' ||
    typeof price !== 'number'
  ) {
    throw new ProductsFetchError('Invalid product fields');
  }

  return {
    id: String(id),
    title: title.trim(),
    price,
    rating: typeof rating === 'number' ? rating : null,
    image: thumbnail || (images && images[0]) || '',
    images: images || [thumbnail || ''],
    description: description || '',
    category: category || '',
    brand: brand || '',
    stock: stock || 0,
    slug: slugify(title),
  };
}

/**
 * Normalises an array of raw products
 */
export function normalizeProducts(rawProducts: RawProduct[]): Product[] {
  if (!Array.isArray(rawProducts)) {
    throw new ProductsFetchError('Products response is not an array');
  }
  return rawProducts.map(normalizeProduct);
}

/**
 * Fetches products from DummyJSON API with pagination
 */
export async function fetchProducts(
  limit: number = 20,
  skip: number = 0
): Promise<{ products: Product[]; total: number }> {
  try {
    const response = await fetch(
      `${API_BASE}/products?limit=${limit}&skip=${skip}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ProductsResponse = await response.json();
    const products = normalizeProducts(data.products);

    return {
      products,
      total: data.total,
    };
  } catch (err) {
    if (err instanceof ProductsFetchError) {
      throw err;
    }
    console.error('Error fetching products:', err);
    throw new ProductsFetchError('Failed to fetch products');
  }
}

/**
 * Fetches a single product by ID
 */
export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: RawProduct = await response.json();
    return normalizeProduct(data);
  } catch (err) {
    if (err instanceof ProductsFetchError) {
      throw err;
    }
    console.error('Error fetching product:', err);
    throw new ProductsFetchError('Failed to fetch product');
  }
}

/**
 * Searches products by query
 */
export async function searchProducts(
  query: string,
  limit: number = 20
): Promise<{ products: Product[]; total: number }> {
  try {
    const response = await fetch(
      `${API_BASE}/products/search?q=${encodeURIComponent(query)}&limit=${limit}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ProductsResponse = await response.json();
    const products = normalizeProducts(data.products);

    return {
      products,
      total: data.total,
    };
  } catch (err) {
    console.error('Error searching products:', err);
    throw new ProductsFetchError('Failed to search products');
  }
}

/**
 * Fetches all available categories
 */
export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE}/products/categories`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CategoriesResponse = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching categories:', err);
    return [];
  }
}

/**
 * Fetches products by category
 */
export async function fetchProductsByCategory(
  category: string,
  limit: number = 20,
  skip: number = 0
): Promise<{ products: Product[]; total: number }> {
  try {
    const response = await fetch(
      `${API_BASE}/products/category/${category}?limit=${limit}&skip=${skip}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ProductsResponse = await response.json();
    const products = normalizeProducts(data.products);

    return {
      products,
      total: data.total,
    };
  } catch (err) {
    console.error('Error fetching products by category:', err);
    throw new ProductsFetchError('Failed to fetch products by category');
  }
}