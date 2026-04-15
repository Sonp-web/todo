import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import registrationSlice from "./slices/registrationSlice";
import tasksSlice from "./slices/tasksSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    reg: registrationSlice,
    tasks: tasksSlice,
  },
});
export default store;
