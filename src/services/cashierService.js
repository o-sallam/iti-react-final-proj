import api from '../api';

const cashierService = {
  getAll: async () => {
    const res = await api.get('/auth/cashiers');
    return res.data;
  },
};

export default cashierService; 