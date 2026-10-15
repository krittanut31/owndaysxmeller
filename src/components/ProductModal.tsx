"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ProductItem } from "@/types/product";
import {
  formatPriceIncl,
  imageUrl,
  isOutOfStock,
  onlineStoreUrl,
  productNumber,
  skuColorLabel,
  sortedImages,
} from "@/lib/products";
import ColorSwatch from "./ColorSwatch";
import OnlineStoreButton from "./OnlineStoreButton";

interface ProductModalProps {
  item: ProductItem;
  initialSku: number;
  open: boolean;
  onClose: () => void;
}

export default function ProductModal({ item, initialSku, open, onClose }: ProductModalProps) {
  const [skuIndex, setSkuIndex] = useState(initialSku);
  const closeRef = useRef<HTMLButtonElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prevFocus?.focus();
    };
  }, [open, onClose]);

  const selectSku = (i: number) => {
    setSkuIndex(i);
    carouselRef.current?.scrollTo({ left: 0 });
  };

  const shown = item;
  const sku = shown.skus[skuIndex] ?? shown.skus[0];
  const images = sortedImages(sku);
  const frameType = shown.frame_types[0]?.code;

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      role="dialog"
      aria-hidden={!open} aria-modal="true" aria-labelledby="product-modal-title">
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 starting:opacity-0 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`absolute inset-y-0 right-0 flex w-full flex-col overflow-y-auto overscroll-contain bg-white transition-transform duration-300 ease-out starting:translate-x-full lg:w-[616px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between px-5 pt-6 lg:px-10 lg:pt-10">
          <h2 id="product-modal-title" className="font-gt text-[48px] leading-none font-black uppercase lg:text-[64px]">
            {shown.product.model_name}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 grid size-[42px] shrink-0 cursor-pointer place-items-center rounded-full transition-colors hover:bg-neutral-100"
          >
            {/* gridicons:cross */}
            <svg viewBox="0 0 24 24" className="size-[42px]" fill="currentColor" aria-hidden>
              <path d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z" />
            </svg>
          </button>
        </div>

        <div
          ref={carouselRef}
          className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-5 lg:px-10"
        >
          {images.map((img, i) => (
            <div
              key={img.id}
              className="relative aspect-[420/298] w-[85%] shrink-0 snap-start overflow-hidden rounded-[10px] bg-white ring-1 ring-neutral-200 lg:w-[420px]"
            >
              <Image
                src={imageUrl(img.path)}
                alt={`${shown.product.model_name} ${sku.code} ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 420px, 85vw"
                priority={i === 0}
                className="object-contain"
              />
            </div>
          ))}
        </div>

        <div className="px-5 pt-6 pb-10 lg:px-10">
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Color">
            {shown.skus.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={i === skuIndex}
                onClick={() => selectSku(i)}
                className={`flex cursor-pointer items-center gap-2 rounded-full border py-1 pr-4 pl-1 font-favorit text-sm transition-colors ${
                  i === skuIndex ? "border-black bg-black text-white" : "border-neutral-300 hover:border-black"
                }`}
              >
                <span className="pointer-events-none">
                  <ColorSwatch sku={s} />
                </span>
                {s.code} {skuColorLabel(s)}
              </button>
            ))}
          </div>

          <dl className="mt-8 grid grid-cols-[90px_1fr] gap-y-3 font-favorit text-[15px]">
            <dt className="font-bold">P/No.</dt>
            <dd>{productNumber(shown, sku)}</dd>
            {frameType && (
              <>
                <dt className="font-bold">TYPE</dt>
                <dd className="uppercase">{frameType}</dd>
              </>
            )}
            <dt className="font-bold">PRICE</dt>
            <dd>{formatPriceIncl(shown.selling_setting.price)}</dd>
          </dl>

          <p className="mt-6 text-sm leading-[1.9] text-neutral-800">{shown.localization.description}</p>

          <div className="mt-8">
            <OnlineStoreButton href={onlineStoreUrl(shown, sku)} outOfStock={isOutOfStock(shown)} />
          </div>
        </div>
      </div>
    </div>
  );
}
