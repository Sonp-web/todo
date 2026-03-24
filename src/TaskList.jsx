import Task from "./Task";
const TaskList = ({
  tasks,
  deleteTask,
  editTask,
  doneTask,
  loadingUpdate,
  loadingGet,
}) => {
  return (
    <>
      {loadingGet && <div className="spinner"></div>}
      {tasks.map((item) => (
        <Task
          key={item.id}
          task={item}
          deleteTask={deleteTask}
          editTask={editTask}
          doneTask={doneTask}
          loadingUpdate={loadingUpdate == item.id}
        />
      ))}
    </>
  );
};
export default TaskList;
