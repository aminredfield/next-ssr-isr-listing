/**
 * Component displayed when no products are returned from the API. Shows a
 * friendly message encouraging developers to populate the mock data.
 */
export function EmptyState() {
  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-semibold mb-2">No products found</h2>
      <p className="text-gray-600">
        Try editing <code>src/data/products.ts</code> to add some products.
      </p>
    </div>
  );
}