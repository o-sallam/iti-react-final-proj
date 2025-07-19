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
      {/* Search and Filter */}
      <div className="bg-white dark:bg-[#182235] rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              placeholder="البحث باسم المورد أو البريد الإلكتروني أو رقم الهاتف..."
              className="h-11 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 shadow-theme-xs placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Filter className="text-gray-400 dark:text-gray-500" size={20} />
            <select
              className="h-11 rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
            <button
              onClick={handleAddSupplier}
              className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
            >
              <Plus size={20} className="ml-2" />
              <span>إضافة مورد جديد</span>
            </button>
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
            <div key={supplier.id} className="bg-white dark:bg-[#182235] rounded-xl shadow-sm p-6 card-hover">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{supplier.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      supplier.status === 'active' ? 'bg-green-100 dark:bg-green-900 dark:text-green-200 text-green-800' : 'bg-red-100 dark:bg-red-900 dark:text-red-200 text-red-800'
                    }`}>
                      {supplier.status === 'active' ? 'نشط' : 'غير نشط'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => handleEditSupplier(supplier)}
                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteSupplier(supplier.id)}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-400">
                  <Phone size={16} className="text-gray-400 dark:text-gray-500" />
                  <span>{supplier.contactNumber}</span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-400">
                  <Mail size={16} className="text-gray-400 dark:text-gray-500" />
                  <span>{supplier.email}</span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-400">
                  <MapPin size={16} className="text-gray-400 dark:text-gray-500" />
                  <span>{supplier.address}</span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-400">
                  <Wallet size={16} className="text-gray-400 dark:text-gray-500" />
                  <span>{supplier.accountBalance} ج.م</span>
                </div>
              </div>

              
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredSuppliers.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-[#182235] rounded-xl">
          <Building className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">لا توجد موردين</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">ابدأ بإضافة مورد جديد لإدارة المشتريات</p>
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