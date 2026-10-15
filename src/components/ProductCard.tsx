"use client";

import { memo, useState } from "react";
import Image from "next/image";
import type { ProductItem } from "@/types/product";
import { firstImageUrl, formatPriceTax, productNumber } from "@/lib/products";
import ColorSwatch from "./ColorSwatch";

const MAX_SWATCHES = 4;

interface ProductCardProps {
  item: ProductItem;
  priority?: boolean;
  onOpen: (item: ProductItem, skuIndex: number) => void;
}

function ProductCard({ item, priority, onOpen }: ProductCardProps) {
  const [skuIndex, setSkuIndex] = useState(0);
  const sku = item.skus[skuIndex];
  const src = firstImageUrl(sku);
  const hidden = item.skus.length - MAX_SWATCHES;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(item, skuIndex)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(item, skuIndex);
        }
      }}
      className="group flex cursor-pointer flex-col rounded-[10px] bg-white p-4 outline-none transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] focus-visible:ring-2 focus-visible:ring-brand lg:p-5"
    >
      <div className="relative aspect-[390/276] overflow-hidden rounded-[10px] bg-white">
        {src && (
          <Image
            src={src}
            alt={`${item.product.model_name} ${sku.code}`}
            fill
            sizes="(min-width: 1024px) 400px, 100vw"
            priority={priority}
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-gt text-[28px] leading-none font-black tracking-wide uppercase">
            {item.product.model_name}
          </h3>
          <p className="mt-1.5 font-favorit text-[13px] text-neutral-500">{productNumber(item, sku)}</p>
        </div>
        <p className="shrink-0 font-favorit text-[15px] font-medium">
          {formatPriceTax(item.selling_setting.price)}
        </p>
      </div>

      <div className="mt-3 flex items-center gap-[3px]">
        {item.skus.slice(0, MAX_SWATCHES).map((s, i) => (
          <ColorSwatch key={s.id} sku={s} selected={i === skuIndex} onSelect={() => setSkuIndex(i)} />
        ))}
        {hidden > 0 && <span className="ml-1 font-favorit text-sm text-neutral-500">+{hidden}</span>}
      </div>
    </article>
  );
}

export default memo(ProductCard);
