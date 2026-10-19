import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Screen,
  EmptyState,
} from "../components/common/UI";

import "../styles/EmptyBasket.css";

export default function EmptyBasket() {
  const navigate = useNavigate();

  return (
    <Screen title="My Basket" back>
      <EmptyState
        icon="🧺"
        title="Your basket is empty"
        description="Explore products and add your favorites to get started."
        action="Browse Merchants"
        onAction={() => navigate("/home")}
      />
    </Screen>
  );
}