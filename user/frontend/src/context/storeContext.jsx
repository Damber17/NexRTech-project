import React, {
  createContext,
  useContext,
  useState,
  useMemo
} from "react";

import {
  merchants as initialMerchants,
  products as initialProducts,
  initialOrders
} from "../data";

const StoreContext = createContext(null);

const createBasketItem = (product, quantity) => {
  const unitKes = parseFloat(product.price?.kes || product.price || 0);
  const unitAud = parseFloat(product.price?.aud || 0);

  return {
    product_id: product._id || product.id,
    name: product.name,
    unit_label: product.unit_label || product.unit || "",
    product_image: product.product_image || product.image || "",
    quantity,
    unit_price: {
      kes: unitKes.toFixed(2),
      aud: unitAud.toFixed(2)
    },
    line_total: {
      kes: (unitKes * quantity).toFixed(2),
      aud: (unitAud * quantity).toFixed(2)
    },
    in_stock: product.in_stock !== false
  };
};

const addProductToItems = (items, product, quantity) => {
  const productId = product._id || product.id;
  const existingIndex = items.findIndex(
    (item) => String(item.product_id) === String(productId)
  );

  if (existingIndex === -1) {
    return [...items, createBasketItem(product, quantity)];
  }

  const nextItems = [...items];
  const item = nextItems[existingIndex];
  const newQuantity = item.quantity + quantity;
  const unitKes = parseFloat(item.unit_price.kes);
  const unitAud = parseFloat(item.unit_price.aud);
  nextItems[existingIndex] = {
    ...item,
    quantity: newQuantity,
    line_total: {
      kes: (unitKes * newQuantity).toFixed(2),
      aud: (unitAud * newQuantity).toFixed(2)
    }
  };
  return nextItems;
};

const getBasketTotals = (items) => {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotalKes = items.reduce(
    (total, item) => total + parseFloat(item.line_total.kes),
    0
  );
  const subtotalAud = items.reduce(
    (total, item) => total + parseFloat(item.line_total.aud),
    0
  );
  const serviceKes = items.length > 0 ? 50 : 0;
  const serviceAud = items.length > 0 ? 0.55 : 0;

  return {
    item_count: itemCount,
    subtotal: { kes: subtotalKes.toFixed(2), aud: subtotalAud.toFixed(2) },
    service_charge: { kes: serviceKes.toFixed(2), aud: serviceAud.toFixed(2) },
    total: {
      kes: (subtotalKes + serviceKes).toFixed(2),
      aud: (subtotalAud + serviceAud).toFixed(2)
    }
  };
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

// Aliases for compatibility
export const useBasket = () => {
  const store = useStore();
  return {
    basket: store.basket,
    baskets: store.baskets,
    items: store.basket.items,
    itemCount: store.basket.item_count,
    subtotal: store.basket.subtotal,
    serviceCharge: store.basket.service_charge,
    total: store.basket.total,
    merchant: store.basket.merchant,
    addToBasket: store.addToBasket,
    beginAddToBasket: store.beginAddToBasket,
    updateQuantity: store.updateQuantity,
    removeFromBasket: store.removeFromBasket,
    clearBasket: store.clearBasket,
  };
};

export const useAuth = () => {
  const store = useStore();
  return {
    user: store.user,
    updateUser: store.updateUser,
    logout: store.logout,
  };
};

export function StoreProvider({ children }) {
  // Current logged in user
  const [user, setUser] = useState({
    _id: "1",
    name: "Ngawang Pema",
    username: "ngawang",
    email: "ngawang.pema@example.com",
    whatsapp_number: "+61 412 345 678",
    roles: ["payer", "recipient"],
    country: "AU",
    user_image: "https://i.pravatar.cc/100?img=47",
    account_status: "active",
    kyc_status: "verified",
    created_at: "2026-10-01T08:00:00.000Z"
  });

  const [merchants] = useState(initialMerchants);
  const [products] = useState(initialProducts);

  const [basketList, setBasketList] = useState([{
    _id: "1",
    public_id: "BK-1234",
    basket_name: "Weekly groceries",
    status: "open",
    merchant: merchants[0],
    items: [
      createBasketItem(products[0], 2),
      createBasketItem(products[1], 1)
    ],
    fx_rate: "90.30"
  }]);
  const [activeBasketId, setActiveBasketId] = useState("1");
  const [pendingBasketItem, setPendingBasketItem] = useState(null);

  const [orders, setOrders] = useState(initialOrders);
  const [currentOrder, setCurrentOrder] = useState(initialOrders[0]);

  const baskets = useMemo(() => basketList.map((savedBasket) => ({
    ...savedBasket,
    ...getBasketTotals(savedBasket.items)
  })), [basketList]);
  const basket = baskets.find((savedBasket) => savedBasket._id === activeBasketId) || baskets[0];

  // Basket actions
  const beginAddToBasket = (product, quantity = 1, merchant = null) => {
    if (product.in_stock === false) return;
    setPendingBasketItem({ product, quantity, merchant });
  };

  const updatePendingBasketItemQuantity = (quantity) => {
    setPendingBasketItem((pendingItem) => (
      pendingItem ? { ...pendingItem, quantity } : pendingItem
    ));
  };

  const addToBasket = (product, quantity = 1, merchant = null, basketId = activeBasketId) => {
    if (product.in_stock === false) return;
    setBasketList((prev) => prev.map((savedBasket) => (
      savedBasket._id === basketId
        ? {
            ...savedBasket,
            merchant: savedBasket.merchant || merchant,
            items: addProductToItems(savedBasket.items, product, quantity)
          }
        : savedBasket
    )));
    setActiveBasketId(basketId);
  };

  const addPendingItemToBasket = (basketId, quantity = pendingBasketItem?.quantity || 1) => {
    if (!pendingBasketItem) return false;
    const targetBasket = basketList.find((savedBasket) => savedBasket._id === basketId);
    if (!targetBasket) return false;

    setBasketList((prev) => prev.map((savedBasket) => (
      savedBasket._id === basketId
        ? {
            ...savedBasket,
            items: addProductToItems(savedBasket.items, pendingBasketItem.product, quantity)
          }
        : savedBasket
    )));
    setActiveBasketId(basketId);
    setPendingBasketItem(null);
    return true;
  };

  const createBasketWithPendingItem = (name, quantity = pendingBasketItem?.quantity || 1) => {
    if (!pendingBasketItem || !name.trim()) return false;
    const id = `basket-${Date.now()}`;
    const newBasket = {
      _id: id,
      public_id: `BK-${id.slice(-6)}`,
      basket_name: name.trim(),
      status: "open",
      merchant: pendingBasketItem.merchant,
      items: [createBasketItem(pendingBasketItem.product, quantity)],
      fx_rate: "90.30"
    };
    setBasketList((prev) => [...prev, newBasket]);
    setActiveBasketId(id);
    setPendingBasketItem(null);
    return true;
  };

  const updateQuantity = (productId, newQty) => {
    setBasketList((prev) => prev.map((savedBasket) => {
      if (savedBasket._id !== activeBasketId) return savedBasket;
      const items = newQty < 1
        ? savedBasket.items.filter((item) => String(item.product_id) !== String(productId))
        : savedBasket.items.map((item) => {
            if (String(item.product_id) !== String(productId)) return item;
            const unitKes = parseFloat(item.unit_price.kes);
            const unitAud = parseFloat(item.unit_price.aud);
            return {
              ...item,
              quantity: newQty,
              line_total: {
                kes: (unitKes * newQty).toFixed(2),
                aud: (unitAud * newQty).toFixed(2)
              }
            };
          });
      return { ...savedBasket, items };
    }));
  };

  const removeFromBasket = (productId) => {
    updateQuantity(productId, 0);
  };

  const clearBasket = () => {
    setBasketList((prev) => prev.map((savedBasket) => (
      savedBasket._id === activeBasketId
        ? { ...savedBasket, items: [] }
        : savedBasket
    )));
  };

  // Orders actions
  const createOrder = ({ payer = "self", recipient_phone = "", payer_phone = "" }) => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newId = String(orders.length + 1);
    const publicId = `GR-${randomSuffix}`;

    const newOrder = {
      _id: newId,
      id: newId,
      public_id: publicId,
      shop: basket.merchant.business_name,
      merchant: {
        _id: basket.merchant._id || "1",
        business_name: basket.merchant.business_name,
        address: basket.merchant.address || "Moi Avenue, Nairobi",
        phone: "+254 712 345 678"
      },
      payer: {
        name: user.name,
        whatsapp_number_masked: payer_phone || "+61 4•• ••• 678"
      },
      recipient: {
        name: "Amina Otieno",
        whatsapp_number_masked: recipient_phone || "+254 7•• ••• 678"
      },
      items: [...basket.items],
      item_count: basket.item_count,
      subtotal: { ...basket.subtotal },
      service_charge: { ...basket.service_charge },
      total: { ...basket.total },
      status: payer === "self" ? "preparing" : "payment_requested",
      status_label: payer === "self" ? "Being Fulfilled" : "Payment Requested",
      my_role: "payer",
      created_at: new Date().toISOString(),
      date: "Today, Just now",
      collection_code: `C${Math.floor(100 + Math.random() * 900)}X`,
      fulfillment: {
        status: "preparing",
        collection_code: `C${Math.floor(100 + Math.random() * 900)}X`,
        estimated_ready_at: "45 mins",
        driver_name: "John Kamau",
        driver_phone: "+254 700 123 456"
      },
      timeline: [
        { key: "basket_created", label: "Basket Created", state: "done", at: "Just now" },
        { key: "payment_completed", label: "Payment Completed", state: payer === "self" ? "done" : "upcoming", at: payer === "self" ? "Just now" : null },
        { key: "preparing", label: "Preparing Order", state: payer === "self" ? "current" : "upcoming", at: null },
        { key: "received", label: "Received", state: "upcoming", at: null }
      ],
      actions: {
        can_pay: payer !== "self",
        can_cancel: true,
        can_mark_received: payer === "self"
      }
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearBasket();
    return newOrder;
  };

  const getOrder = (id) => {
    return (
      orders.find((o) => o._id === id || o.id === id || o.public_id === id) ||
      currentOrder ||
      orders[0]
    );
  };

  const markOrderReceived = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o._id === orderId || o.id === orderId) {
          return {
            ...o,
            status: "received",
            status_label: "Received",
            timeline: o.timeline.map((t) => ({ ...t, state: "done" })),
            actions: { ...o.actions, can_mark_received: false }
          };
        }
        return o;
      })
    );
  };

  const updateUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const logout = () => {
    localStorage.removeItem("token");
    // Keep user state reset
  };

  return (
    <StoreContext.Provider
      value={{
        user,
        updateUser,
        logout,
        merchants,
        products,
        basket,
        baskets,
        pendingBasketItem,
        addToBasket,
        beginAddToBasket,
        updatePendingBasketItemQuantity,
        addPendingItemToBasket,
        createBasketWithPendingItem,
        updateQuantity,
        removeFromBasket,
        clearBasket,
        orders,
        currentOrder,
        createOrder,
        getOrder,
        markOrderReceived,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}