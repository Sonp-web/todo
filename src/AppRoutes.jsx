import TaskList from "./TaskList";
import { Routes, Route } from "react-router-dom";
const AppRoutes = ({
  tasks,
  deleteTask,
  editTask,
  doneTask,
  loadingUpdate,
  loadingGet,
}) => {
  const tempProps = {
    tasks,
    deleteTask,
    editTask,
    doneTask,
    loadingUpdate,
    loadingGet,
  };
  return (
    <Routes>
      <Route path="/" element={<TaskList {...tempProps} filter="all" />} />
      <Route
        path="/active"
        element={<TaskList {...tempProps} filter="active" />}
      />
      <Route path="/done" element={<TaskList {...tempProps} filter="done" />} />
    </Routes>
  );
};
export default AppRoutes;
