import mongoose, { Schema } from "mongoose";
import { IOrder } from "@/types/order";

const OrderSchema = new Schema<IOrder>(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },

    items: [
      {
        productId: String,
        title: String,
        slug: String,
        desc: String,
        image: String,
        size: String,
        color: String,
        price: Number,
        qty: Number,
      },
    ],

    subtotal: Number,
    shippingFee: Number,
    totalAmount: Number,

    paymentMethod: { type: String, default: "COD" },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    transactionId: { type: String },
    orderId: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);


