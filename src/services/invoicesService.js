// src/services/invoicesService.js

import api from '../api';
const API_URL = '/purchase-orders';

/*const invoicesService = {
  getAll: async () => {
    const res = await axios.get(API_URL);
    return res.data;
  },*/

  const invoicesService = {
  getAll: async ({ search = '', status = 'all', page = 1, limit = 10 }) => {
    const res = await api.get(API_URL, {
      params: {
        search,
        status,
        page,
        limit,
      },
    });
    return res.data; // { data, totalPages, ... }
  },


  getById: async (id) => {
    const res = await api.get(`${API_URL}/${id}`);
    return res.data;
  },

  create: async (invoiceData) => {
    const res = await api.post(API_URL, invoiceData);
    return res.data;
  },

  update: async (id, invoiceData) => {
    const res = await api.patch(`${API_URL}/${id}`, invoiceData);
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`${API_URL}/${id}`);
    return res.data;
  },
};

export default invoicesService;
