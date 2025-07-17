import React, { useState, useEffect } from 'react';
import { Plus, Search, User, Calendar, FilePlus2 } from 'lucide-react';
import clientService from '../services/clientService';
import { useNavigate } from 'react-router-dom';

const Client = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setLoading(true);
      const data = await clientService.getAll();
      setClients(data);
    } catch (error) {
      console.error('Error loading clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClient = () => {
    alert('إضافة عميل جديد (غير مفعلة بعد)');
  };

  const handleAddInvoice = (client) => {
    navigate('/add-sale-invoice', { state: { client } });
  };

  return (
    <div className="fade-in bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              إدارة العملاء
            </h1>
            <p className="text-gray-600 dark:text-gray-300">إدارة جميع بيانات العملاء</p>
          </div>
          <button
            onClick={handleAddClient}
            className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-500"
          >
            <Plus size={20} className="ml-2" />
            <span>إضافة عميل</span>
          </button>
        </div>
      </div>

      {/* Search (disabled, just UI) */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300"
              size={20}
            />
            <input
              type="text"
              placeholder="البحث باسم العميل أو البريد الإلكتروني... (غير مفعل)"
              className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 pr-10 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-400"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Clients Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800">
          <div className="max-w-full overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900 dark:text-white">رقم العميل</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900 dark:text-white">الاسم</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900 dark:text-white">البريد الإلكتروني</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900 dark:text-white">رقم الهاتف</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900 dark:text-white">العنوان</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900 dark:text-white">تاريخ الإنشاء</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900 dark:text-white">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {(clients || []).map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-5 py-4 sm:px-6">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {client.id}
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {client.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {client.email}
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {client.phone}
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {client.address}
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-300" />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {client.created_at?.slice(0, 10)}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6 text-center">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors dark:text-blue-400 dark:hover:bg-blue-900"
                        title="إضافة فاتورة بيع"
                        onClick={() => handleAddInvoice(client)}
                      >
                        <FilePlus2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && clients?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-gray-800">
            <User className="h-8 w-8 text-gray-400 dark:text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2 dark:text-white">
            لا يوجد عملاء
          </h3>
          <p className="text-gray-600 mb-4 dark:text-gray-300">ابدأ بإضافة عميل جديد</p>
          <button
            onClick={handleAddClient}
            className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-500"
          >
            إضافة عميل
          </button>
        </div>
      )}
    </div>
  );
};

export default Client; 