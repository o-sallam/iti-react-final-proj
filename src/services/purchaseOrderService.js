// Mock data for purchase orders
const mockPurchaseOrders = [
  {
    id: 1,
    orderNumber: 'PO-20240115-001',
    supplierId: 1,
    supplierName: 'شركة الأغذية المتحدة',
    supplierEmail: 'info@united-foods.com',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-20',
    status: 'pending',
    totalAmount: '₪2,500.00',
    notes: 'طلب عاجل للمواد الغذائية',
    items: [
      { product: 'أرز بسمتي', quantity: 50, unitPrice: 25, total: 1250 },
      { product: 'زيت زيتون', quantity: 25, unitPrice: 50, total: 1250 }
    ]
  },
  {
    id: 2,
    orderNumber: 'PO-20240114-002',
    supplierId: 2,
    supplierName: 'مؤسسة المواد الغذائية',
    supplierEmail: 'contact@food-materials.com',
    orderDate: '2024-01-14',
    deliveryDate: '2024-01-19',
    status: 'delivered',
    totalAmount: '₪3,200.00',
    notes: 'تم التسليم بالكامل',
    items: [
      { product: 'حليب مجفف', quantity: 40, unitPrice: 30, total: 1200 },
      { product: 'سكر أبيض', quantity: 80, unitPrice: 25, total: 2000 }
    ]
  },
  {
    id: 3,
    orderNumber: 'PO-20240113-003',
    supplierId: 1,
    supplierName: 'شركة الأغذية المتحدة',
    supplierEmail: 'info@united-foods.com',
    orderDate: '2024-01-13',
    deliveryDate: '2024-01-18',
    status: 'approved',
    totalAmount: '₪1,800.00',
    notes: 'في انتظار التسليم',
    items: [
      { product: 'طحين أبيض', quantity: 60, unitPrice: 20, total: 1200 },
      { product: 'خل أبيض', quantity: 30, unitPrice: 20, total: 600 }
    ]
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const purchaseOrdersService = {
  async getAll() {
    await delay(500);
    return [...mockPurchaseOrders];
  },

  async getById(id) {
    await delay(300);
    return mockPurchaseOrders.find(order => order.id === id);
  },

  async create(orderData) {
    await delay(500);
    const newOrder = {
      id: Date.now(),
      ...orderData
    };
    mockPurchaseOrders.push(newOrder);
    return newOrder;
  },

  async update(id, orderData) {
    await delay(500);
    const index = mockPurchaseOrders.findIndex(order => order.id === id);
    if (index !== -1) {
      mockPurchaseOrders[index] = { ...mockPurchaseOrders[index], ...orderData };
      return mockPurchaseOrders[index];
    }
    throw new Error('Purchase order not found');
  },

  async delete(id) {
    await delay(300);
    const index = mockPurchaseOrders.findIndex(order => order.id === id);
    if (index !== -1) {
      mockPurchaseOrders.splice(index, 1);
      return true;
    }
    throw new Error('Purchase order not found');
  }
};