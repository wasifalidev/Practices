// ============================================================
// 🪝 TYPED HOOKS - lib/hooks.ts
// ============================================================
// WHY? The default useSelector/useDispatch from react-redux
// don't know your store's types. These typed versions do!
//
// USE THESE HOOKS EVERYWHERE in your components instead of
// the generic ones from react-redux.
// ============================================================

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// ✅ Use this instead of plain `useDispatch()`
// It knows about thunks and all your action types
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// ✅ Use this instead of plain `useSelector()`
// It knows the full shape of your state tree
export const useAppSelector = useSelector.withTypes<RootState>();
