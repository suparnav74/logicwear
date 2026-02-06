import { Document } from "mongoose";
export interface IOrderItem {
  productId: string;
  title: string;
  slug: string;
  desc: string;
  image: string;
  size: string;
  color: string;
  price: number;
  availableQty: number;
}

export interface IOrder extends Document {
  userName: string;
  email: string;
  phone: string;

  address: string;
  city: string;
  state: string;
  pincode: string;

  items: IOrderItem[];

  subtotal: number;
  shippingFee: number;
  totalAmount: number;

  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed";

  orderStatus: "processing" | "shipped" | "delivered" | "cancelled";

  createdAt: Date;
}