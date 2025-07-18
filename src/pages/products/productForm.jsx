import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Package } from 'lucide-react';
import productService from '../../services/productService';
import warehouseService from '../../services/warehouseService';
import inventoryService from '../../services/inventoryService';

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
   // sku: '',
    isActive: true,
    stock: '',
    warehouseId: ''
  });

  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchWarehouses();
    if (isEdit) {
      fetchProduct();
    }
  }, [id, isEdit]);

  const fetchWarehouses = async () => {
    try {
      const data = await warehouseService.getAllWarehouses();
      setWarehouses(data);
    } catch (err) {
      setError('فشل في تحميل المخازن');
    }
  };

  const fetchProduct = async () => {
    try {
      const product = await productService.getProductById(id);
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
       // sku: product.sku || '',
        isActive: product.isActive,
        stock: product.stock || '',
        warehouseId: product.inventory?.warehouseId || ''
      });
    } catch (err) {
      setError('فشل في تحميل المنتج');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'اسم المنتج مطلوب';
    }

   /* if (!formData.sku.trim()) {
      newErrors.sku = 'رمز المنتج مطلوب';
    }*/

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'السعر يجب أن يكون أكبر من 0';
    }

    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'المخزون يجب أن يكون 0 أو أكثر';
    }

    if (!formData.warehouseId) {
      newErrors.warehouseId = 'اختيار المخزن مطلوب';
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
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        sku: formData.sku,
        isActive: formData.isActive,
        stock: parseInt(formData.stock)
      };

      let product;
      if (isEdit) {
        product = await productService.updateProduct(id, productData);
      } else {
        product = await productService.createProduct(productData);
        
        // Create inventory record for new product
        await inventoryService.createInventory({
          quantity: parseInt(formData.stock),
          productId: product.id,
          warehouseId: formData.warehouseId
        });
      }

      navigate('/products');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      <div className="mb-8">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/products')}
            className="ml-4 p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 transform rotate-180" />
          </button>
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600 ml-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              {isEdit ? 'تعديل المنتج' : 'إضافة منتج جديد'}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                اسم المنتج *
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
                placeholder="أدخل اسم المنتج"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              الوصف
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="أدخل وصف المنتج"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                السعر *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.price ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                كمية المخزون *
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.stock ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0"
              />
              {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
            </div>

            <div>
              <label htmlFor="warehouseId" className="block text-sm font-medium text-gray-700 mb-2">
                المخزن *
              </label>
              <select
                id="warehouseId"
                name="warehouseId"
                value={formData.warehouseId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
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
              {errors.warehouseId && <p className="mt-1 text-sm text-red-600">{errors.warehouseId}</p>}
              {isEdit && (
                <p className="mt-1 text-sm text-gray-500">
                  لا يمكن تغيير المخزن للمنتجات الموجودة
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="mr-2 text-sm text-gray-700">المنتج نشط</span>
            </label>
          </div>

          <div className="flex items-center justify-end space-x-reverse space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/products')}
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
                  {isEdit ? 'تحديث المنتج' : 'إنشاء المنتج'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;