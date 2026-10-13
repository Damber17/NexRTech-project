import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Existing Pages
import Basket from "./pages/Basket";
import Catalogue from "./pages/Catalogue";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import OrderDetails from "./pages/OrderDetails";
import OrderTracking from "./pages/OrderTracking";
import TransactionHistory from "./pages/TransactionHistory";

// Registration Page
import Registration from "./pages/Registration";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Default Page */}
        <Route
          path="/"
          element={<Navigate to="/registration" replace />}
        />

        {/* Registration */}
        <Route
          path="/registration"
          element={<Registration />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Catalogue */}
        <Route
          path="/catalogue"
          element={<Catalogue />}
        />

        {/* Basket */}
        <Route
          path="/basket"
          element={<Basket />}
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* Orders */}
        <Route
          path="/orders/:id"
          element={<OrderDetails />}
        />

        {/* Order Tracking */}
        <Route
          path="/tracking/:id"
          element={<OrderTracking />}
        />

        {/* Transaction History */}
        <Route
          path="/transactions"
          element={<TransactionHistory />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;