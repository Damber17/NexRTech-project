import {
  BarChart3,
  CircleHelp,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/sidebar.css";

export default function Sidebar() {
  const { session } = useAuth();
  const merchant = session?.merchant;

  const navigationItems = [
    ["/merchant/overview", "Overview", LayoutDashboard],
    ["/merchant/orders", "Orders", ShoppingBag],
    ["/merchant/products", "Products", Package],
    ["/merchant/analytics", "Analytics", BarChart3],
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="merchant-brand">
          <span className="merchant-brand-icon">↔</span>
          <strong>{merchant?.business_name || "Merchant"}</strong>
        </div>

        <div className="sidebar-label">WORKSPACE</div>

        <nav>
          {navigationItems.map(([to, label, Icon]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `side-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={16} />
              <span>{label}</span>
              {label === "Orders" && <small className="side-count">12</small>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div>
        <NavLink to="/merchant/settings" className="side-link">
          <Settings size={16} />
          <span>Settings</span>
        </NavLink>

        <a className="side-link" href="#help">
          <CircleHelp size={16} />
          <span>Help & resources</span>
        </a>
      </div>
    </aside>
  );
}
