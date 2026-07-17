export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-40 pb-16 lg:pt-48 lg:pb-20">
      <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
        <span className="w-8 h-px bg-foreground/30" />
        {eyebrow}
      </span>
      <h1 className="text-5xl md:text-6xl lg:text-8xl font-display tracking-tight leading-[0.95] max-w-4xl">
        {title}
      </h1>
      {description && (
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mt-8">
          {description}
        </p>
      )}
    </div>
  );
}
