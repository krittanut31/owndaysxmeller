import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OWNDAYS × MELLER | Sunglasses Collection",
  description: "OWNDAYS × MELLER サングラスコレクション。全8型のラインナップをチェック。",
  openGraph: {
    title: "OWNDAYS × MELLER | Sunglasses Collection",
    description: "OWNDAYS × MELLER サングラスコレクション。",
    type: "website",
    locale: "ja_JP",
  },
};

export const viewport: Viewport = { themeColor: "#f26a2f" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body>{children}</body>
    </html>
  );
}
