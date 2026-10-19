import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  House,
  ShoppingBasket,
  ClipboardList,
  ArrowLeft,
  MapPin,
  Plus,
} from "lucide-react";

import { useStore } from "../../context/StoreContext";
import "../../styles/Base.css";

export function Screen({
  children,
  title,
  back = false,
  nav = true,
}) {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <div className="phone-status">
        <span>9:41</span>
        <span>▰ ◕ ▰</span>
      </div>

      {title && (
        <header className="screen-header">
          {back ? (
            <button
              className="icon-btn"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
          ) : (
            <span style={{ width: 20 }} />
          )}

          <strong>{title}</strong>
          <span style={{ width: 20 }} />
        </header>
      )}

      <main className="screen-main">{children}</main>

      {nav && <BottomNav />}

      <div className="home-indicator" />
    </div>
  );
}

export function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { basket } = useStore();

  const itemCount = basket?.item_count || 0;

  const links = [
    { path: "/home", icon: House, label: "Home" },
    { path: "/basket", icon: ShoppingBasket, label: "Basket", badge: itemCount },
    { path: "/orders", icon: ClipboardList, label: "Orders" },
  ];

  return (
    <nav className="bottom-nav">
      {links.map(({ path, icon: Icon, label, badge }) => (
        <button
          key={path}
          className={pathname.startsWith(path) ? "selected" : ""}
          onClick={() => navigate(path)}
          style={{ position: "relative" }}
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            <Icon size={20} />
            {badge > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -10,
                  background: "#e48700",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 700,
                  borderRadius: "10px",
                  padding: "1px 5px",
                  minWidth: "16px",
                  textAlign: "center",
                  border: "2px solid white"
                }}
              >
                {badge}
              </span>
            )}
          </div>
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled = false,
  variant = "",
  style = {},
  type = "button"
}) {
  return (
    <button
      type={type}
      className={`primary-btn ${variant}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
}

export function EmptyState({
  icon = "🛍️",
  title,
  description,
  action,
  onAction,
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>

      <h2>{title}</h2>
      <p>{description}</p>

      {action && (
        <PrimaryButton onClick={onAction}>
          {action}
        </PrimaryButton>
      )}
    </div>
  );
}

export function ShopCard({ shop, onClick }) {
  return (
    <button className="shop-card" onClick={onClick}>
      <img src={shop.image} alt={shop.name} />

      <div className="shop-info">
        <div className="row between">
          <strong>{shop.name}</strong>
          <small className="pill">{shop.category}</small>
        </div>

        <div className="muted small row" style={{ marginTop: "6px" }}>
          <MapPin size={13} color="#e48700" />
          <span>{shop.location} {shop.distance ? `(${shop.distance})` : ""}</span>
        </div>
      </div>
    </button>
  );
}

export function ProductCard({ product, onClick, onAddToBasket }) {
  const displayPrice = product.price?.kes || product.price;
  const displayAud = product.price?.aud;
  const isOutOfStock = product.in_stock === false;

  return (
    <div
      className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`} 
    >
      <button
        type="button"
        className="product-card-main"
        onClick={onClick}
        disabled={isOutOfStock}
      >
        <div className="product-card-image">
          <img src={product.image} alt={product.name} />
          {isOutOfStock && <span className="product-card-stock-label">Out of Stock</span>}
        </div>

        <strong>{product.name}</strong>
        <span className="muted small">{product.unit}</span>
      </button>

      <div className="product-card-footer">
        <button
          type="button"
          className="product-card-price"
          onClick={onClick}
          disabled={isOutOfStock}
        >
          <b className="orange">
            KSh {displayPrice}
            {displayAud && <span className="aud-price">≈ AUD {displayAud}</span>}
          </b>
        </button>
        <button
          type="button"
          className="product-card-add"
          onClick={() => onAddToBasket?.()}
          disabled={isOutOfStock}
          aria-label={`Add ${product.name} to basket`}
          title="Add to basket"
        >
          <Plus size={21} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}