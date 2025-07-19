import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Warehouse, MapPin } from 'lucide-react';
import warehouseService from '../../services/warehouseService';

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      const data = await warehouseService.getAllWarehouses();
      setWarehouses(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المخزن؟')) {
      try {
        await warehouseService.deleteWarehouse(id);
        fetchWarehouses();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const uniqueLocations = Array.from(new Set(warehouses.map((w) => w.location)));

  const filteredWarehouses = warehouses.filter((warehouse) => {
    const matchesSearch = warehouse.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter ? warehouse.location === locationFilter : true;
    return matchesSearch && matchesLocation;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen" dir="rtl">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center">
            <Warehouse className="h-8 w-8 text-blue-600 ml-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">المخازن</h1>
          </div>
          <Link
            to="/warehouses/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Plus className="h-4 w-4 ml-2" />
            إضافة مخزن
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 dark:bg-red-950 dark:border-red-900">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* البحث والتصفية */}
      <div className="mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col sm:flex-row gap-4 border border-gray-200 dark:border-gray-700">
          <input
            type="text"
            placeholder="ابحث باسم المخزن..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">كل المواقع</option>
            {uniqueLocations.map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>

      {/* عرض الكروت */}
      {filteredWarehouses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWarehouses.map((warehouse) => (
            <div
              key={warehouse.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <Warehouse className="h-6 w-6 text-blue-500 ml-2" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{warehouse.name}</h2>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500 ml-2" />
                <span>{warehouse.location}</span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                <span className="font-medium">عدد العناصر:</span> {warehouse.inventories?.length || 0}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-200 mb-4">
                <span className="font-medium">تاريخ الإنشاء:</span> {new Date(warehouse.createdAt).toLocaleDateString()}
              </div>
              <div className="flex justify-end space-x-reverse space-x-2">
                <Link
                  to={`/warehouses/edit/${warehouse.id}`}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 p-1 rounded hover:bg-blue-50 dark:hover:bg-white/5 transition-colors"
                >
                  <Edit className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => handleDelete(warehouse.id)}
                  className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 p-1 rounded hover:bg-red-50 dark:hover:bg-white/5 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Warehouse className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">لا توجد مخازن مطابقة</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">حاول تعديل البحث أو التصفية</p>
        </div>
      )}
    </div>
  );
};

export default WarehouseList;
