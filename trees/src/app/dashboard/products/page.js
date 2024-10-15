// File: src/app/dashboard/products/page.js
'use client';
import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';


export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('/api/adminproducts');
    const data = await response.json();
    setProducts(data);
  };

  const openModal = (product = null) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentProduct(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const product = {
      title: form.title.value,
      description: form.description.value,
      price: parseFloat(form.price.value),
      imageUrl: form.imageUrl.value,
      category: form.category.value,
    };

    const url = currentProduct ? `/api/adminproducts/${currentProduct._id}` : '/api/adminproducts';
    const method = currentProduct ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      fetchProducts();
      closeModal();
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const response = await fetch(`/api/adminproducts/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchProducts();
      }
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <button
        onClick={() => openModal()}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
      >
        <FaPlus className="inline mr-2" /> Add Product
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="h-48 overflow-hidden">
              <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <h2 className="text-xl font-semibold mb-2 line-clamp-1">{product.title}</h2>
              <p className="text-gray-600 mb-4 flex-grow">
                {truncateText(product.description, 100)}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => openModal(product)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {currentProduct ? 'Edit Product' : 'Add Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Product Title"
                  defaultValue={currentProduct?.title}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Product Description"
                  defaultValue={currentProduct?.description}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Price"
                  defaultValue={currentProduct?.price}
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="Image URL"
                  defaultValue={currentProduct?.imageUrl}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  placeholder="Category"
                  defaultValue={currentProduct?.category}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {currentProduct ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}