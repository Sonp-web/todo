const initialState = {
  input: "",
};
const inputReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, input: action.payload };
    case "CLEAR":
      return { ...state, input: "" };
    default:
      return state;
  }
};
export default inputReducer;
