import TaskList from "./TaskList";
import { Routes, Route } from "react-router-dom";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TaskList filter="all" />} />
      <Route path="/active" element={<TaskList filter="active" />} />
      <Route path="/done" element={<TaskList filter="done" />} />
    </Routes>
  );
};
export default AppRoutes;
