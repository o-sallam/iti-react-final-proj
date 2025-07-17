import api from '../api';

const productService = {
  getAllProducts: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch {
      throw new Error('Failed to fetch products');
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to fetch product');
    }
  },

  // Create new product
  createProduct: async (productData) => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch {
      throw new Error('Failed to create product');
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch {
      throw new Error('Failed to update product');
    }
  },

  deleteProduct: async (id) => {
    try {
      await api.delete(`/products/${id}`);
      return true;
    } catch {
      throw new Error('Failed to delete product');
    }
  },

  searchProducts: async (query) => {
    try {
      const response = await api.get(`/products/search?q=${query}`);
      return response.data;
    } catch {
      throw new Error('Failed to search products');
    }
  },

  // New method to fetch products with quantity and warehouse info
  getProductsWithQuantityWarehouse: async () => {
    try {
      const response = await api.get('/products/with-quantity-warehouse');
      // The backend should already return the new format: { product_id, product_name, warehouse_name, quantity }
      return response.data;
    } catch {
      throw new Error('فشل في جلب المنتجات مع الكمية والمخزن');
    }
  }
};

export default productService;