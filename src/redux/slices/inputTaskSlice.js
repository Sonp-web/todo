import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

const inputTaskSlice = createSlice({
  name: "inputTask",
  initialState,
  reducers: {
    changeTask(state, action) {
      state.value = action.payload;
    },
    clearTask(state) {
      state.value = "";
    },
    editTask(state, action) {
      state.value = action.payload;
    },
  },
});
export const { changeTask, clearTask, editTask } = inputTaskSlice.actions;
export default inputTaskSlice.reducer;
