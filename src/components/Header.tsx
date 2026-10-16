"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS, SUB_LINKS } from "@/lib/navigation";

function Logo() {
  return (
    <a
      href="#"
      aria-label="OWNDAYS × MELLER"
      className="font-favorit text-[15px] leading-4 font-bold tracking-[2.6px] whitespace-nowrap text-white uppercase lg:text-[15px] lg:tracking-[3px]"
    >
      OWNDAYS <span className="mx-1.5 font-normal text-brand">×</span> MELLER
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${scrolled || open ? "bg-black" : "bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-[23px] lg:px-[50px] lg:py-[25px]">
        <Logo />

        <nav className="hidden lg:block" aria-label="Main">
          <ul className="flex gap-[50px]">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-favorit text-[15px] font-bold tracking-[0.7px] text-white uppercase transition-colors hover:text-brand"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="relative z-50 flex h-6 w-5 cursor-pointer flex-col justify-center gap-[5px] lg:hidden"
        >
          <span className={`h-0.5 w-full bg-white transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-0.5 w-full bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-full bg-white transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        aria-hidden={!open}
        className={`fixed inset-x-0 top-[70px] bottom-0 z-40 overflow-y-auto bg-black px-5 pt-6 pb-10 transition-opacity duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="font-favorit text-[15px] font-bold tracking-[0.7px] text-brand uppercase"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <ul className="mt-10 flex flex-col gap-3">
          {SUB_LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="font-favorit text-[11px] tracking-[0.5px] text-brand uppercase"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
