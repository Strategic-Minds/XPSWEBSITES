import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About Phoenix Epoxy Pros | XPS Certified Epoxy Installers",
  description: "Phoenix Epoxy Pros is powered by Xtreme Polishing Systems — 20+ years of epoxy, polished concrete, and decorative flooring expertise. ACI-certified installers serving Phoenix and surrounding cities.",
  openGraph: { title: "About Phoenix Epoxy Pros", description: "20+ years of epoxy expertise. XPS certified.", url: "https://xpswebsites.vercel.app/about" },
};
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-black text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-black tracking-tight mb-4">About Phoenix Epoxy Pros</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">Backed by 20+ years of Xtreme Polishing Systems expertise. ACI-certified. Locally operated.</p>
      </section>
      <section className="max-w-4xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 text-lg leading-relaxed">Phoenix Epoxy Pros was built on a simple belief: every homeowner and business deserves a floor that looks incredible and lasts a lifetime. We bring Xtreme Polishing Systems' national-grade expertise to every Phoenix garage, warehouse, and commercial space we touch.</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Why XPS Certified?</h2>
          <p className="text-gray-600 text-lg leading-relaxed">Xtreme Polishing Systems trains and certifies installers across North America. Our Phoenix team is held to the same standards as the best installers in the country — proper surface prep, professional-grade coatings, and a finish that passes XPS quality inspection.</p>
        </div>
      </section>
      <section className="bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[["20+","Years Experience"],["500+","Projects Completed"],["4.9★","Average Rating"],["100%","Satisfaction Guarantee"]].map(([n,l]) => (
            <div key={l}><div className="text-4xl font-black text-yellow-500">{n}</div><div className="text-gray-600 mt-1">{l}</div></div>
          ))}
        </div>
      </section>
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready for Your New Floor?</h2>
        <a href="/get-quote" className="inline-block bg-yellow-500 text-black font-bold px-10 py-4 rounded-lg text-lg hover:bg-yellow-400 transition">Get a Free Estimate</a>
      </section>
    </main>
  );
}
