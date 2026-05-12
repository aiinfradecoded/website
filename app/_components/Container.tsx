import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "max-w-2xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  // xl for marketing landing pages that benefit from a wider visual footprint.
  // 1280px-tier; comfortable on 1440+ desktops without losing readability.
  xl: "max-w-7xl",
} as const;

export function Container({ children, className = "", size = "md" }: Props) {
  return <div className={`mx-auto w-full px-6 ${sizeMap[size]} ${className}`}>{children}</div>;
}
