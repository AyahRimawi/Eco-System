'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Search, ChevronLeft, ChevronRight, ChevronDown, Star } from 'lucide-react';

const categories = ['All', 'Clothing', 'Accessories', 'Personal Care', 'Home & Kitchen', 'Fitness', 'Kitchen & Dining', 'Plants & Gifts'];

const ProductCard = ({ product }) => {
  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 ease-out border border-gray-200 hover:border-green-500 group flex flex-col h-full">
      <div className="h-80 bg-gray-50 relative overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
        />
        {product.isEco && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">Eco-friendly</span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-2 truncate">{product.title}</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold text-green-600">{product.price} JOD</span>
        
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        <Link 
          href={`/products/${product._id}`}
          className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 text-center transform hover:-translate-y-1 hover:shadow-lg mt-auto"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 9;

  const fetchProducts = async (search = '', category = 'All', page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/products?q=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&page=${page}&limit=${productsPerPage}`);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(searchTerm, selectedCategory, currentPage);
  }, [selectedCategory, searchTerm, currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts(searchTerm, selectedCategory, 1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Discover Our Sustainable Collection</h2>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-3xl mx-auto">
          <input
            type="text"
            className="w-full px-4 py-3 pl-12 pr-40 text-gray-700 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:border-green-500 transition-all duration-300 shadow-sm hover:shadow-md"
            placeholder="Search for eco-friendly products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-full py-0 pl-2 pr-8 border-l border-gray-200 bg-gray-100 text-gray-700 rounded-r-full focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none cursor-pointer"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </form>
  
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">No products found.</p>
          <p className="text-sm text-gray-500 mt-2">Try adjusting your search or browse our categories.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors duration-300"
          >
            <ChevronLeft className="w-5 w-5" />
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => handlePageChange(page + 1)}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                currentPage === page + 1
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors duration-300"
          >
            <ChevronRight className="w-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;