export const input = (text) => {
  return {
    type: "CHANGE_TASK",
    payload: text,
  };
};
export const clear = () => {
  return {
    type: "CLEAR_TASK",
  };
};
export const edit = (text) => {
  return {
    type: "EDIT_TASK",
    payload: text,
  };
};
