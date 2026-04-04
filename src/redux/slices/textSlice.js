import { createSlice } from "@reduxjs/toolkit";
import { sorting } from "../../helpers/taskHelpers";
const initialState = {
  tasks: [],
  newUp: false,
};
const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    adding(state, action) {
      state.tasks.push({
        id: crypto.randomUUID(),
        text: action.payload,
        isDone: false,
        date: Date.now(),
      });
      sorting(state.tasks, state.newUp);
    },
    saving(state, action) {
      const temp = state.tasks.find((item) => item.id == action.payload.id);
      temp.text = action.payload.inputTask;
    },
    click(state, action) {
      const temp = state.tasks.find((item) => item.id == action.payload);
      temp.isDone = !temp.isDone;
    },
    deleting(state, action) {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload);
    },
    clearDone(state) {
      state.tasks = state.tasks.filter((item) => !item.isDone);
    },
    newUp(state) {
      state.tasks.sort((a, b) => b.date - a.date);
      state.newUp = true;
    },
    newDown(state) {
      state.tasks.sort((a, b) => a.date - b.date);
      state.newUp = false;
    },
  },
});
export const { adding, saving, click, deleting, clearDone, newUp, newDown } =
  textSlice.actions;
export default textSlice.reducer;
