import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/common/DashboardLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Analytics from "./pages/Analytics";
import CreateAccount from "./pages/CreateAccount";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ManageProducts from "./pages/ManageProducts";
import ProductDetails from "./pages/ProductDetails";
import OrderDetails from "./pages/OrderDetails";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import Verification from "./pages/Verification";
import WhatsAppVerify from "./pages/WhatsAppVerify";
import "./styles/global.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/onboarding/create-account" element={<CreateAccount />} />

      <Route
        path="/onboarding/verify-whatsapp"
        element={
          <ProtectedRoute>
            <WhatsAppVerify />
          </ProtectedRoute>
        }
      />

      <Route
        path="/onboarding/verification"
        element={
          <ProtectedRoute>
            <Verification />
          </ProtectedRoute>
        }
      />

      <Route
        path="/merchant"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="overview" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:orderId" element={<OrderDetails />} />
        <Route path="products" element={<ManageProducts />} />
        <Route path="products/:productId" element={<ProductDetails />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
