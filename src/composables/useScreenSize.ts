import { computed } from "vue";
import { useMediaQuery } from "@vueuse/core";

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export function useScreenSize() {
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.md - 1}px)`);
  const isTablet = useMediaQuery(
    `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`
  );
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);

  const screen = computed<"mobile" | "tablet" | "desktop">(() => {
    if (isMobile.value) return "mobile";
    if (isTablet.value) return "tablet";
    return "desktop";
  });

  return { isMobile, isTablet, isDesktop, screen };
}