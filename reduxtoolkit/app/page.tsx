// ============================================================
// 🏠 HOME PAGE - app/page.tsx
// ============================================================
// This is a SERVER COMPONENT (no "use client")!
//
// Server Components can:
//   ✅ fetch data from APIs/databases (runs on server)
//   ✅ use async/await
//   ✅ render static HTML for SEO
//   ❌ cannot use hooks (useState, useSelector, useDispatch)
//   ❌ cannot handle browser events (onClick, etc.)
//
// For SEO: the server fetches data and passes it as props
// to Client Components, which then hydrate the Redux store.
// ============================================================

import CounterDemo from "@/components/CounterDemo";
import UserDemo from "@/components/UserDemo";
import PostsDemo from "@/components/PostsDemo";
import ServerHydrationDemo from "@/components/ServerHydrationDemo";
import StateInspector from "@/components/StateInspector";
import type { Post } from "@/lib/features/posts/postsSlice";

// ============================================================
// 🖥️ SERVER-SIDE DATA FETCHING (for SEO)
// ============================================================
// This async function runs on the SERVER.
// The fetched data is rendered into HTML before sending to browser.
// Google can index this content!
async function getServerPosts(): Promise<Post[]> {
  try {
    // This fetch happens on the SERVER (Node.js environment)
    // Not in the browser! No CORS issues, no loading spinners!
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=3",
      {
        // next.revalidate = how long to cache (in seconds)
        // 0 = always fresh (SSR), 3600 = cache 1 hour (ISR)
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

// ============================================================
// PAGE COMPONENT (Server Component)
// ============================================================
export default async function Home() {
  // ✅ Await data on the server before rendering
  // The HTML sent to the browser already has this data!
  const serverPosts = await getServerPosts();

  return (
    <main className="tutorial-page">
      {/* ─── HERO HEADER ─────────────────────────────── */}
      <header className="page-hero">
        <div className="hero-badge">📦 Redux Toolkit Tutorial</div>
        <h1 className="hero-title">
          Redux Toolkit with
          <span className="gradient-text"> Next.js App Router</span>
        </h1>
        <p className="hero-subtitle">
          Learn{" "}
          <code>configureStore</code>, <code>createSlice</code>,{" "}
          <code>createAsyncThunk</code>,
          client-side hooks, server-side hydration, and SEO — all in one place.
        </p>

        {/* FILE MAP */}
        <div className="file-map">
          <div className="file-item file-server">
            <span>🖥️ Server</span>
            <code>layout.tsx</code>
            <span className="arrow">→</span>
            <code>page.tsx</code>
          </div>
          <div className="file-item file-lib">
            <span>📦 Store</span>
            <code>lib/store.ts</code>
            <span className="arrow">+</span>
            <code>lib/hooks.ts</code>
          </div>
          <div className="file-item file-slice">
            <span>🍕 Slices</span>
            <code>counterSlice</code>
            <span className="arrow">·</span>
            <code>userSlice</code>
            <span className="arrow">·</span>
            <code>postsSlice</code>
          </div>
        </div>
      </header>

      {/* ─── CONCEPT GRID ────────────────────────────── */}
      <section className="concepts-section">
        <h2 className="section-title">Core Concepts</h2>
        <div className="concepts-grid">
          <div className="concept-card">
            <div className="concept-icon">🏪</div>
            <h3>Store</h3>
            <p>One central place holding ALL your app state. Created with <code>configureStore()</code>.</p>
          </div>
          <div className="concept-card">
            <div className="concept-icon">🍕</div>
            <h3>Slice</h3>
            <p>A chunk of state + its reducers. Created with <code>createSlice()</code>.</p>
          </div>
          <div className="concept-card">
            <div className="concept-icon">⚡</div>
            <h3>Action</h3>
            <p>A plain object describing what happened. e.g. <code>{`{type: "counter/increment"}`}</code></p>
          </div>
          <div className="concept-card">
            <div className="concept-icon">🔄</div>
            <h3>Reducer</h3>
            <p>Pure function: takes old state + action → returns new state.</p>
          </div>
          <div className="concept-card">
            <div className="concept-icon">🎯</div>
            <h3>Dispatch</h3>
            <p>The method to send actions to the store. <code>dispatch(increment())</code></p>
          </div>
          <div className="concept-card">
            <div className="concept-icon">🔍</div>
            <h3>Selector</h3>
            <p>Function to read data from state. <code>useAppSelector(selectCount)</code></p>
          </div>
        </div>
      </section>

      {/* ─── DEMOS ───────────────────────────────────── */}
      <section className="demos-section">
        <h2 className="section-title">Interactive Demos</h2>
        <p className="section-subtitle">
          All demos are connected to the SAME Redux store — watch the state inspector update!
        </p>

        <div className="demos-grid">
          {/* These are CLIENT components - they use Redux hooks */}
          <CounterDemo />
          <UserDemo />
        </div>

        <PostsDemo />

        {/* SERVER-SIDE: page.tsx fetched data, now passes to client */}
        <ServerHydrationDemo serverPosts={serverPosts} />

        {/* Live state viewer */}
        <StateInspector />
      </section>

      {/* ─── CHEAT SHEET ─────────────────────────────── */}
      <section className="cheatsheet-section">
        <h2 className="section-title">🗺️ When to Use What</h2>
        <div className="cheatsheet-table-wrapper">
          <table className="cheatsheet-table">
            <thead>
              <tr>
                <th>Situation</th>
                <th>Solution</th>
                <th>Where</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Read Redux state in a component</td>
                <td><code>useAppSelector(selector)</code></td>
                <td>Client Component only</td>
              </tr>
              <tr>
                <td>Update Redux state</td>
                <td><code>useAppDispatch() + dispatch(action())</code></td>
                <td>Client Component only</td>
              </tr>
              <tr>
                <td>Fetch data (with loading/error)</td>
                <td><code>createAsyncThunk + dispatch(fetchData())</code></td>
                <td>Client Component</td>
              </tr>
              <tr>
                <td>Fetch data for SEO (server)</td>
                <td><code>async Server Component → pass as props</code></td>
                <td>Server Component (page.tsx)</td>
              </tr>
              <tr>
                <td>Pre-populate Redux from server</td>
                <td><code>dispatch(hydrateFromServer(data))</code></td>
                <td>Client Component (useEffect)</td>
              </tr>
              <tr>
                <td>Setup store for whole app</td>
                <td><code>StoreProvider in layout.tsx</code></td>
                <td>layout.tsx (Server) wraps Client Provider</td>
              </tr>
              <tr>
                <td>SEO metadata</td>
                <td><code>export const metadata = {`{...}`}</code></td>
                <td>Server Component (page.tsx or layout.tsx)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
