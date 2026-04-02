import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { connectDB } from "../lib/db";
import User from "../models/User";
import bcrypt from "bcryptjs";

const seedAdmin = async () => {
  try {
    await connectDB();

    const existing = await User.findOne({ email: "admin@site.com" });
    if (existing) {
      console.log("Admin already exists!");
      process.exit(0);
    }

    const hashed = await bcrypt.hash("admin@123", 10);

    await User.create({
      name: "Admin",
      email: "admin@site.com",
      password: hashed,
      role: "admin",
      phone: "9999999999",
      address: "Admin Address",
      city: "Bangalore",
      state: "karnataka",
      pincode: "208001",
    });

    console.log("✅ Admin created!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();

//run with: node scripts/seedAdmin.ts
