import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { getSiteUrl } from "@/lib/siteUrl";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: "OWNDAYS × MELLER | Sunglasses Collection",
  description: "OWNDAYS × MELLER サングラスコレクション。全8型のラインナップをチェック。",
  openGraph: {
    title: "OWNDAYS × MELLER | Sunglasses Collection",
    description: "OWNDAYS × MELLER サングラスコレクション。",
    type: "website",
    locale: "ja_JP",
    images: [{ url: "/images/banner_desktop.jpg", width: 1200, height: 630, alt: "OWNDAYS × MELLER" }],
  },
  twitter: { card: "summary_large_image", images: ["/images/banner_desktop.jpg"] },
};

export const viewport: Viewport = { themeColor: "#f26a2f" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body>{children}</body>
    </html>
  );
}
