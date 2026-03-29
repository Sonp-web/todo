export const input = (text) => {
  return {
    type: "CHANGE",
    payload: text,
  };
};
export const clear = () => {
  return {
    type: "CLEAR",
  };
};
