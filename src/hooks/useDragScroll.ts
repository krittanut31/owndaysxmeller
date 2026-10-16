import { useEffect, useRef } from "react";

const DRAG_THRESHOLD = 5; // px before a press counts as a drag (keeps clicks working)
const FRICTION = 0.94;
const MAX_VELOCITY = 1.8; // px per ms; caps how far a hard flick can glide

/**
 * Mouse drag-to-scroll for a horizontal scroller, with momentum on release.
 * Touch/pen keep native scrolling. Suppresses the click that ends a drag.
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let pressed = false;
    let dragged = false;
    let startX = 0;
    let startScroll = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0; // px per ms
    let frame = 0;

    const restoreSnap = () => {
      el.style.scrollSnapType = "";
      delete el.dataset.dragging;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      cancelAnimationFrame(frame);
      pressed = true;
      dragged = false;
      startX = lastX = e.clientX;
      startScroll = el.scrollLeft;
      lastTime = performance.now();
      velocity = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!pressed) return;
      const dx = e.clientX - startX;
      if (!dragged) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return;
        dragged = true;
        el.setPointerCapture(e.pointerId);
        el.style.scrollSnapType = "none"; // snapping fights manual scrollLeft updates
        el.dataset.dragging = "true";
      }
      el.scrollLeft = startScroll - dx;
      const now = performance.now();
      velocity = (e.clientX - lastX) / Math.max(1, now - lastTime);
      lastX = e.clientX;
      lastTime = now;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!pressed) return;
      pressed = false;
      if (!dragged) return;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);

      let v = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, velocity)) * 16; // px per frame
      const glide = () => {
        el.scrollLeft -= v;
        v *= FRICTION;
        if (Math.abs(v) > 0.5) frame = requestAnimationFrame(glide);
        else restoreSnap();
      };
      frame = requestAnimationFrame(glide);
    };

    // Swallow the click that ends a drag so "+" buttons don't fire.
    const onClick = (e: MouseEvent) => {
      if (!dragged) return;
      e.preventDefault();
      e.stopPropagation();
      dragged = false;
    };
    const onDragStart = (e: DragEvent) => e.preventDefault();

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("click", onClick, true);
    el.addEventListener("dragstart", onDragStart);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("click", onClick, true);
      el.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return ref;
}
