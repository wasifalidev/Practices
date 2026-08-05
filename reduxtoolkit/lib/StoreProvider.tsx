// ============================================================
// 🏪 STORE PROVIDER - lib/StoreProvider.tsx
// ============================================================
// WHY A SEPARATE PROVIDER?
//
// Next.js App Router requires "use client" for anything using
// React context/hooks. But layout.tsx is a Server Component.
//
// SOLUTION: Create a "StoreProvider" Client Component and
// wrap it around {children} in layout.tsx.
//
// This is the OFFICIAL Redux + Next.js App Router pattern.
//
// SEO BENEFIT: layout.tsx stays a Server Component so Next.js
// can pre-render the shell on the server (SSR/SSG). Only the
// Provider shell runs on the client.
// ============================================================

"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";

interface StoreProviderProps {
  children: React.ReactNode;
  // Optional: preloaded state from server for hydration
  // This is how you pass server-fetched data into Redux!
}

export default function StoreProvider({ children }: StoreProviderProps) {
  // useRef ensures the store is only created ONCE per render
  // (not re-created on every render)
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance on first render only
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
