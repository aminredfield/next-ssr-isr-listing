/**
 * Mock product data. You can edit the contents of this array to test
 * incremental static regeneration (ISR). After editing and saving
 * this file, wait for the revalidation period specified in
 * app/products/page.tsx before the updated products appear on the
 * /products page.
 */
export interface RawProduct {
  id: string;
  title: string;
  price: number;
  rating?: number;
  image: string;
  slug?: string;
}

export const products: RawProduct[] = [
  {
    id: '1',
    title: 'Wireless Headphones',
    price: 99.99,
    rating: 4.5,
    image:
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '2',
    title: 'Smartphone Holder',
    price: 19.99,
    rating: 4.0,
    image:
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '3',
    title: 'Bluetooth Speaker',
    price: 49.5,
    rating: 4.2,
    image:
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '4',
    title: 'Gaming Mouse',
    price: 39.99,
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '5',
    title: 'Mechanical Keyboard',
    price: 129.99,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=60',
  },
];

/**
 * Returns the current array of products. Placing the mock data behind a
 * function allows the data layer to be imported into both the API route
 * and server components without causing Next.js to treat the module as a
 * server action. Keep this synchronous to avoid unnecessary async
 * overhead when used during server-side rendering.
 */
export function getProducts(): RawProduct[] {
  return products;
}