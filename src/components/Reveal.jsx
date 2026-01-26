import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, delay = 0, y = 14, once = false }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) {
      setShow(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) setShow(true);
        else if (!once && entry.intersectionRatio < 0.02) setShow(false);
      },
      { threshold: [0, 0.02, 0.12] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0px)" : `translateY(${y}px)`,
        transition:
          "opacity 800ms cubic-bezier(.22,1,.36,1), transform 900ms cubic-bezier(.22,1,.36,1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}