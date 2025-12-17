import { NextResponse } from 'next/server';
import { getProducts } from '../../../src/data/products';

// API route for fetching products. This route simply returns the mock
// data defined in src/data/products.ts. Keeping the mock in a separate
// module makes it easy to modify product data and observe ISR behaviour.
export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}