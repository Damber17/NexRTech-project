import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("merchant_token");

    if (!token) {
      setLoading(false);
      return;
    }

    api("/auth/me")
      .then((data) => setSession(data))
      .catch(() => localStorage.removeItem("merchant_token"))
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const data = await api("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem("merchant_token", data.token);
    setSession({
      user: data.user,
      merchant: data.merchant,
    });

    return data;
  }

  async function register(payload) {
    const data = await api("/auth/register-merchant", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    localStorage.setItem("merchant_token", data.token);
    setSession({
      user: data.user,
      merchant: data.merchant,
    });

    return data;
  }

  function setSessionData(data) {
    setSession((previousSession) => ({
      ...previousSession,
      ...data,
    }));
  }

  function logout() {
    localStorage.removeItem("merchant_token");
    setSession(null);
  }

  const value = {
    session,
    loading,
    login,
    register,
    logout,
    setSessionData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
