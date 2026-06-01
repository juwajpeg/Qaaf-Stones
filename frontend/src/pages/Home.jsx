import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Anchor, ShieldCheck, Mountain, Package } from "lucide-react";

const HERO_IMG = "https://static.prod-images.emergentagent.com/jobs/48fe1fb7-5393-4302-b72a-90bda65bb8a1/images/f9211b0c4ac4795fd1293f7e3fcfb356648606614144b269d36c8ed666e21d31.png";
const ABOUT_IMG = "https://static.prod-images.emergentagent.com/jobs/48fe1fb7-5393-4302-b72a-90bda65bb8a1/images/fd428b934c1506394c4f3750dfad33941be24a3a49bda4da57ede082c6c5b97e.png";
const INDUSTRIAL_IMG = "https://static.prod-images.emergentagent.com/jobs/48fe1fb7-5393-4302-b72a-90bda65bb8a1/images/5537b00eeb8b753e875f0c891a20c170ac815930308c8caf2fb83ed21ff195f5.png";

const STATS = [
  { k: "98.6%", l: "NaCl Purity" },
  { k: "84+", l: "Trace Minerals" },
  { k: "Authentic", l: "1 Origin" },
  { k: "MT/Mo", l: "Capacity 12,000" },
];

const CATEGORIES = [
  {
    title: "Edible & Gourmet",
    items: ["Powder", "Fine", "Coarse", "Crystals", "Grinder Grade"],
    img: "https://images.pexels.com/photos/7779878/pexels-photo-7779878.jpeg?auto=compress&cs=tinysrgb&w=900&h=675&fit=crop",
  },
  {
    title: "Lamps & Décor",
    items: ["Natural", "Crafted", "USB", "1–15 kg"],
    img: "https://images.pexels.com/photos/6634303/pexels-photo-6634303.jpeg?auto=compress&cs=tinysrgb&w=900&h=675&fit=crop",
  },
  {
    title: "Bath, Spa & Bricks",
    items: ["Bath salt", "Spa grade", "Tiles", "Halotherapy bricks"],
    img: "https://images.pexels.com/photos/6690148/pexels-photo-6690148.jpeg?auto=compress&cs=tinysrgb&w=900&h=675&fit=crop",
  },
];

const COUNTRIES = [
  "USA", "Germany", "UK", "UAE", "Saudi Arabia", "Japan", "Korea",
  "Australia", "France", "Netherlands", "Canada", "Italy", "Türkiye", "Malaysia",
];

export default function Home() {
  return (
    <div data-testid="page-home">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0909] via-[#0A0909]/65 to-[#0A0909]/30" />
        <div className="relative max-w-[1480px] mx-auto px-6 md:px-10 pb-20 md:pb-28 w-full">
          <div className="overline qs-fade">Khewra · Punjab · Pakistan — The Only Source on Earth</div>
          <h1 className="qs-fade qs-fade-d1 mt-6 font-serif font-light tracking-[-0.02em] text-foreground text-[clamp(3rem,9vw,9.5rem)] leading-[0.92]">
            <span className="text-[#E07A5F]">ق</span> stones.
            <br />
            <span className="text-foreground/85">Himalayan Pink salt,</span>
            <br />
            <span className="italic text-foreground/70 text-[0.55em]">"from the only mountain that has it."</span>
          </h1>
          <div className="qs-fade qs-fade-d2 mt-10 max-w-xl text-foreground/80 text-base md:text-lg leading-relaxed">
            Every grain of Himalayan pink salt on the planet originates from a single mountain in Punjab, Pakistan. No other mine. No other country. No substitute. We are at that mountain and we ship directly from it to your door.
          </div>
          <div className="qs-fade qs-fade-d3 mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              to="/rfq"
              data-testid="hero-rfq-btn"
              className="inline-flex items-center justify-center gap-2 bg-[#E07A5F] hover:bg-[#F08B70] text-[#0A0909] px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] hover-shift"
            >
              Start an order <ArrowUpRight size={16} />
            </Link>
            <Link
              to="/products"
              data-testid="hero-products-btn"
              className="inline-flex items-center justify-center gap-2 border border-border hover:border-[#E07A5F] text-foreground px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] hover-shift"
            >
              View catalogue <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-[#0A0909]">
        <div className="max-w-[1480px] mx-auto grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={i} className={`p-8 md:p-10 ${i !== 0 ? "border-l border-border" : ""} ${i % 2 !== 0 ? "border-l border-border" : ""}`}>
              <div className="overline">0{i + 1}</div>
              <div className="font-serif text-5xl md:text-6xl mt-3 text-[#F4F1EB]">{s.k}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="py-28 md:py-36">
        <div className="max-w-[1480px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="overline">Our Mandate</div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">// 01 — Origin</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">// 02 — Integrity</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">// 03 — Logistics</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.02] tracking-tight">
              Pink Salt has one origin. We are at it.
            </h2>
            <p className="mt-8 text-foreground/75 text-base md:text-lg leading-relaxed max-w-3xl">
              Qaaf Stones is built on one belief — that pink salt deserves the same
              rigour as fine wine or single-origin coffee. We do not blend, broker
              or trade through middlemen. Every container we ship is taken {" "}
              <Link to="/about" className="text-[#E07A5F] italic hover:underline">
              straight from the source </Link>
            </p>
            <Link
              to="/about"
              data-testid="mission-about-link"
              className="mt-10 inline-flex items-center gap-2 text-[#E07A5F] hover:text-[#F08B70] font-mono text-[11px] uppercase tracking-[0.22em]"
            >
              Read the full story <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-t border-border">
        <div className="max-w-[1480px] mx-auto px-6 md:px-10 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="overline">Catalogue · 06 product families</div>
              <h2 className="mt-4 font-serif text-4xl md:text-6xl tracking-tight">
                Three categories.<br />One mineral.
              </h2>
            </div>
            <Link
              to="/products"
              data-testid="cat-view-all"
              className="inline-flex items-center gap-2 border border-border hover:border-[#E07A5F] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] hover-shift self-start"
            >
              All products <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {CATEGORIES.map((c, i) => (
              <Link
                to="/products"
                key={i}
                data-testid={`category-card-${i}`}
                className="group bg-[#0A0909] p-8 md:p-10 hover:bg-[#141212] transition-colors"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#141212] mb-8">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="overline">0{i + 1} / 03</div>
                <h3 className="mt-3 font-serif text-3xl md:text-4xl tracking-tight">{c.title}</h3>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {c.items.map((it) => (
                    <li key={it} className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground border border-border px-3 py-1">
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 inline-flex items-center gap-2 text-[#E07A5F] font-mono text-[11px] uppercase tracking-[0.22em]">
                  Explore <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${ABOUT_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0909] via-[#0A0909]/85 to-transparent" />
        <div className="relative max-w-[1480px] mx-auto px-6 md:px-10 py-28 md:py-36">
          <div className="overline">Operational Spine</div>
          <h2 className="mt-6 font-serif text-4xl md:text-6xl tracking-tight max-w-3xl">
            Vertical control, from rock face to bill of lading.
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-px bg-border">
            {[
              { Icon: Mountain, t: "Direct Mine Access", d: "Long-term offtake agreements with licensed Khewra contractors." },
              { Icon: Package, t: "In-house Processing", d: "Crushing, washing, screening and packaging in our own facility." },
              { Icon: ShieldCheck, t: "Lab Verified", d: "Independent SGS / Intertek COA available on request — billed separately." },
              { Icon: Anchor, t: "Karachi FOB", d: "30-day average lead time. CIF available to most major ports." },
            ].map(({ Icon, t, d }, i) => (
              <div key={i} className="bg-[#0A0909] p-8">
                <Icon size={22} className="text-[#E07A5F]" />
                <div className="mt-6 overline">// 0{i + 1}</div>
                <h3 className="mt-3 font-serif text-2xl">{t}</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COUNTRIES MARQUEE */}
      <section className="border-y border-border py-10 overflow-hidden bg-[#141212]">
        <div className="overline px-6 md:px-10 max-w-[1480px] mx-auto">Currently shipping to</div>
        <div className="mt-6 flex whitespace-nowrap qs-marquee">
          {[...COUNTRIES, ...COUNTRIES, ...COUNTRIES].map((c, i) => (
            <span key={i} className="font-serif text-3xl md:text-5xl text-foreground/40 mx-8">
              {c} <span className="text-[#E07A5F]">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-36">
        <div className="max-w-[1480px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <div className="overline">Next Step</div>
            <h2 className="mt-6 font-serif text-4xl md:text-7xl tracking-tight leading-[1]">
              Tell us your<br /> port. We&apos;ll quote.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-foreground/75 text-base md:text-lg leading-relaxed">
              Send us a brief on your product, granulation, packaging, target volume and destination port. Our export desk responds within one business day with COA samples and a CIF/FOB quotation.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/rfq"
                data-testid="cta-rfq-btn"
                className="inline-flex items-center justify-center gap-2 bg-[#E07A5F] hover:bg-[#F08B70] text-[#0A0909] px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] hover-shift"
              >
                Submit RFQ <ArrowUpRight size={16} />
              </Link>
              <Link
                to="/contact"
                data-testid="cta-contact-btn"
                className="inline-flex items-center justify-center gap-2 border border-border hover:border-[#E07A5F] px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] hover-shift"
              >
                General enquiry <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
