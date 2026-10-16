const DURATION = 800;
const EASING = "cubic-bezier(0.76, 0, 0.24, 1)";
const PANEL_WIDTH = 616;
const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * FLIP-style shared-element animation: clones the photo inside `source`,
 * slides it right and expands it to the product panel's bounds, then resolves
 * so the caller can open the modal underneath before the clone fades out.
 */
export async function flyToPanel(source: HTMLElement, onArrive: () => void) {
  const img = source.querySelector("img");
  const from = source.getBoundingClientRect();
  const isDesktop = window.matchMedia(DESKTOP_QUERY).matches;
  const width = isDesktop ? Math.min(PANEL_WIDTH, window.innerWidth) : window.innerWidth;
  const to = { left: window.innerWidth - width, top: 0, width, height: window.innerHeight };

  const clone = document.createElement("div");
  Object.assign(clone.style, {
    position: "fixed",
    zIndex: "60",
    left: `${from.left}px`,
    top: `${from.top}px`,
    width: `${from.width}px`,
    height: `${from.height}px`,
    backgroundImage: img ? `url("${img.currentSrc || img.src}")` : "",
    backgroundSize: "cover",
    backgroundPosition: "center",
    pointerEvents: "none",
  });
  document.body.appendChild(clone);
  source.style.visibility = "hidden";

  try {
    await clone.animate(
      [
        { left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px` },
        { left: `${to.left}px`, top: `${to.top}px`, width: `${to.width}px`, height: `${to.height}px` },
      ],
      { duration: DURATION, easing: EASING, fill: "forwards" },
    ).finished;

    onArrive();
    await clone.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 350, easing: "ease-out", fill: "forwards" })
      .finished;
  } finally {
    clone.remove();
    source.style.visibility = "";
  }
}
