import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Eye, Calendar, User, DollarSign } from 'lucide-react';
import Modal from '../components/Modal';
import PurchaseOrderForm from '../components/purchaseOrderForm';
import { purchaseOrdersService } from '../services/purchaseOrderService';

const PurchaseOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await purchaseOrdersService.getAll();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrder = () => {
    setEditingOrder(null);
    setIsModalOpen(true);
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الأمر؟')) {
      try {
        await purchaseOrdersService.delete(id);
        loadOrders();
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  const handleSubmitOrder = async (orderData) => {
    try {
      if (editingOrder) {
        await purchaseOrdersService.update(editingOrder.id, orderData);
      } else {
        await purchaseOrdersService.create(orderData);
      }
      setIsModalOpen(false);
      loadOrders();
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'معلق';
      case 'approved': return 'موافق عليه';
      case 'delivered': return 'مسلم';
      case 'cancelled': return 'ملغي';
      default: return 'غير محدد';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="fade-in">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">أوامر الشراء</h1>
            <p className="text-gray-600">إدارة جميع أوامر الشراء والمتابعة</p>
          </div>
          <button
            onClick={handleAddOrder}
            className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
          >
            <Plus size={20} className="ml-2" />
            <span>إنشاء أمر شراء جديد</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="البحث برقم الأمر أو اسم المورد..."
              className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="text-gray-400" size={20} />
            <select
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">جميع الحالات</option>
              <option value="pending">معلق</option>
              <option value="approved">موافق عليه</option>
              <option value="delivered">مسلم</option>
              <option value="cancelled">ملغي</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">رقم الأمر</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">المورد</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">التاريخ</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">المبلغ</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الحالة</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="table-row-hover">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.supplierName}</div>
                          <div className="text-sm text-gray-500">{order.supplierEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{order.orderDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{order.totalAmount}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditOrder(order)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="عرض"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
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
      {!loading && filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Edit className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد أوامر شراء</h3>
          <p className="text-gray-600 mb-4">ابدأ بإنشاء أمر شراء جديد</p>
          <button
            onClick={handleAddOrder}
            className="btn-primary text-white px-6 py-3 rounded-lg font-medium"
          >
            إنشاء أمر شراء جديد
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingOrder ? 'تعديل أمر الشراء' : 'إنشاء أمر شراء جديد'}
      >
        <PurchaseOrderForm
          order={editingOrder}
          onSubmit={handleSubmitOrder}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default PurchaseOrders;