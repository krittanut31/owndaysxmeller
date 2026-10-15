import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductExperience from "@/components/ProductExperience";
import SectionTitle from "@/components/SectionTitle";
import { getProducts } from "@/lib/api";
import { imageUrl, sortedImages } from "@/lib/products";

export default async function Home() {
  const products = await getProducts();
  // KESSIE C3 on-model shot as the hero key visual
  const heroSku = products.find((p) => p.product.model_name === "KESSIE")?.skus[2] ?? products[0].skus[0];
  const heroImage = sortedImages(heroSku).at(-1);

  return (
    <>
      <Header />
      <main>
        <section
          id="about"
          className="relative -mt-[62px] grid h-[380px] place-items-center overflow-hidden bg-black lg:-mt-[102px] lg:h-[633px]"
        >
          {heroImage && (
            <Image
              src={imageUrl(heroImage.path)}
              alt="OWNDAYS × MELLER"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-80"
            />
          )}
          <SectionTitle
            as="h1"
            lines={["Products"]}
            className="relative text-[64px] text-brand [-webkit-text-stroke:1px_#000] [text-shadow:4px_4px_0_#000] lg:text-[140px] lg:[text-shadow:6px_6px_0_#000]"
          />
        </section>
        <ProductExperience products={products} />
      </main>
      <Footer />
    </>
  );
}
