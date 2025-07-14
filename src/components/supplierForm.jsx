import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

const SupplierForm = ({ supplier, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: supplier?.name || '',
    email: supplier?.email || '',
  contactNumber: supplier?.contactNumber || '', 
    address: supplier?.address || '',
    contactPerson: supplier?.contactPerson || '',
    taxNumber: supplier?.taxNumber || '',
    status: supplier?.status || 'active',
    notes: supplier?.notes || '',
       accountBalance : supplier?.accountBalance || ''

  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'اسم المورد مطلوب';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }
    
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'رقم الهاتف مطلوب';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'العنوان مطلوب';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

return (
  <form
    onSubmit={handleSubmit}
className="max-w-md mx-auto p-4 bg-white rounded-md shadow space-y-3 overflow-y-auto max-h-[85vh] text-sm"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div>
        <label className="block font-medium text-gray-700 mb-1">
          اسم المورد *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="أدخل اسم المورد"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">
          البريد الإلكتروني *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="أدخل البريد الإلكتروني"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">
          رقم الهاتف *
        </label>
        <input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            errors.contactNumber ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="أدخل رقم الهاتف"
        />
        {errors.contactNumber && (
          <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">
          الشخص المسؤول
        </label>
        <input
          type="text"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="اسم الشخص المسؤول"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">
          الرقم الضريبي
        </label>
        <input
          type="text"
          name="taxNumber"
          value={formData.taxNumber}
          onChange={handleChange}
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="الرقم الضريبي"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">
          الرصيد الحالي
        </label>
        <input
          type="text"
          name="accountBalance"
          value={formData.accountBalance}
          onChange={handleChange}
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="الرصيد الحالي"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">الحالة</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
        </select>
      </div>
    </div>

    <div>
      <label className="block font-medium text-gray-700 mb-1">العنوان *</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          errors.address ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="العنوان الكامل"
      />
      {errors.address && (
        <p className="text-red-500 text-xs mt-1">{errors.address}</p>
      )}
    </div>

    <div>
      <label className="block font-medium text-gray-700 mb-1">ملاحظات</label>
      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        rows={2}
        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="ملاحظات إضافية"
      />
    </div>

    <div className="flex justify-end space-x-2">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors flex items-center space-x-1"
      >
        <X size={14} className="ml-1" />
        <span>إلغاء</span>
      </button>
      <button
        type="submit"
        className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1"
      >
        <Save size={14} className="ml-1" />
        <span>حفظ</span>
      </button>
    </div>
  </form>
);
};

export default SupplierForm;