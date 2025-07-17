import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Warehouse } from 'lucide-react';
import warehouseService from '../../services/warehouseService';

const WarehouseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      fetchWarehouse();
    }
  }, [id, isEdit]);

  const fetchWarehouse = async () => {
    try {
      const warehouse = await warehouseService.getWarehouseById(id);
      setFormData({
        name: warehouse.name || '',
        location: warehouse.location || ''
      });
    } catch (err) {
      setError('فشل في تحميل المخزن');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'اسم المخزن مطلوب';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'الموقع مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const warehouseData = {
        name: formData.name,
        location: formData.location
      };

      if (isEdit) {
        await warehouseService.updateWarehouse(id, warehouseData);
      } else {
        await warehouseService.createWarehouse(warehouseData);
      }

      navigate('/warehouses');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      <div className="mb-8">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/warehouses')}
            className="ml-4 p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 transform rotate-180" />
          </button>
          <div className="flex items-center">
            <Warehouse className="h-8 w-8 text-blue-600 ml-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              {isEdit ? 'تعديل المخزن' : 'إضافة مخزن جديد'}
            </h1>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              اسم المخزن *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="أدخل اسم المخزن"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              الموقع *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.location ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="أدخل عنوان الموقع"
            />
            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
          </div>

          <div className="flex items-center justify-end space-x-reverse space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/warehouses')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                  {isEdit ? 'جاري التحديث...' : 'جاري الإنشاء...'}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 ml-2" />
                  {isEdit ? 'تحديث المخزن' : 'إنشاء المخزن'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WarehouseForm;