import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Eye, Calendar, User, DollarSign, Download ,Printer} from 'lucide-react';
import Modal from '../components/Modal';
import InvoiceForm from '../components/InvoiceForm';
import invoicesService from '../services/invoicesService';
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

 /* useEffect(() => {
    loadInvoices();
  }, []);*/
  useEffect(() => {
  loadInvoices();
}, [searchTerm, filterStatus, page]);

useEffect(() => {
  setPage(1);  
}, [searchTerm, filterStatus]);




const [stats, setStats] = useState({ total: 0, paid: 0, pending: 0, overdue: 0 });

useEffect(() => {
  fetch('http://localhost:3000/purchase-orders/stats')
    .then(res => res.json())
    .then(setStats)
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
    <div className="fade-in">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة الفواتير</h1>
            <p className="text-gray-600">إدارة جميع الفواتير والمدفوعات</p>
          </div>
          <button
            onClick={handleAddInvoice}
            className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
          >
            <Plus size={20} className="ml-2" />
            <span>إنشاء فاتورة جديدة</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي الفواتير</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-blue-100 rounded-lg p-3">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الفواتير المدفوعة</p>
              <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
            </div>
            <div className="bg-green-100 rounded-lg p-3">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الفواتير المعلقة</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="bg-yellow-100 rounded-lg p-3">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الفواتير المتأخرة</p>
              <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
            </div>
            <div className="bg-red-100 rounded-lg p-3">
              <DollarSign className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="البحث برقم الفاتورة أو اسم المورد..."
              className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="text-gray-400" size={20} />
            <select
              className="h-11 rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10"
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
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="max-w-full overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900">رقم الفاتورة</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900">المورد</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900">التاريخ</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900">المبلغ</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900">الحالة</th>
                  <th className="px-5 py-3 sm:px-6 text-right text-sm font-medium text-gray-900">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(invoices || []).map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 sm:px-6">
                      <div className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{invoice.supplier?.name}</div>
                          <div className="text-sm text-gray-500">{invoice.supplier?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{invoice.orderDate?.slice(0, 10)}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{invoice.totalAmount}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {getStatusText(invoice.status)}
                      </span>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditInvoice(invoice)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="عرض"
                          onClick={() => {}}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="تحميل"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteInvoice(invoice.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد فواتير</h3>
          <p className="text-gray-600 mb-4">ابدأ بإنشاء فاتورة جديدة</p>
          <button
            onClick={handleAddInvoice}
            className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
          >
            إنشاء فاتورة جديدة
          </button>
        </div>
      )}

{/* Pagination */}
{!loading && totalPages > 1 && (
  <div className="flex justify-center items-center mt-6 space-x-2 rtl:space-x-reverse">
    <button
      onClick={() => setPage((p) => Math.max(p - 1, 1))}
      disabled={page === 1}
      className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
    >
      السابق
    </button>

    <span className="text-gray-700 text-sm">
      صفحة {page} من {totalPages}
    </span>

    <button
      onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
      disabled={page === totalPages}
      className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
    >
      التالي
    </button>
  </div>
)}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingInvoice ? 'تعديل الفاتورة' : 'إنشاء فاتورة جديدة'}
      >
        <InvoiceForm
          invoice={editingInvoice}
          onSubmit={handleSubmitInvoice}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
      
    </div>

    
  );
};

export default Invoices;