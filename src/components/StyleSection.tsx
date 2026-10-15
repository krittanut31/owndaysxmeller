import Image from "next/image";
import type { ProductItem } from "@/types/product";
import { imageUrl, sortedImages } from "@/lib/products";
import SectionTitle from "./SectionTitle";

interface StyleSectionProps {
  products: ProductItem[];
  onOpen: (item: ProductItem, skuIndex: number) => void;
}

export default function StyleSection({ products, onOpen }: StyleSectionProps) {
  return (
    <section id="style" className="overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-[70px]">
        <SectionTitle lines={["How to", "Style them"]} />
      </div>

      <ul className="no-scrollbar mt-10 flex snap-x gap-4 overflow-x-auto scroll-smooth px-5 pb-2 lg:mt-14 lg:gap-6 lg:px-[max(70px,calc((100vw-1440px)/2+70px))]">
        {products.map((item) => {
          const images = sortedImages(item.skus[0]);
          const img = images[images.length - 1];
          if (!img) return null;
          return (
            <li
              key={item.product.id}
              className="relative h-[492px] w-[326px] shrink-0 snap-start overflow-hidden rounded-[10px] bg-neutral-200 lg:h-[611px] lg:w-[405px]"
            >
              <Image
                src={imageUrl(img.path)}
                alt={`${item.product.model_name} styling`}
                fill
                sizes="(min-width: 1024px) 405px, 326px"
                className="object-cover"
              />
              <span className="absolute top-5 left-5 font-gt text-2xl font-black text-white uppercase drop-shadow">
                {item.product.model_name}
              </span>
              <button
                type="button"
                onClick={() => onOpen(item, 0)}
                aria-label={`View ${item.product.model_name} details`}
                className="absolute right-5 bottom-5 grid size-[70px] cursor-pointer place-items-center rounded-full bg-black text-white transition-colors hover:bg-brand"
              >
                <svg viewBox="0 0 24 24" className="size-7" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M12 3v18M3 12h18" />
                </svg>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
