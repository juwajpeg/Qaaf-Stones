import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import { submitRFQ } from "@/lib/api";

const PRODUCTS = [
  "Edible Pink Salt",
  "Pink Salt Lamps",
  "Bath & Spa Salt",
  "Salt Bricks & Tiles",
  "Animal Salt Licks",
  "Gourmet Grinder Salt",
  "Other / Custom",
];

const INCOTERMS = ["FOB", "CIF", "CFR", "EXW", "DAP"];

export default function RFQ() {
  const location = useLocation();
  const [form, setForm] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    country: "",
    product: location.state?.product || "",
    grade: "",
    quantity_mt: "",
    packaging: "",
    destination_port: "",
    incoterms: "",
    target_price: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (location.state?.product) setForm((f) => ({ ...f, product: location.state.product }));
  }, [location.state]);

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const required = ["company_name", "contact_name", "email", "country", "product"];
    for (const r of required) {
      if (!form[r]) { toast.error("Please fill all required fields."); return; }
    }
    setLoading(true);
    try {
      await submitRFQ(form);
      toast.success("RFQ received. Our export desk will revert with COA + price within 24h.");
      setSuccess(true);
      setForm({ company_name: "", contact_name: "", email: "", phone: "", country: "", product: "", grade: "", quantity_mt: "", packaging: "", destination_port: "", incoterms: "", target_price: "", message: "" });
    } catch (err) {
      toast.error("Submission failed. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="page-rfq">
      <section className="border-b border-border">
        <div className="max-w-[1480px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="overline">// B2B · Request for Quotation</div>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl tracking-tight max-w-4xl leading-[1]">
            One form. <span className="italic text-foreground/60">One quote.</span> One day.
          </h1>
          <p className="mt-8 max-w-2xl text-foreground/75 leading-relaxed">
            Fill the brief below. We will revert within 24 business hours with a sample
            COA, an FOB Karachi quote (and CIF if needed), packaging visuals, and a
            proforma invoice.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10">
          {success ? (
            <div data-testid="rfq-success" className="border border-[#E07A5F] bg-[#E07A5F]/5 p-12 text-center">
              <div className="overline text-[#E07A5F]">// RFQ-{Math.floor(Math.random() * 9000 + 1000)} received</div>
              <h2 className="mt-6 font-serif text-4xl md:text-5xl tracking-tight">Thank you.</h2>
              <p className="mt-4 text-foreground/75 max-w-xl mx-auto">
                Your enquiry is queued at our export desk. Expect an email from
                a real human within one business day.
              </p>
              <button
                onClick={() => setSuccess(false)}
                data-testid="rfq-new"
                className="mt-8 inline-flex items-center gap-2 border border-border hover:border-[#E07A5F] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] hover-shift"
              >
                Submit another RFQ <ArrowUpRight size={14} />
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} data-testid="rfq-form" className="border border-border bg-[#0A0909]">
              {/* Section 1 — Buyer */}
              <FormBlock title="01 — Buyer Information">
                <Row>
                  <Field label="Company name" testid="rfq-company" required value={form.company_name} onChange={onChange("company_name")} />
                  <Field label="Contact name" testid="rfq-contact" required value={form.contact_name} onChange={onChange("contact_name")} className="md:border-l border-t md:border-t-0 border-border" />
                </Row>
                <Row>
                  <Field label="Email" testid="rfq-email" type="email" required value={form.email} onChange={onChange("email")} className="border-t border-border" />
                  <Field label="Phone / WhatsApp" testid="rfq-phone" value={form.phone} onChange={onChange("phone")} className="border-t md:border-l border-border" />
                </Row>
                <Row>
                  <Field label="Country" testid="rfq-country" required value={form.country} onChange={onChange("country")} className="border-t border-border" />
                </Row>
              </FormBlock>

              {/* Section 2 — Product */}
              <FormBlock title="02 — Product Specification">
                <Row>
                  <SelectField label="Product" testid="rfq-product" required options={PRODUCTS} value={form.product} onChange={onChange("product")} />
                  <Field label="Grade / variant" testid="rfq-grade" value={form.grade} onChange={onChange("grade")} className="md:border-l border-t md:border-t-0 border-border" />
                </Row>
                <Row>
                  <Field label="Quantity (MT or pcs)" testid="rfq-quantity" value={form.quantity_mt} onChange={onChange("quantity_mt")} placeholder="e.g. 60 MT or 2 x 20ft" className="border-t border-border" />
                  <Field label="Packaging preference" testid="rfq-packaging" value={form.packaging} onChange={onChange("packaging")} placeholder="25kg PP, jumbo, retail…" className="border-t md:border-l border-border" />
                </Row>
              </FormBlock>

              {/* Section 3 — Logistics */}
              <FormBlock title="03 — Logistics & Commercials">
                <Row>
                  <Field label="Destination port" testid="rfq-port" value={form.destination_port} onChange={onChange("destination_port")} placeholder="Hamburg, Jebel Ali…" />
                  <SelectField label="Incoterms" testid="rfq-incoterms" options={INCOTERMS} value={form.incoterms} onChange={onChange("incoterms")} className="md:border-l border-t md:border-t-0 border-border" />
                </Row>
                <Row>
                  <Field label="Target price (USD/MT)" testid="rfq-price" value={form.target_price} onChange={onChange("target_price")} placeholder="optional" className="border-t border-border" />
                </Row>
              </FormBlock>

              {/* Section 4 — Message */}
              <FormBlock title="04 — Additional notes">
                <label className="block p-5">
                  <span className="overline">Message</span>
                  <textarea
                    data-testid="rfq-message"
                    rows={5}
                    value={form.message}
                    onChange={onChange("message")}
                    placeholder="Private label, certifications required, sample preference, etc."
                    className="mt-3 w-full bg-transparent border-0 p-0 outline-none focus:ring-0 resize-none font-sans"
                  />
                </label>
              </FormBlock>

              <div className="border-t border-border p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  By submitting, you agree to be contacted by our export desk.
                </span>
                <button
                  type="submit"
                  data-testid="rfq-submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-[#E07A5F] hover:bg-[#F08B70] disabled:opacity-60 text-[#0A0909] px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] hover-shift"
                >
                  {loading ? "Submitting…" : <>Submit RFQ <ArrowUpRight size={14} /></>}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

const FormBlock = ({ title, children }) => (
  <div className="border-b border-border last:border-b-0">
    <div className="px-5 py-4 border-b border-border bg-[#141212]">
      <div className="overline">{title}</div>
    </div>
    <div>{children}</div>
  </div>
);

const Row = ({ children }) => <div className="grid grid-cols-1 md:grid-cols-2">{children}</div>;

const Field = ({ label, testid, type = "text", value, onChange, required, placeholder, className = "" }) => (
  <label className={`block p-5 ${className}`}>
    <span className="overline">{label}{required && " *"}</span>
    <input
      data-testid={testid}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="mt-3 w-full bg-transparent border-0 p-0 outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground font-sans"
    />
  </label>
);

const SelectField = ({ label, testid, options, value, onChange, required, className = "" }) => (
  <label className={`block p-5 ${className}`}>
    <span className="overline">{label}{required && " *"}</span>
    <select
      data-testid={testid}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-3 w-full bg-transparent border-0 p-0 outline-none focus:ring-0 text-foreground font-sans appearance-none cursor-pointer"
    >
      <option value="" className="bg-[#0A0909]">— Select —</option>
      {options.map((o) => (
        <option key={o} value={o} className="bg-[#0A0909]">{o}</option>
      ))}
    </select>
  </label>
);
