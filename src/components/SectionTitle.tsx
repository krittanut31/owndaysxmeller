"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

interface SectionTitleProps {
  lines: string[];
  as?: ElementType;
  className?: string;
  /** Delay between lines, in seconds. */
  step?: number;
}

/**
 * Condensed display heading with a box-reveal on scroll: a solid block wipes in
 * from the left, the text appears, then the block wipes out to the right.
 */
export default function SectionTitle({ lines, as: Tag = "h2", className = "", step = 0.1 }: SectionTitleProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -30% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-inview={inView}
      aria-label={lines.join(" ")}
      className={`box-reveal font-gt leading-[0.85] font-black tracking-[-0.01em] uppercase ${className}`}
    >
      {lines.map((line, i) => (
        <span key={line} className="block" aria-hidden>
          <span className="box-reveal-line" style={{ "--reveal-delay": `${i * step}s` } as React.CSSProperties}>
            <span className="box-reveal-text">{line}</span>
          </span>
        </span>
      ))}
    </Tag>
  );
}
