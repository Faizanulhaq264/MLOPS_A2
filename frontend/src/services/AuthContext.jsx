import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);
const AUTH_URL =
  import.meta.env.VITE_AUTH_URL || "http://auth-service.local:4000";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);        // { email, token }
  const [loading, setLoading] = useState(true);

  // Try to rehydrate auth state from localStorage on first load
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("${AUTH_URL}/login", {
      email,
      password,
    });
    const payload = { email: res.data.email, token: res.data.token };
    localStorage.setItem("auth", JSON.stringify(payload));
    setUser(payload);
  };

  const signup = async (email, password) => {
    await axios.post("${AUTH_URL}/signup", { email, password });
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
