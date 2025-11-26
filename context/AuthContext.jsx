"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // load on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("wavemint_token");
    const storedUser = localStorage.getItem("wavemint_user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_GATEWAY_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");

    localStorage.setItem("wavemint_token", data.token);
    localStorage.setItem("wavemint_user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("wavemint_token");
    localStorage.removeItem("wavemint_user");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

