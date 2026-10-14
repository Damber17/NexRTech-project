import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Screen,
  EmptyState,
} from "../components/common/UI";

import { useStore } from "../context/StoreContext";
import { money } from "../data";

import "../styles/TransactionHistory.css";

export default function TransactionHistory() {
  const navigate = useNavigate();
  const { orders } = useStore();

  return (
    <Screen title="Transactions" back>
      {orders.length > 0 ? (
        <div className="transaction-list">
          {orders.map((order) => (
            <button
              key={order.id}
              className="transaction-row panel"
              onClick={() =>
                navigate(`/transactions/${order.id}`)
              }
            >
              <div className="transaction-icon">
                ↗
              </div>

              <div>
                <strong>{order.shop}</strong>

                <p className="muted small">
                  {order.date} · {order.id}
                </p>
              </div>

              <b className="orange">
                {money(order.total)}
              </b>
            </button>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="💳"
          title="No transactions yet"
          description="Your transaction history will appear here."
        />
      )}
    </Screen>
  );
}