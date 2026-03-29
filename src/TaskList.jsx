import TaskWithLog from "./Task";
import { useSelector } from "react-redux";
const TaskList = ({ filter }) => {
  const { tasks } = useSelector((state) => state.text);
  const filteredTasks = tasks.filter((item) => {
    switch (filter) {
      case "active":
        return item.isDone == false;
      case "done":
        return item.isDone == true;
      default:
        return item;
    }
  });
  return (
    <>
      {filteredTasks.map((item) => (
        <TaskWithLog key={item.id} task={item} />
      ))}
    </>
  );
};
export default TaskList;
