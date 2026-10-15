import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/table-page.css";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { session, logout } = useAuth();

  function handleSignOut() {
    logout();
    navigate("/login");
  }

  return (
    <div className="content-page">
      <div className="page-heading">
        <div>
          <h1>Settings</h1>
          <p>Merchant account details.</p>
        </div>
      </div>

      <div className="panel settings-card">
        <p>
          <b>Business:</b> {session?.merchant?.business_name}
        </p>

        <p>
          <b>Email:</b> {session?.user?.email}
        </p>

        <p>
          <b>WhatsApp:</b> {session?.user?.whatsapp_number}
        </p>

        <p>
          <b>Verification:</b> {session?.merchant?.kyb_status}
        </p>

        <button className="outline-btn" type="button" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
}
