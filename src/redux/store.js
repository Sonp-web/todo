import { configureStore } from "@reduxjs/toolkit";
import inputSlice from "./slices/inputSlice";
import textSlice from "./slices/textSlice";
import inputTaskSlice from "./slices/inputTaskSlice";

const store = configureStore({
  reducer: {
    text: textSlice,
    input: inputSlice,
    inputTask: inputTaskSlice,
  },
});

export default store;
