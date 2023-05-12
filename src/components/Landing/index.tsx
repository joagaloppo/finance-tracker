import Features from "./Features";
import Hero from "./Hero";

export default function Landing() {
  return (
    <main className="flex min-h-[calc(100svh_-_140px)] flex-col">
      <Hero />
      <Features />
      {/* Testimonials */}
      {/* FAQ */}
      {/* CTA */}
    </main>
  );
}
