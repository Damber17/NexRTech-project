// Mock data matching the Prototype & API Contract

export const merchants = [
  {
    id: "1",
    _id: "1",
    name: "SupaMart Grocers",
    business_name: "SupaMart Grocers",
    category: "Groceries",
    location: "Moi Avenue, Nairobi",
    address: "Moi Avenue, Nairobi",
    distance: "1.2 km",
    distance_km: 1.2,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900",
    phone: "+254 712 345 678",
    rating: 4.8,
  },
  {
    id: "2",
    _id: "2",
    name: "Fresh Market",
    business_name: "Fresh Market",
    category: "Groceries",
    location: "Parklands, Nairobi",
    address: "Parklands, Nairobi",
    distance: "2.5 km",
    distance_km: 2.5,
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=900",
    phone: "+254 722 987 654",
    rating: 4.6,
  },
  {
    id: "3",
    _id: "3",
    name: "City Bakery & Dairy",
    business_name: "City Bakery & Dairy",
    category: "Bakery",
    location: "Westlands, Nairobi",
    address: "Westlands, Nairobi",
    distance: "3.1 km",
    distance_km: 3.1,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900",
    phone: "+254 733 112 233",
    rating: 4.9,
  }
];

export const products = [
  {
    id: "1",
    _id: "1",
    merchant_id: "1",
    name: "Fresh Milk (500ml)",
    unit: "500ml bottle",
    unit_label: "500ml bottle",
    description: "Fresh, locally sourced whole milk kept cold in a sealed bottle.",
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=700",
    product_image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=700",
    price: { kes: "57.00", aud: "0.63" },
    in_stock: true,
  },
  {
    id: "2",
    _id: "2",
    merchant_id: "1",
    name: "Sourdough Artisanal Bread",
    unit: "1 loaf",
    unit_label: "1 loaf",
    description: "Freshly baked artisan sourdough bread with crispy crust and soft chewy interior.",
    category: "Bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700",
    product_image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700",
    price: { kes: "400.00", aud: "4.43" },
    in_stock: true,
  },
  {
    id: "3",
    _id: "3",
    merchant_id: "1",
    name: "Fresh Vegetables Mix",
    unit: "1 kg",
    unit_label: "1 kg",
    description: "Farm-fresh assortment of crisp spinach, carrots, bell peppers, and fresh greens.",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700",
    product_image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700",
    price: { kes: "140.00", aud: "1.55" },
    in_stock: true,
  },
  {
    id: "4",
    _id: "4",
    merchant_id: "1",
    name: "Fresh Farm Eggs",
    unit: "12 pcs",
    unit_label: "12 pcs",
    description: "Grade A free-range fresh farm eggs. High quality and rich golden yolks.",
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=700",
    product_image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=700",
    price: { kes: "240.00", aud: "2.66" },
    in_stock: true,
  },
  {
    id: "5",
    _id: "5",
    merchant_id: "2",
    name: "Organic Bananas",
    unit: "1 bunch (6 pcs)",
    unit_label: "1 bunch (6 pcs)",
    description: "Naturally sweet organic ripe bananas freshly harvested from local groves.",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=700",
    product_image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=700",
    price: { kes: "120.00", aud: "1.33" },
    in_stock: true,
  },
  {
    id: "6",
    _id: "6",
    merchant_id: "2",
    name: "Natural Greek Yogurt",
    unit: "500g tub",
    unit_label: "500g tub",
    description: "Rich, creamy, unsweetened Greek yogurt packed with active probiotics.",
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700",
    product_image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700",
    price: { kes: "310.00", aud: "3.43" },
    in_stock: false,
  }
];

export const initialOrders = [
  {
    _id: "1",
    id: "1",
    public_id: "GR-98312",
    shop: "SupaMart Grocers",
    merchant: {
      _id: "1",
      business_name: "SupaMart Grocers",
      address: "Moi Avenue, Nairobi",
      phone: "+254 712 345 678"
    },
    payer: {
      name: "Ngawang Pema",
      whatsapp_number_masked: "+61 4•• ••• 678"
    },
    items: [
      {
        product_id: "1",
        name: "Fresh Milk (500ml)",
        unit_label: "500ml bottle",
        product_image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=700",
        quantity: 2,
        unit_price: { kes: "57.00", aud: "0.63" },
        line_total: { kes: "114.00", aud: "1.26" }
      },
      {
        product_id: "2",
        name: "Sourdough Artisanal Bread",
        unit_label: "1 loaf",
        product_image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700",
        quantity: 1,
        unit_price: { kes: "400.00", aud: "4.43" },
        line_total: { kes: "400.00", aud: "4.43" }
      }
    ],
    item_count: 3,
    subtotal: { kes: "514.00", aud: "5.69" },
    service_charge: { kes: "50.00", aud: "0.55" },
    total: { kes: "564.00", aud: "6.24" },
    status: "preparing",
    status_label: "Preparing Order",
    my_role: "payer",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    date: "Today, 10:24 AM",
    collection_code: "K7M2QD",
    timeline: [
      { key: "basket_created", label: "Basket Created", state: "done", at: "10:24 AM" },
      { key: "payment_completed", label: "Payment Completed", state: "done", at: "10:30 AM" },
      { key: "preparing", label: "Preparing Order", state: "current", at: null },
      { key: "received", label: "Collected", state: "upcoming", at: null }
    ],
    actions: {
      can_pay: false,
      can_cancel: false,
      can_mark_received: true
    }
  },
  {
    _id: "2",
    id: "2",
    public_id: "GR-98311",
    shop: "SupaMart Grocers",
    merchant: {
      _id: "1",
      business_name: "SupaMart Grocers",
      address: "Moi Avenue, Nairobi"
    },
    payer: {
      name: "Ngawang Pema",
      whatsapp_number_masked: "+61 4•• ••• 678"
    },
    items: [
      {
        product_id: "2",
        name: "Sourdough Artisanal Bread",
        unit_label: "1 loaf",
        product_image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700",
        quantity: 1,
        unit_price: { kes: "400.00", aud: "4.43" },
        line_total: { kes: "400.00", aud: "4.43" }
      }
    ],
    item_count: 1,
    subtotal: { kes: "400.00", aud: "4.43" },
    service_charge: { kes: "0.00", aud: "0.00" },
    total: { kes: "400.00", aud: "4.43" },
    status: "received",
    status_label: "Collected",
    my_role: "payer",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    date: "Yesterday, 2:30 PM",
    collection_code: "M4X9LP",
    timeline: [
      { key: "basket_created", label: "Basket Created", state: "done", at: "Yesterday, 2:10 PM" },
      { key: "payment_completed", label: "Payment Completed", state: "done", at: "Yesterday, 2:15 PM" },
      { key: "preparing", label: "Prepared", state: "done", at: "Yesterday, 2:40 PM" },
      { key: "received", label: "Collected", state: "done", at: "Yesterday, 3:15 PM" }
    ],
    actions: {
      can_pay: false,
      can_cancel: false,
      can_mark_received: false
    }
  },
  {
    _id: "3",
    id: "3",
    public_id: "GR-98310",
    shop: "Fresh Market",
    merchant: {
      _id: "2",
      business_name: "Fresh Market",
      address: "Parklands, Nairobi"
    },
    payer: {
      name: "Ngawang Pema",
      whatsapp_number_masked: "+61 4•• ••• 678"
    },
    items: [
      {
        product_id: "3",
        name: "Fresh Vegetables Mix",
        unit_label: "1 kg",
        product_image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700",
        quantity: 1,
        unit_price: { kes: "140.00", aud: "1.55" },
        line_total: { kes: "140.00", aud: "1.55" }
      }
    ],
    item_count: 1,
    subtotal: { kes: "140.00", aud: "1.55" },
    service_charge: { kes: "40.00", aud: "0.44" },
    total: { kes: "180.00", aud: "1.99" },
    status: "cancelled",
    status_label: "Cancelled",
    my_role: "payer",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    date: "Oct 15, 2026",
    collection_code: null,
    timeline: [
      { key: "basket_created", label: "Basket Created", state: "done", at: "Oct 15, 9:00 AM" },
      { key: "cancelled", label: "Order Cancelled", state: "done", at: "Oct 15, 9:20 AM" }
    ],
    actions: {
      can_pay: false,
      can_cancel: false,
      can_mark_received: false
    }
  }
];

export const money = (amount) => {
  if (typeof amount === "object" && amount !== null) {
    return `KSh ${amount.kes}`;
  }
  return `KSh ${Number(amount || 0).toLocaleString()}`;
};