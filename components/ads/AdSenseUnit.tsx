"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

type AdSenseUnitProps = {
  slot?: string;
};

export function AdSenseUnit({ slot }: AdSenseUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initializedRef = useRef(false);
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    const ad = adRef.current;
    if (!client || !slot || !ad || initializedRef.current || ad.dataset.adsbygoogleStatus) return;

    initializedRef.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      initializedRef.current = false;
    }
  }, [client, slot]);

  if (!client || !slot) return null;

  return (
    <ins
      ref={adRef}
      className="adsbygoogle block"
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
