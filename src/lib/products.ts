import type { Color, ProductItem, Sku } from "@/types/product";

export const IMAGE_BASE_URL = "https://storage.owndays.com/storage/";

export const imageUrl = (path: string) => `${IMAGE_BASE_URL}${path}`;

export const sortedImages = (sku: Sku) => [...sku.images].sort((a, b) => a.order - b.order);

export const firstImageUrl = (sku: Sku) => {
  const first = sortedImages(sku)[0];
  return first ? imageUrl(first.path) : null;
};

const yen = new Intl.NumberFormat("ja-JP");

/** Grid format: ¥7,800+tax */
export const formatPriceTax = (price: number) => `¥${yen.format(price)}+tax`;

/** Modal format: ¥7,800 税込 */
export const formatPriceIncl = (price: number) => `¥${yen.format(price)} 税込`;

export const productNumber = (item: ProductItem, sku: Sku) => `${item.product.code} ${sku.code}`;

export const onlineStoreUrl = (item: ProductItem, sku: Sku) =>
  `https://www.owndays.com/jp/ja/products/${item.product.code}?sku=${sku.id}`;

export const colorName = (color: Color, lang = "en") =>
  color.localizations.find((l) => l.language_code === lang)?.name ?? color.name;

/** Chip label for a SKU, e.g. "Black" or "Black / Orange" */
export const skuColorLabel = (sku: Sku) => sku.colors.map((c) => colorName(c)).join(" / ");

export const isOutOfStock = (item: ProductItem) => item.selling_setting.in_stock === 0;
