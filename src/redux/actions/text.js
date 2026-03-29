export const adding = (text) => {
  return {
    type: "ADD",
    payload: text,
  };
};

export const saving = (id, text) => {
  return {
    type: "SAVE",
    payload: {
      id: id,
      text: text,
    },
  };
};

export const click = (id) => {
  return {
    type: "CLICK",
    payload: id,
  };
};
export const deleting = (id) => {
  return {
    type: "DELETE",
    payload: id,
  };
};
export const clearDone = () => {
  return {
    type: "CLEAR_DONE",
  };
};
export const newUp = () => {
  return {
    type: "NEW_UP",
  };
};
export const newDown = () => {
  return {
    type: "NEW_DOWN",
  };
};
