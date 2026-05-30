import { Link } from "react-router-dom";

export const Logo = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: { glyph: "text-5xl md:text-6xl", word: "text-base md:text-lg" },
    md: { glyph: "text-6xl md:text-7xl", word: "text-xl md:text-2xl" },
    lg: { glyph: "text-7xl md:text-8xl", word: "text-2xl md:text-3xl" },
  };
  const s = sizes[size] || sizes.md;

  return (
    <Link
      to="/"
      data-testid="qs-logo"
      className={`group inline-flex items-end gap-2 select-none ${className}`}
    >
      <span
        className={`qs-glyph ${s.glyph} text-[#E07A5F] group-hover:text-[#F08B70] transition-colors leading-[0.8]`}
        aria-hidden="true"
      >
        ق
      </span>
      <span className={`font-serif font-light tracking-tight ${s.word} text-foreground`}>
        stones
      </span>
    </Link>
  );
};

export default Logo;
