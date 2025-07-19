import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Save, Package } from 'lucide-react';
import productService from '../../services/productService';

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    purchase_price: '',
    sale_price: '',
    sku: '',
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      fetchProduct();
    }
  }, [id, isEdit]);

  const fetchProduct = async () => {
    try {
      const product = await productService.getProductById(id);
      setFormData({
        name: product.name || '',
        description: product.description || '',
        purchase_price: product.purchase_price?.toString() || '',
        sale_price: product.sale_price?.toString() || '',
        sku: product.sku || '',
        isActive: product.isActive,
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

    if (!formData.purchase_price || parseFloat(formData.purchase_price) <= 0) {
      newErrors.purchase_price = 'السعر يجب أن يكون أكبر من 0';
    }

    if (!formData.sale_price || parseFloat(formData.sale_price) < 0) {
      newErrors.sale_price = 'السعر يجب أن يكون أكبر من أو يساوي 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        purchase_price: parseFloat(formData.purchase_price),
        sale_price: parseFloat(formData.sale_price),
        sku: formData.sku,
        isActive: formData.isActive,
      };

      if (isEdit) {
        await productService.updateProduct(id, productData);
      } else {
        await productService.createProduct(productData);
      }

      navigate('/products');
    } catch (err) {
      setError(err.message || 'فشل في حفظ المنتج');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
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
                سعر البيع*
              </label>
              <input
                type="number"
                id="sale_price"
                name="sale_price"
                value={formData.sale_price}
                onChange={handleChange}
                step="0.01"
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.sale_price ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                سعر الشراء*
              </label>
              <input
                type="number"
                id="purchase_price"
                name="purchase_price"
                value={formData.purchase_price}
                onChange={handleChange}
                step="0.01"
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.purchase_price ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
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