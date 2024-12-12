import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { register, login, logOut, refreshUser } from "./operations";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
  isContactsFetched:false,
};

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"], // Зберігаємо токен
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  whiteList: [`token`],
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      
      .addCase(logOut.fulfilled, () => {
      return initialState;
      })
     
      .addMatcher(
        isAnyOf(login.pending, register.pending),
        (state) => {
          state.isLoading = true;
          state.error = null; 
        }
      )
      .addMatcher(
        isAnyOf(login.fulfilled, register.fulfilled),
        (state, action) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isLoggedIn = true;
          state.error = null; 
        }
      )
      .addMatcher(
        isAnyOf(login.rejected, register.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload || "An error occurred";
        }
      );
  },
});

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
