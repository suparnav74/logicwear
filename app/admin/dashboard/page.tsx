"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

interface Stats {
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  totalRevenue: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => setStats(data));
  }, []);

  const cards = stats
    ? [
        { label: "Total Orders",   value: stats.totalOrders,           icon: "📦" },
        { label: "Total Products", value: stats.totalProducts,         icon: "👕" },
        { label: "Total Users",    value: stats.totalUsers,            icon: "👤" },
        { label: "Revenue",        value: `₹${stats.totalRevenue}`,   icon: "💰" },
      ]
    : [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>
      {!stats ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {cards.map((card) => (
            <div key={card.label} className="bg-white rounded-xl p-6 shadow text-center">
              <p className="text-4xl mb-2">{card.icon}</p>
              <p className="text-3xl font-bold text-gray-800">{card.value}</p>
              <p className="text-gray-500 mt-1 text-sm">{card.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}