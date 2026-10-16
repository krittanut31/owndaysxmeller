"use client";

import { useCallback, useState } from "react";
import { flushSync } from "react-dom";
import type { ProductItem } from "@/types/product";
import ProductCard from "./ProductCard";
import ProductModal, { MODAL_TRANSITION_NAME } from "./ProductModal";
import StyleSection from "./StyleSection";

interface ProductExperienceProps {
  products: ProductItem[];
}

/** Owns the shared modal state for the product grid and the style carousel. */
export default function ProductExperience({ products }: ProductExperienceProps) {
  // `key` remounts the modal on every open so SKU state resets and the enter transition replays.
  const [active, setActive] = useState<{ item: ProductItem; sku: number; key: number; morph: boolean } | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((item: ProductItem, sku: number) => {
    setActive((prev) => ({ item, sku, key: (prev?.key ?? 0) + 1, morph: false }));
    setIsOpen(true);
  }, []);

  /** Morph the clicked element into the modal panel (View Transitions API), falling back to a plain open. */
  const openFrom = useCallback(
    (item: ProductItem, sku: number, source: HTMLElement) => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!document.startViewTransition || reduceMotion) return open(item, sku);

      source.style.viewTransitionName = MODAL_TRANSITION_NAME;
      document.startViewTransition(() => {
        source.style.viewTransitionName = "";
        flushSync(() => {
          setActive((prev) => ({ item, sku, key: (prev?.key ?? 0) + 1, morph: true }));
          setIsOpen(true);
        });
      });
    },
    [open],
  );
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <section id="products" className="bg-brand pt-8 lg:pt-[50px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-[10px] px-5 lg:grid-cols-3 lg:gap-[17px] lg:px-[50px]">
          {products.map((item, i) => (
            <ProductCard key={item.product.id} item={item} priority={i < 3} onOpen={open} />
          ))}
        </div>
      </section>

      <StyleSection products={products} onOpen={openFrom} />

      {active && (
        <ProductModal key={active.key} item={active.item} initialSku={active.sku} open={isOpen} morph={active.morph} onClose={close} />
      )}
    </>
  );
}
