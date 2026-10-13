import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Screen,
  PrimaryButton,
} from "../components/common/UI";

import { products, money } from "../data";
import { useStore } from "../context/StoreContext";

import "../styles/ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { add } = useStore();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <Screen title="Product Details" back>
        <p>Product not found.</p>
      </Screen>
    );
  }

  const handleAddToBasket = () => {
    for (let i = 0; i < quantity; i++) {
      add(product.id);
    }

    navigate("/basket");
  };

  return (
    <Screen title="Product Details" back>
      <img
        className="detail-photo"
        src={product.image}
        alt={product.name}
      />

      <div className="row between">
        <h2>{product.name}</h2>

        <b className="orange">
          {money(product.price)}
        </b>
      </div>

      <p className="muted small">
        {product.unit} · Available in stock
      </p>

      <div className="panel">
        <h3 className="card-title">Description</h3>

        <p className="muted small">
          Fresh, high-quality {product.name.toLowerCase()}
          from Naivas Supermarket.
        </p>
      </div>

      <div className="row between product-quantity">
        <strong>Quantity</strong>

        <div className="row">
          <button
            onClick={() =>
              setQuantity((previous) =>
                Math.max(1, previous - 1)
              )
            }
          >
            −
          </button>

          <b>{quantity}</b>

          <button
            onClick={() =>
              setQuantity((previous) => previous + 1)
            }
          >
            +
          </button>
        </div>
      </div>

      <PrimaryButton onClick={handleAddToBasket}>
        Add to Basket · {money(product.price * quantity)}
      </PrimaryButton>
    </Screen>
  );
}