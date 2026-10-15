import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductExperience from "@/components/ProductExperience";
import SectionTitle from "@/components/SectionTitle";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Header />
      <main>
        <div id="about" className="relative">
          <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-ink lg:h-[633px]" />
          <div className="mx-auto max-w-[1440px] px-5 pt-16 pb-10 text-white lg:px-[70px] lg:pt-28 lg:pb-16">
            <p className="font-favorit text-sm tracking-[0.7px] uppercase opacity-80">
              OWNDAYS × MELLER — Sunglasses Collection
            </p>
            <SectionTitle lines={["Products"]} className="mt-4 text-white" />
          </div>
          <ProductExperience products={products} />
        </div>
      </main>
      <Footer />
    </>
  );
}
