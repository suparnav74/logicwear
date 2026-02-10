"use client";

import LoadingBar from "react-top-loading-bar";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { LoadingBarRef } from "react-top-loading-bar";

export default function TopLoader() {
  const ref = useRef<LoadingBarRef>(null);
  const pathname = usePathname();

  useEffect(() => {
    ref.current?.continuousStart();
    const timer = setTimeout(() => {
      ref.current?.complete();
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return <LoadingBar color="#2563eb" ref={ref} height={3} />;
}
