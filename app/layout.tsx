import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
//import Navbar from "./components/Navbar";
//import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/AuthContext";
import TopLoader from "./components/TopLoader";
import { ProductProvider } from "@/context/ProductContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Logic Wear",
  description: "Your one-stop shop for all things tech and fashion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <script
        type="application/javascript"
        src={`https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/${process.env.PAYTM_MID}.js`}
        async
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProductProvider>
        <AuthProvider>
          <ToastContainer position="bottom-right" autoClose={900} />
          {/* <Navbar /> */}
          <TopLoader />
          {children}
          {/* <Footer /> */}
        </AuthProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
