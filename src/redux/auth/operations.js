import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const goitAPI = axios.create({
  baseURL: "https://connections-api.goit.global/",
});
const setAuthHeader = (token) => {
  goitAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
 goitAPI.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await goitAPI.post("/users/signup", credentials);
      setAuthHeader(response.data.token);
      toast.success("Registration successful!");
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed!";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      console.log("Sending data:", credentials);
      const response = await goitAPI.post("/users/login", credentials);
      setAuthHeader(response.data.token);
      toast.success("Login successful!");
      return response.data;
    } catch (error) {
      toast.error("Login failed!");
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await goitAPI.post(`/users/logout`);
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const response = await goitAPI.get("/users/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
