// app/admin/dashboard/page.tsx
import {connectDB} from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
export const dynamic = "force-dynamic";

export default async function Dashboard() {
  await connectDB();

  const [totalOrders, totalProducts, totalUsers, revenueData] = await Promise.all([
    Order.countDocuments(),
    Product.countDocuments(),
    User.countDocuments({ role: "user" }),
    Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalAmount" } } }]),
  ]);

  const totalRevenue = revenueData[0]?.total || 0;

  const stats = [
    { label: "Total Orders", value: totalOrders, icon: "📦" },
    { label: "Total Products", value: totalProducts, icon: "👕" },
    { label: "Total Users", value: totalUsers, icon: "👤" },
    { label: "Revenue", value: `₹${totalRevenue}`, icon: "💰" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg p-6 shadow text-center">
            <p className="text-4xl mb-2">{stat.icon}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}