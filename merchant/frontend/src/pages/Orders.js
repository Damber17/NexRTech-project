import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Search } from "lucide-react";
import { getOrders } from "../data/ordersPrototype";
import "../styles/orders-figma.css";

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders] = useState(getOrders);
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [payment, setPayment] = useState("");
  const [fulfillment, setFulfillment] = useState("");
  const [channel, setChannel] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => orders.filter((order) => {
    const matchesSearch = `${order.id} ${order.customer.name}`.toLowerCase().includes(search.toLowerCase());
    const matchesTab = tab === "All" || (tab === "Unfulfilled" && order.fulfillment === "Unfulfilled") || (tab === "Unpaid" && order.payment !== "Paid") || (tab === "Completed" && order.fulfillment === "Fulfilled") || (tab === "Cancelled" && order.fulfillment === "Cancelled");
    return matchesSearch && matchesTab && (!payment || order.payment === payment) && (!fulfillment || order.fulfillment === fulfillment) && (!channel || order.channel === channel);
  }), [orders, tab, search, payment, fulfillment, channel]);

  const visible = filtered.slice((page - 1) * 10, page * 10);
  const counts = {
    All: orders.length,
    Unfulfilled: orders.filter((o) => o.fulfillment === "Unfulfilled").length,
    Unpaid: orders.filter((o) => o.payment !== "Paid").length,
    Completed: orders.filter((o) => o.fulfillment === "Fulfilled").length,
    Cancelled: orders.filter((o) => o.fulfillment === "Cancelled").length,
  };

  function exportOrders() {
    const rows = [["Order", "Date", "Customer", "Items", "Total", "Payment", "Fulfillment"], ...filtered.map((o) => [o.id, o.date, o.customer.name, o.itemCount, o.total, o.payment, o.fulfillment])];
    const csv = rows.map((r) => r.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a"); a.href = url; a.download = "orders.csv"; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="figma-orders-page">
      <div className="orders-heading-row">
        <div><h1>Orders</h1><p>Manage incoming orders, track fulfillment, and resolve payment issues from one place.</p><strong>{orders.length} orders across 3 active channels</strong></div>
        <button className="orders-export" onClick={exportOrders}><Download size={15} /> Export</button>
      </div>

      <div className="order-tabs">
        {["All", "Unfulfilled", "Unpaid", "Completed", "Cancelled"].map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => { setTab(item); setPage(1); }}>{item} <span>{counts[item]}</span></button>)}
      </div>

      <div className="order-filter-row">
        <label className="order-search"><Search size={15} /><input placeholder="Search orders, customers, or SKUs" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} /></label>
        <select><option>Date range⌄</option></select>
        <select value={payment} onChange={(e) => setPayment(e.target.value)}><option value="">Payment status⌄</option><option>Paid</option><option>Pending</option><option>Failed</option></select>
        <select value={fulfillment} onChange={(e) => setFulfillment(e.target.value)}><option value="">Fulfillment status⌄</option><option>Ready</option><option>Unfulfilled</option><option>Fulfilled</option><option>Cancelled</option></select>
        <select value={channel} onChange={(e) => setChannel(e.target.value)}><option value="">Channel⌄</option><option>Online store</option><option>POS</option><option>Marketplace</option></select>
        <div className="order-filter-spacer" />
        <select><option>Sort: Newest first⌄</option></select>
      </div>

      <div className="orders-table-shell">
        <table className="figma-orders-table">
          <thead><tr><th></th><th>Order #</th><th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Fulfillment</th></tr></thead>
          <tbody>{visible.map((order, index) => <tr key={order.id} className={index === 0 ? "highlight" : ""} onClick={() => navigate(`/merchant/orders/${order.id}`)}><td onClick={(e) => e.stopPropagation()}><input type="checkbox" /></td><td><strong>#{order.id}</strong></td><td>{order.date}</td><td><div className="customer-cell"><span>{order.customer.initials}</span>{order.customer.name}</div></td><td>{order.itemCount} {order.itemCount === 1 ? "item" : "items"}</td><td><strong>KES {Number(order.total).toFixed(2)}</strong></td><td><span className={`order-status-pill ${order.payment.toLowerCase()}`}>{order.payment}</span></td><td><span className={`order-status-pill ${order.fulfillment.toLowerCase()}`}>{order.fulfillment}</span></td></tr>)}</tbody>
        </table>
      </div>

      <div className="orders-pagination"><span>Showing {filtered.length ? (page - 1) * 10 + 1 : 0}–{Math.min(page * 10, filtered.length)} of {filtered.length} orders</span><div><button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button><b>{page}</b>{filtered.length > 10 && <button onClick={() => setPage(2)}>2</button>}<button disabled={page * 10 >= filtered.length} onClick={() => setPage(page + 1)}>Next</button></div></div>
    </div>
  );
}
