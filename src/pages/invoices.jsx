import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Eye, Calendar, User, DollarSign, Download ,Printer} from 'lucide-react';
import Modal from '../components/Modal';
import InvoiceForm from '../components/InvoiceForm';
import invoicesService from '../services/invoicesService';
import api from '../api';
import { Link } from 'react-router-dom';

import InvoiceViewModal from '../components/InvoiceViewModal';
const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [page, setPage] = useState(1);
const [limit] = useState(10);
const [totalPages, setTotalPages] = useState(1);

const [selectedInvoice, setSelectedInvoice] = useState(null);

const [showModal, setShowModal] = useState(false);

  useEffect(() => {
  loadInvoices();
}, [searchTerm, filterStatus, page]);

useEffect(() => {
  setPage(1);  
}, [searchTerm, filterStatus]);




const [stats, setStats] = useState({ total: 0, paid: 0, pending: 0, overdue: 0 });

useEffect(() => {
  api.get('/purchase-orders/stats')
    .then(res => setStats(res.data))
    .catch(console.error);
}, []);


  const loadInvoices = async () => {
  try {
    setLoading(true);
    const data = await invoicesService.getAll({
      search: searchTerm,
      status: filterStatus,
      page,
      limit,
    });
    console.log('🔍 Response from API:', data);      

    setInvoices(data.data);      
    setTotalPages(data.totalPages); 
  } catch (error) {
    console.error('Error loading invoices:', error);
  } finally {
    setLoading(false);
  }
};


  const handleAddInvoice = () => {
    setEditingInvoice(null);
    setIsModalOpen(true);
  };

  const handleEditInvoice = (invoice) => {
    setEditingInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleDeleteInvoice = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الفاتورة؟')) {
      try {
        await invoicesService.delete(id);
        loadInvoices();
      } catch (error) {
        console.error('Error deleting invoice:', error);
      }
    }
  };

  const handleSubmitInvoice = async (invoiceData) => {
    try {
      if (editingInvoice) {
        await invoicesService.update(editingInvoice.id, invoiceData);
      } else {
        await invoicesService.create(invoiceData);
      }
      setIsModalOpen(false);
      loadInvoices();
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'paid': return 'مدفوع';
      case 'pending': return 'معلق';
      case 'overdue': return 'متأخر';
      case 'cancelled': return 'ملغي';
      default: return 'غير محدد';
    }
  };



  return (
    <div className="fade-in bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              إدارة الفواتير
            </h1>
            <p className="text-gray-600 dark:text-gray-300">إدارة جميع الفواتير والمدفوعات</p>
          </div>
         <Link
  to="/invoices/new"
  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-500"
>
  <Plus size={20} className="ml-2" />
  <span>إنشاء فاتورة جديدة</span>
</Link>

        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                إجمالي الفواتير
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="bg-blue-100 rounded-lg p-3 dark:bg-blue-900">
              <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                الفواتير المدفوعة
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.paid}</p>
            </div>
            <div className="bg-green-100 rounded-lg p-3 dark:bg-green-900">
              <DollarSign className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                الفواتير المعلقة
              </p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
            </div>
            <div className="bg-yellow-100 rounded-lg p-3 dark:bg-yellow-900">
              <DollarSign className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                الفواتير المتأخرة
              </p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.overdue}</p>
            </div>
            <div className="bg-red-100 rounded-lg p-3 dark:bg-red-900">
              <DollarSign className="h-6 w-6 text-red-600 dark:text-red-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300"
              size={20}
            />
            <input
              type="text"
              placeholder="البحث برقم الفاتورة أو اسم المورد..."
              className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 pr-10 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Filter className="text-gray-400 dark:text-gray-300" size={20} />
            <select
              className="h-11 rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">جميع الحالات</option>
              <option value="paid">مدفوع</option>
              <option value="pending">معلق</option>
              <option value="overdue">متأخر</option>
              <option value="cancelled">ملغي</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
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
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900 dark:text-white">المورد</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900 dark:text-white">التاريخ</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900 dark:text-white">المبلغ</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900 dark:text-white">الحالة</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900 dark:text-white">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {(invoices || []).map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-5 py-4 sm:px-6">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {invoice.invoiceNumber}
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {invoice.supplier?.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {invoice.supplier?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-300" />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {invoice.orderDate?.slice(0, 10)}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-400 dark:text-gray-300" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {invoice.totalAmount}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)} dark:bg-opacity-80`}>
                        {getStatusText(invoice.status)}
                      </span>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-2">
<Link
  to={`/invoices/edit/${invoice.id}`}
    state={{ invoice }}

  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors dark:text-blue-400 dark:hover:bg-blue-900"
  title="تعديل"
>
  <Edit size={16} />
</Link>                       
           <button
         className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
         title="عرض"
         onClick={() =>{
     setSelectedInvoice(invoice); setShowModal(true)}}
       >
         <Eye size={16} />
       </button>
 
       {/* مودال العرض */}
       {showModal && (
         <InvoiceViewModal invoice={selectedInvoice} onClose={() => setShowModal(false)}   getStatusText={getStatusText}
  />
       )}
                        <button
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors dark:text-purple-400 dark:hover:bg-purple-900"
                          title="تحميل"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteInvoice(invoice.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors dark:text-red-400 dark:hover:bg-red-900"
                          title="حذف"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
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
            لا توجد فواتير
          </h3>
          <p className="text-gray-600 mb-4 dark:text-gray-300">ابدأ بإنشاء فاتورة جديدة</p>
  <Link
  to="/invoices/new"
  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-500"
>
  <Plus size={20} className="ml-2" />
  <span>إنشاء فاتورة جديدة</span>
</Link>        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2 rtl:space-x-reverse">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 dark:bg-gray-700 dark:text-white"
          >
            السابق
          </button>

          <span className="text-gray-700 text-sm dark:text-gray-200">
            صفحة {page} من {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 dark:bg-gray-700 dark:text-white"
          >
            التالي
          </button>
        </div>
      )}

    </div>

    
  );
};

export default Invoices;