import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    const res = await fetch("/api/auth/logout");
    if (!res.ok) {
      return thunkApi.rejectWithValue({
        status: "error",
        message: "there was a problem logging out",
      });
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      status: "error",
      message: error.message,
    });
  }
});
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      const res = await fetch("/api/auth/login", {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        status: "error",
        message: error.message,
      });
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      // make a post request
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        return thunkApi.rejectWithValue({
          statu: "error",
          message: "something went wrong",
        });
      }

      const data = await res.json();
      console.log("xxxxx", data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccsss = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isSuccess = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
