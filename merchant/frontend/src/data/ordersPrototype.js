const STORAGE_KEY = "merchant_orders_figma_v2";

const defaultOrders = [
  {
    id: "ORD-1042",
    date: "Mar 12, 2026",
    dateTime: "Mar 12, 2026 at 10:24 AM",
    customer: { initials: "MR", name: "Maya Reed", email: "maya.reed@example.com", phone: "12345678", orders: 4, since: "Sep 2025" },
    address: ["Maya Reed", "1842 NE 28th Avenue, Apt 3", "Portland, OR 97212", "United States"],
    itemCount: 3,
    total: 128,
    payment: "Paid",
    fulfillment: "Ready",
    readyConfirmed: false,
    channel: "Online store",
    items: [
      { name: "Everyday ceramic mug", variant: "Sage · 350 ml", sku: "FG-MUG-SG", quantity: 2, unitPrice: 32, image: "/mock-images/mug.svg" },
      { name: "Linen throw", variant: "Oatmeal · 130 × 170 cm", sku: "FG-THR-OT", quantity: 1, unitPrice: 64, image: "/mock-images/throw.svg" }
    ],
    paymentSummary: { subtotal: 128, discountLabel: "WELCOME", discount: 12, service: 4, tax: 8, card: "Visa ending in 4242", capturedAt: "Captured Mar 12, 2026" },
    timeline: [
      { label: "Basket Created", detail: "", time: "9:38 AM", state: "done" },
      { label: "Payment Completed", detail: "Visa •••• 4242 · KES 128.00", time: "10:25 AM", state: "done" },
      { label: "Being Fulfilled", detail: "", time: "10:24 AM", state: "done" },
      { label: "Ready", detail: "Order is ready for collection", time: "", state: "pending" },
      { label: "Fulfilled", detail: "", time: "", state: "pending" }
    ]
  },
  { id: "ORD-1041", date: "Mar 12, 2026", dateTime: "Mar 12, 2026 at 9:42 AM", customer: { initials: "LP", name: "Liam Patel", email: "liam.patel@example.com", phone: "12345679", orders: 2, since: "Jan 2026" }, address: ["Liam Patel", "16 Garden Lane", "Nairobi", "Kenya"], itemCount: 1, total: 44, payment: "Paid", fulfillment: "Ready", readyConfirmed: true, channel: "Online store" },
  { id: "ORD-1040", date: "Mar 11, 2026", dateTime: "Mar 11, 2026 at 5:16 PM", customer: { initials: "SC", name: "Sofia Chen", email: "sofia.chen@example.com", phone: "12345670", orders: 3, since: "Feb 2026" }, address: ["Sofia Chen", "22 River Road", "Nairobi", "Kenya"], itemCount: 2, total: 76.5, payment: "Pending", fulfillment: "Unfulfilled", channel: "POS" },
  { id: "ORD-1039", date: "Mar 11, 2026", dateTime: "Mar 11, 2026 at 1:30 PM", customer: { initials: "NK", name: "Noah Kim", email: "noah.kim@example.com", phone: "12345671", orders: 6, since: "Aug 2025" }, address: ["Noah Kim", "91 Market Street", "Nairobi", "Kenya"], itemCount: 4, total: 210, payment: "Paid", fulfillment: "Fulfilled", channel: "Marketplace" },
  { id: "ORD-1038", date: "Mar 10, 2026", dateTime: "Mar 10, 2026 at 4:03 PM", customer: { initials: "ER", name: "Emma Ruiz", email: "emma.ruiz@example.com", phone: "12345672", orders: 1, since: "Mar 2026" }, address: ["Emma Ruiz", "41 Oak Avenue", "Nairobi", "Kenya"], itemCount: 1, total: 32, payment: "Failed", fulfillment: "Cancelled", channel: "Online store" },
  { id: "ORD-1037", date: "Mar 10, 2026", dateTime: "Mar 10, 2026 at 2:54 PM", customer: { initials: "AT", name: "Ava Torres", email: "ava.torres@example.com", phone: "12345673", orders: 5, since: "Oct 2025" }, address: ["Ava Torres", "8 King Street", "Nairobi", "Kenya"], itemCount: 2, total: 89, payment: "Paid", fulfillment: "Unfulfilled", channel: "Online store" },
  { id: "ORD-1036", date: "Mar 9, 2026", dateTime: "Mar 9, 2026 at 11:11 AM", customer: { initials: "DB", name: "Daniel Brooks", email: "daniel.brooks@example.com", phone: "12345674", orders: 7, since: "Jul 2025" }, address: ["Daniel Brooks", "71 Forest Road", "Nairobi", "Kenya"], itemCount: 3, total: 156, payment: "Paid", fulfillment: "Fulfilled", channel: "POS" },
  { id: "ORD-1035", date: "Mar 9, 2026", dateTime: "Mar 9, 2026 at 9:30 AM", customer: { initials: "JL", name: "Jordan Lee", email: "jordan.lee@example.com", phone: "12345675", orders: 2, since: "Nov 2025" }, address: ["Jordan Lee", "56 Pine Lane", "Nairobi", "Kenya"], itemCount: 1, total: 24, payment: "Paid", fulfillment: "Fulfilled", channel: "Marketplace" },
  { id: "ORD-1034", date: "Mar 8, 2026", dateTime: "Mar 8, 2026 at 6:44 PM", customer: { initials: "ZW", name: "Zoe Wong", email: "zoe.wong@example.com", phone: "12345676", orders: 3, since: "Dec 2025" }, address: ["Zoe Wong", "5 Central Avenue", "Nairobi", "Kenya"], itemCount: 2, total: 98, payment: "Paid", fulfillment: "Fulfilled", channel: "Online store" },
  { id: "ORD-1033", date: "Mar 8, 2026", dateTime: "Mar 8, 2026 at 12:09 PM", customer: { initials: "OH", name: "Olivia Hart", email: "olivia.hart@example.com", phone: "12345677", orders: 2, since: "Jan 2026" }, address: ["Olivia Hart", "30 Westlands Road", "Nairobi", "Kenya"], itemCount: 1, total: 39, payment: "Paid", fulfillment: "Unfulfilled", channel: "Online store" },
  { id: "ORD-1032", date: "Mar 7, 2026", dateTime: "Mar 7, 2026 at 4:22 PM", customer: { initials: "SM", name: "Samuel Moore", email: "samuel.moore@example.com", phone: "12345680", orders: 4, since: "Sep 2025" }, address: ["Samuel Moore", "3 Park Road", "Nairobi", "Kenya"], itemCount: 2, total: 72, payment: "Paid", fulfillment: "Fulfilled", channel: "POS" },
  { id: "ORD-1031", date: "Mar 7, 2026", dateTime: "Mar 7, 2026 at 10:02 AM", customer: { initials: "GN", name: "Grace Njeri", email: "grace.njeri@example.com", phone: "12345681", orders: 8, since: "Jun 2025" }, address: ["Grace Njeri", "12 Moi Avenue", "Nairobi", "Kenya"], itemCount: 1, total: 56, payment: "Paid", fulfillment: "Unfulfilled", channel: "Marketplace" }
];

function normalizeOrder(order) {
  const itemCount = order.itemCount || 1;
  const unit = Number((order.total / itemCount).toFixed(2));

  const base = order.items?.length ? order : {
    ...order,
    items: [{
      name: "Store item",
      variant: "Standard",
      sku: "FG-ITEM",
      quantity: itemCount,
      unitPrice: unit,
      image: "/mock-images/mug.svg"
    }],
    paymentSummary: {
      subtotal: order.total,
      discountLabel: "WELCOME",
      discount: 0,
      service: 0,
      tax: 0,
      card: "Visa ending in 4242",
      capturedAt: `Captured ${order.date}`
    }
  };

  const existing = Object.fromEntries((base.timeline || []).map((event) => [event.label, event]));
  const isReady = Boolean(base.readyConfirmed) || base.fulfillment === "Fulfilled";
  const isFulfilled = base.fulfillment === "Fulfilled";

  const timeline = [
    existing["Basket Created"] || {
      label: "Basket Created",
      detail: "",
      time: "9:38 AM",
      state: "done"
    },
    existing["Payment Completed"] || {
      label: base.payment === "Paid" ? "Payment Completed" : `Payment ${base.payment}`,
      detail: base.payment === "Paid" ? `Visa •••• 4242 · KES ${Number(base.total).toFixed(2)}` : "",
      time: "10:02 AM",
      state: "done"
    },
    existing["Being Fulfilled"] || {
      label: "Being Fulfilled",
      detail: "",
      time: "10:24 AM",
      state: base.fulfillment === "Cancelled" ? "pending" : "done"
    },
    {
      ...(existing["Ready"] || {}),
      label: "Ready",
      detail: existing["Ready"]?.detail || "Order is ready for collection",
      time: existing["Ready"]?.time || "",
      state: isReady ? "done" : "pending"
    },
    {
      ...(existing["Fulfilled"] || {}),
      label: "Fulfilled",
      detail: existing["Fulfilled"]?.detail || "Order completed",
      time: existing["Fulfilled"]?.time || "",
      state: isFulfilled ? "done" : "pending"
    }
  ];

  return { ...base, timeline };
}

export function getOrders() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return (saved?.length ? saved : defaultOrders).map(normalizeOrder);
  } catch {
    return defaultOrders.map(normalizeOrder);
  }
}

export function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function updateOrder(orderId, updater) {
  const orders = getOrders();
  const next = orders.map((order) => order.id === orderId ? updater(order) : order);
  saveOrders(next);
  return next.find((order) => order.id === orderId);
}
