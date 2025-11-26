"use client";

import AdminOnly from "@/components/AdminOnly";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function AdminPage() {
  return (
    <AdminOnly>
      <Sidebar />
      <Topbar />

      <main className="ml-60 mt-16 p-8 text-white">
        <h1 className="text-4xl font-bold mb-6 text-red-400">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-700">
            <h2 className="text-xl font-bold mb-4">User Management</h2>
            <p className="opacity-60">Coming soon…</p>
          </div>

          <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-700">
            <h2 className="text-xl font-bold mb-4">System Controls</h2>
            <p className="opacity-60">Manage processing, limits, and more.</p>
          </div>
        </div>
      </main>
    </AdminOnly>
  );
}
