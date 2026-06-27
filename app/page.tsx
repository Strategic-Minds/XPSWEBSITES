import type { Metadata } from "next";
import { FinishVisualizer } from "./components/FinishVisualizer";

export const metadata: Metadata = {
  title: "Phoenix Epoxy Pros | XPS Epoxy Color Charts",
  description:
    "View accepted XPS epoxy flake, metallic, quartz, solid, glitter, and concrete stain color charts for Phoenix Epoxy Pros.",
  openGraph: {
    title: "Phoenix Epoxy Pros | XPS Epoxy Color Charts",
    description:
      "Browse XPS epoxy color charts for flake, metallic, quartz, solid, glitter, and concrete stain finishes.",
    url: "https://xpswebsites.vercel.app",
    siteName: "Phoenix Epoxy Pros",
    images: [{ url: "https://xpswebsites.vercel.app/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#d9dddd] text-[#101214]">
      <section className="px-5 pb-4 pt-7 text-center sm:px-8 sm:pt-10">
        <p className="mb-2 text-sm font-black uppercase text-[#6d5b00]">
          Phoenix Epoxy Pros
        </p>
        <h1 className="mx-auto max-w-5xl text-4xl font-black leading-tight text-[#101214] md:text-6xl">
          XPS Epoxy Color Charts
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-base font-semibold leading-7 text-[#384044] md:text-lg">
          Compare the approved flake, metallic, quartz, solid, glitter, and concrete stain options before choosing your floor finish.
        </p>
      </section>

      <FinishVisualizer />

      <section className="bg-[#101214] px-5 py-12 text-center text-white sm:px-8">
        <h2 className="text-3xl font-black leading-tight md:text-4xl">
          Ready to match a finish to your space?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base font-semibold leading-7 text-gray-300">
          Send us the chart name or color family you like, and we will help confirm the right coating system for your garage, warehouse, or commercial floor.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="/get-quote"
            className="inline-flex items-center justify-center rounded-md bg-yellow-500 px-7 py-3 text-base font-black text-black transition hover:bg-yellow-400"
          >
            Get Free Estimate
          </a>
          <a
            href="/gallery"
            className="inline-flex items-center justify-center rounded-md border-2 border-yellow-500 px-7 py-3 text-base font-black text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
          >
            View Gallery
          </a>
        </div>
      </section>
    </main>
  );
}
