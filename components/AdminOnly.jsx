"use client";

import { useAuth } from "@/context/AuthContext";

export default function AdminOnly({ children }) {
  const { role } = useAuth();

  if (role !== "admin") {
    return (
      <div className="text-white p-10 text-center">
        <h2 className="text-3xl font-bold">Access Restricted</h2>
        <p className="opacity-60 mt-4">You must be an administrator.</p>
      </div>
    );
  }

  return children;
}
