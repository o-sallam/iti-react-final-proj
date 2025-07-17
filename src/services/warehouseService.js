import api from '../api';

const warehouseService = {
  getAllWarehouses: async () => {
    try {
      const response = await api.get('/warehouses');
      return response.data;
    } catch {
      throw new Error('Failed to fetch warehouses');
    }
  },

  getWarehouseById: async (id) => {
    try {
      const response = await api.get(`/warehouses/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to fetch warehouse');
    }
  },

  createWarehouse: async (warehouseData) => {
    try {
      const response = await api.post('/warehouses', warehouseData);
      return response.data;
    } catch {
      throw new Error('Failed to create warehouse');
    }
  },

  updateWarehouse: async (id, warehouseData) => {
    try {
      const response = await api.patch(`/warehouses/${id}`, warehouseData);
      return response.data;
    } catch {
      throw new Error('Failed to update warehouse');
    }
  },

  deleteWarehouse: async (id) => {
    try {
      await api.delete(`/warehouses/${id}`);
      return true;
    } catch {
      throw new Error('Failed to delete warehouse');
    }
  }
};

export default warehouseService;