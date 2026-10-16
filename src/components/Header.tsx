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
      className={`sticky top-0 z-40 transition-colors duration-300 ${scrolled ? "bg-black" : "bg-transparent"}`}
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
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-6 w-5 cursor-pointer flex-col justify-center gap-[5px] lg:hidden"
        >
          <span className="h-0.5 w-full bg-white" />
          <span className="h-0.5 w-full bg-white" />
          <span className="h-0.5 w-full bg-white" />
        </button>
      </div>

      {/* Mobile menu: floating panel that slides + fades in over a blurred page (ref: futuresnoops.com) */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-50 transition-[visibility] lg:hidden ${open ? "visible" : "invisible delay-500"}`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-700 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <nav
          aria-label="Mobile"
          className={`absolute inset-[10px] overflow-y-auto rounded-[12px] bg-black px-10 pt-[88px] pb-10 shadow-[0_8px_40px_rgba(0,0,0,0.5)] transition-[translate,opacity] duration-500 ease-out ${
            open ? "translate-x-0 opacity-100" : "translate-x-[10%] opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
            className="absolute top-4 right-4 grid size-10 cursor-pointer place-items-center text-brand"
          >
            <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden>
              <path d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z" />
            </svg>
          </button>

          <ul className="flex flex-col gap-7">
            {NAV_LINKS.map((l, i) => (
              <li
                key={l.href}
                className={`transition-[translate,opacity] duration-500 ease-out ${open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`}
                style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="inline-block font-favorit text-[18px] font-bold tracking-[1px] text-brand uppercase transition-transform duration-150 hover:translate-x-1"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="mt-20 flex flex-col gap-5">
            {SUB_LINKS.map((l, i) => (
              <li
                key={l.label}
                className={`transition-[translate,opacity] duration-500 ease-out ${open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`}
                style={{ transitionDelay: open ? `${330 + i * 50}ms` : "0ms" }}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="inline-block font-favorit text-[11px] font-bold tracking-[0.8px] text-brand uppercase transition-transform duration-150 hover:translate-x-1"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
