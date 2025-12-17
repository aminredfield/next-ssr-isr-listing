export interface Product {
  /**
   * Unique identifier for the product. In a real API this might be a UUID
   * or database primary key.
   */
  id: string;
  /**
   * Human‑readable product name.
   */
  title: string;
  /**
   * Price in your preferred currency. Here represented as a number for
   * simplicity.
   */
  price: number;
  /**
   * Optional numeric rating from customers. A value of null indicates no
   * rating is available.
   */
  rating: number | null;
  /**
   * URL to a representative product image. See next/image documentation
   * for supported formats and remote configuration.
   */
  image: string;
  /**
   * URL‑friendly slug generated from the title. Used when linking to
   * product pages.
   */
  slug: string;
}