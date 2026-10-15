import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check, CreditCard, Pencil } from "lucide-react";
import { getOrders, updateOrder } from "../data/ordersPrototype";
import "../styles/order-details.css";

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const initial = useMemo(() => getOrders().find((item) => item.id === orderId) || getOrders()[0], [orderId]);
  const [order, setOrder] = useState(initial);

  const summary = order.paymentSummary;
  const subtotal = summary.subtotal;
  const total = subtotal - summary.discount + summary.service + summary.tax;

  function readyAction() {
    const updated = updateOrder(order.id, (current) => {
      if (current.readyConfirmed || current.fulfillment === "Fulfilled") {
        return current;
      }

      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });

      return {
        ...current,
        fulfillment: "Ready",
        readyConfirmed: true,
        timeline: current.timeline.map((event) =>
          event.label === "Ready"
            ? {
                ...event,
                detail: "Order is ready for collection",
                time: now,
                state: "done"
              }
            : event
        )
      };
    });

    setOrder(updated);
  }

  const buttonText = order.readyConfirmed || order.fulfillment === "Fulfilled"
    ? "Ready for collection"
    : "Mark as ready";


  return (
    <div className="order-detail-page">
      <button className="order-back" onClick={() => navigate("/merchant/orders")}>← Back to orders</button>
      <div className="order-detail-heading">
        <div><div className="order-title-row"><h1>#{order.id}</h1><span className="detail-paid">Paid</span><span className={`detail-ready ${order.fulfillment.toLowerCase()}`}>{order.fulfillment}</span></div><p>{order.dateTime} · {order.channel} · {order.itemCount} items</p></div>
        <div className="order-heading-actions"><button className="detail-outline"><Pencil size={15} /> Edit</button><button className="detail-primary" disabled={order.readyConfirmed || order.fulfillment === "Fulfilled"} onClick={readyAction}><Check size={16} /> {buttonText}</button></div>
      </div>

      <div className="order-detail-grid">
        <div className="order-detail-main">
          <section className="order-card order-items-card">
            <div className="order-card-header"><h2>Items</h2><span>{order.itemCount} items</span></div>
            {order.items.map((item, index) => <div className="order-item-row" key={`${item.sku}-${index}`}><img src={item.image} alt=""/><div className="order-item-name"><strong>{item.name}</strong><span>{item.variant}</span><small>{item.sku}</small></div><div className="order-item-price">{item.quantity} × KES {Number(item.unitPrice).toFixed(2)}</div><strong>KES {(item.quantity * item.unitPrice).toFixed(2)}</strong></div>)}
          </section>

          <section className="order-card payment-card">
            <div className="order-card-header"><h2>Payment summary</h2><span>KES</span></div>
            <div className="payment-lines"><div><span>Subtotal · {order.itemCount} items</span><b>KES {subtotal.toFixed(2)}</b></div><div><span>Discount · {summary.discountLabel}</span><b>−KES {summary.discount.toFixed(2)}</b></div><div><span>Service charges</span><b>KES {summary.service.toFixed(2)}</b></div><div><span>Tax</span><b>KES {summary.tax.toFixed(2)}</b></div></div>
            <div className="total-paid"><strong>Total paid</strong><strong>KES {total.toFixed(2)}</strong></div>
            <div className="payment-method"><span><CreditCard size={16} /> {summary.card}</span><span>{summary.capturedAt}</span></div>
          </section>

          <section className="order-card timeline-card">
            <div className="order-card-header"><h2>Order timeline</h2><span>{order.date}</span></div>
            <div className="timeline-list">{order.timeline.map((event, index) => <div className="timeline-event" key={`${event.label}-${index}`}><div className={`timeline-dot ${event.state}`} /><div><strong>{event.label}</strong>{event.detail && <small>{event.detail}</small>}</div><time>{event.time}</time></div>)}</div>
          </section>
        </div>

        <aside className="order-detail-side">
          <section className="order-card customer-card"><div className="order-card-header"><h2>Customer</h2><button>View profile ↗</button></div><div className="customer-profile"><span>{order.customer.initials}</span><div><strong>{order.customer.name}</strong><small>{order.customer.orders} orders · Customer since {order.customer.since}</small></div></div><p>email: {order.customer.email}<br/>Phone No: {order.customer.phone}</p></section>
          <section className="order-card address-card"><div className="order-card-header"><h2>Customer’s address</h2></div><div>{order.address.map((line, index) => <p key={index} className={index === 0 ? "address-name" : ""}>{line}</p>)}</div></section>
        </aside>
      </div>
    </div>
  );
}
