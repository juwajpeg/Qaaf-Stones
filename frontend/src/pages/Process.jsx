import Section from "@/components/Section";

const STEPS = [
  { n: "01", t: "Source", d: "Hand-selected blocks pulled from licensed Khewra contractor zones. Each truck weighed & photographed at our gate.", img: "https://images.unsplash.com/photo-1567629699072-56a69a5c1fa7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" },
  { n: "02", t: "Inspect", d: "Visual & XRF screening for foreign matter, color consistency, moisture content. Rejected lots returned to contractor.", img: "https://static.prod-images.emergentagent.com/jobs/48fe1fb7-5393-4302-b72a-90bda65bb8a1/images/fd428b934c1506394c4f3750dfad33941be24a3a49bda4da57ede082c6c5b97e.png" },
  { n: "03", t: "Process", d: "Crushing → washing → screening to your spec. Granulation tolerance ±5%. Food-grade stainless steel throughout.", img: "https://static.prod-images.emergentagent.com/jobs/48fe1fb7-5393-4302-b72a-90bda65bb8a1/images/5537b00eeb8b753e875f0c891a20c170ac815930308c8caf2fb83ed21ff195f5.png" },
  { n: "04", t: "Lab", d: "Independent third-party COA (SGS / Intertek) available on request — NaCl%, moisture, heavy metals, microbial. Issued per batch, billed to the buyer separately.", img: "https://images.unsplash.com/photo-1581093458791-9a48bd9b27a4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" },
  { n: "05", t: "Pack", d: "PP bags, jumbo bags, retail private label — all with tamper-evident seals and per-pallet QR traceability.", img: "https://images.unsplash.com/photo-1565891741441-64926e441838?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" },
  { n: "06", t: "Ship", d: "FOB Karachi, CIF/CFR available. Direct routes to Jebel Ali, Hamburg, Rotterdam, NY/NJ, Yokohama.", img: "https://images.unsplash.com/photo-1771756743992-bc772a4f8d7e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" },
];

const SPECS = [
  ["NaCl content", "98.0% – 99.2%"],
  ["Moisture", "≤ 0.5%"],
  ["Insoluble matter", "≤ 0.4%"],
  ["Iron (Fe)", "0.05 – 0.5%"],
  ["Calcium (Ca)", "0.1 – 0.4%"],
  ["Magnesium (Mg)", "0.05 – 0.2%"],
  ["Potassium (K)", "≤ 0.05%"],
  ["Color", "Pale rose to deep pink"],
  ["Heavy metals (Pb)", "≤ 2 ppm"],
  ["Microbial", "Compliant CXS 150-1985"],
];

export default function Process() {
  return (
    <div data-testid="page-process">
      <Section
        eyebrow="// Process & Quality"
        title="Six checkpoints between the rock face and your warehouse."
        kicker="Every container is the result of a non-negotiable six-stage protocol — designed so that the salt that lands at your port is identical to the sample we couriered you weeks earlier."
      />

      <div className="border-t border-border">
        {STEPS.map((s, i) => (
          <div key={s.n} className={`grid grid-cols-1 md:grid-cols-12 border-b border-border`}>
            <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2 md:border-l" : "md:border-r"} border-border min-h-[320px] md:min-h-[420px] bg-cover bg-center`} style={{ backgroundImage: `url(${s.img})` }} />
            <div className="md:col-span-7 p-10 md:p-16">
              <div className="flex items-baseline gap-6">
                <span className="font-serif text-7xl md:text-8xl text-[#E07A5F]/80 leading-none">{s.n}</span>
                <span className="overline">Stage {s.n}</span>
              </div>
              <h3 className="mt-6 font-serif text-4xl md:text-6xl tracking-tight">{s.t}</h3>
              <p className="mt-6 max-w-xl text-foreground/75 leading-relaxed">{s.d}</p>
            </div>
          </div>
        ))}
      </div>

      <Section eyebrow="// Technical specification" title="Default chemistry profile." kicker="Custom specs available — tighter tolerances, food-grade additives, retail moisture caps. COAs are available on request and billed separately to the buyer.">
        <div className="border border-border bg-[#0A0909] mt-4">
          <div className="grid grid-cols-2 border-b border-border bg-[#141212]">
            <div className="p-5 overline">Parameter</div>
            <div className="p-5 overline border-l border-border">Range</div>
          </div>
          {SPECS.map(([k, v], i) => (
            <div key={k} className={`grid grid-cols-2 ${i !== SPECS.length - 1 ? "border-b border-border" : ""}`}>
              <div className="p-5 font-mono text-sm text-foreground/85">{k}</div>
              <div className="p-5 font-mono text-sm text-foreground border-l border-border">{v}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
