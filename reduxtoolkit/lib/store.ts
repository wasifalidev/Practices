// ============================================================
// 📦 REDUX STORE - lib/store.ts
// ============================================================
// configureStore wraps the old Redux createStore()
// It automatically sets up:
//   - Redux DevTools Extension
//   - redux-thunk middleware (for async actions)
//   - Immer (for "mutating" state safely in reducers)
// ============================================================

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import userReducer from "./features/user/userSlice";
import postsReducer from "./features/posts/postsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      // Each key here becomes a "slice" of state
      // state.counter, state.user, state.posts
      counter: counterReducer,
      user: userReducer,
      posts: postsReducer,
    },
  });
};

// ============================================================
// 🔑 TypeScript Types - ALWAYS export these for type safety
// ============================================================

// The store type (factory function return type)
export type AppStore = ReturnType<typeof makeStore>;

// The full shape of the Redux state tree
// e.g. { counter: CounterState, user: UserState, posts: PostsState }
export type RootState = ReturnType<AppStore["getState"]>;

// The dispatch type - knows about thunks and regular actions
export type AppDispatch = AppStore["dispatch"];
