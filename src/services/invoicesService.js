// src/services/invoicesService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/purchase-orders'; 

const invoicesService = {
  getAll: async () => {
    const res = await axios.get(API_URL);
    return res.data;
  },

  getById: async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  },

  create: async (invoiceData) => {
    const res = await axios.post(API_URL, invoiceData);
    return res.data;
  },

  update: async (id, invoiceData) => {
    const res = await axios.patch(`${API_URL}/${id}`, invoiceData);
    return res.data;
  },

  delete: async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  },
};

export default invoicesService;
