// ============================================================
// 📊 STATE INSPECTOR - components/StateInspector.tsx
// ============================================================
// Shows the ENTIRE Redux state tree live in the UI
// Like a mini Redux DevTools!
// ============================================================

"use client";

import { useAppSelector } from "@/lib/hooks";

export default function StateInspector() {
  // Select the entire state from both slices
  const counter = useAppSelector((state) => state.counter);
  const user = useAppSelector((state) => state.user);
  const postsStatus = useAppSelector((state) => state.posts.status);
  const postsCount = useAppSelector((state) => state.posts.items.length);

  const fullState = {
    counter,
    user,
    posts: {
      itemsLoaded: postsCount,
      status: postsStatus,
    },
  };

  return (
    <section className="demo-card inspector-card">
      <div className="demo-header">
        <span className="demo-icon">🔬</span>
        <div>
          <h2 className="demo-title">Live Redux State Tree</h2>
          <p className="demo-subtitle">
            Updates in real-time as you interact with the demos above
          </p>
        </div>
      </div>

      <pre className="state-tree">
        {JSON.stringify(fullState, null, 2)}
      </pre>

      <div className="inspector-tip">
        💡 <strong>Tip:</strong> Install the{" "}
        <strong>Redux DevTools</strong> browser extension to see the full state
        tree and action history!
      </div>
    </section>
  );
}
