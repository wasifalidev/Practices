// ============================================================
// 🏗️ ROOT LAYOUT - app/layout.tsx
// ============================================================
// This is a SERVER COMPONENT (no "use client")
//
// KEY CONCEPT: layout.tsx CANNOT use Redux hooks directly
// because Redux uses React Context which requires "use client".
//
// SOLUTION: Wrap {children} with our StoreProvider Client Component.
//
// ✅ SEO BENEFIT:
//   - This file runs on the SERVER → metadata is pre-rendered
//   - Google/bots see the <title> and <meta description> in HTML
//   - StoreProvider only adds a thin client wrapper, not the whole app
// ============================================================

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StoreProvider from "@/lib/StoreProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ============================================================
// 🔍 SEO METADATA - defined in Server Component = SEO friendly!
// This gets put in <head> tags rendered on the server.
// ============================================================
export const metadata: Metadata = {
  title: "Redux Toolkit Tutorial | Next.js App Router",
  description:
    "Learn Redux Toolkit with Next.js: configureStore, createSlice, createAsyncThunk, useSelector, useDispatch, and the Server/Client pattern for SEO.",
  keywords: ["Redux Toolkit", "Next.js", "React", "State Management"],
  openGraph: {
    title: "Redux Toolkit Tutorial",
    description: "Complete Redux Toolkit guide with Next.js App Router",
    type: "website",
  },
};

// ============================================================
// 🗂️ LAYOUT COMPONENT
// ============================================================
export default function RootLayout({ children }: LayoutProps<"/">) {
  // ⚠️ You CANNOT do this here:
  //   const count = useSelector(state => state.counter.value) ← ERROR!
  //   Because this is a Server Component!
  //
  // ✅ Instead, use StoreProvider to make the store available
  //   to all Client Components below in the tree.

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/*
          StoreProvider wraps all children.
          - It creates the Redux store once
          - Makes it available via React Context
          - All "use client" components can access Redux
          - Server Components (like this one) are NOT affected
        */}
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
