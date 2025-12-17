import { getProducts } from '../data/products';
import type { Product } from '../types/product';
/**
 * Custom error class representing failures during product fetching or
 * normalisation. Throwing this error type from data layer functions
 * allows the UI to differentiate between expected and unexpected
 * failures.
 */
export class ProductsFetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProductsFetchError';
  }
}

/**
 * Creates a URL‑friendly slug from a given string. Non‑alphanumeric
 * characters are replaced with hyphens and leading/trailing hyphens
 * are removed.
 */
function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Normalises a raw product object returned from an API into a fully typed
 * {@link Product}. Missing optional fields are given sensible
 * defaults. If required fields are missing or of the wrong type a
 * {@link ProductsFetchError} is thrown.
 */
export function normalizeProduct(raw: any): Product {
  if (!raw || typeof raw !== 'object') {
    throw new ProductsFetchError('Invalid product data');
  }
  const { id, title, price, rating, image, slug } = raw;
  if (
    typeof id !== 'string' ||
    typeof title !== 'string' ||
    typeof price !== 'number' ||
    typeof image !== 'string'
  ) {
    throw new ProductsFetchError('Invalid product fields');
  }
  return {
    id,
    title: title.trim(),
    price,
    rating: typeof rating === 'number' ? rating : null,
    image,
    slug: typeof slug === 'string' ? slug : slugify(title),
  };
}

/**
 * Normalises an array of raw products. Throws an error if the input
 * value is not an array. Use this function in your data fetching logic
 * to ensure consistent product shapes throughout the app.
 */
export function normalizeProducts(rawProducts: any[]): Product[] {
  if (!Array.isArray(rawProducts)) {
    throw new ProductsFetchError('Products response is not an array');
  }
  return rawProducts.map(normalizeProduct);
}

/**
 * Fetches and normalises the list of products. In this demo the data
 * comes from a local mock defined in `src/data/products.ts`. Wrapping
 * this in a function allows you to swap out the data source easily
 * without touching the UI code. Errors from normalisation are
 * propagated as {@link ProductsFetchError} to be handled by the
 * framework's error boundary.
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const data = getProducts();
    return normalizeProducts(data);
  } catch (err) {
    if (err instanceof ProductsFetchError) {
      throw err;
    }
    throw new ProductsFetchError('Failed to fetch products');
  }
}

/**
 * Fetches a single product by identifier. Returns null if the
 * product cannot be found. Errors during normalisation are propagated
 * via {@link ProductsFetchError}.
 */
export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const data = getProducts();
    const products = normalizeProducts(data);
    return products.find((p) => p.id === id) ?? null;
  } catch (err) {
    if (err instanceof ProductsFetchError) {
      throw err;
    }
    throw new ProductsFetchError('Failed to fetch products');
  }
}