import api from '../api';

const inventoryService = {
  getAllInventory: async () => {
    try {
      const response = await api.get('/inventory');
      return response.data;
    } catch {
      throw new Error('Failed to fetch inventory');
    }
  },

  getInventoryById: async (id) => {
    try {
      const response = await api.get(`/inventory/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to fetch inventory item');
    }
  },

  createInventory: async (inventoryData) => {
    try {
      const response = await api.post('/inventory', inventoryData);
      return response.data;
    } catch {
      throw new Error('Failed to create inventory item');
    }
  },

  updateInventory: async (id, inventoryData) => {
    try {
      const response = await api.put(`/inventory/${id}`, inventoryData);
      return response.data;
    } catch {
      throw new Error('Failed to update inventory');
    }
  },

  deleteInventory: async (id) => {
    try {
      await api.delete(`/inventory/${id}`);
      return true;
    } catch {
      throw new Error('Failed to delete inventory item');
    }
  },

  getInventoryByWarehouse: async (warehouseId) => {
    try {
      const response = await api.get(`/inventory/warehouse/${warehouseId}`);
      return response.data;
    } catch {
      throw new Error('Failed to fetch warehouse inventory');
    }
  },

  updateQuantity: async (id, quantity) => {
    try {
      const response = await api.patch(`/inventory/${id}/quantity`, { quantity });
      return response.data;
    } catch {
      throw new Error('Failed to update inventory quantity');
    }
  }
};

export default inventoryService;