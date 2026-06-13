"use client";

declare global {
  interface Window { googlefc?: { showRevocationMessage?: () => void }; }
}

export function ConsentControls() {
  return <button className="text-left hover:text-[#ff5b34]" type="button" onClick={() => window.googlefc?.showRevocationMessage?.()}>Cookie Settings</button>;
}
