import { NAV_LINKS, SUB_LINKS } from "@/lib/navigation";
import { pillButton } from "./OnlineStoreButton";

const STORE_URL = "https://www.owndays.com/jp/ja";

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="inline size-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="stores" className="bg-black font-favorit text-brand">
      <div className="mx-auto max-w-[1440px] px-5 pt-14 lg:px-[50px] lg:pt-20">
        <a
          href="https://www.owndays.com/jp/ja/products?productLines[]=88"
          target="_blank"
          rel="noopener noreferrer"
          className={`${pillButton} mx-auto h-[70px] max-w-[428px] border border-neutral-700 bg-black text-[13px] hover:bg-[#4a4a4a]`}
        >
          All items
        </a>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1440px] border-t border-brand/60 lg:mt-20 lg:grid-cols-2">
        <ul className="divide-y divide-brand/60 lg:divide-y-0 lg:space-y-3 lg:px-[50px] lg:py-12">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="flex items-center justify-between px-5 py-4 text-[11px] font-bold tracking-[0.7px] uppercase hover:opacity-70 lg:p-0"
              >
                {l.label}
                <span className="lg:hidden" aria-hidden>›</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-brand/60 px-5 py-5 text-[11px] font-bold tracking-[0.7px] uppercase lg:flex-col lg:justify-center lg:gap-2 lg:border-t-0 lg:border-l">
          <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
            Online store
          </a>
          <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="normal-case hover:opacity-70">
            owndays.com <ExternalIcon />
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 border-t border-brand/60 px-5 py-6 text-[10px] tracking-[0.5px] uppercase lg:flex-row lg:items-center lg:justify-between lg:px-[50px]">
        <ul className="flex flex-col gap-2 lg:flex-row lg:gap-8">
          {SUB_LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="hover:opacity-70">{l.label}</a>
            </li>
          ))}
        </ul>
        <p>Copyright © OWNDAYS co., ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}
