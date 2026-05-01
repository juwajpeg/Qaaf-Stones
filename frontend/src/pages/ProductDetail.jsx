import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { fetchProduct } from "@/lib/api";

export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setP(null);
    setError(false);
    fetchProduct(id).then(setP).catch(() => setError(true));
  }, [id]);

  if (error) {
    return (
      <div className="max-w-[1480px] mx-auto px-6 md:px-10 py-40 text-center">
        <h1 className="font-serif text-4xl">Product not found.</h1>
        <Link to="/products" className="mt-6 inline-flex items-center gap-2 text-[#E07A5F] font-mono text-[11px] uppercase tracking-[0.22em]">
          <ArrowLeft size={14} /> Back to catalogue
        </Link>
      </div>
    );
  }

  if (!p) return <div className="py-32 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Loading…</div>;

  return (
    <div data-testid={`page-product-${p.id}`} className="pb-24">
      <div className="max-w-[1480px] mx-auto px-6 md:px-10 pt-12">
        <Link to="/products" data-testid="back-to-products" className="inline-flex items-center gap-2 text-foreground/70 hover:text-[#E07A5F] font-mono text-[11px] uppercase tracking-[0.22em]">
          <ArrowLeft size={14} /> Catalogue
        </Link>
      </div>

      <div className="max-w-[1480px] mx-auto px-6 md:px-10 mt-10 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <div className="aspect-[4/3] w-full overflow-hidden bg-[#141212] border border-border">
            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="overline">{p.category} · SKU {p.sku}</div>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl leading-[1] tracking-tight">{p.name}</h1>
          <p className="mt-6 text-foreground/75 leading-relaxed">{p.description}</p>
          <Link to="/rfq" state={{ product: p.name }} data-testid="product-rfq-cta" className="mt-8 inline-flex items-center gap-2 bg-[#E07A5F] hover:bg-[#F08B70] text-[#0A0909] px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] hover-shift">
            Request quote for {p.name} <ArrowUpRight size={14} />
          </Link>

          <div className="mt-10 border border-border">
            <div className="grid grid-cols-2 border-b border-border">
              <div className="p-5 border-r border-border">
                <div className="overline">MOQ</div>
                <div className="mt-2 font-mono text-sm">{p.moq}</div>
              </div>
              <div className="p-5">
                <div className="overline">Origin</div>
                <div className="mt-2 font-mono text-sm">Khewra, PK</div>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="p-5 border-r border-border">
                <div className="overline">Lead time</div>
                <div className="mt-2 font-mono text-sm">18–30 days</div>
              </div>
              <div className="p-5">
                <div className="overline">Incoterms</div>
                <div className="mt-2 font-mono text-sm">FOB · CIF · CFR</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1480px] mx-auto px-6 md:px-10 mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
        {[
          { k: "Grades", v: p.grades },
          { k: "Granulation / Sizes", v: p.granulation },
          { k: "Packaging", v: p.packaging },
        ].map((b) => (
          <div key={b.k} className="bg-[#0A0909] p-8">
            <div className="overline">// {b.k}</div>
            <ul className="mt-5 space-y-3">
              {b.v.map((x) => (
                <li key={x} className="flex items-start gap-3">
                  <span className="text-[#E07A5F] mt-[2px]">—</span>
                  <span className="font-mono text-sm text-foreground/85">{x}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
