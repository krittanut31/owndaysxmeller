import { getImageProps } from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductExperience from "@/components/ProductExperience";
import SectionTitle from "@/components/SectionTitle";
import { getProducts } from "@/lib/api";
import bannerDesktop from "../../public/images/banner_desktop.jpg";
import bannerMobile from "../../public/images/banner_mobile.png";

export default async function Home() {
  const products = await getProducts();

  // Art direction: portrait banner on mobile, landscape on desktop.
  const common = { alt: "OWNDAYS × MELLER", sizes: "100vw", priority: true } as const;
  const { props: { srcSet: desktopSrcSet } } = getImageProps({ ...common, src: bannerDesktop });
  const { props: mobileProps } = getImageProps({ ...common, src: bannerMobile });

  return (
    <>
      <Header />
      <main>
        <section
          id="about"
          className="relative -mt-[70px] grid aspect-[390/677] place-items-center overflow-hidden bg-black lg:-mt-[102px] lg:aspect-auto lg:h-[633px]"
        >
          <picture className="absolute inset-0">
            <source media="(min-width: 1024px)" srcSet={desktopSrcSet} />
            <img
              {...mobileProps}
              alt={mobileProps.alt}
              className="absolute inset-0 size-full object-cover object-[50%_30%]"
            />
          </picture>
          <SectionTitle
            as="h1"
            lines={["Products"]}
            className="relative text-[80px] text-brand [-webkit-text-stroke:1px_#000] [text-shadow:4px_4px_0_#000] lg:text-[140px] lg:[text-shadow:6px_6px_0_#000]"
          />
        </section>
        <ProductExperience products={products} />
      </main>
      <Footer />
    </>
  );
}
