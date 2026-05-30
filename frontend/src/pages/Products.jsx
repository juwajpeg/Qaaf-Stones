import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { fetchProducts } from "@/lib/api";
import Section from "@/components/Section";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((d) => { setProducts(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const visible = filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div data-testid="page-products">
      {/* Straight from the source — prominent banner */}
      <section data-testid="products-source-banner" className="border-b border-border">
        <div className="max-w-[1480px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="overline">// Single origin · Single mineral</div>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] max-w-5xl">
            Khewra to your port.<br />
            <span className="text-[#E07A5F] italic">Straight from the source.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-foreground/75 text-base md:text-lg leading-relaxed">
            Six product families, one mineral, zero intermediaries. Every SKU below is mined, processed and packed by Qaaf Stones — never bought, blended or relabelled.
          </p>
        </div>
      </section>

      <Section
        eyebrow="// Catalogue"
        title="Six product families. One mineral."
        kicker="All products are 100% Khewra-origin Himalayan pink salt. Custom packaging, granulation, private label and bulk container shipments available across the entire range."
      >
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((c) => (
            <button
              key={c}
              data-testid={`filter-${c.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setFilter(c)}
              className={`font-mono text-[10px] uppercase tracking-[0.22em] px-4 py-2 border transition-colors ${
                filter === c ? "border-[#E07A5F] text-[#E07A5F] bg-[#E07A5F]/5" : "border-border text-foreground/70 hover:border-foreground/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="mt-16 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Loading catalogue…</div>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {visible.map((p, i) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                data-testid={`product-card-${p.id}`}
                className="group bg-[#0A0909] hover:bg-[#141212] transition-colors p-6 md:p-8 flex flex-col"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#141212] mb-6">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">SKU · {p.sku}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E07A5F]">0{i + 1}</span>
                </div>
                <h3 className="mt-3 font-serif text-3xl md:text-4xl tracking-tight">{p.name}</h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{p.category}</p>
                <p className="mt-4 text-sm text-foreground/70 leading-relaxed line-clamp-3">{p.description}</p>
                <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/70">MOQ {p.moq}</span>
                  <span className="inline-flex items-center gap-1 text-[#E07A5F] font-mono text-[10px] uppercase tracking-[0.22em]">
                    Spec sheet <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>

      <section className="border-t border-border py-20 bg-[#141212]">
        <div className="max-w-[1480px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="overline">Need a custom spec?</div>
            <h3 className="mt-3 font-serif text-3xl md:text-5xl tracking-tight">We build to your private label.</h3>
          </div>
          <Link to="/rfq" data-testid="products-cta-rfq" className="inline-flex items-center gap-2 bg-[#E07A5F] hover:bg-[#F08B70] text-[#0A0909] px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] hover-shift">
            Request a quotation <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
