const initialState = {
  input: "",
};
const inputTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_TASK":
      return { ...state, input: action.payload };
    case "CLEAR_TASK":
      return { ...state, input: "" };
    case "EDIT_TASK":
      return { ...state, input: action.payload };
    default:
      return state;
  }
};
export default inputTaskReducer;
