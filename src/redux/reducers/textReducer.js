const initialState = {
  tasks: [],
  newUp: false,
};
const sorting = (array, state) => {
  return array.sort((a, b) =>
    state.newUp ? b.date - a.date : a.date - b.date,
  );
};
const textReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        tasks: sorting(
          [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              text: action.payload,
              isDone: false,
              date: Date.now(),
            },
          ],
          state,
        ),
      };
    case "SAVE":
      return {
        ...state,
        tasks: sorting(
          [...state.tasks].map((item) => {
            return item.id == action.payload.id
              ? { ...item, text: action.payload.text }
              : item;
          }),
          state,
        ),
      };
    case "CLICK":
      return {
        ...state,
        tasks: sorting(
          [...state.tasks].map((item) => {
            return item.id == action.payload
              ? { ...item, isDone: !item.isDone }
              : item;
          }),
          state,
        ),
      };
    case "DELETE":
      return {
        ...state,
        tasks: sorting(
          [...state.tasks].filter((item) => item.id != action.payload),
          state,
        ),
      };
    case "CLEAR_DONE":
      return {
        ...state,
        tasks: sorting(
          [...state.tasks].filter((item) => !item.isDone),
          state,
        ),
      };
    case "NEW_UP":
      return {
        ...state,
        tasks: [...state.tasks].sort((a, b) => b.date - a.date),
        newUp: true,
      };
    case "NEW_DOWN":
      return {
        ...state,
        tasks: [...state.tasks].sort((a, b) => a.date - b.date),
        newUp: false,
      };
    default:
      return state;
  }
};
export default textReducer;
