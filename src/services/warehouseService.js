import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const warehouseService = {
  getAllWarehouses: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/warehouses`);
      return response.data;
    } catch {
      throw new Error('Failed to fetch warehouses');
    }
  },

  getWarehouseById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/warehouses/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to fetch warehouse');
    }
  },

  createWarehouse: async (warehouseData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/warehouses`, warehouseData);
      return response.data;
    } catch {
      throw new Error('Failed to create warehouse');
    }
  },

  updateWarehouse: async (id, warehouseData) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/warehouses/${id}`, warehouseData);
      return response.data;
    } catch {
      throw new Error('Failed to update warehouse');
    }
  },

  deleteWarehouse: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/warehouses/${id}`);
      return true;
    } catch {
      throw new Error('Failed to delete warehouse');
    }
  }
};

export default warehouseService;