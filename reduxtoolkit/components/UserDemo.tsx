// ============================================================
// 👤 USER DEMO - components/UserDemo.tsx
// ============================================================
// Shows reading and writing user/auth state from Redux
// ============================================================

"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  selectUser,
  toggleTheme,
  setName,
  addNotification,
  clearNotifications,
  logout,
  login,
} from "@/lib/features/user/userSlice";
import { useState } from "react";

export default function UserDemo() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [inputName, setInputName] = useState("");

  return (
    <section className="demo-card">
      <div className="demo-header">
        <span className="demo-icon">👤</span>
        <div>
          <h2 className="demo-title">User / Auth State</h2>
          <p className="demo-subtitle">
            Multiple reducers sharing state · PayloadAction
          </p>
        </div>
      </div>

      {/* USER STATUS CARD */}
      <div className="user-card">
        <div className="user-avatar">{user.name ? user.name[0] : "?"}</div>
        <div className="user-info">
          <p className="user-name">{user.name || "Not logged in"}</p>
          <span className={`badge ${user.isLoggedIn ? "badge-green" : "badge-red"}`}>
            {user.isLoggedIn ? "● Online" : "○ Offline"}
          </span>
        </div>
        <div className="notif-bubble">{user.notifications}</div>
      </div>

      {/* ACTIONS */}
      <div className="btn-row">
        <button
          className="btn btn-purple"
          onClick={() => dispatch(toggleTheme())}
        >
          {user.theme === "dark" ? "🌙 Dark" : "☀️ Light"} Mode
        </button>
        <button
          className="btn btn-blue"
          onClick={() => dispatch(addNotification())}
        >
          🔔 +Notification
        </button>
        <button
          className="btn btn-gray"
          onClick={() => dispatch(clearNotifications())}
        >
          Clear All
        </button>
      </div>

      {/* SET NAME */}
      <div className="control-row">
        <label className="control-label">Set Name:</label>
        <div className="input-row">
          <input
            type="text"
            placeholder="Enter name..."
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="input-field"
          />
          <button
            className="btn btn-success"
            onClick={() => {
              if (inputName) {
                dispatch(setName(inputName));
                setInputName("");
              }
            }}
          >
            Save
          </button>
        </div>
      </div>

      {/* LOGIN/LOGOUT */}
      <div className="btn-row">
        {user.isLoggedIn ? (
          <button
            className="btn btn-danger full-width"
            onClick={() => dispatch(logout())}
          >
            🚪 Logout
          </button>
        ) : (
          <button
            className="btn btn-success full-width"
            onClick={() => dispatch(login("Wasif Ali"))}
          >
            🔑 Login as Wasif Ali
          </button>
        )}
      </div>

      <div className="code-explain">
        <pre>{`// Each action dispatched updates ONE slice
// but ALL components sharing the store see the change!
dispatch(toggleTheme())
dispatch(setName("Wasif"))    // PayloadAction<string>
dispatch(addNotification())`}</pre>
      </div>
    </section>
  );
}
