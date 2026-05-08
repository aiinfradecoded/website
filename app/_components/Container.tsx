import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "max-w-2xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
} as const;

export function Container({ children, className = "", size = "md" }: Props) {
  return <div className={`mx-auto w-full px-6 ${sizeMap[size]} ${className}`}>{children}</div>;
}
