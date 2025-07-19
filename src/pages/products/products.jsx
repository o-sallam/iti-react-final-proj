import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Edit, Trash2, Package } from 'lucide-react';
import productService from '../../services/productService';
import Modal from '../../components/Modal';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setConfirmDelete({ open: true, id });
  };
  const confirmDeleteProduct = async () => {
    try {
      await productService.deleteProduct(confirmDelete.id);
      fetchProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setConfirmDelete({ open: false, id: null });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600 ml-3" />
            <h1 className="text-3xl font-bold text-gray-900">المنتجات</h1>
          </div>
          <Link
            to="/products/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Plus className="h-4 w-4 ml-2" />
            إضافة منتج
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في المنتجات بالاسم أو رمز المنتج..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المنتج
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  رمز المنتج
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
سعر البيع                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
سعر الشراء                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.sale_price} ج.م
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.purchase_price} ج.م
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.isActive ? 'نشط' : 'غير نشط'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-reverse space-x-2">
                      <Link
                        to={`/products/edit/${product.id}`}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">لم يتم العثور على منتجات</h3>
              <p className="mt-2 text-gray-500">
                {searchQuery ? 'حاول تعديل كلمات البحث' : 'ابدأ بإضافة منتجك الأول'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Delete Modal */}
      <Modal isOpen={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, id: null })} title="تأكيد الحذف">
        <div className="text-center">
          <div className="text-lg text-red-600 mb-2">هل أنت متأكد من حذف هذا المنتج؟</div>
          <button
            className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition mr-2"
            onClick={confirmDeleteProduct}
          >
            نعم، حذف
          </button>
          <button
            className="mt-6 px-6 py-2 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition"
            onClick={() => setConfirmDelete({ open: false, id: null })}
          >
            إلغاء
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductList;