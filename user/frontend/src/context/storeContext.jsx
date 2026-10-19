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
    items: store.basket.items,
    itemCount: store.basket.item_count,
    subtotal: store.basket.subtotal,
    serviceCharge: store.basket.service_charge,
    total: store.basket.total,
    merchant: store.basket.merchant,
    addToBasket: store.addToBasket,
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

  // Active basket state
  const [basketItems, setBasketItems] = useState([
    {
      product_id: "1",
      name: "Fresh Milk (500ml)",
      unit_label: "500ml bottle",
      product_image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=700",
      quantity: 2,
      unit_price: { kes: "57.00", aud: "0.63" },
      line_total: { kes: "114.00", aud: "1.26" },
      in_stock: true
    },
    {
      product_id: "2",
      name: "Sourdough Artisanal Bread",
      unit_label: "1 loaf",
      product_image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700",
      quantity: 1,
      unit_price: { kes: "400.00", aud: "4.43" },
      line_total: { kes: "400.00", aud: "4.43" },
      in_stock: true
    }
  ]);

  const [basketMerchant, setBasketMerchant] = useState({
    _id: "1",
    id: "1",
    business_name: "SupaMart Grocers",
    address: "Moi Avenue, Nairobi"
  });

  const [orders, setOrders] = useState(initialOrders);
  const [currentOrder, setCurrentOrder] = useState(initialOrders[0]);

  // Derived basket calculations
  const basket = useMemo(() => {
    const itemCount = basketItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotalKesNum = basketItems.reduce(
      (acc, item) => acc + parseFloat(item.line_total.kes),
      0
    );
    const subtotalAudNum = basketItems.reduce(
      (acc, item) => acc + parseFloat(item.line_total.aud),
      0
    );

    const serviceKesNum = basketItems.length > 0 ? 50.0 : 0.0;
    const serviceAudNum = basketItems.length > 0 ? 0.55 : 0.0;

    const totalKesNum = subtotalKesNum + serviceKesNum;
    const totalAudNum = subtotalAudNum + serviceAudNum;

    return {
      _id: "1",
      public_id: "BK-1234",
      basket_name: "Weekly groceries",
      status: "open",
      merchant: basketMerchant,
      items: basketItems,
      item_count: itemCount,
      subtotal: {
        kes: subtotalKesNum.toFixed(2),
        aud: subtotalAudNum.toFixed(2)
      },
      service_charge: {
        kes: serviceKesNum.toFixed(2),
        aud: serviceAudNum.toFixed(2)
      },
      total: {
        kes: totalKesNum.toFixed(2),
        aud: totalAudNum.toFixed(2)
      },
      fx_rate: "90.30"
    };
  }, [basketItems, basketMerchant]);

  // Basket actions
  const addToBasket = (product, qty = 1, merchant = null) => {
    if (merchant) {
      setBasketMerchant(merchant);
    }
    setBasketItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.product_id === (product._id || product.id));
      const unitKes = parseFloat(product.price?.kes || product.price || 0);
      const unitAud = parseFloat(product.price?.aud || 0);

      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = next[existingIndex].quantity + qty;
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: newQty,
          line_total: {
            kes: (unitKes * newQty).toFixed(2),
            aud: (unitAud * newQty).toFixed(2)
          }
        };
        return next;
      } else {
        const newItem = {
          product_id: product._id || product.id,
          name: product.name,
          unit_label: product.unit_label || product.unit || "",
          product_image: product.product_image || product.image || "",
          quantity: qty,
          unit_price: {
            kes: unitKes.toFixed(2),
            aud: unitAud.toFixed(2)
          },
          line_total: {
            kes: (unitKes * qty).toFixed(2),
            aud: (unitAud * qty).toFixed(2)
          },
          in_stock: product.in_stock !== false
        };
        return [...prev, newItem];
      }
    });
  };

  const updateQuantity = (productId, newQty) => {
    setBasketItems((prev) => {
      if (newQty < 1) {
        return prev.filter((i) => i.product_id !== productId);
      }
      return prev.map((item) => {
        if (item.product_id === productId) {
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
        }
        return item;
      });
    });
  };

  const removeFromBasket = (productId) => {
    setBasketItems((prev) => prev.filter((i) => i.product_id !== productId));
  };

  const clearBasket = () => {
    setBasketItems([]);
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
        addToBasket,
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