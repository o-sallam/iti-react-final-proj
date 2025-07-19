import api from '../api';

const cashierService = {
  getAll: async () => {
    const res = await api.get('/auth/cashiers');
    return res.data;
  },
  create: async (cashierData) => {
    const res = await api.post('/auth/register', cashierData);
    return res.data;
  },
  getDrawer: async () => {
    const token = localStorage.getItem('token');
    const res = await api.get('/auth/drawer', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};

export default cashierService; 