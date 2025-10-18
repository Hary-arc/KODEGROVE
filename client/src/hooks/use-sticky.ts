import { useEffect } from "react";

/**
 * Custom hook for sticky positioning
 * Manages sticky behavior for scroll-jacking sections
 */
export function useSticky(sectionRef: React.RefObject<HTMLElement>, stickyRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const winH = window.innerHeight;

      if (sectionTop <= 0 && sectionTop > -sectionHeight + winH) {
        sticky.style.position = "fixed";
        sticky.style.top = "0";
        sticky.style.left = "0";
        sticky.style.width = "100%";
        sticky.style.height = "100vh";
      } else if (sectionTop > 0) {
        sticky.style.position = "absolute";
        sticky.style.top = "0";
        sticky.style.bottom = "auto"; // important!

      } else {
        sticky.style.position = "absolute";
        sticky.style.bottom = "0";
        sticky.style.top = "auto"; // important!

      }
    };

    const onScroll = () => requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionRef, stickyRef]);
}
