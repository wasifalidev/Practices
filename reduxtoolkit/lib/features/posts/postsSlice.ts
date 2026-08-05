// ============================================================
// 📰 SLICE 3: Posts - lib/features/posts/postsSlice.ts
// ============================================================
// Shows createAsyncThunk for async API calls (fetch data)
//
// YOUR TEACHER'S SEO POINT:
//   - Server Component fetches data (SEO friendly, no JS needed)
//   - It passes data to Redux via a "Hydration" pattern
//   - Client components then read from Redux store
// ============================================================

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsState {
  items: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedPost: Post | null;
}

const initialState: PostsState = {
  items: [],
  status: "idle",
  error: null,
  selectedPost: null,
};

// ============================================================
// 🔄 createAsyncThunk - for API calls / async logic
// ============================================================
// "posts/fetchPosts" = the action type string prefix
// Redux auto creates 3 actions:
//   - posts/fetchPosts/pending  (loading starts)
//   - posts/fetchPosts/fulfilled (success)
//   - posts/fetchPosts/rejected  (error)
// ============================================================
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=6"
  );
  if (!response.ok) throw new Error("Failed to fetch posts");
  return (await response.json()) as Post[];
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Regular synchronous reducer
    selectPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    // For Server → Client hydration (SEO pattern)
    // Server fetches data, client hydrates into Redux
    hydrateFromServer: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
      state.status = "succeeded";
    },
  },
  // extraReducers handles async thunk lifecycle
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export const { selectPost, hydrateFromServer } = postsSlice.actions;
export const selectAllPosts = (state: { posts: PostsState }) =>
  state.posts.items;
export const selectPostsStatus = (state: { posts: PostsState }) =>
  state.posts.status;
export const selectPostsError = (state: { posts: PostsState }) =>
  state.posts.error;
export const selectSelectedPost = (state: { posts: PostsState }) =>
  state.posts.selectedPost;

export default postsSlice.reducer;
