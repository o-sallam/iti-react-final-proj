import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const productService = {
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      return response.data;
    } catch {
      throw new Error('Failed to fetch products');
    }
  },

  getProductById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to fetch product');
    }
  },

  // Create new product
  createProduct: async (productData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/products`, productData);
      return response.data;
    } catch {
      throw new Error('Failed to create product');
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${id}`, productData);
      return response.data;
    } catch {
      throw new Error('Failed to update product');
    }
  },

  deleteProduct: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/products/${id}`);
      return true;
    } catch {
      throw new Error('Failed to delete product');
    }
  },

  searchProducts: async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/search?q=${query}`);
      return response.data;
    } catch {
      throw new Error('Failed to search products');
    }
  },

  // New method to fetch products with stock and warehouse info
  getProductsWithStockWarehouse: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/with-stock-warehouse`);
      return response.data;
    } catch {
      throw new Error('فشل في جلب المنتجات مع المخزون والمخزن');
    }
  }
};

export default productService;