import { Store } from "lucide-react";
import "../../styles/logo.css";

export default function Logo({ compact = false }) {
  return (
    <div className={`logo ${compact ? "compact" : ""}`}>
      <span className="logo-mark">
        <Store size={16} />
      </span>

      <span>Commerce Orchestration</span>
    </div>
  );
}
