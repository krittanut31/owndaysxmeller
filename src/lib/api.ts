import { cacheLife } from "next/cache";
import type { ProductItem, ProductsResponse } from "@/types/product";


export async function getProducts(): Promise<ProductItem[]> {
  "use cache";
  cacheLife("hours");
  const url = process.env.PRODUCTS_API_URL;
  if (!url) throw new Error("PRODUCTS_API_URL is not set. Copy .env.example to .env.local.");
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  const json: ProductsResponse = await res.json();
  return json.data;
}
