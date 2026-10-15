import type { ElementType } from "react";

interface SectionTitleProps {
  lines: string[];
  as?: ElementType;
  className?: string;
}

/** Condensed display heading (GT America Compressed). */
export default function SectionTitle({ lines, as: Tag = "h2", className = "" }: SectionTitleProps) {
  return (
    <Tag className={`font-gt leading-[0.85] font-black tracking-[-0.01em] uppercase ${className}`}>
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </Tag>
  );
}
