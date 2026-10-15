interface OnlineStoreButtonProps {
  href: string;
  outOfStock: boolean;
}

export const pillButton =
  "flex h-[50px] w-full items-center justify-center rounded-full font-favorit text-[11px] font-bold tracking-[0.7px] text-white uppercase transition-colors duration-200";

export default function OnlineStoreButton({ href, outOfStock }: OnlineStoreButtonProps) {
  return (
    <div className="mx-auto max-w-[350px] text-center">
      {outOfStock ? (
        <span aria-disabled="true" className={`${pillButton} cursor-not-allowed bg-[#d9d9d9]`}>
          Out of stock
        </span>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${pillButton} bg-brand hover:bg-brand-dark`}
        >
          Online store
        </a>
      )}
      <p className="mt-3 text-[10px] text-white">OWNDAYSオンラインストアに移動します</p>
    </div>
  );
}
