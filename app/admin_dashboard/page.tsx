"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
type Product = {
  name: string;
  price: number;
  stock: number;
};

export default function LogicWearAdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([
    { name: "Black Hoodie", price: 1999, stock: 12 },
    { name: "Code T-Shirt", price: 999, stock: 30 },
  ]);
  const [orders, setOrders] = useState([
    { id: "LW001", customer: "Rahul", amount: 1299, status: "Pending" },
    { id: "LW002", customer: "Priya", amount: 2199, status: "Shipped" },
  ]);

  const [form, setForm] = useState<Product>({ name: "", price: 0, stock: 0 });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const revenueData = [
    { month: "Jan", revenue: 40000 },
    { month: "Feb", revenue: 30000 },
    { month: "Mar", revenue: 50000 },
    { month: "Apr", revenue: 45000 },
  ];

  const saveProduct = () => {
    if (editIndex !== null) {
      const updated = [...products];
      updated[editIndex] = form;
      setProducts(updated);
      setEditIndex(null);
    } else {
      setProducts([...products, form]);
    }
    setForm({ name: "", price: 0, stock: 0 });
    setOpen(false);
  };

  const editProduct = (index:number) => {
    setForm(products[index]);
    setEditIndex(index);
    setOpen(true);
  };

  const deleteProduct = (index:number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const updateOrderStatus = (index:number, value:string) => {
    const updated = [...orders];
    updated[index].status = value;
    setOrders(updated);
  };

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background p-6 space-y-6">
        <h2 className="text-2xl font-bold">Logic Wear</h2>
        <div className="space-y-2">
          {["dashboard", "products", "orders", "customers"].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              className="w-full justify-start capitalize"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 space-y-8">
        {activeTab === "dashboard" && (
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {activeTab === "products" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Product Management</CardTitle>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button>Add Product</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editIndex !== null ? "Edit Product" : "Add Product"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Product Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    />
                    <Input
                      type="number"
                      placeholder="Stock"
                      value={form.stock}
                      onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                    />
                    <Button onClick={saveProduct} className="w-full">
                      Save
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border p-4 rounded-xl"
                  >
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ₹{product.price} | Stock: {product.stock}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <Button
                        variant="secondary"
                        onClick={() => editProduct(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => deleteProduct(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "orders" && (
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border p-4 rounded-xl"
                >
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer} | ₹{order.amount}
                    </p>
                  </div>
                  <Select
                    value={order.status}
                    onValueChange={(value) => updateOrderStatus(index, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
