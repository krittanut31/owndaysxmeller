/**
 * "HOW TO STYLE THEM" carousel order.
 * `image` (path under /public) overrides the SKU's on-model API shot when the lifestyle photo is available.
 */
export interface StyleLook {
  code: string;
  sku: string;
  image?: string;
}

export const STYLE_LOOKS: StyleLook[] = [
  { code: "ML2006D-6S", sku: "C1" },
  { code: "ML2008D-6S", sku: "C2" },
  { code: "ML2005D-6S", sku: "C1" },
  { code: "ML2003D-6S", sku: "C2" },
  { code: "ML2005D-6S", sku: "C4" },
  { code: "ML2004D-6S", sku: "C1" },
  { code: "ML2004D-6S", sku: "C1" },
  { code: "ML2005D-6S", sku: "C2" },
  { code: "ML2003D-6S", sku: "C2" },
  { code: "ML2001D-6S", sku: "C1" },
  { code: "ML2002D-6S", sku: "C2" },
  { code: "ML2001D-6S", sku: "C4" },
  { code: "ML2008D-6S", sku: "C2" },
];
