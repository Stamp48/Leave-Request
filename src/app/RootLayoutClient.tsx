"use client";

import { usePathname } from "next/navigation";
import MuiProvider from "./MuiProvider";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Detect routes that should skip the root layout
  const isStandalone = pathname.startsWith("/login");

  if (isStandalone) {
    return children; // skip MuiProvider and other wrappers
  }

  return <MuiProvider>{children}</MuiProvider>;
}
