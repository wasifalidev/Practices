// ============================================================
// 🍕 SLICE 1: Counter - lib/features/counter/counterSlice.ts
// ============================================================
// A "slice" = one piece of state + its reducers + actions
//
// createSlice() automatically:
//   - Creates action creators (increment, decrement, etc.)
//   - Creates action type strings ("counter/increment")
//   - Uses Immer so you can "mutate" state directly (safely)
// ============================================================

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1. Define the shape of this slice's state
interface CounterState {
  value: number;
  step: number; // how much to increment/decrement
}

// 2. Define the initial state
const initialState: CounterState = {
  value: 0,
  step: 1,
};

// 3. Create the slice
const counterSlice = createSlice({
  name: "counter", // ← used to generate action type strings like "counter/increment"
  initialState,
  reducers: {
    // ✅ Immer lets you write "mutating" code - it's actually safe!
    // Each function here is a reducer AND automatically creates an action creator

    increment: (state) => {
      state.value += state.step; // Immer converts this to immutable update
    },

    decrement: (state) => {
      state.value -= state.step;
    },

    reset: (state) => {
      state.value = 0;
    },

    // PayloadAction<T> = action with a typed payload
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },

    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
  },
});

// 4. Export the auto-generated action creators
// These are the functions you dispatch: dispatch(increment())
export const { increment, decrement, reset, incrementByAmount, setStep } =
  counterSlice.actions;

// 5. Export selector functions (optional but good practice)
// Instead of state.counter.value everywhere, use these
export const selectCount = (state: { counter: CounterState }) =>
  state.counter.value;
export const selectStep = (state: { counter: CounterState }) =>
  state.counter.step;

// 6. Export the reducer to register in the store
export default counterSlice.reducer;
