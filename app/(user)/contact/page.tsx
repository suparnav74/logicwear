"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm]       = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    // Replace with email API (e.g. Resend, Nodemailer, EmailJS)
    await new Promise((r) => setTimeout(r, 1000)); // simulate API call
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <main>
      {/* Hero */}
      <section className="bg-gray-800 text-white py-16 px-5 text-center">
        <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Get In Touch</p>
        <h1 className="text-4xl font-bold mb-4">We&apos;d Love to Hear From You</h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          Have a question, feedback, or just want to say hi? Drop us a message and we&apos;ll get back to you within 24 hours.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-12">

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Contact Information</h2>
          <div className="space-y-5">
            {[
              { icon: "📧", label: "Email",   value: "support@logicwear.com"   },
              { icon: "📞", label: "Phone",   value: "+91 1234567890"         },
              { icon: "📍", label: "Address", value: "Mumbai, Maharashtra, India" },
              { icon: "🕐", label: "Hours",   value: "Mon–Sat, 9am – 6pm IST"  },
            ].map((info) => (
              <div key={info.label} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg shrink-0">
                  {info.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-400">{info.label}</p>
                  <p className="font-medium text-gray-800">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="mt-10">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Follow Us</h3>
            <div className="flex gap-3">
              {[
                { label: "Instagram", href: "#" },
                { label: "Twitter",   href: "#" },
                { label: "Facebook",  href: "#" },
              ].map((s) => (
                <a key={s.label} href={s.href}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 rounded-2xl p-8">
          {submitted ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h3>
              <p className="text-gray-500 mb-6">We&apos;ll get back to you within 24 hours.</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Send a Message</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1">Name</label>
                  <input
                    type="text" placeholder="Your name" required
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 p-2.5 rounded-lg text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1">Email</label>
                  <input
                    type="email" placeholder="your@email.com" required
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-200 p-2.5 rounded-lg text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">Subject</label>
                <select
                  value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                  className="w-full border border-gray-200 p-2.5 rounded-lg text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a subject</option>
                  <option value="order">Order Issue</option>
                  <option value="return">Return / Refund</option>
                  <option value="product">Product Query</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">Message</label>
                <textarea
                  rows={4} placeholder="Write your message here..." required
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-gray-200 p-2.5 rounded-lg text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Sending...
                  </>
                ) : "Send Message →"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}