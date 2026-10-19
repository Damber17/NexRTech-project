import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Minus, ShoppingBasket } from "lucide-react";

import { EmptyState, PrimaryButton, Screen } from "../components/common/UI";
import { useStore } from "../context/StoreContext";

import "../styles/BasketFlow.css";

const getMerchantId = (merchant) => merchant?._id || merchant?.id;

export default function AddBasketItem() {
  const navigate = useNavigate();
  const {
    baskets,
    pendingBasketItem,
    updatePendingBasketItemQuantity,
    addPendingItemToBasket
  } = useStore();
  const [quantity, setQuantity] = useState(pendingBasketItem?.quantity || 1);
  const [selectedBasketId, setSelectedBasketId] = useState(null);

  if (!pendingBasketItem) {
    return (
      <Screen title="Add item" back>
        <EmptyState
          icon="🧺"
          title="No item selected"
          description="Choose a product first, then select which basket to add it to."
          action="Browse products"
          onAction={() => navigate("/home")}
        />
      </Screen>
    );
  }

  const { product, merchant } = pendingBasketItem;
  const productMerchantId = getMerchantId(merchant);
  const availableBaskets = baskets.filter((savedBasket) => {
    const savedMerchantId = getMerchantId(savedBasket.merchant);
    return !productMerchantId || String(savedMerchantId) === String(productMerchantId);
  });
  const selectedBasket = availableBaskets.find(
    (savedBasket) => savedBasket._id === selectedBasketId
  ) || availableBaskets[0];
  const unitKes = Number(product.price?.kes || product.price || 0);
  const unitAud = Number(product.price?.aud || 0);
  const itemTotalKes = (unitKes * quantity).toFixed(2);
  const itemTotalAud = (unitAud * quantity).toFixed(2);

  const handleAddToBasket = () => {
    if (selectedBasket && addPendingItemToBasket(selectedBasket._id, quantity)) {
      navigate("/basket");
    }
  };

  const changeQuantity = (nextQuantity) => {
    setQuantity(nextQuantity);
    updatePendingBasketItemQuantity(nextQuantity);
  };

  return (
    <Screen title="Add item" back>
      <p className="basket-flow-subtitle">Choose a quantity and a basket.</p>

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

      <div className="basket-flow-section basket-flow-list-section">
        <strong>Add to which basket?</strong>
        {availableBaskets.length > 0 ? (
          <div className="basket-flow-list">
            {availableBaskets.map((savedBasket) => {
              const isSelected = savedBasket._id === selectedBasket?._id;
              return (
                <button
                  type="button"
                  key={savedBasket._id}
                  className={`basket-choice${isSelected ? " selected" : ""}`}
                  onClick={() => setSelectedBasketId(savedBasket._id)}
                  aria-pressed={isSelected}
                >
                  <span className={`basket-choice-radio${isSelected ? " checked" : ""}`} />
                  <span className="basket-choice-content">
                    <strong>{savedBasket.basket_name}</strong>
                    <small>
                      {savedBasket.merchant?.business_name ||
                        savedBasket.merchant?.name ||
                        "Merchant"}
                    </small>
                    <span className="basket-choice-summary">
                      <span>{savedBasket.item_count} items</span>
                      <b>
                        Total: KSh {savedBasket.subtotal.kes}
                        {Number(savedBasket.subtotal.aud) > 0 &&
                          ` · ≈ AUD ${savedBasket.subtotal.aud}`}
                      </b>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="basket-flow-empty">
            No existing baskets for this merchant. Create one to add this item.
          </p>
        )}
      </div>

      {availableBaskets.length > 0 && (
        <PrimaryButton onClick={handleAddToBasket}>
          <ShoppingBasket size={16} style={{ verticalAlign: "middle", marginRight: 8 }} />
          Add to selected basket
        </PrimaryButton>
      )}

      <button
        type="button"
        className="basket-flow-create-button"
        onClick={() => navigate("/basket/create")}
      >
        <Plus size={17} />
        Create a new basket
      </button>

      <p className="basket-flow-item-total">
        Item total: <strong>KSh {itemTotalKes}</strong>
        {unitAud > 0 && <span> · ≈ AUD {itemTotalAud}</span>}
      </p>
    </Screen>
  );
}
