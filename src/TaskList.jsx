import Task from "./Task";
import { useSelector } from "react-redux";
const TaskList = ({ filter }) => {
  let tasks = useSelector((state) => state.tasks.tasks);
  const loadingAdd = useSelector((state) => state.tasks.loadingAdd);
  const newUp = useSelector((state) => state.tasks.newUp);
  const temp = [...tasks].sort((a, b) => (newUp ? b.id - a.id : a.id - b.id));
  //улучшенный фильтр:
  tasks = temp;
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
      {loadingAdd && <div className="spinner"></div>}
      {filteredTasks.map((item) => (
        <Task key={item.id} task={item} />
      ))}
    </>
  );
};
export default TaskList;
