// ============================================================
// 👤 SLICE 2: User - lib/features/user/userSlice.ts
// ============================================================
// Shows how to store user/auth state in Redux
// ============================================================

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  theme: "light" | "dark";
  isLoggedIn: boolean;
  notifications: number;
}

const initialState: UserState = {
  name: "Wasif Ali",
  theme: "dark",
  isLoggedIn: true,
  notifications: 3,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },

    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.name = action.payload;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.name = "";
      state.notifications = 0;
    },

    addNotification: (state) => {
      state.notifications += 1;
    },

    clearNotifications: (state) => {
      state.notifications = 0;
    },
  },
});

export const {
  setName,
  toggleTheme,
  login,
  logout,
  addNotification,
  clearNotifications,
} = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user;
export const selectTheme = (state: { user: UserState }) => state.user.theme;

export default userSlice.reducer;
