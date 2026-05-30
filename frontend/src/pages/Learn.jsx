import { Link } from "react-router-dom";
import { ArrowUpRight, Check, X, AlertCircle, Beaker, Mountain, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Section from "@/components/Section";

/* ---------- Data ---------- */
const COMPOSITION = [
  { mineral: "Sodium Chloride (NaCl)", value: "98.0 – 99.2%", note: "Base salinity" },
  { mineral: "Sulfate (SO₄²⁻)", value: "≤ 0.5%", note: "Trace" },
  { mineral: "Calcium (Ca)", value: "0.10 – 0.40%", note: "Trace" },
  { mineral: "Iron (Fe)", value: "0.05 – 0.50%", note: "Source of pink colour" },
  { mineral: "Magnesium (Mg)", value: "0.05 – 0.20%", note: "Trace" },
  { mineral: "Potassium (K)", value: "≤ 0.05%", note: "Trace" },
  { mineral: "Moisture", value: "≤ 0.5%", note: "Naturally dry" },
];

const COMPARISON = [
  {
    attr: "Origin",
    himalayan: "Khewra Mine, Pakistan (250M yr old deposit)",
    table: "Mostly mined inland, then heavily refined",
    sea: "Evaporated from modern seawater",
    celtic: "Hand-harvested from Atlantic coastal pools, France",
  },
  {
    attr: "Processing",
    himalayan: "Hand-mined, crushed, washed, screened",
    table: "Refined, bleached, anti-caking agents added",
    sea: "Solar-evaporated, minimal processing",
    celtic: "Hand-raked, sun-dried, unwashed",
  },
  {
    attr: "Mineral content",
    himalayan: "Trace iron, calcium, magnesium, potassium",
    table: "Pure NaCl + iodine + anti-caking",
    sea: "Variable trace minerals (plus modern ocean pollutants)",
    celtic: "Rich in magnesium, traces of moisture",
  },
  {
    attr: "Iodine",
    himalayan: "No (must be supplemented)",
    table: "Yes (fortified)",
    sea: "Trace (variable)",
    celtic: "Trace (variable)",
  },
  {
    attr: "Microplastics risk",
    himalayan: "None — sealed underground for millennia",
    table: "Low (refined)",
    sea: "Documented — modern oceans contain plastics",
    celtic: "Documented — modern oceans contain plastics",
  },
  {
    attr: "Colour",
    himalayan: "Pale rose to deep pink",
    table: "Pure white",
    sea: "Off-white to grey",
    celtic: "Grey, slightly moist",
  },
  {
    attr: "Taste",
    himalayan: "Clean, mildly mineral, less harsh",
    table: "Sharply saline, sometimes metallic",
    sea: "Briny, oceanic",
    celtic: "Briny, moist, mineral",
  },
  {
    attr: "Best for",
    himalayan: "Finishing, gourmet, salt-blocks, wellness",
    table: "Industrial baking, daily cooking",
    sea: "Cooking, finishing",
    celtic: "Finishing, gourmet",
  },
];

const BENEFITS = [
  {
    t: "Lower sodium-per-gram, by volume",
    d: "Larger pink-salt crystals deliver less sodium per teaspoon than fine table salt — useful when seasoning by feel rather than weight.",
    cite: "Per USDA FoodData Central — sodium density varies with crystal size.",
  },
  {
    t: "Free of anti-caking agents",
    d: "Industrially refined table salt typically contains ferrocyanides, silicoaluminates or anti-caking agents. Pink salt is naturally free of additives.",
    cite: "Codex Alimentarius CXS 150-1985, food-grade salt standard.",
  },
  {
    t: "Negligible microplastic exposure",
    d: "Multiple peer-reviewed studies (Yang et al. 2017; Karami et al. 2017) detected microplastics in sea salt. Underground-mined pink salt — sealed in rock for 250M years — is documented as a low-exposure alternative.",
    cite: "Environ. Sci. Technol. 51, 13(2017): 7531-7538.",
  },
  {
    t: "Functional finishing salt",
    d: "Coarse pink crystals improve crunch, distribute slowly on the tongue, and are widely used in fine dining as a finishing salt for the textural and aesthetic benefit alone.",
    cite: "Modernist Cuisine, vol. 4; Larousse Gastronomique.",
  },
  {
    t: "Halotherapy (controlled clinical use)",
    d: "Salt-cave or salt-room therapy using pure rock-salt aerosols has small but documented benefits for COPD and certain respiratory conditions in controlled clinical settings.",
    cite: "Chervinskaya & Zilber (1995); Cochrane review limited.",
  },
];

const MYTHS = [
  {
    myth: "Pink salt contains 84 essential minerals.",
    fact: "It contains traces of ~10–12 minerals at percentages below 0.5% combined. The 84-minerals claim is folklore — and even if true, the doses would be biologically irrelevant.",
  },
  {
    myth: "It cures dehydration / detoxes the body.",
    fact: "There is no peer-reviewed evidence that pink salt detoxifies anything. Hydration is governed by water + electrolyte balance, not salt type.",
  },
  {
    myth: "Pink salt is 'healthier' than table salt.",
    fact: "Sodium chloride is sodium chloride. Daily intake limits set by the WHO apply equally to all salts. Pink salt is purer and additive-free — that is its real edge, not a magical health profile.",
  },
  {
    myth: "It boosts energy and sleep.",
    fact: "Anecdotal at best. The trace mineral quantities are far below any dose shown to affect energy metabolism or sleep architecture.",
  },
  {
    myth: "Salt lamps purify air.",
    fact: "Pleasant ambient lighting — yes. Air ionising effect — minimal to none under normal room conditions. The wellness benefit is psychological and aesthetic, not chemical.",
  },
  {
    myth: "All pink salt is from Pakistan.",
    fact: "True Himalayan pink salt is from the Khewra Salt Range in Pakistan. Some imitators source pink-tinted salt from Iran, Poland or the Andes and label it 'Himalayan'.",
  },
];

const FAQ = [
  {
    q: "Where does Himalayan pink salt actually come from?",
    a: "From the Khewra Salt Mine in the Punjab province of Pakistan — the second-largest salt mine in the world. The mineral was laid down ~250 million years ago when an ancient sea evaporated and was sealed beneath the rising Himalaya–Karakoram range.",
  },
  {
    q: "Why is it pink?",
    a: "The colour comes from trace iron oxide and other mineral inclusions. The intensity ranges from pale rose to deep red depending on the mine zone — colour does not indicate quality.",
  },
  {
    q: "Is pink salt safer for high blood pressure?",
    a: "No. Sodium content per gram is essentially identical to other salts. If you are limiting sodium, you must limit pink salt by the same standard.",
  },
  {
    q: "Does it contain iodine?",
    a: "Not naturally. Populations relying on pink salt as their sole sodium source should ensure iodine intake from seafood, dairy, eggs or fortified foods.",
  },
  {
    q: "What's the difference between cooking grade and finishing grade?",
    a: "Cooking grade is finer, dissolves quickly, and is used during cooking. Finishing grade has larger crystals (2–5mm or more) and is sprinkled at the end for crunch, aesthetic and slow salinity release.",
  },
  {
    q: "How should I store it?",
    a: "Dry, sealed, away from direct sunlight. Pink salt is hygroscopic — it will pick up humidity. A wooden or glass container with a tight seal is ideal.",
  },
  {
    q: "What is the shelf life?",
    a: "Indefinite when stored properly. Salt is mineral, not organic — it does not expire.",
  },
  {
    q: "How is it different from sea salt?",
    a: "Sea salt is evaporated from current oceans; pink salt is mined from an ancient evaporated sea. Pink salt is therefore free of modern ocean contaminants (microplastics, heavy-metal runoff).",
  },
  {
    q: "Can it be used in salt lamps and bricks?",
    a: "Yes — large crystalline blocks are carved into lamps, bowls, plates and bricks. The structural integrity of Khewra salt makes it particularly suitable for halotherapy chambers.",
  },
  {
    q: "What grades does Qaaf Stones supply?",
    a: "Six product families — edible (powder to crystals), gourmet grinder, bath & spa, lamps & décor, architectural bricks/tiles, and animal licks. Each is available in Food-Grade A/B or Industrial. Custom granulation and private-label packaging on request.",
  },
];

const USES = [
  { t: "Finishing", d: "Sprinkle coarse crystals on grilled meat, dark chocolate, salted caramels, ripe heirloom tomatoes." },
  { t: "Curing & Brining", d: "Excellent for dry-curing fish, charcuterie and gravlax. Larger crystals draw moisture slowly and predictably." },
  { t: "Salt Block Cooking", d: "Heat a Khewra salt slab to 260 °C and sear thinly sliced steak or sashimi directly on it." },
  { t: "Bath & Spa", d: "Dissolve 1–2 cups in a warm bath; rich in magnesium-trace minerals, easier on the skin than chlorinated salt." },
  { t: "Halotherapy", d: "Salt rooms built with pink-salt bricks aerosolise micro-particles studied for respiratory wellness." },
  { t: "Aesthetic", d: "Salt lamps, candle holders, serving dishes — natural ambient light in the rose-amber spectrum." },
];

/* ---------- Components ---------- */
const SectionTitle = ({ eyebrow, title }) => (
  <div>
    <div className="overline">{eyebrow}</div>
    <h2 className="mt-5 font-serif text-4xl md:text-6xl tracking-tight leading-[1.02] max-w-4xl">
      {title}
    </h2>
  </div>
);

const HERO_IMG =
  "https://images.pexels.com/photos/9974506/pexels-photo-9974506.jpeg?auto=compress&cs=tinysrgb&w=1800";
const ORIGIN_IMG =
  "https://static.prod-images.emergentagent.com/jobs/48fe1fb7-5393-4302-b72a-90bda65bb8a1/images/fd428b934c1506394c4f3750dfad33941be24a3a49bda4da57ede082c6c5b97e.png";

export default function Learn() {
  return (
    <div data-testid="page-learn">
      {/* HERO */}
      <section className="relative min-h-[78vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0909] via-[#0A0909]/75 to-[#0A0909]/40" />
        <div className="relative max-w-[1480px] mx-auto px-6 md:px-10 pb-20 md:pb-28 w-full">
          <div className="overline qs-fade">// Pink Salt · 101</div>
          <h1 className="qs-fade qs-fade-d1 mt-6 font-serif font-light tracking-[-0.02em] text-[clamp(2.5rem,7vw,7rem)] leading-[0.95]">
            What pink salt<br />
            <span className="italic text-foreground/75">actually is.</span>
          </h1>
          <p className="qs-fade qs-fade-d2 mt-8 max-w-2xl text-foreground/80 text-base md:text-lg leading-relaxed">
            An honest, evidence-based guide to Himalayan pink salt — its origin, chemistry,
            real benefits and the marketing myths around it.
          </p>
        </div>
      </section>

      {/* OVERVIEW */}
      <Section eyebrow="// Chapter 01" title="The 30-second overview.">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-7 space-y-6 text-foreground/80 leading-relaxed text-base md:text-lg">
            <p>
              Himalayan pink salt is rock salt — sodium chloride — mined from the
              <span className="text-foreground"> Khewra Salt Range</span> in the Punjab
              province of Pakistan. The deposit was formed roughly{" "}
              <span className="text-[#E07A5F]">250 million years ago</span>, when a
              shallow inland sea evaporated and was later sealed under the Himalayan
              foothills.
            </p>
            <p>
              The pink hue comes from <em className="text-foreground">trace iron oxide</em>{" "}
              and other minor mineral inclusions. Beyond aesthetics, the salt is prized
              because it has been physically sealed beneath rock for millions of years —
              meaning it carries none of the microplastics or modern-ocean pollutants
              found in sea-evaporated salts harvested today.
            </p>
            <p>
              The bulk of marketing claims around pink salt — magic mineral counts,
              detoxification, energy boosts — are unsupported by scientific evidence.
              Its real advantages are simpler and more honest:{" "}
              <span className="text-foreground">purity</span>, no additives, no
              microplastics, structural beauty, and a gentle finishing profile.
            </p>
          </div>

          <aside className="md:col-span-5 border border-border bg-[#141212] p-8">
            <div className="flex items-center gap-3">
              <Mountain size={18} className="text-[#E07A5F]" />
              <div className="overline">// At a glance</div>
            </div>
            <dl className="mt-6 divide-y divide-border">
              {[
                ["Scientific name", "Halite (NaCl)"],
                ["Age of deposit", "~250 million years"],
                ["Location", "Khewra, Punjab, Pakistan"],
                ["Colour cause", "Trace iron oxide"],
                ["NaCl content", "98 – 99.2%"],
                ["Iodine", "None (natural)"],
                ["Microplastics", "None"],
                ["Shelf life", "Indefinite"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-2 py-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="font-mono text-sm text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Section>

      {/* MINERAL COMPOSITION */}
      <section className="border-y border-border bg-[#0A0909]">
        <div className="max-w-[1480px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionTitle eyebrow="// Chapter 02" title="What's actually inside." />
          <p className="mt-6 max-w-3xl text-foreground/70 leading-relaxed">
            Typical chemistry of Khewra pink salt. Trace minerals are present in
            biologically negligible quantities — they explain the colour and the
            mild flavour, but not the marketing claims.
          </p>
          <div className="mt-12 border border-border bg-[#0A0909]">
            <div className="grid grid-cols-12 bg-[#141212] border-b border-border">
              <div className="col-span-5 p-5 overline">Component</div>
              <div className="col-span-3 p-5 overline border-l border-border">Typical range</div>
              <div className="col-span-4 p-5 overline border-l border-border">Note</div>
            </div>
            {COMPOSITION.map((c, i) => (
              <div
                key={c.mineral}
                className={`grid grid-cols-12 ${
                  i !== COMPOSITION.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="col-span-5 p-5 font-serif text-lg">{c.mineral}</div>
                <div className="col-span-3 p-5 font-mono text-sm border-l border-border">
                  {c.value}
                </div>
                <div className="col-span-4 p-5 font-mono text-sm text-foreground/70 border-l border-border">
                  {c.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <Section eyebrow="// Chapter 03" title="How it compares — honestly.">
        <p className="mt-2 max-w-3xl text-foreground/70 leading-relaxed">
          Pink Himalayan vs Table vs Sea vs Celtic — across origin, processing, chemistry, taste and best use.
        </p>

        <div className="mt-14 hidden md:block border border-border overflow-x-auto" data-testid="comparison-table">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#141212] border-b border-border">
                <th className="overline text-left p-5 w-[18%]">Attribute</th>
                <th className="overline text-left p-5 w-[22%] text-[#E07A5F]">Pink Himalayan</th>
                <th className="overline text-left p-5 w-[20%] border-l border-border">Table Salt</th>
                <th className="overline text-left p-5 w-[20%] border-l border-border">Sea Salt</th>
                <th className="overline text-left p-5 w-[20%] border-l border-border">Celtic Salt</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={row.attr} className={i !== COMPARISON.length - 1 ? "border-b border-border" : ""}>
                  <td className="p-5 font-serif text-base align-top">{row.attr}</td>
                  <td className="p-5 text-foreground/90 align-top">{row.himalayan}</td>
                  <td className="p-5 text-foreground/70 align-top border-l border-border">{row.table}</td>
                  <td className="p-5 text-foreground/70 align-top border-l border-border">{row.sea}</td>
                  <td className="p-5 text-foreground/70 align-top border-l border-border">{row.celtic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked cards */}
        <div className="mt-12 md:hidden space-y-6">
          {COMPARISON.map((row) => (
            <div key={row.attr} className="border border-border">
              <div className="p-4 bg-[#141212] border-b border-border overline">{row.attr}</div>
              <div className="p-4 space-y-3 text-sm">
                <div><span className="overline block mb-1">Pink Himalayan</span><span className="text-foreground/90">{row.himalayan}</span></div>
                <div className="border-t border-border pt-3"><span className="overline block mb-1">Table</span><span className="text-foreground/70">{row.table}</span></div>
                <div className="border-t border-border pt-3"><span className="overline block mb-1">Sea</span><span className="text-foreground/70">{row.sea}</span></div>
                <div className="border-t border-border pt-3"><span className="overline block mb-1">Celtic</span><span className="text-foreground/70">{row.celtic}</span></div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* BENEFITS */}
      <section className="border-t border-border bg-[#141212]">
        <div className="max-w-[1480px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionTitle eyebrow="// Chapter 04 · Scientifically grounded" title="What pink salt actually does well." />
          <p className="mt-6 max-w-3xl text-foreground/70 leading-relaxed">
            Below are the benefits with peer-reviewed or industry-standard backing.
            Everything else you read about pink salt online — please assume marketing.
          </p>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {BENEFITS.map((b, i) => (
              <div key={b.t} className="bg-[#0A0909] p-8 md:p-10 hover-shift">
                <div className="flex items-center gap-3">
                  <Sparkles size={18} className="text-[#E07A5F]" />
                  <span className="overline">// 0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-serif text-2xl md:text-3xl tracking-tight">{b.t}</h3>
                <p className="mt-4 text-foreground/75 leading-relaxed text-sm">{b.d}</p>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground border-t border-border pt-4">
                  Source · {b.cite}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MYTHS VS FACTS */}
      <Section eyebrow="// Chapter 05 · Marketing vs reality" title="Myths and facts — straight.">
        <p className="mt-2 max-w-3xl text-foreground/70 leading-relaxed">
          We sell pink salt for a living, and we still think it's worth being honest about what it isn't.
        </p>
        <div className="mt-14 space-y-px bg-border">
          {MYTHS.map((m, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              <div className="bg-[#0A0909] p-8">
                <div className="flex items-center gap-3">
                  <X size={18} className="text-red-400" />
                  <span className="overline text-red-300">// Myth</span>
                </div>
                <p className="mt-5 font-serif text-xl md:text-2xl leading-snug text-foreground/85">
                  &ldquo;{m.myth}&rdquo;
                </p>
              </div>
              <div className="bg-[#141212] p-8">
                <div className="flex items-center gap-3">
                  <Check size={18} className="text-[#E07A5F]" />
                  <span className="overline text-[#E07A5F]">// Fact</span>
                </div>
                <p className="mt-5 text-foreground/85 leading-relaxed">{m.fact}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CULINARY & PRACTICAL USES */}
      <section className="border-t border-border">
        <div className="max-w-[1480px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionTitle eyebrow="// Chapter 06" title="Where it actually shines." />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {USES.map((u, i) => (
              <div key={u.t} className="bg-[#0A0909] p-8 hover-shift">
                <span className="overline">// 0{i + 1}</span>
                <h3 className="mt-4 font-serif text-2xl">{u.t}</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{u.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WARNING / RESPONSIBLE USE */}
      <section className="border-y border-border bg-[#141212]">
        <div className="max-w-[1480px] mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <AlertCircle size={28} className="text-[#E07A5F] flex-shrink-0 mt-1" />
            <div>
              <div className="overline">// Use responsibly</div>
              <h3 className="mt-3 font-serif text-2xl md:text-3xl leading-snug max-w-3xl">
                Sodium is sodium. The WHO recommends &lt; 5 g per day for adults — pink salt is no exception.
              </h3>
              <p className="mt-4 max-w-3xl text-foreground/75 leading-relaxed">
                If you have hypertension, cardiovascular disease, kidney disease or are
                pregnant, follow your physician's sodium guidance. Pink salt is a beautiful
                ingredient, not a medical product. Nothing on this page is medical advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <Section eyebrow="// Chapter 07" title="Frequently asked questions.">
        <Accordion type="multiple" data-testid="faq-accordion" className="mt-6 border-t border-border">
          {FAQ.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              data-testid={`faq-item-${i}`}
              className="border-b border-border"
            >
              <AccordionTrigger className="py-6 md:py-7 text-left hover:no-underline group">
                <div className="flex items-start gap-6 w-full">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E07A5F] mt-[6px] flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-xl md:text-2xl tracking-tight leading-snug text-foreground group-hover:text-[#E07A5F] transition-colors">
                    {f.q}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-0 md:pl-16 pb-8 pr-4">
                <p className="text-base text-foreground/80 leading-relaxed">{f.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* CTA */}
      <section className="relative border-t border-border">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${ORIGIN_IMG})` }}
        />
        <div className="absolute inset-0 bg-[#0A0909]/85" />
        <div className="relative max-w-[1480px] mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
          <Beaker size={28} className="text-[#E07A5F] mx-auto" />
          <h2 className="mt-6 font-serif text-4xl md:text-6xl tracking-tight max-w-4xl mx-auto leading-[1.02]">
            Want a sample? Or a specification sheet?
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-foreground/75 leading-relaxed">
            Qaaf Stones supplies food-grade, industrial, wellness and architectural pink salt to forty countries. Tell us what you need.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/rfq"
              data-testid="learn-cta-rfq"
              className="inline-flex items-center justify-center gap-2 bg-[#E07A5F] hover:bg-[#F08B70] text-[#0A0909] px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] hover-shift"
            >
              Request a quote <ArrowUpRight size={16} />
            </Link>
            <Link
              to="/products"
              data-testid="learn-cta-products"
              className="inline-flex items-center justify-center gap-2 border border-border hover:border-[#E07A5F] px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] hover-shift"
            >
              Browse catalogue <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
