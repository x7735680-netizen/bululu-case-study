import { useCallback, useEffect, useRef } from "react";

const BULULU_TRAIL_IMAGES = [
  "/images/hearing/character/09-bululu-01.png",
  "/images/hearing/character/09-bululu-02.png",
  "/images/hearing/character/09-bululu-03.png",
  "/images/hearing/character/09-bululu-04.webp",
  "/images/hearing/character/09-bululu-05.webp",
];

const TRAIL_DISTANCE = 55;
const MAX_TRAIL_ITEMS = 8;
const TRAIL_DURATION = 1450;

function canShowTrail() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function CursorImageTrail({ children }) {
  const trailLayerRef = useRef(null);
  const lastPointRef = useRef(null);
  const imageIndexRef = useRef(0);

  const removeTrailItem = useCallback((item) => {
    item.getAnimations().forEach((animation) => animation.cancel());
    item.remove();
  }, []);

  const handlePointerMove = useCallback((event) => {
    if (event.pointerType && event.pointerType !== "mouse") return;
    if (!canShowTrail()) return;

    const layer = trailLayerRef.current;
    const zone = event.currentTarget;
    if (!layer || !zone) return;

    const rect = zone.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const previousPoint = lastPointRef.current;
    const dx = previousPoint ? x - previousPoint.x : 0;
    const dy = previousPoint ? y - previousPoint.y : 0;

    if (previousPoint && Math.hypot(dx, dy) < TRAIL_DISTANCE) return;

    lastPointRef.current = { x, y };

    const offsetX = Math.max(-16, Math.min(16, dx * -0.12));
    const offsetY = Math.max(-12, Math.min(12, dy * -0.12));
    const rotation = -5 + Math.random() * 10;
    const src = BULULU_TRAIL_IMAGES[imageIndexRef.current];
    imageIndexRef.current = (imageIndexRef.current + 1) % BULULU_TRAIL_IMAGES.length;

    const item = document.createElement("img");
    item.className = "cursor-trail-item";
    item.src = src;
    item.alt = "";
    item.setAttribute("aria-hidden", "true");
    item.decoding = "async";
    item.style.left = `${x + offsetX}px`;
    item.style.top = `${y + offsetY}px`;
    layer.append(item);

    while (layer.children.length > MAX_TRAIL_ITEMS) {
      const oldestItem = layer.firstElementChild;
      if (oldestItem) removeTrailItem(oldestItem);
    }

    const toTransform = (translateY, scale) => (
      `translate3d(-50%, ${translateY}%, 0) rotate(${rotation}deg) scale(${scale})`
    );
    const animation = item.animate(
      [
        { opacity: 0, transform: toTransform(-50, 0.78) },
        { opacity: 1, transform: toTransform(-50, 1), offset: 0.22 },
        { opacity: 1, transform: toTransform(-50, 1), offset: 0.68 },
        { opacity: 0, transform: toTransform(-54, 0.96) },
      ],
      {
        duration: TRAIL_DURATION,
        easing: "cubic-bezier(.22,.8,.25,1)",
        fill: "forwards",
      },
    );

    animation.onfinish = () => item.remove();
  }, [removeTrailItem]);

  const handlePointerLeave = useCallback(() => {
    lastPointRef.current = null;
  }, []);

  useEffect(() => () => {
    const layer = trailLayerRef.current;
    if (!layer) return;
    Array.from(layer.children).forEach(removeTrailItem);
    lastPointRef.current = null;
  }, [removeTrailItem]);

  return (
    <div
      className="service-state-content cursor-trail-zone"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div ref={trailLayerRef} className="cursor-trail-layer" aria-hidden="true" />
      {children}
    </div>
  );
}
