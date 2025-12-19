export interface Product {
  /**
   * Unique identifier for the product
   */
  id: string;
  /**
   * Human‑readable product name
   */
  title: string;
  /**
   * Price in USD
   */
  price: number;
  /**
   * Optional numeric rating from customers
   */
  rating: number | null;
  /**
   * URL to product thumbnail image
   */
  image: string;
  /**
   * All product images
   */
  images: string[];
  /**
   * Product description
   */
  description: string;
  /**
   * Product category
   */
  category: string;
  /**
   * Product brand
   */
  brand: string;
  /**
   * Available stock
   */
  stock: number;
  /**
   * URL‑friendly slug generated from the title
   */
  slug: string;
}