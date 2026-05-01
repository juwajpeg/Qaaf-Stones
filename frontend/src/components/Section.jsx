export const Section = ({ id, eyebrow, title, kicker, children, className = "" }) => (
  <section id={id} data-testid={id ? `section-${id}` : undefined} className={`relative py-24 md:py-32 ${className}`}>
    <div className="max-w-[1480px] mx-auto px-6 md:px-10">
      {eyebrow && <div className="overline mb-6">{eyebrow}</div>}
      {title && (
        <h2 className="font-serif text-4xl md:text-6xl leading-[1.02] tracking-tight text-foreground max-w-4xl">
          {title}
        </h2>
      )}
      {kicker && (
        <p className="mt-6 max-w-2xl text-base md:text-lg text-foreground/75 leading-relaxed">
          {kicker}
        </p>
      )}
      <div className={(eyebrow || title || kicker) ? "mt-14" : ""}>{children}</div>
    </div>
  </section>
);

export default Section;
