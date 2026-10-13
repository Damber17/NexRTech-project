import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  House,
  ShoppingBasket,
  ClipboardList,
  ArrowLeft,
  MapPin,
} from "lucide-react";

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
              <ArrowLeft size={19} />
            </button>
          ) : (
            <span />
          )}

          <strong>{title}</strong>
          <span />
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

  const links = [
    { path: "/home", icon: House, label: "Home" },
    { path: "/basket", icon: ShoppingBasket, label: "Basket" },
    { path: "/orders", icon: ClipboardList, label: "Orders" },
  ];

  return (
    <nav className="bottom-nav">
      {links.map(({ path, icon: Icon, label }) => (
        <button
          key={path}
          className={pathname.startsWith(path) ? "selected" : ""}
          onClick={() => navigate(path)}
        >
          <Icon size={20} />
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
}) {
  return (
    <button
      className={`primary-btn ${variant}`}
      onClick={onClick}
      disabled={disabled}
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

        <div className="muted small row">
          <MapPin size={13} />
          {shop.location} ({shop.distance})
        </div>
      </div>
    </button>
  );
}

export function ProductCard({ product, onClick }) {
  return (
    <button className="product-card" onClick={onClick}>
      <img src={product.image} alt={product.name} />

      <strong>{product.name}</strong>
      <span className="muted small">{product.unit}</span>
      <b className="orange">KSh {product.price}</b>
    </button>
  );
}