import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact Phoenix Epoxy Pros | Free Estimate Phoenix AZ",
  description: "Get a free epoxy floor estimate in Phoenix, Scottsdale, Tempe, Mesa, and surrounding cities. Call, text, or submit online — we respond within 24 hours.",
  openGraph: { title: "Contact Phoenix Epoxy Pros", description: "Free estimate. Fast response. Phoenix epoxy experts.", url: "https://xpswebsites.vercel.app/contact" },
};
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-black text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-black tracking-tight mb-4">Contact Us</h1>
        <p className="text-xl text-gray-300">Free estimates. Fast response. Phoenix&apos;s epoxy experts.</p>
      </section>
      <section className="max-w-5xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
          <div className="space-y-4 text-lg">
            <div><span className="font-semibold">📞 Phone / Text:</span><br/><a href="tel:+17722090266" className="text-yellow-600 font-bold text-xl">(772) 209-0266</a></div>
            <div><span className="font-semibold">💬 WhatsApp:</span><br/><a href="https://wa.me/15559730487" className="text-green-600 font-bold">+1 (555) 973-0487</a></div>
            <div><span className="font-semibold">📧 Email:</span><br/><a href="mailto:info@phoenixepoxypros.com" className="text-blue-600">info@phoenixepoxypros.com</a></div>
            <div><span className="font-semibold">🕐 Hours:</span><br/>Mon–Sat 7am–7pm | Sun by appointment</div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
          <form action="/api/submit-lead" method="POST" className="space-y-4">
            <input type="text" name="full_name" placeholder="Your Name" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
            <input type="tel" name="phone" placeholder="Phone Number" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
            <input type="email" name="email" placeholder="Email (optional)" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
            <textarea name="notes" placeholder="Tell us about your project..." rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
            <button type="submit" className="w-full bg-yellow-500 text-black font-bold py-4 rounded-lg text-lg hover:bg-yellow-400 transition">Send Message →</button>
          </form>
        </div>
      </section>
    </main>
  );
}
