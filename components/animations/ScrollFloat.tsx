"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";

interface ScrollFloatProps {
  children: ReactNode;
  className?: string;
  offsetY?: number;
  duration?: number;
}

export default function ScrollFloat({
  children,
  className = "",
  offsetY = 30,
  duration = 1,
}: ScrollFloatProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip entrance animations on mobile/tablet for performance
    if (window.innerWidth < 1024) {
      gsap.set(el, { y: 0, opacity: 1 });
      return;
    }

    gsap.set(el, { y: offsetY, opacity: 0 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration,
            ease: "power2.out",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [offsetY, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
