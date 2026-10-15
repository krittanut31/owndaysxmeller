import Image from "next/image";
import type { ProductItem } from "@/types/product";
import { imageUrl, sortedImages } from "@/lib/products";
import SectionTitle from "./SectionTitle";

interface StyleSectionProps {
  products: ProductItem[];
  onOpen: (item: ProductItem, skuIndex: number) => void;
}

/** SKUs with a full image set end with an on-model shot; shorter sets end with detail shots. */
const MIN_IMAGES_FOR_LOOK = 5;

function getLooks(products: ProductItem[]) {
  return products.flatMap((item) =>
    item.skus.map((sku, skuIndex) => {
      const images = sortedImages(sku);
      return { item, sku, skuIndex, image: images[images.length - 1] };
    }),
  ).filter((look) => look.image && look.sku.images.length >= MIN_IMAGES_FOR_LOOK);
}

export default function StyleSection({ products, onOpen }: StyleSectionProps) {
  const looks = getLooks(products);

  return (
    <section id="style" className="relative overflow-hidden bg-brand pt-14 lg:pt-20">
      <SectionTitle
        lines={["How to", "Style them"]}
        className="relative z-10 mx-auto max-w-[1440px] px-5 text-[56px] text-black lg:-mb-6 lg:px-[50px] lg:text-[120px]"
      />

      <ul className="no-scrollbar flex snap-x overflow-x-auto overscroll-x-contain bg-black">
        {looks.map(({ item, sku, skuIndex, image }) => (
          <li
            key={sku.id}
            className="relative h-[492px] w-[326px] shrink-0 snap-start overflow-hidden lg:h-[611px] lg:w-[405px]"
          >
            <Image
              src={imageUrl(image.path)}
              alt={`${item.product.model_name} ${sku.code} styling`}
              fill
              sizes="(min-width: 1024px) 405px, 326px"
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => onOpen(item, skuIndex)}
              aria-label={`View ${item.product.model_name} ${sku.code} details`}
              className="absolute right-0 bottom-0 grid size-[44px] cursor-pointer place-items-center bg-brand text-white transition-colors hover:bg-brand-dark lg:size-[70px]"
            >
              <svg viewBox="0 0 24 24" className="size-5 lg:size-7" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M12 4v16M4 12h16" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
