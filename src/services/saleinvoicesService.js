import axios from 'axios';

const API_URL = 'http://localhost:3000/saleinvoices';

const saleinvoicesService = {
  getAll: async () => {
    const res = await axios.get(API_URL);
    return res.data; // array of sale invoices
  },

  getById: async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  },
};

export default saleinvoicesService; 