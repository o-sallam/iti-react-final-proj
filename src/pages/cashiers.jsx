import React, { useEffect, useState } from 'react';
import cashierService from '../services/cashierService';
import { Edit, User, Lock, Archive } from 'lucide-react';

const Cashiers = () => {
  const [cashiers, setCashiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCashiers();
  }, []);

  const fetchCashiers = async () => {
    try {
      setLoading(true);
      const data = await cashierService.getAll();
      setCashiers(data);
      setError(null);
    } catch {
      setError('فشل في تحميل الكاشيرز');
    } finally {
      setLoading(false);
    }
  };

  const handleEditPassword = (cashier) => {
    // Implement password edit modal or navigation here
    alert(`تعديل كلمة المرور للكاشير: ${cashier.username}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen" dir="rtl">
      <div className="mb-8">
        <div className="flex items-center">
          <User className="h-8 w-8 text-blue-600 ml-3" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">الكاشيرز</h1>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 dark:bg-red-950 dark:border-red-900">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {cashiers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cashiers.map((cashier) => (
            <div
              key={cashier.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <User className="h-6 w-6 text-blue-500 ml-2" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{cashier.username}</h2>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                <Archive className="h-4 w-4 text-gray-400 dark:text-gray-500 ml-2" />
                <span>الدُرج: {cashier.drawer}</span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                <span className="font-medium">الدور:</span> {cashier.role}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                <span className="font-medium">تاريخ الإنشاء:</span> {new Date(cashier.createdAt).toLocaleDateString()}
              </div>
              <div className="flex justify-end space-x-reverse space-x-2 mt-4">
                <button
                  onClick={() => handleEditPassword(cashier)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 p-1 rounded hover:bg-blue-50 dark:hover:bg-white/5 transition-colors flex items-center gap-1"
                  title="تعديل كلمة المرور"
                >
                  <Lock className="h-5 w-5" />
                  <span className="text-sm">تعديل كلمة المرور</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">لا يوجد كاشيرز</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">لم يتم العثور على أي كاشير</p>
        </div>
      )}
    </div>
  );
};

export default Cashiers; 