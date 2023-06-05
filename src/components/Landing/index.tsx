import Features from "./Features";
import Hero from "./Hero";

export default function Landing() {
  return (
    <main className="mx-auto flex min-h-[calc(100svh_-_140px)] max-w-screen-md flex-col">
      <Hero />
      <Features />
      {/* Testimonials */}
      {/* FAQ */}
      {/* CTA */}
    </main>
  );
}
