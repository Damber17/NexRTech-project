import React from "react";import {useNavigate,useParams} from "react-router-dom";import {Screen,PrimaryButton} from "../components/common/UI";import {useStore} from "../StoreContext";import "../styles/OrderTracking.css";
export default function OrderTracking(){const go=useNavigate(),{id}=useParams(),{orders}=useStore(),o=orders.find(x=>x.id===id)||orders[0];return <Screen title="Track Order" back><div className="panel"><strong>{o?.id||"No order"}</strong><p className="muted small">{o?.shop}</p><span className="tag">{o?.status}</span></div><div className="panel"><h3 className="card-title">Order progress</h3>{["Order placed","Merchant confirmed","Preparing order","Out for delivery","Delivered"].map((s,i)=><div className={"tracking-step "+(i===0?"done":"")} key={s}><span className="tracking-dot">{i===0?"✓":i+1}</span><div><strong>{s}</strong><p>{i===0?"Your order was received":"Awaiting update"}</p></div></div>)}</div><PrimaryButton onClick={()=>go("/orders")}>Back to Orders</PrimaryButton></Screen>}
import React from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  Screen,
  PrimaryButton,
} from "../components/common/UI";

import { useStore } from "../context/StoreContext";

import "../styles/OrderTracking.css";

export default function OrderTracking() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { orders } = useStore();

  const order =
    orders.find((item) => item.id === id) ||
    orders[0];

  const steps = [
    "Order placed",
    "Merchant confirmed",
    "Preparing order",
    "Out for delivery",
    "Delivered",
  ];

  return (
    <Screen title="Track Order" back>
      <div className="panel">
        <strong>
          {order?.id || "No order"}
        </strong>

        <p className="muted small">
          {order?.shop}
        </p>

        <span className="tag">
          {order?.status}
        </span>
      </div>

      <div className="panel">
        <h3 className="card-title">
          Order progress
        </h3>

        {steps.map((step, index) => (
          <div
            className={`tracking-step ${
              index === 0 ? "done" : ""
            }`}
            key={step}
          >
            <span className="tracking-dot">
              {index === 0 ? "✓" : index + 1}
            </span>

            <div>
              <strong>{step}</strong>

              <p>
                {index === 0
                  ? "Your order was received"
                  : "Awaiting update"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <PrimaryButton
        onClick={() => navigate("/orders")}
      >
        Back to Orders
      </PrimaryButton>
    </Screen>
  );
}