interface OnlineStoreButtonProps {
  href: string;
  outOfStock: boolean;
}

export default function OnlineStoreButton({ href, outOfStock }: OnlineStoreButtonProps) {
  const base =
    "flex h-[60px] w-full items-center justify-center rounded-full border font-favorit text-[15px] font-bold tracking-[0.7px] uppercase transition-colors";

  return (
    <div className="text-center">
      {outOfStock ? (
        <span
          aria-disabled="true"
          className={`${base} cursor-not-allowed border-neutral-300 bg-neutral-300 text-neutral-500`}
        >
          Out of stock
        </span>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} border-black bg-black text-white hover:bg-white hover:text-black`}
        >
          Online store
        </a>
      )}
      <p className="mt-2.5 text-xs text-neutral-600">OWNDAYSオンラインストアに移動します</p>
    </div>
  );
}
