import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Epoxy Floor Services Phoenix AZ | Garage, Commercial, Metallic",
  description: "Phoenix Epoxy Pros offers garage epoxy, metallic epoxy, commercial flooring, concrete polishing, and floor coatings. XPS-certified installers. Free estimates.",
  openGraph: { title: "Epoxy Services Phoenix AZ", description: "Garage, metallic, commercial, polished concrete.", url: "https://xpswebsites.vercel.app/services" },
};
const SERVICES = [
  { title:"Garage Epoxy Floors", desc:"Transform your garage with durable, high-gloss epoxy coating. Includes surface diamond grinding, primer coat, broadcast chip layer, and polyaspartic topcoat.", price:"From $3/sqft", icon:"🏠" },
  { title:"Metallic Epoxy", desc:"Stunning 3D metallic effect floors for showrooms, gyms, and living spaces. One-of-a-kind appearance that mimics marble, lava, and ocean effects.", price:"From $6/sqft", icon:"✨" },
  { title:"Commercial Flooring", desc:"High-traffic commercial epoxy for warehouses, restaurants, retail, and industrial facilities. Chemical-resistant, slip-resistant, seamless.", price:"Custom quote", icon:"🏢" },
  { title:"Polished Concrete", desc:"Grind, harden, and polish existing concrete to a mirror finish. LEED-friendly, low maintenance, lasts decades.", price:"From $4/sqft", icon:"💎" },
  { title:"Polyaspartic Coatings", desc:"Next-generation floor coating — faster cure than epoxy, UV-stable, extreme chemical resistance. One-day installation.", price:"From $4/sqft", icon:"⚡" },
  { title:"Flake/Chip Systems", desc:"Colored vinyl chip broadcast in solid or blended palettes. Hides imperfections, adds texture and grip. Most popular residential system.", price:"From $3.50/sqft", icon:"🎨" },
];
export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-black text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-black tracking-tight mb-4">Our Services</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">XPS-certified epoxy and concrete flooring for residential, commercial, and industrial spaces across Phoenix.</p>
      </section>
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map(s => (
          <div key={s.title} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-3">{s.icon}</div>
            <h2 className="text-xl font-bold mb-2">{s.title}</h2>
            <p className="text-gray-600 mb-4">{s.desc}</p>
            <div className="text-yellow-600 font-bold text-lg">{s.price}</div>
            <a href="/get-quote" className="mt-4 block text-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition font-semibold">Get Quote</a>
          </div>
        ))}
      </section>
      <section className="bg-yellow-500 py-12 px-6 text-center">
        <h2 className="text-3xl font-black mb-2">Not Sure Which System Is Right?</h2>
        <p className="text-lg mb-6">Get a free on-site assessment. We&apos;ll recommend the best floor system for your space, budget, and use case.</p>
        <a href="/digital-estimator" className="inline-block bg-black text-white font-bold px-10 py-4 rounded-lg text-lg hover:bg-gray-900 transition">Try Our Digital Estimator</a>
      </section>
    </main>
  );
}
