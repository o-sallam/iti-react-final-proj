import api from '../api';

export const suppliersService = {
  async getAll() {
    const res = await api.get('/suppliers');
    return res.data;
  },

  async getById(id) {
    const res = await api.get(`/suppliers/${id}`);
    return res.data;
  },

  async create(supplierData) {
    const res = await api.post('/suppliers', supplierData);
    return res.data;
  },

  async update(id, supplierData) {
    const res = await api.put(`/suppliers/${id}`, supplierData);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/suppliers/${id}`);
    return res.data;
  }
};
