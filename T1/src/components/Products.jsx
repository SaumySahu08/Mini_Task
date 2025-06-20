import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/authService';

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data.products))
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setError('Could not load products. Please try again.');
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600 dark:text-blue-400">Featured Products</h1>

      {error && (
        <p className="text-center text-red-500 text-lg">{error}</p>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col"
          >
            <div className="mb-4">
              <img
                src={product.thumbnail || 'https://via.placeholder.com/300'}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{product.description}</p>

              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-bold text-blue-500">${product.price.toFixed(2)}</span>
                <span className="text-green-500">{product.discountPercentage}% off</span>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <span>Rating: {product.rating} ⭐</span>
                <span>{product.availabilityStatus}</span>
              </div>
            </div>

            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
