import Task from "./Task";
const TaskList = ({
  tasks,
  deleteTask,
  editTask,
  doneTask,
  loadingUpdate,
  loadingGet,
  filter,
}) => {
  //улучшенный фильтр
  const filterMap = {
    active: (task) => !task.isCompleted,
    done: (task) => task.isCompleted,
    all: () => true,
  };
  const filterFn = filterMap[filter] || filterMap.all;
  const filteredTasks = tasks.filter(filterFn);
  //
  // let filteredTasks = [];
  // switch (filter) {
  //   case "active":
  //     filteredTasks = tasks.filter((task) => !task.isCompleted);
  //     break;
  //   case "done":
  //     filteredTasks = tasks.filter((task) => task.isCompleted);
  //     break;
  //   default:
  //     filteredTasks = tasks;
  // }

  return (
    <>
      {loadingGet && <div className="spinner"></div>}
      {filteredTasks.map((item) => (
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
