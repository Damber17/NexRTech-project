import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus, ShoppingBasket } from "lucide-react";

import { EmptyState, PrimaryButton, Screen } from "../components/common/UI";
import { useStore } from "../context/StoreContext";

import "../styles/BasketFlow.css";

export default function CreateBasket() {
  const navigate = useNavigate();
  const {
    pendingBasketItem,
    updatePendingBasketItemQuantity,
    createBasketWithPendingItem
  } = useStore();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(pendingBasketItem?.quantity || 1);

  if (!pendingBasketItem) {
    return (
      <Screen title="Create new basket" back>
        <EmptyState
          icon="🧺"
          title="No item to add"
          description="Select a product before creating a basket for it."
          action="Browse products"
          onAction={() => navigate("/home")}
        />
      </Screen>
    );
  }

  const { product, merchant } = pendingBasketItem;
  const unitKes = Number(product.price?.kes || product.price || 0);
  const unitAud = Number(product.price?.aud || 0);
  const totalKes = (unitKes * quantity).toFixed(2);
  const totalAud = (unitAud * quantity).toFixed(2);
  const merchantName = merchant?.business_name || merchant?.name || "Merchant";

  const handleCreateBasket = (event) => {
    event.preventDefault();
    if (createBasketWithPendingItem(name, quantity)) {
      navigate("/basket");
    }
  };

  const changeQuantity = (nextQuantity) => {
    setQuantity(nextQuantity);
    updatePendingBasketItemQuantity(nextQuantity);
  };

  return (
    <Screen title="Create new basket" back>
      <form className="basket-create-panel" onSubmit={handleCreateBasket}>
        <p className="basket-flow-subtitle">
          Name your basket and add this item.
        </p>

        <div className="basket-flow-product">
          <img src={product.product_image || product.image} alt={product.name} />
          <div className="basket-flow-product-info">
            <strong>{product.name}</strong>
            <span className="orange">
              KSh {unitKes.toFixed(2)} each
              {unitAud > 0 && ` · ≈ AUD ${unitAud.toFixed(2)} each`}
            </span>
          </div>
        </div>

        <div className="basket-flow-section">
          <strong>Quantity</strong>
          <div className="basket-flow-quantity">
            <button
              type="button"
              onClick={() => changeQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <b>{quantity}</b>
            <button
              type="button"
              onClick={() => changeQuantity(Math.min(99, quantity + 1))}
              disabled={quantity >= 99}
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <label className="basket-name-field">
          <strong>Basket name</strong>
          <input
            autoFocus
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Office essentials"
            maxLength={50}
            required
          />
        </label>
        <small className="basket-name-hint">
          Use a name that’s easy to find in your baskets.
        </small>

        <div className="basket-create-note">
          <ShoppingBasket size={16} />
          <span>
            {name.trim() || "Your new basket"} will contain {quantity} × {product.name} from {merchantName}.
          </span>
        </div>

        <div className="basket-create-total">
          <span>{quantity} items · Item subtotal</span>
          <strong>
            KSh {totalKes}
            {unitAud > 0 && ` · ≈ AUD ${totalAud}`}
          </strong>
        </div>

        <PrimaryButton type="submit" disabled={!name.trim()}>
          Create basket &amp; add {quantity} {quantity === 1 ? "item" : "items"}
        </PrimaryButton>

        <button
          type="button"
          className="basket-flow-secondary"
          onClick={() => navigate("/basket/add")}
        >
          <ArrowLeft size={14} />
          Choose an existing basket instead
        </button>
      </form>
    </Screen>
  );
}
