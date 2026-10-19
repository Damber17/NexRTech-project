import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import {
  Screen,
  EmptyState,
} from "../components/common/UI";
import { useStore } from "../context/StoreContext";

import "../styles/TransactionHistory.css";

export default function TransactionHistory() {
  const navigate = useNavigate();
  const { orders } = useStore();

  return (
    <Screen title="Transactions" back>
      {orders && orders.length > 0 ? (
        <div className="transaction-list">
          {orders.map((order) => {
            const orderKey = order._id || order.id;
            return (
              <button
                key={orderKey}
                className="transaction-row panel"
                onClick={() => navigate(`/transactions/${orderKey}`)}
              >
                <div className="transaction-icon">
                  <ArrowUpRight size={18} />
                </div>

                <div>
                  <strong>{order.merchant?.business_name || order.shop}</strong>

                  <p className="muted small">
                    {order.date || "Recent"} · {order.public_id}
                  </p>
                </div>

                <b className="orange">
                  KSh {order.total?.kes || order.total}
                </b>
              </button>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon="💳"
          title="No transactions yet"
          description="Your transaction history will appear here once you place orders."
          action="Browse Merchants"
          onAction={() => navigate("/home")}
        />
      )}
    </Screen>
  );
}