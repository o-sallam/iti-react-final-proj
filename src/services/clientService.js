import api from '../api';

const API_URL = '/client';

const clientService = {
  getAll: async () => {
    const res = await api.get(API_URL);
    return res.data; // array of clients
  },

  getById: async (id) => {
    const res = await api.get(`${API_URL}/${id}`);
    return res.data;
  },
};

export default clientService; 