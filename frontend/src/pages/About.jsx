import Section from "@/components/Section";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const ORIGIN_IMG = "https://images.unsplash.com/photo-1567629699072-56a69a5c1fa7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400";
const ABOUT_IMG = "https://static.prod-images.emergentagent.com/jobs/48fe1fb7-5393-4302-b72a-90bda65bb8a1/images/fd428b934c1506394c4f3750dfad33941be24a3a49bda4da57ede082c6c5b97e.png";

export default function About() {
  return (
    <div data-testid="page-about">
      <Section eyebrow="About · ق stones" title="A 250-million-year-old mineral, handled with restraint." kicker="We are an export-only company built around one product: Pakistani Himalayan pink salt. No diversification, no shortcuts. Just a single mineral, taken seriously from rock face to bill of lading." />

      <section className="border-y border-border">
        <div className="max-w-[1480px] mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-[4/5] md:aspect-auto bg-cover bg-center min-h-[420px]" style={{ backgroundImage: `url(${ORIGIN_IMG})` }} />
          <div className="p-10 md:p-16 border-l border-border">
            <div className="overline">// Origin</div>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl tracking-tight">Khewra. The second largest salt mine on earth.</h2>
            <p className="mt-6 text-foreground/75 leading-relaxed">
              Discovered, the legend goes, by Alexander&apos;s horse in 326 BCE.
              Mined formally since the Mughal era. Today the Khewra mine still
              produces salt of a chemistry — pale rose, mineral-rich, low in
              moisture — that simply cannot be replicated synthetically.
            </p>
            <p className="mt-4 text-foreground/75 leading-relaxed">
              ق stones works with three licensed contractors at the rock face.
              Every batch is traceable, every truck is weighed at our gate, and
              every shipment carries an independent COA — no exceptions.
            </p>
          </div>
        </div>
      </section>

      <Section eyebrow="// Our Standard" title="Single-origin, single-mineral, single-minded.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mt-4">
          {[
            { n: "01", t: "Source-honest", d: "We will not blend Pakistani pink salt with cheaper Iranian or Andean alternatives. The label says Khewra, the salt is Khewra." },
            { n: "02", t: "Lab-verified", d: "Independent third-party laboratory testing on every container — chemistry, granulation, moisture, foreign matter." },
            { n: "03", t: "Privately traceable", d: "Mine ID, processing batch, packaging line, FOB date — all on a QR-linked digital passport per pallet." },
          ].map((b) => (
            <div key={b.n} className="p-10 bg-[#0A0909]">
              <div className="overline">{b.n}</div>
              <h3 className="mt-4 font-serif text-3xl">{b.t}</h3>
              <p className="mt-4 text-foreground/70 leading-relaxed text-sm">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${ABOUT_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0909]/90 via-[#0A0909]/80 to-[#0A0909]" />
        <div className="relative max-w-[1480px] mx-auto px-6 md:px-10 py-28 md:py-40">
          <div className="overline">Field operations</div>
          <h2 className="mt-6 font-serif text-4xl md:text-7xl tracking-tight max-w-4xl">
            From the rock face<br /> to your bill of lading<br /> — never out of sight.
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-px bg-border">
            {[
              { y: "Day 0", t: "Mine cut" },
              { y: "Day 4", t: "Wash & screen" },
              { y: "Day 9", t: "Lab clearance" },
              { y: "Day 18", t: "FOB Karachi" },
            ].map((s) => (
              <div key={s.y} className="bg-[#0A0909] p-8">
                <div className="overline">{s.y}</div>
                <p className="mt-3 font-serif text-2xl">{s.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section eyebrow="// Working With Us" title="Built for buyers who care about chemistry.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-foreground/75 leading-relaxed">
              Our typical client is a private-label brand owner, an industrial salt
              user, or a wellness retailer who has been disappointed once too
              often. We onboard slowly, sample generously, and over-document.
            </p>
            <p className="mt-4 text-foreground/75 leading-relaxed">
              We are based in Pakistan but operate on European time. English,
              Urdu, and Arabic are all spoken. Payment terms range from 30%
              advance + 70% against B/L copy to LC at sight for established
              partners.
            </p>
          </div>
          <div className="border border-border p-8 bg-[#141212]">
            <div className="overline">// Quick Facts</div>
            <dl className="mt-4 divide-y divide-border">
              {[
                ["Founded", "2017"],
                ["Headcount", "32 (incl. 6 lab staff)"],
                ["Capacity", "12,000 MT / month"],
                ["Lead time", "18–30 days FOB"],
                ["Languages", "EN · UR · AR"],
                ["Incoterms", "FOB · CIF · CFR · DAP"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-2 py-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{k}</dt>
                  <dd className="font-mono text-sm text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <Link to="/rfq" data-testid="about-rfq-link" className="mt-8 inline-flex items-center gap-2 bg-[#E07A5F] text-[#0A0909] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] hover-shift">
              Open an account <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
