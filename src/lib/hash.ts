import { useEffect, useState } from "react";

export function navigate(path: string) {
  window.location.hash = path.startsWith("/") ? path : `/${path}`;
}

export function useRoute() {
  const [hash, setHash] = useState(() => window.location.hash.replace(/^#/, "") || "/");

  useEffect(() => {
    const on = () => setHash(window.location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", on);
    if (!window.location.hash) window.location.hash = "/";
    return () => window.removeEventListener("hashchange", on);
  }, []);

  const parts = hash.split("/").filter(Boolean);
  return { path: hash.startsWith("/") ? hash : `/${hash}`, parts };
}
