import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const inventoryService = {
  getAllInventory: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/inventory`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch inventory');
    }
  },

  getInventoryById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/inventory/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch inventory item');
    }
  },

  createInventory: async (inventoryData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/inventory`, inventoryData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create inventory item');
    }
  },

  updateInventory: async (id, inventoryData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/inventory/${id}`, inventoryData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update inventory');
    }
  },

  deleteInventory: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/inventory/${id}`);
      return true;
    } catch (error) {
      throw new Error('Failed to delete inventory item');
    }
  },

  getInventoryByWarehouse: async (warehouseId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/inventory/warehouse/${warehouseId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch warehouse inventory');
    }
  },

  updateQuantity: async (id, quantity) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/inventory/${id}/quantity`, { quantity });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update inventory quantity');
    }
  }
};

export default inventoryService;