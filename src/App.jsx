import "./App.css";
import "./template-styles.css";
import Suppliers from './pages/suppliers';
import PurchaseOrders from './pages/purchaseOrders';
import Invoices from './pages/invoices';
import Layout from './components/Layout';
import Selling from './pages/selling';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/purchase-orders" element={<PurchaseOrders />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/selling" element={<Selling />} />
          <Route path="/" element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Dashboard</h1><p>Welcome to your dashboard!</p></div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
