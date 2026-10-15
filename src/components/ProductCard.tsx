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
      className="group cursor-pointer bg-white p-[10px] outline-none focus-visible:ring-2 focus-visible:ring-black lg:p-[13px]"
    >
      <div className="relative aspect-[396/290] overflow-hidden bg-[#f0f0f0]">
        {src && (
          <Image
            src={src}
            alt={`${item.product.model_name} ${sku.code}`}
            fill
            sizes="(min-width: 1024px) 400px, 100vw"
            priority={priority}
            className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 lg:mt-4">
        <h3 className="font-gt text-[26px] leading-none font-black uppercase lg:text-[32px]">
          {item.product.model_name}
        </h3>
        <div className="flex items-center gap-[3px]">
          {item.skus.slice(0, MAX_SWATCHES).map((s, i) => (
            <ColorSwatch
              key={s.id}
              sku={s}
              size="sm"
              selected={i === skuIndex}
              onSelect={() => setSkuIndex(i)}
            />
          ))}
          {hidden > 0 && <span className="ml-1 font-favorit text-[11px] text-neutral-500">+{hidden}</span>}
        </div>
      </div>
      <div className="mt-1 flex items-baseline justify-between font-favorit text-[10px] lg:text-[11px]">
        <span className="text-neutral-600">{productNumber(item, sku)}</span>
        <span className="font-bold">{formatPriceTax(item.selling_setting.price)}</span>
      </div>
    </article>
  );
}

export default memo(ProductCard);
