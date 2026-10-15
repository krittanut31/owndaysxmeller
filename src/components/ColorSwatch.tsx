import type { Sku } from "@/types/product";
import { colorName, imageUrl } from "@/lib/products";

interface ColorSwatchProps {
  sku: Sku;
  selected?: boolean;
  onSelect?: () => void;
  size?: "sm" | "md";
}

/** Circular swatch: hex fill, pattern image, or split fill for multi-color SKUs. */
export function swatchBackground(sku: Sku) {
  const [a, b] = sku.colors;
  if (b) return `linear-gradient(135deg, ${a.hex_code ?? "#000"} 50%, ${b.hex_code ?? "#000"} 50%)`;
  if (a?.hex_code) return a.hex_code;
  if (a?.path) return `center / cover url(${imageUrl(a.path)})`;
  return "#ccc";
}

export default function ColorSwatch({ sku, selected = false, onSelect, size = "md" }: ColorSwatchProps) {
  const label = sku.colors.map((c) => colorName(c)).join(" / ");
  const dim = size === "sm" ? "size-[14px] lg:size-[18px]" : "size-[38px]";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
      }}
      aria-label={`${sku.code} ${label}`}
      aria-pressed={selected}
      title={label}
      className={`relative ${dim} shrink-0 cursor-pointer rounded-full p-[2px] ring-1 transition-[box-shadow] ${
        selected ? "ring-black" : "ring-transparent hover:ring-neutral-400"
      }`}
    >
      <span className="block size-full rounded-full border border-black/10" style={{ background: swatchBackground(sku) }} />
    </button>
  );
}
