'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../../components/products/ProductList';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchProducts = async (searchTerm = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/products?q=${encodeURIComponent(searchTerm)}`);
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

 

  return (
    <>
      <Navbar/>
    <div className=" mx-auto px-4 py-8">   
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : (
        <ProductList products={products} />
      )}
      </div>
      <Footer/>
  </>);
};

export default ProductsPage;