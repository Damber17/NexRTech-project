export const products = [
  {
    id: 1,
    name: "Fresh Whole Milk",
    price: 180,
    unit: "1 Litre",
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=700",
  },
  {
    id: 2,
    name: "Fresh Bread",
    price: 95,
    unit: "1 Loaf",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700",
  },
  {
    id: 3,
    name: "Fresh Vegetables",
    price: 140,
    unit: "1 kg",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700",
  },
  {
    id: 4,
    name: "Eggs",
    price: 240,
    unit: "12 pcs",
    image:
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=700",
  },
];

export const shops = [
  {
    id: 1,
    name: "Naivas Supermarket",
    category: "Groceries",
    location: "Moi Avenue Nairobi",
    distance: "2 km",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900",
  },
  {
    id: 2,
    name: "Onn The Way Supermarket",
    category: "Groceries",
    location: "Parklands",
    distance: "2.5 km",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=900",
  },
];

export const initialOrders = [
  {
    id: "ORD-1042",
    shop: "Naivas Supermarket",
    status: "Processing",
    total: 595,
    date: "Today, 10:45 AM",
  },
  {
    id: "ORD-1041",
    shop: "Onn The Way Supermarket",
    status: "Delivered",
    total: 415,
    date: "Yesterday, 4:20 PM",
  },
  {
    id: "ORD-1040",
    shop: "Naivas Supermarket",
    status: "Cancelled",
    total: 180,
    date: "Oct 10, 2026",
  },
];

export const money = (amount) =>
  `KSh ${amount.toLocaleString()}`;