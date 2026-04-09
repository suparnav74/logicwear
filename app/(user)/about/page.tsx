import React from 'react'

const About = () => {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gray-800 text-white py-20 px-5 text-center">
        <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Our Story</p>
        <h1 className="text-4xl font-bold mb-4">We Are More Than a Store</h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Born from a passion for creativity and self-expression, we craft quality apparel and accessories for people who wear their personality.
        </p>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 text-white py-10 px-5">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "5000+", label: "Happy Customers" },
            { value: "200+",  label: "Products"        },
            { value: "4.9★",  label: "Avg. Rating"     },
            { value: "3+",    label: "Years Online"    },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold">{s.value}</p>
              <p className="text-blue-200 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="max-w-5xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-10">
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4">🎯</div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To deliver high-quality, affordable clothing and accessories that let people express who they are — without compromise on comfort or style.
          </p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4">🚀</div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            To become India&apos;s most loved indie apparel brand — known for creativity, sustainability, and a community that celebrates originality.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "✅", title: "Quality First",     desc: "Every product is carefully crafted and quality-checked before it reaches you."         },
              { icon: "🌱", title: "Sustainability",    desc: "We use eco-friendly materials and responsible packaging wherever possible."            },
              { icon: "❤️", title: "Community Driven", desc: "We listen to our customers — your feedback shapes every new collection we launch."     },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-5xl mx-auto px-5 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">Meet the Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Arjun Sharma",  role: "Founder & CEO",       initials: "AS", color: "bg-blue-100 text-blue-700"   },
            { name: "Priya Mehta",   role: "Head of Design",       initials: "PM", color: "bg-pink-100 text-pink-700"   },
            { name: "Rohan Gupta",   role: "Operations Manager",   initials: "RG", color: "bg-green-100 text-green-700" },
          ].map((m) => (
            <div key={m.name} className="text-center">
              <div className={`w-20 h-20 rounded-full ${m.color} flex items-center justify-center text-xl font-bold mx-auto mb-4`}>
                {m.initials}
              </div>
              <p className="font-bold text-gray-800">{m.name}</p>
              <p className="text-sm text-gray-500">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-16 px-5 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
        <p className="text-gray-400 mb-8">Check out our latest collection and find something you love.</p>
        <a href="/tshirts"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition">
          Shop Now →
        </a>
      </section>
    </main>
  )
}

export default About
