import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/topbar.css";

export default function Topbar() {
  const { session } = useAuth();
  const location = useLocation();

  const pageName = location.pathname.includes("/merchant/products")
    ? "Products"
    : location.pathname.includes("/merchant/orders")
      ? "Orders"
      : location.pathname
          .split("/")
          .filter(Boolean)
          .pop()
          ?.replace(/-/g, " ") || "overview";

  const initials = (session?.user?.name || "AM")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="topbar">
      <div className="crumb">
        <span>Merchant workspace</span>
        <b>›</b>
        <span className="current">{pageName}</span>
      </div>

      <div className="profile-mini">
        <span className="avatar">{initials}</span>
        <span>{session?.user?.name}</span>
      </div>
    </header>
  );
}
