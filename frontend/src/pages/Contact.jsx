import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { submitContact } from "@/lib/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Name, email and message are required.");
      return;
    }
    setLoading(true);
    try {
      await submitContact(form);
      toast.success("Message received. We'll respond within one business day.");
      setForm({ name: "", email: "", company: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="page-contact">
      <section className="border-b border-border">
        <div className="max-w-[1480px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="overline">// Contact</div>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl tracking-tight max-w-3xl leading-[1]">
            One desk. Two languages. <span className="italic text-foreground/60">European hours.</span>
          </h1>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="max-w-[1480px] mx-auto grid grid-cols-1 md:grid-cols-3">
          {[
            { Icon: Mail, t: "Email", v: "export@qstones.com", h: "mailto:export@qstones.com" },
            { Icon: Phone, t: "Phone / WhatsApp", v: "+92 (0) 51 000 0000", h: "tel:+92510000000" },
            { Icon: MapPin, t: "Office", v: "Khewra Salt Region, Punjab, Pakistan", h: "https://maps.google.com/?q=Khewra+Salt+Mine" },
          ].map(({ Icon, t, v, h }, i) => (
            <a
              key={t}
              href={h}
              target={t === "Office" ? "_blank" : undefined}
              rel="noreferrer"
              data-testid={`contact-info-${i}`}
              className={`p-8 md:p-12 flex items-start gap-6 hover:bg-[#141212] transition-colors ${i !== 0 ? "md:border-l border-border" : ""}`}
            >
              <Icon size={22} className="text-[#E07A5F] mt-1" />
              <div>
                <div className="overline">{t}</div>
                <div className="mt-3 font-serif text-2xl">{v}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-[1480px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="overline">// General enquiry</div>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl tracking-tight">Tell us what you need.</h2>
            <p className="mt-6 text-foreground/70 leading-relaxed">
              For volume quotations, please use the <Link to="/rfq" data-testid="rfq-link-from-contact" className="text-[#E07A5F] underline underline-offset-4">RFQ form</Link>. This contact form routes to our partnerships desk.
            </p>
            <div className="mt-10 border border-border p-6 bg-[#141212]">
              <div className="overline">// Office hours (PKT)</div>
              <p className="mt-3 font-mono text-sm">Mon–Fri · 09:00 — 19:00</p>
              <p className="font-mono text-sm">Sat · 10:00 — 14:00</p>
              <div className="qs-divider my-4" />
              <div className="overline">// Languages</div>
              <p className="mt-3 font-mono text-sm">English · Urdu · Arabic</p>
            </div>
          </div>

          <form onSubmit={onSubmit} data-testid="contact-form" className="md:col-span-7 border border-border bg-[#0A0909]">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <Field label="Full name" testid="contact-name" required value={form.name} onChange={onChange("name")} />
              <Field label="Email" testid="contact-email" type="email" required value={form.email} onChange={onChange("email")} className="md:border-l border-t md:border-t-0 border-border" />
              <Field label="Company" testid="contact-company" value={form.company} onChange={onChange("company")} className="border-t border-border" />
              <Field label="Subject" testid="contact-subject" value={form.subject} onChange={onChange("subject")} className="border-t border-border md:border-l" />
            </div>
            <div className="border-t border-border">
              <label className="block p-5">
                <span className="overline">Message *</span>
                <textarea
                  data-testid="contact-message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={onChange("message")}
                  className="mt-3 w-full bg-transparent border-0 p-0 outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground resize-none font-sans"
                  placeholder="What can we help with?"
                />
              </label>
            </div>
            <div className="border-t border-border p-5 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Avg response · &lt; 1 business day</span>
              <button
                type="submit"
                data-testid="contact-submit"
                disabled={loading}
                className="inline-flex items-center gap-2 bg-[#E07A5F] hover:bg-[#F08B70] disabled:opacity-50 text-[#0A0909] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em]"
              >
                {loading ? "Sending…" : <>Send message <ArrowUpRight size={14} /></>}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

const Field = ({ label, testid, type = "text", value, onChange, required, className = "" }) => (
  <label className={`block p-5 ${className}`}>
    <span className="overline">{label}{required && " *"}</span>
    <input
      data-testid={testid}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-3 w-full bg-transparent border-0 p-0 outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground font-sans"
    />
  </label>
);
