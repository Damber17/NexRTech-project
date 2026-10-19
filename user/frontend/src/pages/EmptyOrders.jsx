import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Screen,
  EmptyState,
} from "../components/common/UI";

import "../styles/EmptyOrders.css";

export default function EmptyOrders() {
  const navigate = useNavigate();

  return (
    <Screen title="My Orders">
      <EmptyState
        icon="📦"
        title="No orders yet"
        description="Once you place an order, it will appear here."
        action="Start Shopping"
        onAction={() => navigate("/home")}
      />
    </Screen>
  );
}