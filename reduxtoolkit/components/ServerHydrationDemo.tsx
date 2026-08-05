// ============================================================
// 🌐 SERVER HYDRATION DEMO - components/ServerHydrationDemo.tsx
// ============================================================
// Shows the SERVER → CLIENT data flow for SEO
//
// HOW IT WORKS:
// 1. Server Component (page.tsx) fetches data at build/request time
// 2. Passes data as a prop to this Client Component
// 3. This component pre-loads Redux store with server data
// 4. All other components read from Redux instantly (no loading!)
//
// SEO BENEFIT: The server-rendered HTML already has the data,
// so Google bots see the content immediately!
// ============================================================

"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  hydrateFromServer,
  selectAllPosts,
  selectPostsStatus,
  type Post,
} from "@/lib/features/posts/postsSlice";

interface Props {
  // Data fetched by the Server Component
  serverPosts: Post[];
}

export default function ServerHydrationDemo({ serverPosts }: Props) {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const status = useAppSelector(selectPostsStatus);

  // When component mounts (client-side), hydrate Redux with server data
  // This runs ONCE - data is already in HTML from SSR
  useEffect(() => {
    if (serverPosts.length > 0 && status === "idle") {
      dispatch(hydrateFromServer(serverPosts));
    }
  }, [dispatch, serverPosts, status]);

  const displayPosts = posts.length > 0 ? posts : serverPosts;

  return (
    <section className="demo-card full-width-card seo-card">
      <div className="demo-header">
        <span className="demo-icon">🔍</span>
        <div>
          <h2 className="demo-title">Server-Side Rendering + Redux (SEO)</h2>
          <p className="demo-subtitle">
            Server fetches → HTML rendered → Redux hydrated → No loading spinner!
          </p>
        </div>
      </div>

      <div className="seo-flow">
        <div className="flow-step flow-server">
          <div className="flow-icon">🖥️</div>
          <div className="flow-label">Server Component</div>
          <div className="flow-desc">Fetches posts at request time (no JS needed!)</div>
        </div>
        <div className="flow-arrow">→</div>
        <div className="flow-step flow-client">
          <div className="flow-icon">⚡</div>
          <div className="flow-label">Props to Client</div>
          <div className="flow-desc">Data passed as props (serialized, safe)</div>
        </div>
        <div className="flow-arrow">→</div>
        <div className="flow-step flow-redux">
          <div className="flow-icon">🏪</div>
          <div className="flow-label">Redux Hydrated</div>
          <div className="flow-desc">dispatch(hydrateFromServer(posts))</div>
        </div>
        <div className="flow-arrow">→</div>
        <div className="flow-step flow-seo">
          <div className="flow-icon">🔍</div>
          <div className="flow-label">SEO Happy!</div>
          <div className="flow-desc">Google sees full HTML content</div>
        </div>
      </div>

      <div className="seo-note">
        <strong>✅ These {displayPosts.length} posts were fetched on the SERVER</strong>
        <span> — visible in HTML source, indexed by search engines!</span>
      </div>

      <div className="server-posts-list">
        {displayPosts.slice(0, 3).map((post) => (
          <div key={post.id} className="server-post-item">
            <span className="post-num">#{post.id}</span>
            <span className="server-post-title">{post.title}</span>
          </div>
        ))}
      </div>

      <div className="code-explain seo-code">
        <pre>{`// ─── Server Component (page.tsx) ──────────────
// No "use client" = runs on server = SEO friendly!
async function Page() {
  // This fetch runs on the SERVER at request time
  const posts = await fetch("/api/posts").then(r => r.json())

  return (
    // Pass server data down as props
    <ServerHydrationDemo serverPosts={posts} />
  )
}

// ─── Client Component ──────────────────────────
// "use client" - runs in browser, hydrates Redux
useEffect(() => {
  dispatch(hydrateFromServer(serverPosts))
}, [serverPosts])

// Now ALL client components can read from Redux!
const posts = useAppSelector(selectAllPosts) // ✅ instant, no loading`}</pre>
      </div>
    </section>
  );
}
