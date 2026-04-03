import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    input(state, action) {
      state.value = action.payload;
    },
    clear(state) {
      state.value = "";
    },
  },
});

export const { input, clear } = inputSlice.actions;
export default inputSlice.reducer;
