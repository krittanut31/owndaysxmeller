export default function Footer() {
  return (
    <footer id="stores" className="bg-black text-white">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center px-5 py-16 lg:px-[70px] lg:py-20">
        <a
          href="https://www.owndays.com/jp/ja/products?productLines[]=88"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[70px] w-full max-w-[428px] items-center justify-center rounded-full border border-white font-favorit text-lg font-bold tracking-[0.7px] uppercase transition-colors hover:bg-white hover:text-black"
        >
          All items
        </a>
        <ul className="mt-12 flex gap-8 font-favorit text-sm tracking-[0.7px] uppercase">
          <li><a href="#about" className="hover:opacity-70">About</a></li>
          <li><a href="#products" className="hover:opacity-70">Products</a></li>
          <li><a href="#stores" className="hover:opacity-70">Stores</a></li>
        </ul>
        <p className="mt-8 text-xs text-neutral-400">© OWNDAYS co., ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}
