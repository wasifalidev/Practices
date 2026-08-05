// ============================================================
// 🎛️ COUNTER DEMO - components/CounterDemo.tsx
// ============================================================
// CLIENT COMPONENT - reads/writes Redux state
//
// "use client" = runs in browser, can use hooks, events, etc.
// ============================================================

"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
  setStep,
  selectCount,
  selectStep,
} from "@/lib/features/counter/counterSlice";
import { useState } from "react";

export default function CounterDemo() {
  // ✅ useAppSelector reads from Redux state
  const count = useAppSelector(selectCount);
  const step = useAppSelector(selectStep);

  // ✅ useAppDispatch sends actions to Redux
  const dispatch = useAppDispatch();

  const [customAmount, setCustomAmount] = useState(5);

  return (
    <section className="demo-card">
      <div className="demo-header">
        <span className="demo-icon">🔢</span>
        <div>
          <h2 className="demo-title">Counter Demo</h2>
          <p className="demo-subtitle">
            <code>createSlice</code> · <code>useAppSelector</code> ·{" "}
            <code>useAppDispatch</code>
          </p>
        </div>
      </div>

      {/* THE COUNTER DISPLAY */}
      <div className="counter-display">
        <span
          className="counter-value"
          style={{ color: count >= 0 ? "#4ade80" : "#f87171" }}
        >
          {count}
        </span>
      </div>

      {/* BASIC ACTIONS */}
      <div className="btn-row">
        <button className="btn btn-danger" onClick={() => dispatch(decrement())}>
          − Decrement
        </button>
        <button className="btn btn-gray" onClick={() => dispatch(reset())}>
          ↺ Reset
        </button>
        <button
          className="btn btn-success"
          onClick={() => dispatch(increment())}
        >
          + Increment
        </button>
      </div>

      {/* STEP SIZE */}
      <div className="control-row">
        <label className="control-label">Step Size:</label>
        <div className="btn-group">
          {[1, 5, 10].map((s) => (
            <button
              key={s}
              className={`btn-step ${step === s ? "active" : ""}`}
              onClick={() => dispatch(setStep(s))}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* CUSTOM AMOUNT - PayloadAction demo */}
      <div className="control-row">
        <label className="control-label">Custom Amount:</label>
        <div className="input-row">
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(Number(e.target.value))}
            className="input-field"
          />
          <button
            className="btn btn-purple"
            onClick={() => dispatch(incrementByAmount(customAmount))}
          >
            Add {customAmount}
          </button>
        </div>
      </div>

      {/* EXPLANATION */}
      <div className="code-explain">
        <pre>{`// In your component:
const count = useAppSelector(selectCount)
const dispatch = useAppDispatch()

// Dispatch actions:
dispatch(increment())          // no payload
dispatch(incrementByAmount(5)) // with payload
dispatch(setStep(10))          // with payload`}</pre>
      </div>
    </section>
  );
}
