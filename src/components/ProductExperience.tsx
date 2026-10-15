"use client";

import { useCallback, useState } from "react";
import type { ProductItem } from "@/types/product";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import StyleSection from "./StyleSection";

interface ProductExperienceProps {
  products: ProductItem[];
}

/** Owns the shared modal state for the product grid and the style carousel. */
export default function ProductExperience({ products }: ProductExperienceProps) {
  // `key` remounts the modal on every open so SKU state resets and the enter transition replays.
  const [active, setActive] = useState<{ item: ProductItem; sku: number; key: number } | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((item: ProductItem, sku: number) => {
    setActive((prev) => ({ item, sku, key: (prev?.key ?? 0) + 1 }));
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <section id="products" className="relative mx-auto max-w-[1440px] px-4 lg:px-[70px]">
        <div className="grid grid-cols-1 gap-[17px] lg:grid-cols-3">
          {products.map((item, i) => (
            <ProductCard key={item.product.id} item={item} priority={i < 3} onOpen={open} />
          ))}
        </div>
      </section>

      <StyleSection products={products} onOpen={open} />

      {active && (
        <ProductModal key={active.key} item={active.item} initialSku={active.sku} open={isOpen} onClose={close} />
      )}
    </>
  );
}
