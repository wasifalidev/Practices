// ============================================================
// 📰 POSTS DEMO - components/PostsDemo.tsx
// ============================================================
// Shows createAsyncThunk for fetching data from an API
//
// IMPORTANT: This is CLIENT-SIDE fetching.
// For SERVER-SIDE (SEO), see the page.tsx example where
// the server fetches data and passes it to the store.
// ============================================================

"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  fetchPosts,
  selectPost,
  selectAllPosts,
  selectPostsStatus,
  selectPostsError,
  selectSelectedPost,
} from "@/lib/features/posts/postsSlice";

export default function PostsDemo() {
  const posts = useAppSelector(selectAllPosts);
  const status = useAppSelector(selectPostsStatus);
  const error = useAppSelector(selectPostsError);
  const selectedPost = useAppSelector(selectSelectedPost);
  const dispatch = useAppDispatch();

  return (
    <section className="demo-card full-width-card">
      <div className="demo-header">
        <span className="demo-icon">🔄</span>
        <div>
          <h2 className="demo-title">Async Data Fetching</h2>
          <p className="demo-subtitle">
            <code>createAsyncThunk</code> · pending / fulfilled / rejected
            lifecycle
          </p>
        </div>
      </div>

      {/* STATUS INDICATORS */}
      <div className="status-row">
        <span className={`status-badge ${status === "loading" ? "active" : ""}`}>
          ⏳ pending
        </span>
        <span className={`status-badge ${status === "succeeded" ? "active-green" : ""}`}>
          ✅ fulfilled
        </span>
        <span className={`status-badge ${status === "failed" ? "active-red" : ""}`}>
          ❌ rejected
        </span>
        <span className="status-current">Current: <strong>{status}</strong></span>
      </div>

      {/* FETCH BUTTON */}
      <button
        className={`btn ${status === "loading" ? "btn-loading" : "btn-blue"} full-width`}
        onClick={() => dispatch(fetchPosts())}
        disabled={status === "loading"}
      >
        {status === "loading" ? "⏳ Fetching from API..." : "🌐 Fetch Posts from API"}
      </button>

      {/* ERROR STATE */}
      {error && (
        <div className="error-box">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* SELECTED POST DETAIL */}
      {selectedPost && (
        <div className="selected-post">
          <div className="selected-post-header">
            <strong>#{selectedPost.id}</strong> {selectedPost.title}
          </div>
          <p className="selected-post-body">{selectedPost.body}</p>
          <button
            className="btn btn-gray"
            onClick={() => dispatch(selectPost(null))}
          >
            Close
          </button>
        </div>
      )}

      {/* POSTS LIST */}
      {posts.length > 0 && (
        <div className="posts-grid">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`post-card ${selectedPost?.id === post.id ? "post-card-selected" : ""}`}
              onClick={() => dispatch(selectPost(post))}
            >
              <div className="post-num">#{post.id}</div>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-body">{post.body.slice(0, 80)}…</p>
            </div>
          ))}
        </div>
      )}

      {status === "idle" && posts.length === 0 && (
        <div className="empty-state">
          Click &quot;Fetch Posts&quot; to call the API and see Redux handle async state!
        </div>
      )}

      <div className="code-explain">
        <pre>{`// createAsyncThunk handles the 3 states automatically:
// dispatch(fetchPosts()) triggers:
//   → "posts/fetchPosts/pending"   → status = "loading"
//   → "posts/fetchPosts/fulfilled" → status = "succeeded" + data stored
//   → "posts/fetchPosts/rejected"  → status = "failed" + error stored

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const res = await fetch("/api/posts")
    return res.json()
  }
)`}</pre>
      </div>
    </section>
  );
}
