import api from '../api';

const API_URL = '/saleinvoices';

const saleinvoicesService = {
  getAll: async () => {
    const res = await api.get(`${API_URL}/with-details`);
    return res.data; // array of sale invoices with details
  },

  getById: async (id) => {
    const res = await api.get(`${API_URL}/${id}`);
    return res.data;
  },

  create: async (invoiceData) => {
    const token = localStorage.getItem('token');
    const res = await api.post(`${API_URL}`, invoiceData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};

export default saleinvoicesService; 