import React from 'react';
import { X  ,Printer} from 'lucide-react';

const InvoiceViewModal = ({ invoice, onClose , getStatusText }) => {
  if (!invoice) return null;

console.log('invoice:', invoice);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
    }).format(amount);

    
  return (
    <div className="fixed inset-0 bg-white bg-opacity-20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full overflow-y-auto max-h-[90vh] relative">
        {/* Header */}
       
<div className="flex items-center justify-between p-4 border-b">
  <h2 className="text-xl font-bold text-gray-800">تفاصيل الفاتورة</h2>
  <div className="flex items-center gap-2">
    <button
      title="طباعة"
      onClick={() => window.print()}
      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
    >
      <Printer size={18} />
    </button>
    <button
      onClick={onClose}
      title="إغلاق"
      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
    >
      <X size={18} />
    </button>
  </div>
</div>

        {/* Body */}
        <div className="p-6 text-sm text-gray-800 space-y-4">
          <div>
            <span className="font-semibold text-gray-600">رقم الفاتورة:</span> {invoice.invoiceNumber}
          </div>
          <div>
            <span className="font-semibold text-gray-600">المورد:</span> {invoice.supplier?.name || invoice.supplierId}
          </div>
          <div>
            <span className="font-semibold text-gray-600">التاريخ:</span> {new Date(invoice.orderDate).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold text-gray-600">طريقة الدفع:</span> {invoice.paymentMethod}
          </div>
          <div>
            <span className="font-semibold text-gray-600">الحالة:</span>  {getStatusText(invoice?.status)}
          </div>
           <div>
            <span className="font-semibold text-gray-600">قيمة الفاتورة:</span> {invoice.totalAmount}ج.م
          </div>
          <div>
            <span className="font-semibold text-gray-600">ملاحظات:</span> {invoice.notes || 'لا يوجد'}
          </div>

          <div>
            <span className="font-semibold text-gray-600 block mb-1">العناصر:</span>
            <div className="border rounded p-2 space-y-2">
              {Array.isArray(invoice.items) ? (
  invoice.items.map((item, index) => (
    <div
      key={index}
      className="grid grid-cols-4 gap-2 border-b pb-1 last:border-0"
    >
      <span>{item.description}</span>
      <span>{item.quantity}</span>
      <span>{formatCurrency(item.unitPrice)}</span>
      <span>{formatCurrency(item.total)}</span>
    </div>
  ))
) : (
  <p className="text-gray-500 text-sm">لا توجد عناصر لعرضها</p>
)}

            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t pt-4 mt-4 font-semibold">
            <div>المدفوع: {invoice.paidAmount} ج.م</div>
            <div>المتبقي: {invoice.remainingAmount}  </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceViewModal;
