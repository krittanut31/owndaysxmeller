import { cacheLife } from "next/cache";
import type { ProductItem, ProductsResponse } from "@/types/product";

const PRODUCTS_API_URL = "https://api-one-alpha-60.vercel.app/meller/products.json";

export async function getProducts(): Promise<ProductItem[]> {
  "use cache";
  cacheLife("hours");
  const res = await fetch(PRODUCTS_API_URL);
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  const json: ProductsResponse = await res.json();
  return json.data;
}
