interface SectionTitleProps {
  lines: string[];
  className?: string;
}

/** Display heading with the brand-orange highlight bar behind each line. */
export default function SectionTitle({ lines, className = "" }: SectionTitleProps) {
  return (
    <h2 className={`flex flex-col items-start gap-1 ${className}`}>
      {lines.map((line) => (
        <span
          key={line}
          className="bg-[linear-gradient(transparent_55%,var(--color-brand)_55%)] px-1 font-gt text-[56px] leading-[0.95] font-black tracking-tight uppercase lg:text-[96px]"
        >
          {line}
        </span>
      ))}
    </h2>
  );
}
