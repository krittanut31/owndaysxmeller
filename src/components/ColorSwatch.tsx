import type { Sku } from "@/types/product";
import { colorName, imageUrl } from "@/lib/products";

interface ColorSwatchProps {
  sku: Sku;
  selected?: boolean;
  onSelect?: () => void;
}

/** Circular swatch: hex fill, pattern image, or split fill for multi-color SKUs. */
export default function ColorSwatch({ sku, selected = false, onSelect }: ColorSwatchProps) {
  const layers = sku.colors.map((c) =>
    c.hex_code ? c.hex_code : c.path ? `center / cover url(${imageUrl(c.path)})` : "#ccc",
  );
  const background =
    layers.length > 1
      ? `linear-gradient(135deg, ${sku.colors[0].hex_code ?? "#000"} 50%, ${sku.colors[1].hex_code ?? "#000"} 50%)`
      : layers[0];
  const label = sku.colors.map((c) => colorName(c)).join(" / ");

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
      className={`relative size-[38px] shrink-0 cursor-pointer rounded-full p-[3px] transition-[box-shadow] ${
        selected ? "ring-1 ring-black" : "ring-1 ring-transparent hover:ring-neutral-400"
      }`}
    >
      <span
        className="block size-full rounded-full border border-black/10"
        style={{ background }}
      />
    </button>
  );
}
