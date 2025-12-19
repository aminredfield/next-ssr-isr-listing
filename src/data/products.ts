/**
 * Raw product interface from DummyJSON API
 */
export interface RawProduct {
  id: number;
  title: string;
  price: number;
  rating?: number;
  thumbnail?: string;
  images?: string[];
  description?: string;
  category?: string;
  brand?: string;
  stock?: number;
}

/**
 * API Response for products list
 */
export interface ProductsResponse {
  products: RawProduct[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * API Response for categories
 */
export type CategoriesResponse = string[];