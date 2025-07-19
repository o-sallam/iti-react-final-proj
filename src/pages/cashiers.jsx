import React, { useEffect, useState } from 'react';
import cashierService from '../services/cashierService';
import { Edit, User, Lock, Archive, Plus, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import NotAuthorized from './NotAuthorized';
import Modal from '../components/Modal';

const Cashiers = () => {
  const { user } = useAuth();
  const notAuthorized = !user || (user.role !== 'admin' && user.role !== 'manager');

  const [cashiers, setCashiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  if (notAuthorized) {
    return <NotAuthorized />;
  }

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
    setModalMessage(`تعديل كلمة المرور للكاشير: ${cashier.username}`);
  };

  const handleOpenModal = () => {
    setForm({ username: '', password: '', drawer: '' });
    setFormError('');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormError('');
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!form.username || !form.password) {
      setFormError('جميع الحقول مطلوبة');
      return;
    }
    setFormLoading(true);
    try {
      await cashierService.create({
        username: form.username,
        password: form.password,
        role: 'cashier',
      });
      setShowModal(false);
      fetchCashiers();
    } catch {
      setFormError('حدث خطأ أثناء إنشاء الكاشير');
    } finally {
      setFormLoading(false);
    }
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
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <User className="h-8 w-8 text-blue-600 ml-3" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">الكاشيرز</h1>
        </div>
        <button
          onClick={handleOpenModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          إضافة كاشير
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 dark:bg-red-950 dark:border-red-900">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Modal for creating cashier */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={handleCloseModal}
              className="absolute left-4 top-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">إضافة كاشير جديد</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-200 mb-1">اسم المستخدم</label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                  placeholder="اسم المستخدم"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-200 mb-1">كلمة المرور</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                  placeholder="كلمة المرور"
                />
              </div>
              {/* No drawer input needed */}
              {formError && <p className="text-sm text-red-600 dark:text-red-400">{formError}</p>}
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {formLoading ? (
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  إنشاء كاشير
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for edit password alert */}
      <Modal isOpen={!!modalMessage} onClose={() => setModalMessage('')} title="تنبيه">
        <div className="text-center">
          <div className="text-lg text-blue-600 mb-2">{modalMessage}</div>
          <button
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={() => setModalMessage('')}
          >
            موافق
          </button>
        </div>
      </Modal>

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
                <span>الدُرج: {cashier.drawer} ج.م</span>
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