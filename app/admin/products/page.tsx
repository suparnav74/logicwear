// app/admin/products/page.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Variant, Product } from "@/types/product";
export const dynamic = "force-dynamic";
import { CgCloseR } from "react-icons/cg";

const EMPTY_VARIANT: Variant = {
  sku: "",
  size: "",
  color: "",
  price: 0,
  availableQty: 0,
};

const EMPTY_FORM = {
  title: "",
  slug: "",
  desc: "",
  category: "",
  imageFile: null as File | null,
  imagePreview: "",
  variants: [{ ...EMPTY_VARIANT }],
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data || []);
    console.log("Products state updated:", products);
    setLoading(false);
  };

  useEffect(() => {
    async function loadProducts() {
      await fetchProducts();
    }
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAdd = () => {
    setEditProduct(null);
    setForm({ ...EMPTY_FORM, variants: [{ ...EMPTY_VARIANT }] });
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({
      title: p.title,
      slug: p.slug,
      desc: p.desc,
      category: p.category,
      imageFile: null,
      imagePreview: p.image,
      variants: p.variants.map((v) => ({ ...v })),
    });
    setShowModal(true);
  };

  // Variant Helpers
  const updateVariant = (
    index: number,
    field: keyof Variant,
    value: string | number,
  ) => {
    setForm((prev) => {
      const updated = [...prev.variants];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, variants: updated };
    });
  };

  const addVariant = () =>
    setForm((prev) => ({
      ...prev,
      variants: [...prev.variants, { ...EMPTY_VARIANT }],
    }));

  const removeVariant = (index: number) =>
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));

  //  Submit
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("slug", form.slug);
    formData.append("desc", form.desc);
    formData.append("category", form.category);
    formData.append("variants", JSON.stringify(form.variants));
    if (form.imageFile) formData.append("image", form.imageFile);

    const url = editProduct
      ? `/api/products/${editProduct._id}`
      : "/api/products";
    const method = editProduct ? "PUT" : "POST";
    await fetch(url, { method, body: formData });

    setShowModal(false);
    fetchProducts();
  };

  //  Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  //  Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setForm((prev) => ({
      ...prev,
      title: val,
      slug:
        prev.slug === "" || prev.slug === slugify(prev.title)
          ? slugify(val)
          : prev.slug,
    }));
  };

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  const totalStock = (p: Product) =>
    p.variants.reduce((sum, v) => sum + v.availableQty, 0);

  const priceRange = (p: Product) => {
    const prices = p.variants.map((v) => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `₹${min}` : `₹${min} – ₹${max}`;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <button
          onClick={openAdd}
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          + Add Product
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by title or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-6 text-black"
      />

      {/* Table */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price Range</th>
                <th className="px-4 py-3">Variants</th>
                <th className="px-4 py-3">Total Stock</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p._id}
                  className="border-b hover:bg-gray-50 text-black"
                >
                  {/* Image */}
                  <td className="px-4 py-3">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.title}
                        width={50}
                        height={50}
                        className="rounded object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                        No img
                      </div>
                    )}
                  </td>

                  {/* Title + slug */}
                  <td className="px-4 py-3">
                    <p className="font-medium">{p.title}</p>
                    <p className="text-xs text-gray-400">/{p.slug}</p>
                  </td>

                  <td className="px-4 py-3 capitalize">{p.category}</td>
                  <td className="px-4 py-3 font-medium">{priceRange(p)}</td>

                  {/* Variant pills */}
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {p.variants.map((v, i) => (
                        <span
                          key={i}
                          className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full border border-blue-200"
                        >
                          {v.size} / {v.color}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Total stock badge */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold
                      ${totalStock(p) > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                    >
                      {totalStock(p) > 0 ? totalStock(p) : "Out of Stock"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Add / Edit Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-black">
                  {editProduct ? "Edit Product" : "Add Product"}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full p-1 transition text-2xl"
                >
                  <CgCloseR />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Product title"
                    required
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full border p-2 rounded text-black mt-1"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Slug
                  </label>
                  <input
                    type="text"
                    placeholder="product-slug"
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full border p-2 rounded text-black mt-1"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    placeholder="Product description"
                    rows={3}
                    value={form.desc}
                    onChange={(e) => setForm({ ...form, desc: e.target.value })}
                    className="w-full border p-2 rounded text-black mt-1"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full border p-2 rounded text-black mt-1"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="tshirts">Tshirts</option>
                    <option value="hoodies">Hoodies</option>
                    <option value="mugs">Mugs</option>
                    <option value="stickers">Stickers</option>
                  </select>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Product Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setForm({
                        ...form,
                        imageFile: file,
                        imagePreview: file
                          ? URL.createObjectURL(file)
                          : form.imagePreview,
                      });
                    }}
                    className="w-full border p-2 rounded text-black mt-1"
                  />
                  {form.imagePreview && (
                    <Image
                      src={form.imagePreview}
                      alt="preview"
                      width={80}
                      height={80}
                      className="mt-2 rounded object-cover border"
                    />
                  )}
                </div>

                {/* ── Variants ── */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Variants
                    </label>
                    <button
                      type="button"
                      onClick={addVariant}
                      className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      + Add Variant
                    </button>
                  </div>

                  <div className="space-y-3">
                    {form.variants.map((v, i) => (
                      <div
                        key={i}
                        className="border rounded p-3 bg-gray-50 relative"
                      >
                        {/* Remove button */}
                        {form.variants.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeVariant(i)}
                            className="absolute top-2 right-2 text-red-500 text-xs hover:underline"
                          >
                            ✕ Remove
                          </button>
                        )}

                        <p className="text-xs font-semibold text-gray-500 mb-2">
                          Variant {i + 1}
                        </p>

                        <div className="grid grid-cols-2 gap-2">
                          {/* SKU */}
                          <div>
                            <label className="text-xs text-gray-600">SKU</label>
                            <input
                              type="text"
                              placeholder="e.g. SHIRT-BLK-M"
                              required
                              value={v.sku}
                              onChange={(e) =>
                                updateVariant(i, "sku", e.target.value)
                              }
                              className="w-full border p-1.5 rounded text-black text-sm mt-0.5"
                            />
                          </div>

                          {/* Size */}
                          <div>
                            <label className="text-xs text-gray-600">
                              Size
                            </label>
                            <select
                              value={v.size}
                              onChange={(e) =>
                                updateVariant(i, "size", e.target.value)
                              }
                              className="w-full border p-1.5 rounded text-black text-sm mt-0.5"
                              required
                            >
                              <option value="">Select</option>
                              {[
                                "XS",
                                "S",
                                "M",
                                "L",
                                "XL",
                                "XXL",
                                "One Size",
                              ].map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Color */}
                          <div>
                            <label className="text-xs text-gray-600">
                              Color
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Black"
                              required
                              value={v.color}
                              onChange={(e) =>
                                updateVariant(i, "color", e.target.value)
                              }
                              className="w-full border p-1.5 rounded text-black text-sm mt-0.5"
                            />
                          </div>

                          {/* Price */}
                          <div>
                            <label className="text-xs text-gray-600">
                              Price (₹)
                            </label>
                            <input
                              type="number"
                              placeholder="0"
                              required
                              min={0}
                              value={v.price}
                              onChange={(e) =>
                                updateVariant(
                                  i,
                                  "price",
                                  Number(e.target.value),
                                )
                              }
                              className="w-full border p-1.5 rounded text-black text-sm mt-0.5"
                            />
                          </div>

                          {/* Available Qty */}
                          <div className="col-span-2">
                            <label className="text-xs text-gray-600">
                              Available Qty
                            </label>
                            <input
                              type="number"
                              placeholder="0"
                              required
                              min={0}
                              value={v.availableQty}
                              onChange={(e) =>
                                updateVariant(
                                  i,
                                  "availableQty",
                                  Number(e.target.value),
                                )
                              }
                              className="w-full border p-1.5 rounded text-black text-sm mt-0.5"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-gray-900 text-white py-2 rounded hover:bg-blue-600"
                  >
                    {editProduct ? "Update Product" : "Add Product"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 border py-2 rounded text-black hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
