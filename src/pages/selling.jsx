import React, { useState, useEffect } from 'react';
import { Plus, Search, Calendar, User, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import saleinvoicesService from '../services/saleinvoicesService';

const Selling = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      const data = await saleinvoicesService.getAll();
      setInvoices(data);
    } catch (error) {
      console.error('Error loading sale invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddInvoice = () => {
    // Redirect to clients page to select a client first
    navigate('/clients');
  };

  return (
    <div className="fade-in bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Search (disabled, just UI) */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300"
              size={20}
            />
            <input
              type="text"
              placeholder="البحث برقم الفاتورة أو اسم العميل... (غير مفعل)"
              className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 pr-10 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-400"
              disabled
            />
          </div>
          <button
            onClick={handleAddInvoice}
            className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-500 mt-4 md:mt-0"
          >
            <Plus size={20} className="ml-2" />
            <span>إضافة فاتورة بيع</span>
          </button>
        </div>
      </div>

      {/* Sale Invoices Table */}
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
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900 dark:text-white">رقم الفاتورة</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900 dark:text-white">العميل</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900 dark:text-white">التاريخ</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900 dark:text-white">الرصيد السابق</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900 dark:text-white">المبلغ الإجمالي</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900 dark:text-white">المدفوع</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900 dark:text-white">الرصيد الأخير</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {(invoices || []).map((invoice) => (
                  <tr key={invoice.sale_invoice_id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-5 py-4 sm:px-6">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {invoice.sale_invoice_id}
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {invoice.client_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-300" />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {invoice.date?.slice(0, 10)}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {invoice.old_balance}
                      </span>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {invoice.total_amount}
                      </span>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {invoice.paid}
                      </span>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {invoice.last_balance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && invoices?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-gray-800">
            <DollarSign className="h-8 w-8 text-gray-400 dark:text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2 dark:text-white">
            لا توجد فواتير مبيعات
          </h3>
          <p className="text-gray-600 mb-4 dark:text-gray-300">ابدأ بإنشاء فاتورة بيع جديدة</p>
          <button
            onClick={handleAddInvoice}
            className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-500"
          >
            إضافة فاتورة بيع
          </button>
        </div>
      )}
    </div>
  );
};

export default Selling;
