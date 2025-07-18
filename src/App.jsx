import "./App.css";
import "./template-styles.css";
import Suppliers from "./pages/suppliers";
import PurchaseOrders from "./pages/purchaseOrders";
import Invoices from "./pages/invoices";
import Layout from "./components/Layout";
import Selling from "./pages/selling";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductList from "./pages/products/products";
import ProductForm from "./pages/products/productForm";
import WarehouseList from "./pages/warehouses/warehouses";
import WarehouseForm from "./pages/warehouses/warehouseForm";
import InventoryList from "./pages/inventory";
import Client from "./pages/client";
import AddSaleInvoice from "./pages/add-sale-invoice";
import InvoiceForm from "./components/InvoiceForm";

import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Cashiers from "./pages/cashiers";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Auth routes - outside Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes - inside Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={<Dashboard />}
            />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/purchase-orders" element={<PurchaseOrders />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/invoices/new" element={<InvoiceForm />} />
            <Route path="/invoices/edit/:id" element={<InvoiceForm />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/warehouses" element={<WarehouseList />} />
            <Route path="/warehouses/new" element={<WarehouseForm />} />
            <Route path="/warehouses/edit/:id" element={<WarehouseForm />} />
            <Route path="/inventory" element={<InventoryList />} />
            <Route path="/clients" element={<Client />} />
            <Route
              path="/add-sale-invoice/:clientId"
              element={<AddSaleInvoice />}
            />
            <Route path="/selling" element={<Selling />} />
            <Route path="/cashiers" element={<Cashiers />} />

            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
