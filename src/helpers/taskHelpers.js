export const sorting = (tasks, isNewUp) => {
  return tasks.sort((a, b) => (isNewUp ? b.date - a.date : a.date - b.date));
};
