import Section from "@/components/Section";
import { ShieldCheck, FileCheck2, BadgeCheck, Award, Globe2, Leaf } from "lucide-react";

const CERTS = [
  { Icon: ShieldCheck, t: "ISO 9001:2015", d: "Quality Management System certified across mining, processing & export operations." },
  { Icon: BadgeCheck, t: "HALAL", d: "Verified by IFANCA / SANHA — full halal certification chain on edible grades." },
  { Icon: FileCheck2, t: "FDA Registered", d: "U.S. FDA Food Facility registration — eligible for direct retail-grade exports to USA." },
  { Icon: Award, t: "GMP & HACCP", d: "Good Manufacturing Practice and Hazard Analysis programmes audited annually." },
  { Icon: Leaf, t: "Kosher (KOF-K)", d: "Kosher certified product line for retail private-label clients in Israel and North America." },
  { Icon: Globe2, t: "EU Compliance", d: "Compliant with EC 1907/2006 (REACH) and CXS 150-1985 Codex food-grade salt standard." },
];

const COA = [
  ["NaCl", "98.6%"],
  ["Moisture", "0.31%"],
  ["Insoluble", "0.18%"],
  ["Iron (Fe)", "0.21%"],
  ["Heavy Pb", "< 1 ppm"],
  ["Microbial", "Compliant"],
];

export default function Certifications() {
  return (
    <div data-testid="page-certifications">
      <Section
        eyebrow="// Compliance & Certifications"
        title="Paperwork that lets your customs broker sleep."
        kicker="ق stones holds and maintains the certifications below. Originals available on request, COAs travel with every container, and we are happy to be audited by your own QA team in Khewra."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border mt-4">
          {CERTS.map(({ Icon, t, d }, i) => (
            <div key={t} data-testid={`cert-${i}`} className="bg-[#0A0909] p-8 md:p-10 hover-shift">
              <div className="flex items-center justify-between">
                <Icon size={28} className="text-[#E07A5F]" />
                <span className="overline">// 0{i + 1}</span>
              </div>
              <h3 className="mt-8 font-serif text-3xl tracking-tight">{t}</h3>
              <p className="mt-4 text-sm text-foreground/70 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="// Sample COA — Container Q-2025-1187" title="Every shipment ships with its own number." kicker="The certificate of analysis below is illustrative only — your actual COA will be issued by SGS / Intertek against your specific contract values.">
        <div className="border border-border bg-[#0A0909] mt-2">
          <div className="grid grid-cols-3 bg-[#141212] border-b border-border">
            <div className="p-5 overline">Parameter</div>
            <div className="p-5 overline border-l border-border">Result</div>
            <div className="p-5 overline border-l border-border">Status</div>
          </div>
          {COA.map(([k, v], i) => (
            <div key={k} className={`grid grid-cols-3 ${i !== COA.length - 1 ? "border-b border-border" : ""}`}>
              <div className="p-5 font-mono text-sm">{k}</div>
              <div className="p-5 font-mono text-sm border-l border-border">{v}</div>
              <div className="p-5 font-mono text-sm border-l border-border text-[#E07A5F]">Pass</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
