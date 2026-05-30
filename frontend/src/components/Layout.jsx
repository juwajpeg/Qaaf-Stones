import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/process", label: "Process" },
  { to: "/certifications", label: "Certifications" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0A0909]/85 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1480px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <Logo size="sm" />
        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              data-testid={`nav-${n.label.toLowerCase()}`}
              className={({ isActive }) =>
                `font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${
                  isActive ? "text-[#E07A5F]" : "text-foreground/70 hover:text-foreground"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/rfq"
            data-testid="header-rfq-cta"
            className="hidden md:inline-flex items-center gap-2 bg-[#E07A5F] hover:bg-[#F08B70] text-[#0A0909] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] hover-shift"
          >
            Request Quote <ArrowUpRight size={14} />
          </Link>
          <button
            data-testid="mobile-menu-btn"
            className="lg:hidden text-foreground p-2 -mr-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div data-testid="mobile-menu" className="lg:hidden bg-[#0A0909] border-t border-border">
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                data-testid={`mobile-nav-${n.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `font-serif text-2xl ${isActive ? "text-[#E07A5F]" : "text-foreground"}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Link
              to="/rfq"
              data-testid="mobile-rfq-cta"
              className="mt-4 inline-flex items-center justify-center gap-2 bg-[#E07A5F] text-[#0A0909] px-5 py-4 font-mono text-[11px] uppercase tracking-[0.2em]"
            >
              Request Quote <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer data-testid="site-footer" className="border-t border-border mt-32 pt-16 pb-10 bg-[#0A0909]">
    <div className="max-w-[1480px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
      <div className="md:col-span-5">
        <Logo size="md" />
        <p className="mt-6 font-serif text-2xl leading-snug text-foreground/85 max-w-md">
          Pakistan&apos;s Khewra mineral, exported with editorial precision.
        </p>
        <p className="mt-4 text-sm text-muted-foreground max-w-md">
          Qaaf Stones is a B2B exporter of premium Himalayan pink salt — sourced direct, processed cleanly, shipped globally.
        </p>
      </div>
      <div className="md:col-span-3">
        <div className="overline mb-4">Sitemap</div>
        <ul className="space-y-2 text-sm">
          {NAV.map((n) => (
            <li key={n.to}>
              <Link to={n.to} data-testid={`footer-link-${n.label.toLowerCase()}`} className="text-foreground/80 hover:text-[#E07A5F] transition-colors">
                {n.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/rfq" data-testid="footer-link-rfq" className="text-foreground/80 hover:text-[#E07A5F] transition-colors">
              RFQ
            </Link>
          </li>
        </ul>
      </div>
      <div className="md:col-span-4">
        <div className="overline mb-4">Office</div>
        <p className="text-sm text-foreground/80 leading-relaxed">
          ق stones (Pvt.) Ltd.<br />
          Khewra Salt Region, Punjab,<br />
          Pakistan
        </p>
        <div className="overline mt-6 mb-2">Contact</div>
        <p className="text-sm text-foreground/80">
          export@qaafstones.com<br />
          +92 328 1317473
        </p>
      </div>
    </div>

    <div className="max-w-[1480px] mx-auto px-6 md:px-10 mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        © {new Date().getFullYear()} ق Stones — All rights reserved
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        Origin · Khewra · Pakistan · Lat 32.6483° N
      </p>
    </div>
  </footer>
);

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
