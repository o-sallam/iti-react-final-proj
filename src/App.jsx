import "./App.css";
import Suppliers from './pages/suppliers';
import PurchaseOrders from './pages/purchaseOrders';
import Invoices from './pages/invoices';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/purchase-orders" element={<PurchaseOrders />} />
          <Route path="/invoices" element={<Invoices />} />
        </Routes>
    </Router>
  );
}

export default App;
