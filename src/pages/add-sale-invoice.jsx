import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, List, Calculator, Plus, Check } from 'lucide-react';
import clientService from '../services/clientService';
import warehouseService from '../services/warehouseService';
import productService from '../services/productService';
import saleinvoicesService from '../services/saleinvoicesService';
import { createPortal } from 'react-dom';
import Modal from '../components/Modal';

const initialItems = [];

const AddSaleInvoice = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState('');

  const previous = client && client.balance ? Number(client.balance) : 0;

  const [items, setItems] = useState(initialItems);
  const [paid, setPaid] = useState('');
  const [showSummary, setShowSummary] = useState(true);
  const [inputProduct, setInputProduct] = useState(null); // selected product for input row
  const [inputSearch, setInputSearch] = useState('');
  const [inputQuantity, setInputQuantity] = useState(1);
  const [inputSearchResults, setInputSearchResults] = useState([]);
  const inputRef = React.useRef();
  const quantityRef = React.useRef();
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = React.useRef();
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicateProductName, setDuplicateProductName] = useState('');
  const [pendingRow, setPendingRow] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState('');

  // Position dropdown when inputSearchResults changes
  useEffect(() => {
    if (inputSearchResults.length > 0 && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [inputSearchResults]);

  // Close dropdown on click outside
  useEffect(() => {
    if (inputSearchResults.length === 0) return;
    function handleClick(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setInputSearchResults([]);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [inputSearchResults]);

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

  // Fetch warehouses on mount
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const data = await warehouseService.getAllWarehouses();
        setWarehouses(data);
        if (data.length > 0) setSelectedWarehouseId(data[0].id);
      } catch {
        setWarehouses([]);
      }
    };
    fetchWarehouses();
  }, []);

  const total = items.reduce((sum, item) => sum + (Number(item.value) || 0), 0);
  const remaining = total + previous - (Number(paid) || 0);

  const handleDeleteItem = (idx) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    if (!selectedWarehouseId || !clientId || items.length === 0) {
      setErrorModal('يرجى اختيار العميل والمخزن وإضافة أصناف للفاتورة');
      return;
    }
    const invoiceData = {
      warehouseId: Number(selectedWarehouseId),
      clientId: Number(clientId),
      paid: paid && !isNaN(Number(paid)) ? Number(paid) : 0,
      items: items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        salePrice: item.price
      }))
    };
    setSaving(true);
    try {
      await saleinvoicesService.create(invoiceData);
      setShowSuccessModal(true);
    } catch {
      setErrorModal('حدث خطأ أثناء حفظ الفاتورة');
    } finally {
      setSaving(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setPaid('');
    setItems([]);
  };

  // Product search for input row
  const handleInputSearchChange = (e) => {
    setInputSearch(e.target.value);
    setInputProduct(null);
  };

  useEffect(() => {
    if (inputSearch.trim() === '' || !selectedWarehouseId) {
      setInputSearchResults([]);
      return;
    }
    const handler = setTimeout(async () => {
      try {
        const results = await productService.searchProducts(inputSearch, selectedWarehouseId);
        setInputSearchResults(results);
      } catch {
        setInputSearchResults([]);
      }
    }, 200);
    return () => clearTimeout(handler);
  }, [inputSearch, selectedWarehouseId]);

  const handleInputSelectProduct = (product) => {
    setInputProduct(product);
    setInputSearch(product.name);
    setInputSearchResults([]);
    setInputQuantity(1);
  };

  const handleInputQuantityChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setInputQuantity(isNaN(val) || val < 1 ? 1 : val);
  };

  const handleApproveInputRow = () => {
    if (!inputProduct) return;
    const newRow = {
      id: inputProduct.id,
      name: inputProduct.name,
      quantity: inputQuantity,
      price: inputProduct.sale_price,
      value: inputProduct.sale_price * inputQuantity,
      sku: inputProduct.sku,
      productId: inputProduct.productId,
      stock: inputProduct.quantity,
    };
    if (items.some(item => item.productId === inputProduct.productId)) {
      setDuplicateProductName(inputProduct.name);
      setPendingRow(newRow);
      setShowDuplicateModal(true);
      return;
    }
    setItems((prev) => [
      ...prev,
      newRow,
    ]);
    setInputProduct(null);
    setInputSearch('');
    setInputQuantity(1);
    setInputSearchResults([]);
    setPendingRow(null);
    setTimeout(() => { inputRef.current && inputRef.current.focus(); }, 0);
  };

  const handleConfirmDuplicate = () => {
    if (pendingRow) {
      setItems((prev) => [
        ...prev.filter(item => item.productId !== pendingRow.productId),
        pendingRow,
    ]);
    }
    setInputProduct(null);
    setInputSearch('');
    setInputQuantity(1);
    setInputSearchResults([]);
    setShowDuplicateModal(false);
    setPendingRow(null);
    setTimeout(() => { inputRef.current && inputRef.current.focus(); }, 0);
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
            <div className="bg-gray-100 text-gray-700 rounded-lg px-3 py-2 text-sm">
              الفرع:
              <select
                className="ml-2 rounded border border-gray-300 px-2 py-1 text-sm bg-white dark:bg-gray-900"
                value={selectedWarehouseId}
                onChange={e => setSelectedWarehouseId(e.target.value)}
                disabled={items.length > 0}
              >
                {warehouses.map(w => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
            </div>
            <div className="bg-gray-100 text-gray-700 rounded-lg px-3 py-2 text-sm">العميل: {client.name}</div>
            <div className="bg-gray-100 text-gray-700 rounded-lg px-3 py-2 text-sm">السابق: {previous.toFixed(2)}</div>
            <input
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="المدفوع"
              type="number"
              value={paid}
              onChange={e => setPaid(e.target.value)}
            />
            <div className="bg-gray-100 text-gray-700 rounded-lg px-3 py-2 text-sm">المتبقي عليه: {remaining.toFixed(2)}</div>
            <button
              className={`mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition flex items-center justify-center ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
              ) : (
                'حفظ'
              )}
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
                  {/* Approved rows */}
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
                  {/* Input row */}
                    <tr>
                    <td className="px-3 py-2">{inputProduct ? inputProduct.id : '-'}</td>
                      <td className="px-3 py-2 relative">
                        <input
                        ref={inputRef}
                          type="text"
                          className="w-full rounded border border-gray-300 px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-200"
                          placeholder="ابحث عن منتج..."
                        value={inputSearch}
                        onChange={handleInputSearchChange}
                          autoFocus
                        readOnly={!!inputProduct}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && !inputProduct && inputSearchResults.length > 0) {
                            e.preventDefault();
                            handleInputSelectProduct(inputSearchResults[0]);
                            setTimeout(() => {
                              if (quantityRef.current) {
                                quantityRef.current.focus();
                                quantityRef.current.select();
                              }
                            }, 0);
                          }
                        }}
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        ref={quantityRef}
                        type="number"
                        min="1"
                        className="w-16 rounded border border-gray-300 px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={inputQuantity}
                        onChange={handleInputQuantityChange}
                        disabled={!inputProduct}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && inputProduct) {
                            e.preventDefault();
                            handleApproveInputRow();
                          }
                        }}
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        className="w-20 rounded border border-gray-300 px-2 py-1 text-sm text-center bg-gray-100"
                        value={inputProduct ? inputProduct.sale_price : ''}
                        readOnly
                      />
                    </td>
                    <td className="px-3 py-2">{inputProduct ? (inputProduct.sale_price * inputQuantity) : '-'}</td>
                    <td className="px-3 py-2">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white rounded p-2"
                        onClick={handleApproveInputRow}
                        disabled={!inputProduct}
                        title="اعتماد"
                      >
                        <Check size={18} />
                      </button>
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>
            {/* Product search dropdown as portal */}
            {inputSearchResults.length > 0 && createPortal(
              <ul
                ref={dropdownRef}
                className="z-[9999] fixed bg-white border border-gray-200 rounded shadow max-h-60 overflow-y-auto w-[var(--dropdown-width)]"
                style={{
                  top: dropdownPos.top,
                  left: dropdownPos.left,
                  width: dropdownPos.width,
                }}
              >
                {inputSearchResults.map((product) => (
                  <li
                    key={product.id}
                    className="px-3 py-2 cursor-pointer hover:bg-blue-100 text-right"
                    onClick={() => handleInputSelectProduct(product)}
              >
                    {product.name} - {product.price}
                  </li>
                ))}
              </ul>,
              document.body
            )}
          </div>
        </div>
      )}
      {/* Duplicate product modal */}
      <Modal isOpen={showDuplicateModal} onClose={() => setShowDuplicateModal(false)} title="تنبيه">
        <div className="text-center"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleConfirmDuplicate();
              setTimeout(() => { inputRef.current && inputRef.current.focus(); }, 0);
            }
          }}
        >
          <div className="text-lg font-bold text-red-600 mb-2">هذا المنتج مضاف بالفعل للفاتورة</div>
          <div className="text-gray-700 dark:text-gray-200">{duplicateProductName && `المنتج: ${duplicateProductName}`}</div>
          <button
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={handleConfirmDuplicate}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleConfirmDuplicate();
                setTimeout(() => { inputRef.current && inputRef.current.focus(); }, 0);
              }
            }}
          >
            موافق
          </button>
        </div>
      </Modal>
      {/* Success modal */}
      <Modal isOpen={showSuccessModal} onClose={handleSuccessModalClose} title="تمت العملية بنجاح">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">تم حفظ الفاتورة بنجاح</div>
          <button
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={handleSuccessModalClose}
          >
            موافق
          </button>
        </div>
      </Modal>
      {/* Error Modal */}
      <Modal isOpen={!!errorModal} onClose={() => setErrorModal('')} title="خطأ">
        <div className="text-center">
          <div className="text-lg text-red-600 mb-2">{errorModal}</div>
          <button
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={() => setErrorModal('')}
          >
            موافق
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddSaleInvoice; 