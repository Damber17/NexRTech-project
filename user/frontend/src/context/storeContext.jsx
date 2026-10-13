import React, {
  createContext,
  useContext,
  useState,
} from "react";

import { initialOrders, products } from "../data";

const StoreContext = createContext(null);

export const useStore = () => useContext(StoreContext);

export function StoreProvider({ children }) {
  const [basket, setBasket] = useState([
    { id: 1, qty: 2 },
    { id: 2, qty: 1 },
  ]);

  const [orders, setOrders] = useState(initialOrders);

  const [paymentMethod, setPaymentMethod] = useState("M-Pesa");

  const [lastOrder, setLastOrder] = useState(null);

  const add = (id) => {
    setBasket((previous) => {
      const existing = previous.find((item) => item.id === id);

      if (existing) {
        return previous.map((item) =>
          item.id === id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...previous, { id, qty: 1 }];
    });
  };

  const update = (id, change) => {
    setBasket((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty + change }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const items = basket.map((item) => ({
    ...products.find((product) => product.id === item.id),
    qty: item.qty,
  }));

  const subtotal = items.reduce(
    (sum, product) => sum + product.price * product.qty,
    0
  );

  const delivery = basket.length ? 80 : 0;

  const total = subtotal + delivery;

  const placeOrder = () => {
    const order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      shop: "Naivas Supermarket",
      status: "Processing",
      total,
      date: new Date().toLocaleString(),
    };

    setOrders((previous) => [order, ...previous]);
    setLastOrder(order);
    setBasket([]);

    return order;
  };

  return (
    <StoreContext.Provider
      value={{
        basket,
        items,
        subtotal,
        delivery,
        total,
        orders,
        lastOrder,
        paymentMethod,
        setPaymentMethod,
        add,
        update,
        placeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}