import React, { useState, useEffect } from 'react';
import { useNavigate ,useParams , } from 'react-router-dom';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { suppliersService } from '../services/supplierService';
import invoicesService from '../services/invoicesService';
import inventoryService from '../services/inventoryService';
import warehouseService from '../services/warehouseService';

const InvoiceFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
    warehouseId:'',
  });

  const [suppliers, setSuppliers] = useState([]);
  const [errors, setErrors] = useState({});
  const [warehouses, setWarehouses] = useState([]);
  const [error, setError] = useState(null);
  const isEdit = Boolean(id);

 /* useEffect(() => {
    loadSuppliers();
    generateInvoiceNumber();
  }, []);*/

 
 useEffect(() => {
  const init = async () => {
    await loadSuppliers();
    if (id) {
      await loadInvoice(id);
    } else {
      generateInvoiceNumber();
    }
  };
  init();
}, [id]);

const loadInvoice = async (invoiceId) => {
  try {
    const data = await invoicesService.getById(invoiceId);
    setFormData({
      invoiceNumber: data.invoiceNumber,
      supplierId: data.supplierId,
      invoiceDate: data.invoiceDate?.split('T')[0],
      status: data.status,
      paymentMethod: data.paymentMethod,
      notes: data.notes || '',
      items: data.items,
      paidAmount: data.paidAmount,
      remainingAmount: data.remainingAmount,
    });
  } catch (error) {
    console.error('خطأ في تحميل الفاتورة:', error);
  }
};


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
    return formData.items?.reduce((sum, item) => sum + (item.total || 0), 0);
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

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const selectedSupplier = suppliers.find?.(s => s.id === formData.supplierId);

  const submitData = {
    ...formData,
    supplierName: selectedSupplier?.name || '',
    supplierEmail: selectedSupplier?.email || '',
    totalAmount: parseFloat(calculateTotal().toFixed(2))
  };

  try {
    if (id) {
      await invoicesService.update(id, submitData);
      console.log('Updated Invoice:', submitData);
    } else {
      await invoicesService.create(submitData);
      console.log('Created Invoice:', submitData);
    }

    navigate('/invoices');
  } catch (error) {
    console.error('Error submitting invoice:', error);
  }
};


  const [productSuggestions, setProductSuggestions] = useState([]);
const [searchTimeout, setSearchTimeout] = useState(null);

const fetchProductSuggestions = async (query) => {
  try {
    const response = await fetch(`/products?search=${query}`);
    const data = await response.json();
    setProductSuggestions(data);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const handleProductSearch = (index, query) => {
  handleItemChange(index, 'description', query);

  // Debounce search
  if (searchTimeout) clearTimeout(searchTimeout);
  setSearchTimeout(
    setTimeout(() => {
      if (query.length >= 2) {
        fetchProductSuggestions(query);
      }
    }, 300)
  );
};

const handleSelectProduct = (index, product) => {
  const updatedItems = [...formData.items];
  updatedItems[index] = {
    ...updatedItems[index],
    description: product.name,
    unitPrice: product.price,
    productId: product.id,
  };
  setFormData({ ...formData, items: updatedItems });
  setProductSuggestions([]);
};

useEffect(() => {
    fetchWarehouses();
   /* if (isEdit) {
      fetchProduct();
    }*/
  }, [id, isEdit]);

const fetchWarehouses = async () => {
    try {
      const data = await warehouseService.getAllWarehouses();
      setWarehouses(data);
    } catch (err) {
      setError('فشل في تحميل المخازن');
    }
  };
  return (
    <div className="p-4 max-w-3xl mx-auto  bg-white shadow rounded-md">
<h2 className="text-lg font-semibold mb-4">
  {id ? 'تعديل الفاتورة' : 'إنشاء فاتورة شراء'}
</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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
          placeholder="أدخل رقم الفاتورة"
        />
        {errors.invoiceNumber && (
          <p className="text-red-500  text-xl mt-1">{errors.invoiceNumber}</p>
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
          <p className="text-red-500 text-s mt-1">{errors.supplierId}</p>
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
          placeholder="أدخل تاريخ الفاتورة"
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
<div>
  <label className="block font-medium text-gray-700 mb-1">المخزن *</label>
  <select
    id="warehouseId"
    name="warehouseId"
    value={formData.warehouseId}
    onChange={handleChange}
    className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
      errors.warehouseId ? 'border-red-300' : 'border-gray-300'
    }`}
    disabled={isEdit}
  >
    <option value="">اختر المخزن</option>
    {warehouses.map((warehouse) => (
      <option key={warehouse.id} value={warehouse.id}>
        {warehouse.name} - {warehouse.location}
      </option>
    ))}
  </select>

  {errors.warehouseId && (
    <p className="text-red-500 text-sm mt-1">{errors.warehouseId}</p>
  )}

  {isEdit && (
    <p className="text-gray-500 text-sm mt-1">
      لا يمكن تغيير المخزن للمنتجات الموجودة
    </p>
  )}
</div>

    </div>




    {/* البنود */}
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-900">بنود الفاتورة</h3>
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-white transition rounded-lg bg-green-500 shadow-theme-xs hover:bg-green-600"
        >
          <Plus size={16} className="" />
          إضافة بند
        </button>
      </div>

      <div className="space-y-3">
        {formData.items?.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-2 p-2 border rounded-md">
            <div className="md:col-span-2 relative">
  <label className="block mb-1">المنتج *</label>
  <input
    type="text"
    value={item.description}
    onChange={(e) => handleProductSearch(index, e.target.value)}
    className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
      errors[`item_${index}_description`] ? 'border-red-500' : 'border-gray-300'
    }`}
    placeholder="ابحث عن المنتج"
  />
  {productSuggestions.length > 0 && (
    <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full max-h-40 overflow-y-auto shadow-lg">
      {productSuggestions.map((product) => (
        <li
          key={product.id}
          onClick={() => handleSelectProduct(index, product)}
          className="px-3 py-2 cursor-pointer hover:bg-gray-100"
        >
          {product.name}
        </li>
      ))}
    </ul>
  )}
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
                placeholder="أدخل الكمية"
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
  placeholder="أدخل سعر الوحدة"
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
                  className="inline-flex items-center gap-2 px-2 py-2 text-sm font-medium text-white transition rounded-lg bg-red-500 shadow-theme-xs hover:bg-red-600"
                >
                  <Trash2 size={11} />
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
          placeholder="أدخل المبلغ المدفوع"
        />
      </div>

      <div>
        <label className="block mb-1">المبلغ المتبقي</label>
        <input
          type="number"
          value={formData.remainingAmount}
          readOnly
          className="w-full px-2 py-1 border bg-gray-100 rounded-md text-gray-600"
          placeholder="المبلغ المتبقي"
        />
      </div>
    </div>

    {/* المجموع */}
    <div className="p-2 bg-gray-50 rounded-md text-xs font-semibold flex justify-between">
      <span>المجموع الكلي:</span>
      <span>₪{(calculateTotal() || 0).toFixed(2)}</span>
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
        placeholder="أدخل ملاحظات إضافية"
      />
    </div>
        {/* باقي الفورم كما هو تمامًا */}
        {/* ... */}
        
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate('/invoices')}
            className="inline-flex items-center gap-2 px-2 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            <X size={14} /> إلغاء
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-2 py-1 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600"
          >
            <Save size={14} /> حفظ
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceFormPage;
