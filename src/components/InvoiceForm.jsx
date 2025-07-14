import React, { useState, useEffect } from 'react';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { suppliersService } from '../services/supplierService';

const InvoiceForm = ({ invoice, onSubmit, onCancel }) => {
const [formData, setFormData] = useState({
  invoiceNumber: '',
  supplierId: '',
  invoiceDate: new Date().toISOString().split('T')[0],
  status: 'pending',
  paymentMethod: 'cash',
  notes: '',
  items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }],
  paidAmount: 0,
  remainingAmount: 0,
});
useEffect(() => {
  if (invoice) {
      console.log('invoice received in InvoiceForm:', invoice);

    const items = invoice.items?.map(item => ({
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total: item.quantity * item.unitPrice,
    })) || [{ description: '', quantity: 1, unitPrice: 0, total: 0 }];

    const total = items.reduce((sum, item) => sum + item.total, 0);
    const paid = invoice.paidAmount || 0;

    setFormData({
      invoiceNumber: invoice.invoiceNumber || '',
      supplierId: invoice.supplier?.id?.toString() || '',

     invoiceDate: invoice.orderDate?.slice(0, 10) ||  new Date().toISOString().split('T')[0],
      status: invoice.status || 'pending',
      paymentMethod: invoice.paymentMethod || 'cash',
      notes: invoice.notes || '',
      items,
      paidAmount: paid,
      remainingAmount: total - paid,
    });
  }
}, [invoice]);





  const [suppliers, setSuppliers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadSuppliers();
    if (!invoice) {
      generateInvoiceNumber();
    }
  }, [invoice]);

  const loadSuppliers = async () => {
    try {
      const data = await suppliersService.getAll();
      setSuppliers(data.filter(s => s.status === 'active'));
    } catch (error) {
      console.error('Error loading suppliers:', error);
    }
  };

  const generateInvoiceNumber = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const invoiceNumber = `INV-${year}${month}${day}-${random}`;
    
    setFormData(prev => ({
      ...prev,
      invoiceNumber
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
      items: [...prev.items, { description: '', quantity: 1, unitPrice: 0, total: 0 }]
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



  useEffect(() => {
  const total = calculateTotal();
  setFormData(prev => ({
    ...prev,
    remainingAmount: total - prev.paidAmount
  }));
}, [formData.paidAmount, formData.items]);


  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.invoiceNumber.trim()) {
      newErrors.invoiceNumber = 'رقم الفاتورة مطلوب';
    }
    
    if (!formData.supplierId) {
      newErrors.supplierId = 'المورد مطلوب';
    }
    
    if (!formData.invoiceDate) {
      newErrors.invoiceDate = 'تاريخ الفاتورة مطلوب';
    }
    
  
    
    if (formData.items.length === 0) {
      newErrors.items = 'يجب إضافة عنصر واحد على الأقل';
    }
    
    formData.items.forEach((item, index) => {
      if (!item.description.trim()) {
        newErrors[`item_${index}_description`] = 'وصف المنتج مطلوب';
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
totalAmount: parseFloat(calculateTotal().toFixed(2))
      };
      onSubmit(submitData);
    }
  };

return (
  <form
    onSubmit={handleSubmit}
    className="max-w-sm mx-auto mt-6 p-2 bg-white rounded-md shadow space-y-3 overflow-y-auto max-h-[85vh] text-xs"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div>
        <label className="block font-medium text-gray-700 mb-1">رقم الفاتورة *</label>
        <input
          type="text"
          name="invoiceNumber"
          value={formData.invoiceNumber}
          onChange={handleChange}
          className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            errors.invoiceNumber ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="رقم الفاتورة"
        />
        {errors.invoiceNumber && (
          <p className="text-red-500 text-xs mt-1">{errors.invoiceNumber}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">المورد *</label>
        <select
          name="supplierId"
          value={formData.supplierId}
          onChange={handleChange}
          className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            errors.supplierId ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">اختر المورد</option>
          {suppliers.map((supplier) => (
           <option key={supplier.id} value={supplier.id.toString()}>
  {supplier.name}
</option>
          ))}
        </select>
        {errors.supplierId && (
          <p className="text-red-500 text-xs mt-1">{errors.supplierId}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">تاريخ الفاتورة *</label>
        <input
          type="date"
          name="invoiceDate"
          value={formData.invoiceDate}
          onChange={handleChange}
          className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            errors.invoiceDate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.invoiceDate && (
          <p className="text-red-500 text-xs mt-1">{errors.invoiceDate}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">الحالة</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="pending">معلق</option>
          <option value="paid">مدفوع</option>
          <option value="overdue">متأخر</option>
          <option value="cancelled">ملغي</option>
        </select>
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">طريقة الدفع</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="cash">نقدي</option>
          <option value="card">بطاقة</option>
          <option value="transfer">تحويل بنكي</option>
          <option value="check">شيك</option>
        </select>
      </div>
    </div>

    {/* البنود */}
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-900">بنود الفاتورة</h3>
        <button
          type="button"
          onClick={addItem}
          className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 text-xs"
        >
          + إضافة بند
        </button>
      </div>

      <div className="space-y-3">
        {formData.items.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-2 p-2 border rounded-md">
            <div className="md:col-span-2">
              <label className="block mb-1">الوصف *</label>
              <input
                type="text"
                value={item.description}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  errors[`item_${index}_description`] ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>

            <div>
              <label className="block mb-1">الكمية *</label>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  errors[`item_${index}_quantity`] ? 'border-red-500' : 'border-gray-300'
                }`}
                min="1"
              />
            </div>

            <div>
              <label className="block mb-1">سعر الوحدة *</label>
              <input
                type="number"
                value={item.unitPrice}
                onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  errors[`item_${index}_unitPrice`] ? 'border-red-500' : 'border-gray-300'
                }`}
                min="0"
                step="0.01"
              />
            </div>

            <div className="flex items-end gap-1">
              <input
                type="text"
                value={`₪${(item.total || 0).toFixed(2)}`}
                readOnly
                className="w-full px-2 py-1 border bg-gray-100 rounded-md text-gray-600"
              />
              {formData.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  🗑️
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* المدفوع والمتبقي */}
    <div className="grid grid-cols-1 gap-2">
      <div>
        <label className="block mb-1">المبلغ المدفوع</label>
        <input
          type="number"
          value={formData.paidAmount}
          onChange={(e) =>
            setFormData({ ...formData, paidAmount: parseFloat(e.target.value) || 0 })
          }
          className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1">المبلغ المتبقي</label>
        <input
          type="number"
          value={formData.remainingAmount}
          readOnly
          className="w-full px-2 py-1 border bg-gray-100 rounded-md text-gray-600"
        />
      </div>
    </div>

    {/* المجموع */}
    <div className="p-2 bg-gray-50 rounded-md text-xs font-semibold flex justify-between">
      <span>المجموع الكلي:</span>
      <span>₪{calculateTotal().toFixed(2)}</span>
    </div>

    {/* الملاحظات */}
    <div>
      <label className="block font-medium text-gray-700 mb-1">ملاحظات</label>
      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        rows={2}
        className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="ملاحظات إضافية"
      />
    </div>

    {/* الأزرار */}
    <div className="flex justify-end gap-2">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
      >
        إلغاء
      </button>
      <button
        type="submit"
        className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        حفظ
      </button>
    </div>
  </form>
);
};

export default InvoiceForm;