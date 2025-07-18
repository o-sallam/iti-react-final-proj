import React, { useState, useEffect } from 'react';
import { Archive, Package, Warehouse, Search } from 'lucide-react';
import inventoryService from '../services/inventoryService';

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInventory, setFilteredInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = inventory.filter(item =>
        item.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.warehouse_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredInventory(filtered);
    } else {
      setFilteredInventory(inventory);
    }
  }, [searchQuery, inventory]);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const data = await inventoryService.getProductsWithStockWarehouse();
      setInventory(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      // Note: This might need to be updated based on your API structure
      // You may need to pass warehouse information or use a different endpoint
      await inventoryService.updateQuantity(productId, newQuantity);
      fetchInventory();
    } catch (err) {
      setError(err.message);
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
        <div className="flex items-center">
          <Archive className="h-8 w-8 text-blue-600 ml-3" />
          <h1 className="text-3xl font-bold text-gray-900">المخزون</h1>
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
              placeholder="البحث في المخزون بالمنتج أو رمز المنتج أو المخزن..."
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
                  المخزن
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الكمية
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={`${item.product_id}-${item.warehouse_name}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 text-gray-400 ml-3" />
                      <div className="text-sm font-medium text-gray-900">
                        {item.product_name || 'منتج غير معروف'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Warehouse className="h-4 w-4 text-gray-400 ml-2" />
                      <div className="text-sm text-gray-900">
                        {item.warehouse_name || 'مخزن غير معروف'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.product_id, parseInt(e.target.value))}
                      className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.quantity > 10 
                        ? 'bg-green-100 text-green-800' 
                        : item.quantity > 0 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.quantity > 10 ? 'متوفر' : item.quantity > 0 ? 'مخزون منخفض' : 'نفد المخزون'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity)}
                      className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                    >
                      تحديث
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredInventory.length === 0 && (
            <div className="text-center py-12">
              <Archive className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">لم يتم العثور على عناصر مخزون</h3>
              <p className="mt-2 text-gray-500">
                {searchQuery ? 'حاول تعديل كلمات البحث' : 'أضف منتجات لرؤية عناصر المخزون'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryList;