import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  normalizeProduct,
  normalizeProducts,
  ProductsFetchError,
} from '../src/lib/products';

describe('normalizeProduct', () => {
  it('should normalise a raw product', () => {
    const raw = {
      id: '123',
      title: ' Test Product ',
      price: 10,
      image: 'img.png',
    };
    const result = normalizeProduct(raw);
    assert.strictEqual(result.id, '123');
    assert.strictEqual(result.title, 'Test Product');
    assert.strictEqual(result.price, 10);
    assert.strictEqual(result.rating, null);
    assert.strictEqual(result.slug, 'test-product');
  });

  it('should throw ProductsFetchError for invalid product fields', () => {
    const raw: any = {
      id: 123,
      title: 'Invalid',
      price: '12',
      image: 'img.png',
    };
    assert.throws(() => normalizeProduct(raw), ProductsFetchError);
  });
});

describe('normalizeProducts', () => {
  it('returns empty array when given empty array', () => {
    assert.deepStrictEqual(normalizeProducts([]), []);
  });

  it('throws ProductsFetchError when input is not array', () => {
    // Intentionally wrong input to trigger error
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    assert.throws(() => normalizeProducts(null as any), ProductsFetchError);
  });
});