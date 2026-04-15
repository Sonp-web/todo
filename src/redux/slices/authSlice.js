import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLogin = createAsyncThunk("/login", async (data) => {
  const responce = await fetch(
    "https://todo-redev.herokuapp.com/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  const result = await responce.json();
  localStorage.setItem("token", result.token);
  return result;
});

const initialState = {
  token: "",
  loadingLogin: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokenF(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.loadingLogin = false;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.loadingLogin = true;
      });
  },
});
export const { setTokenF } = authSlice.actions;
export default authSlice.reducer;
