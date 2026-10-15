"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Stores", href: "#stores" },
];

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#" aria-label="OWNDAYS × MELLER" className={`font-favorit font-bold text-white uppercase ${className}`}>
      OWNDAYS <span className="mx-1 font-normal">×</span> MELLER
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

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
    <header className="sticky top-0 z-40 bg-brand">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-[23px] lg:px-[70px] lg:py-[25px]">
        <Logo className="text-[18px] leading-4 tracking-[0.5px] lg:text-[34px] lg:leading-[52px] lg:tracking-[1px]" />

        <nav className="hidden lg:block" aria-label="Main">
          <ul className="flex gap-[50px]">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-favorit text-[15px] font-bold tracking-[0.7px] text-white uppercase hover:opacity-70"
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

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 lg:hidden ${open ? "visible" : "invisible"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <nav
          aria-label="Mobile"
          className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-brand px-5 py-[23px] transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="ml-auto grid size-8 cursor-pointer place-items-center text-white"
          >
            <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden>
              <path d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z" />
            </svg>
          </button>
          <ul className="mt-10 flex flex-col gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="font-favorit text-[32px] font-bold tracking-[0.7px] text-white uppercase"
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
