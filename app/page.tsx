import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Phoenix Epoxy Pros | Professional Epoxy Floors & Polished Concrete AZ",
  description: "Professional epoxy garage floors, metallic epoxy, and polished concrete in Phoenix, Scottsdale, and surrounding cities. Free estimates. XPS certified. 4.9★ rated.",
  openGraph: {
    title: "Phoenix Epoxy Pros | Professional Epoxy Flooring",
    description: "Transform your garage with professional epoxy floors. Phoenix's top-rated epoxy and polished concrete specialists.",
    url: "https://xpswebsites.vercel.app",
    siteName: "Phoenix Epoxy Pros",
    images: [{ url: "https://xpswebsites.vercel.app/og-image.jpg", width: 1200, height: 630 }],
  },
};
export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="h-screen flex flex-col justify-center items-center px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-transparent" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-tight mb-6">
            Professional Epoxy Floors & Polished Concrete in Phoenix
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Transform your garage, warehouse, or commercial space with XPS-certified epoxy flooring. From metallic effects to industrial-grade coatings — built to last decades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/get-quote" className="bg-yellow-500 text-black font-bold px-8 py-4 rounded-lg text-lg hover:bg-yellow-400 transition inline-block">
              Get Free Estimate →
            </a>
            <a href="/digital-estimator" className="border-2 border-yellow-500 text-yellow-500 font-bold px-8 py-4 rounded-lg text-lg hover:bg-yellow-500/10 transition inline-block">
              Try Floor Designer
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <svg className="w-6 h-6 text-yellow-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-black mb-12 text-center">Why Choose Phoenix Epoxy Pros?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: "🏆", title: "20+ Years", desc: "Xtreme Polishing Systems certified expertise" },
              { icon: "⭐", title: "4.9★ Rated", desc: "127 verified reviews from real customers" },
              { icon: "✅", title: "100% Guarantee", desc: "Full satisfaction or we make it right" },
              { icon: "💨", title: "Fast Install", desc: "Most projects completed in 1-2 days" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-5xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-black mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-black text-white mb-6">See the Transformation</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Browse our gallery of completed projects across Phoenix, Scottsdale, Tempe, Mesa, and surrounding cities.</p>
        <a href="/gallery" className="inline-block border-2 border-yellow-500 text-yellow-500 font-bold px-8 py-3 rounded-lg text-lg hover:bg-yellow-500 hover:text-black transition">
          View Gallery
        </a>
      </section>
    </main>
  );
}
