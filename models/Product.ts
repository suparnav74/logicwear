import mongoose, { Schema, Document } from "mongoose";

export interface Variant {
  sku: string;
  size: string;
  color: string;
  price: number;
  availableQty: number;
}

export interface ProductDocument extends Document {
  title: string;
  slug: string;
  desc: string;
  category: string;
  image: string;
  variants: Variant[];
}

const VariantSchema = new Schema<Variant>({
  sku: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  availableQty: { type: Number, required: true },
});

const ProductSchema = new Schema<ProductDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    variants: [VariantSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<ProductDocument>("Product", ProductSchema);

