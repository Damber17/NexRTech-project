import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { StoreProvider } from "./context/StoreContext";

// Pages
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import ProductDetails from "./pages/ProductDetails";
import Basket from "./pages/Basket";
import Checkout from "./pages/Checkout";

import PaymentPending from "./pages/PaymentPending";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import OrderTracking from "./pages/OrderTracking";

import TransactionHistory from "./pages/TransactionHistory";
import TransactionDetails from "./pages/TransactionDetails";

import Profile from "./pages/Profile";
import EmptyBasket from "./pages/EmptyBasket";
import EmptyOrders from "./pages/EmptyOrders";

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate to="/home" replace />
            }
          />

          <Route
            path="/home"
            element={<Home />}
          />

          <Route
            path="/catalogue"
            element={<Catalogue />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/basket"
            element={<Basket />}
          />

          <Route
            path="/basket/empty"
            element={<EmptyBasket />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/payment/pending"
            element={<PaymentPending />}
          />

          <Route
            path="/payment/success"
            element={<PaymentSuccess />}
          />

          <Route
            path="/payment/failed"
            element={<PaymentFailed />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/orders/empty"
            element={<EmptyOrders />}
          />

          <Route
            path="/orders/:id"
            element={<OrderDetails />}
          />

          <Route
            path="/tracking/:id"
            element={<OrderTracking />}
          />

          <Route
            path="/transactions"
            element={<TransactionHistory />}
          />

          <Route
            path="/transactions/:id"
            element={<TransactionDetails />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="*"
            element={
              <Navigate to="/home" replace />
            }
          />
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;