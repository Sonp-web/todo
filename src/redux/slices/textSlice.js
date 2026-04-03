import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  newUp: false,
};
const sorting = (array, state) => {
  return array.sort((a, b) =>
    state.newUp ? b.date - a.date : a.date - b.date,
  );
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
      sorting(state.tasks, state);
    },
    saving(state, action) {
      state.tasks = sorting(
        state.tasks.map((item) => {
          return item.id == action.payload.id
            ? { ...item, text: action.payload.inputTask }
            : item;
        }),
        state,
      );
    },
    click(state, action) {
      state.tasks = sorting(
        state.tasks.map((item) => {
          return item.id == action.payload
            ? { ...item, isDone: !item.isDone }
            : item;
        }),
        state,
      );
    },
    deleting(state, action) {
      state.tasks = sorting(
        state.tasks.filter((item) => item.id != action.payload),
        state,
      );
    },
    clearDone(state) {
      state.tasks = sorting(
        state.tasks.filter((item) => !item.isDone),
        state,
      );
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
