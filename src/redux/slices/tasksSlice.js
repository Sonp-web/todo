import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTasks = createAsyncThunk(
  "/getTasks",
  async (data, { getState }) => {
    const state = getState();
    const responce = await fetch("https://todo-redev.herokuapp.com/api/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.auth.token}`,
      },
    });
    const result = await responce.json();
    return result;
  },
);
export const deleteTask = createAsyncThunk(
  "/deleteTask",
  async (id, { getState }) => {
    const state = getState();
    const responce = await fetch(
      `https://todo-redev.herokuapp.com/api/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      },
    );
    const result = await responce.json();

    return result.id;
  },
);
export const completedTask = createAsyncThunk(
  "/completedTask",
  async (id, { getState }) => {
    const state = getState();
    const response = await fetch(
      `https://todo-redev.herokuapp.com/api/todos/${id}/isCompleted`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      },
    );
    const result = await response.json();
    return result;
  },
);
export const postTask = createAsyncThunk(
  "/postTask",
  async (task, { getState }) => {
    const state = getState();
    const responce = await fetch("https://todo-redev.herokuapp.com/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.auth.token}`,
      },
      body: JSON.stringify(task),
    });
    const result = await responce.json();
    return result;
  },
);
export const patchTask = createAsyncThunk(
  "/patchTask",
  async ({ data, id }, { getState }) => {
    const state = getState();
    const response = await fetch(
      `https://todo-redev.herokuapp.com/api/todos/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.auth.token}`,
        },
        body: JSON.stringify({ title: data }),
      },
    );
    const result = await response.json();

    return result;
  },
);

const initialState = {
  tasks: [],
  loadingAdd: false,
  loadingCompleted: false,
  loadingPost: false,
  loadingPatch: false,
  newUp: false,
};
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setNewUp(state, action) {
      state.newUp = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loadingAdd = false;
      })
      .addCase(getTasks.pending, (state) => {
        state.loadingAdd = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((item) => item.id != action.payload);
      })
      .addCase(completedTask.fulfilled, (state, action) => {
        let temp = state.tasks.find((item) => item.id == action.payload[0].id);
        temp.isCompleted = !temp.isCompleted;
        state.loadingCompleted = false;
      })
      .addCase(completedTask.pending, (state) => {
        state.loadingCompleted = true;
      })
      .addCase(postTask.pending, (state) => {
        state.loadingPost = true;
      })
      .addCase(postTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.loadingPost = false;
      })
      .addCase(patchTask.fulfilled, (state, action) => {
        state.tasks.find((item) => item.id == action.payload.id).title =
          action.payload.title;
        state.loadingPatch = false;
      })
      .addCase(patchTask.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(patchTask.pending, (state, action) => {
        state.loadingPatch = action.meta.arg.id;
      });
  },
});
export default tasksSlice.reducer;
export const { setNewUp } = tasksSlice.actions;
