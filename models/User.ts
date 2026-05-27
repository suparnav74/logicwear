import mongoose from "mongoose";
import { Schema } from "mongoose";
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    phone: { type: String},
    address: { type: String },
    city: { type: String},
    state: { type: String},
    pincode: { type: String },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
