import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRegister = createAsyncThunk("/registration", async (data) => {
  const response = await fetch(
    `https://todo-redev.herokuapp.com/api/users/register
`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  const result = await response.json();
  console.log(result);
});
const initialState = {
  loadingRegister: false,
};
const registrationSlice = createSlice({
  name: "reg",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.loadingRegister = true;
      })
      .addCase(fetchRegister.fulfilled, (state) => {
        state.loadingRegister = false;
      });
  },
});

export default registrationSlice.reducer;
