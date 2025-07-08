import React, { useState, useEffect } from 'react';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { suppliersService } from '../services/supplierService';

const PurchaseOrderForm = ({ order, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    orderNumber: order?.orderNumber || '',
    supplierId: order?.supplierId || '',
    orderDate: order?.orderDate || new Date().toISOString().split('T')[0],
    deliveryDate: order?.deliveryDate || '',
    status: order?.status || 'pending',
    notes: order?.notes || '',
    items: order?.items || [{ product: '', quantity: 1, unitPrice: 0, total: 0 }]
  });

  const [suppliers, setSuppliers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadSuppliers();
    if (!order) {
      generateOrderNumber();
    }
  }, [order]);

  const loadSuppliers = async () => {
    try {
      const data = await suppliersService.getAll();
      setSuppliers(data.filter(s => s.status === 'active'));
    } catch (error) {
      console.error('Error loading suppliers:', error);
    }
  };

  const generateOrderNumber = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const orderNumber = `PO-${year}${month}${day}-${random}`;
    
    setFormData(prev => ({
      ...prev,
      orderNumber
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    
    // Calculate total for this item
    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
    }
    
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { product: '', quantity: 1, unitPrice: 0, total: 0 }]
    }));
  };

  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + (item.total || 0), 0);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.orderNumber.trim()) {
      newErrors.orderNumber = 'رقم الأمر مطلوب';
    }
    
    if (!formData.supplierId) {
      newErrors.supplierId = 'المورد مطلوب';
    }
    
    if (!formData.orderDate) {
      newErrors.orderDate = 'تاريخ الأمر مطلوب';
    }
    
    if (formData.items.length === 0) {
      newErrors.items = 'يجب إضافة عنصر واحد على الأقل';
    }
    
    formData.items.forEach((item, index) => {
      if (!item.product.trim()) {
        newErrors[`item_${index}_product`] = 'اسم المنتج مطلوب';
      }
      if (!item.quantity || item.quantity <= 0) {
        newErrors[`item_${index}_quantity`] = 'الكمية مطلوبة';
      }
      if (!item.unitPrice || item.unitPrice <= 0) {
        newErrors[`item_${index}_unitPrice`] = 'سعر الوحدة مطلوب';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const selectedSupplier = suppliers.find(s => s.id === formData.supplierId);
      const submitData = {
        ...formData,
        supplierName: selectedSupplier?.name || '',
        supplierEmail: selectedSupplier?.email || '',
        totalAmount: `₪${calculateTotal().toFixed(2)}`
      };
      onSubmit(submitData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            رقم الأمر *
          </label>
          <input
            type="text"
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.orderNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="رقم الأمر"
          />
          {errors.orderNumber && <p className="text-red-500 text-sm mt-1">{errors.orderNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            المورد *
          </label>
          <select
            name="supplierId"
            value={formData.supplierId}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.supplierId ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">اختر المورد</option>
            {suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
          {errors.supplierId && <p className="text-red-500 text-sm mt-1">{errors.supplierId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تاريخ الأمر *
          </label>
          <input
            type="date"
            name="orderDate"
            value={formData.orderDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.orderDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.orderDate && <p className="text-red-500 text-sm mt-1">{errors.orderDate}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تاريخ التسليم المتوقع
          </label>
          <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الحالة
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">معلق</option>
            <option value="approved">موافق عليه</option>
            <option value="delivered">مسلم</option>
            <option value="cancelled">ملغي</option>
          </select>
        </div>
      </div>

      {/* Items Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">بنود الأمر</h3>
          <button
            type="button"
            onClick={addItem}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Plus size={16} className="ml-2" />
            <span>إضافة بند</span>
          </button>
        </div>

        <div className="space-y-4">
          {formData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المنتج *
                </label>
                <input
                  type="text"
                  value={item.product}
                  onChange={(e) => handleItemChange(index, 'product', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors[`item_${index}_product`] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="اسم المنتج"
                />
                {errors[`item_${index}_product`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`item_${index}_product`]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الكمية *
                </label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors[`item_${index}_quantity`] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min="1"
                />
                {errors[`item_${index}_quantity`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`item_${index}_quantity`]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  سعر الوحدة *
                </label>
                <input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors[`item_${index}_unitPrice`] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min="0"
                  step="0.01"
                />
                {errors[`item_${index}_unitPrice`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`item_${index}_unitPrice`]}</p>
                )}
              </div>

              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    المجموع
                  </label>
                  <input
                    type="text"
                    value={`₪${(item.total || 0).toFixed(2)}`}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                {formData.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {errors.items && <p className="text-red-500 text-sm mt-2">{errors.items}</p>}

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>المجموع الكلي:</span>
            <span>₪{calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ملاحظات
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="أدخل أي ملاحظات إضافية"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
        >
          <X size={16} className="ml-2" />
          <span>إلغاء</span>
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Save size={16} className="ml-2" />
          <span>حفظ</span>
        </button>
      </div>
    </form>
  );
};

export default PurchaseOrderForm;