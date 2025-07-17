import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, List, Calculator, Plus } from 'lucide-react';
import clientService from '../services/clientService';

const DUMMY_PRODUCTS = [
  { id: 13, name: 'مفروم [20] 700', price: 165 },
  { id: 14, name: 'كفتة [10] 500', price: 120 },
  { id: 15, name: 'برجر [5] 300', price: 90 },
  { id: 16, name: 'سجق [8] 400', price: 110 },
];

const initialItems = [
  {
    id: 13,
    name: 'مفروم [20] 700',
    quantity: 1,
    price: 165,
    value: 165,
  },
];

const AddSaleInvoice = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  const previous = 15990;
  const branch = 'المخزن الرئيسي';

  const [items, setItems] = useState(initialItems);
  const [paid, setPaid] = useState('');
  const [showSummary, setShowSummary] = useState(true);
  const [addingRow, setAddingRow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch client data when component mounts
  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true);
        const clientData = await clientService.getById(clientId);
        setClient(clientData);
      } catch (error) {
        console.error('Error fetching client:', error);
        // Handle error - could redirect to clients page or show error message
      } finally {
        setLoading(false);
      }
    };

    if (clientId) {
      fetchClient();
    }
  }, [clientId]);

  const total = items.reduce((sum, item) => sum + (Number(item.value) || 0), 0);
  const remaining = total + previous - (Number(paid) || 0);

  const handleDeleteItem = (idx) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    const invoiceData = {
      client,
      items,
      total,
      previous,
      paid: Number(paid) || 0,
      remaining,
      branch,
    };
    alert('تم حفظ الفاتورة (تجريبي)');
    console.log(invoiceData);
  };

  // Add new row logic
  const handleAddRow = () => {
    setAddingRow(true);
    setSearchTerm('');
    setSearchResults([]);
    setSelectedProduct(null);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }
    // Improved dummy search: case-insensitive, trims whitespace
    const results = DUMMY_PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(value.trim().toLowerCase()) ||
      String(p.id).includes(value.trim())
    );
    setSearchResults(results);
  };

  const handleSelectProduct = (product) => {
    setItems((prev) => [
      ...prev,
      {
        id: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
        value: product.price,
      },
    ]);
    setAddingRow(false);
    setSearchTerm('');
    setSearchResults([]);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">جاري تحميل بيانات العميل...</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">لا يوجد بيانات عميل. الرجاء العودة واختيار عميل.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate('/clients')}
        >
          <ArrowLeft className="inline mr-2" /> عودة للعملاء
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in bg-gray-50 dark:bg-gray-900 min-h-screen p-4 md:p-8 flex flex-col md:flex-row gap-6">
      {/* Toggle Button */}
      <div className="w-full flex md:hidden mb-4">
        <button
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-100 text-blue-600 font-bold text-sm mr-2"
          onClick={() => setShowSummary(true)}
          disabled={showSummary}
        >
          <Calculator size={18} /> الحسابات
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-100 text-blue-600 font-bold text-sm"
          onClick={() => setShowSummary(false)}
          disabled={!showSummary}
        >
          <List size={18} /> الفاتورة
        </button>
      </div>
      {/* Left Summary Card */}
      {(showSummary || !window.matchMedia('(max-width: 767px)').matches) && (
        <div className={`w-full md:w-64 flex-shrink-0 ${!showSummary && 'hidden md:block'}`}>
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-4 flex flex-col gap-3">
            <div className="bg-blue-100 text-blue-600 text-center rounded-lg py-2 font-bold text-sm mb-2">الاجمالي: {total}</div>
            <div className="bg-gray-100 text-gray-700 rounded-lg px-3 py-2 text-sm">الفرع: {branch}</div>
            <div className="bg-gray-100 text-gray-700 rounded-lg px-3 py-2 text-sm">العميل: {client.name}</div>
            <div className="bg-gray-100 text-gray-700 rounded-lg px-3 py-2 text-sm">السابق: {previous.toFixed(2)}</div>
            <input
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="المدفوع"
              type="number"
              value={paid}
              onChange={e => setPaid(e.target.value)}
            />
            <div className="bg-gray-100 text-gray-700 rounded-lg px-3 py-2 text-sm">المتبقي عليه: {remaining}</div>
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition"
              onClick={handleSave}
            >
              حفظ
            </button>
          </div>
        </div>
      )}
      {/* Right Table */}
      {(!showSummary || !window.matchMedia('(max-width: 767px)').matches) && (
        <div className={`flex-1 ${showSummary && 'hidden md:block'}`}>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-blue-500">فاتورة بيع</h2>
            </div>
            <div className="max-w-full overflow-x-auto">
              <table className="min-w-full text-center">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <th className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white">الكود</th>
                    <th className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white">الصنف</th>
                    <th className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white">الكمية</th>
                    <th className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white">س.بيع</th>
                    <th className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white">القيمة</th>
                    <th className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white">#</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {items.map((item, idx) => (
                    <tr key={item.id}>
                      <td className="px-3 py-2">{item.id}</td>
                      <td className="px-3 py-2">{item.name}</td>
                      <td className="px-3 py-2">
                        <span className="inline-block px-2 py-1 bg-gray-100 rounded text-sm text-gray-700">{item.quantity}</span>
                      </td>
                      <td className="px-3 py-2">
                        <span className="inline-block px-2 py-1 bg-gray-100 rounded text-sm text-gray-700">{item.price}</span>
                      </td>
                      <td className="px-3 py-2">{item.quantity * item.price}</td>
                      <td className="px-3 py-2">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white rounded p-2"
                          onClick={() => handleDeleteItem(idx)}
                          title="حذف"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {addingRow && (
                    <tr>
                      <td className="px-3 py-2">-</td>
                      <td className="px-3 py-2 relative">
                        <input
                          type="text"
                          className="w-full rounded border border-gray-300 px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-200"
                          placeholder="ابحث عن منتج..."
                          value={searchTerm}
                          onChange={handleSearchChange}
                          autoFocus
                        />
                        {searchResults.length > 0 && (
                          <ul className="absolute z-50 left-0 right-0 bg-white border border-gray-200 rounded shadow mt-1 max-h-40 overflow-y-auto">
                            {searchResults.map((product) => (
                              <li
                                key={product.id}
                                className="px-3 py-2 cursor-pointer hover:bg-blue-100 text-right"
                                onClick={() => handleSelectProduct(product)}
                              >
                                {product.name} - {product.price}
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                      <td className="px-3 py-2">-</td>
                      <td className="px-3 py-2">-</td>
                      <td className="px-3 py-2">-</td>
                      <td className="px-3 py-2"></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-500"
                onClick={handleAddRow}
                disabled={addingRow}
              >
                <Plus size={18} className="ml-2" /> إضافة صنف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSaleInvoice; 