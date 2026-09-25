import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  subscriberId: string | null;
  skipSplash: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  subscriberId: null,
  skipSplash: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.subscriberId = action.payload;
      state.skipSplash = true;
    },
    markSplashComplete: (state) => {
      state.skipSplash = true;
    },
    resetAuth: (state) => {
      state.isLoggedIn = false;
      state.subscriberId = null;
      state.skipSplash = true;
    },
  },
});

export const { setIsLoggedIn, setAuthenticated, markSplashComplete, resetAuth } =
  authSlice.actions;

export default authSlice.reducer;