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

const TITLE = "商品一覧 | OWNDAYS × MELLER（メラー） 公式オンラインストア｜サングラス";
const DESCRIPTION =
  "OWNDAYS × MELLER 商品一覧。デザイン性・機能性に優れたサステナブルな素材のサングラス（全てUV99%以上カット・偏光レンズ・傷防止コート・撥水コート）を展開中。";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "商品一覧",
    "サングラス",
    "偏光レンズ",
    "Meller",
    "メラー",
    "アイウェア",
    "フレーム",
    "サステイナブ",
    "トレンド",
    "バルセロナ",
    "スペイン",
    "OWNDAYS",
    "オンデーズ",
    "オンデイズ",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "ja_JP",
    images: [{ url: "/images/banner_desktop.jpg", width: 1200, height: 630, alt: "OWNDAYS × MELLER" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/images/banner_desktop.jpg"] },
};

export const viewport: Viewport = { themeColor: "#f26a2f" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body>{children}</body>
    </html>
  );
}
