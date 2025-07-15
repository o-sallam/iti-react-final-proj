import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Phone,Wallet , Mail, MapPin, Building } from 'lucide-react';
import Modal from '../components/Modal';
import SupplierForm from '../components/supplierForm';
import { suppliersService } from '../services/supplierService';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      const data = await suppliersService.getAll();
      setSuppliers(data);
    } catch (error) {
      console.error('Error loading suppliers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSupplier = () => {
    setEditingSupplier(null);
    setIsModalOpen(true);
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleDeleteSupplier = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المورد؟')) {
      try {
        await suppliersService.delete(id);
        loadSuppliers();
      } catch (error) {
        console.error('Error deleting supplier:', error);
      }
    }
  };

  const handleSubmitSupplier = async (supplierData) => {
    try {
      if (editingSupplier) {
        await suppliersService.update(editingSupplier.id, supplierData);
      } else {
        await suppliersService.create(supplierData);
      }
      setIsModalOpen(false);
      loadSuppliers();
    } catch (error) {
      console.error('Error saving supplier:', error);
    }
  };

  const filteredSuppliers = suppliers.filter(supplier => {
  const search = searchTerm.toLowerCase();

  const matchesSearch =
    (supplier.name && supplier.name.toLowerCase().includes(search)) ||
    (supplier.email && supplier.email.toLowerCase().includes(search)) ||
    (supplier.contactNumber && supplier.contactNumber.includes(search)); // ← بدل phone

  const matchesFilter = filterStatus === 'all' || supplier.status === filterStatus;

  return matchesSearch && matchesFilter;
});


  return (
    <div className="fade-in">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة الموردين</h1>
            <p className="text-gray-600">إدارة جميع الموردين وبياناتهم</p>
          </div>
          <button
            onClick={handleAddSupplier}
            className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
          >
            <Plus size={20} className="ml-2" />
            <span>إضافة مورد جديد</span>
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
              placeholder="البحث بالاسم أو البريد الإلكتروني أو رقم الهاتف..."
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
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
          </div>
        </div>
      </div>

      {/* Suppliers Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <div key={supplier.id} className="bg-white rounded-xl shadow-sm p-6 card-hover">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      supplier.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {supplier.status === 'active' ? 'نشط' : 'غير نشط'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditSupplier(supplier)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteSupplier(supplier.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Phone size={16} className="text-gray-400" />
                  <span>{supplier.contactNumber}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Mail size={16} className="text-gray-400" />
                  <span>{supplier.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <MapPin size={16} className="text-gray-400" />
                  <span>{supplier.address}</span>
                </div>

                <div className="flex items-center space-x-3 text-sm text-gray-600">
  <Wallet size={16} className="text-gray-400" />
  <span>{supplier.accountBalance} EGP</span>
</div>

              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">إجمالي الأوامر:</span>
                  <span className="font-medium text-gray-900">{supplier.totalOrders || 0}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-gray-500">آخر طلب:</span>
                  <span className="font-medium text-gray-900">{supplier.lastOrderDate || 'لا يوجد'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredSuppliers.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد موردين</h3>
          <p className="text-gray-600 mb-4">ابدأ بإضافة مورد جديد لإدارة المشتريات</p>
          <button
            onClick={handleAddSupplier}
            className="btn-primary text-white px-6 py-3 rounded-lg font-medium"
          >
            إضافة مورد جديد
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSupplier ? 'تعديل المورد' : 'إضافة مورد جديد'}
      >
        <SupplierForm
          supplier={editingSupplier}
          onSubmit={handleSubmitSupplier}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Suppliers;