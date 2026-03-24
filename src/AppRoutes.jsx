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
  return (
    <Routes>
      <Route
        path="/"
        element={
          <TaskList
            tasks={tasks}
            deleteTask={deleteTask}
            editTask={editTask}
            doneTask={doneTask}
            loadingUpdate={loadingUpdate}
            loadingGet={loadingGet}
          />
        }
      />
      <Route
        path="/active"
        element={
          <TaskList
            tasks={tasks.filter((item) => !item.isCompleted)}
            deleteTask={deleteTask}
            editTask={editTask}
            doneTask={doneTask}
            loadingUpdate={loadingUpdate}
            loadingGet={loadingGet}
          />
        }
      />
      <Route
        path="/done"
        element={
          <TaskList
            tasks={tasks.filter((item) => item.isCompleted)}
            deleteTask={deleteTask}
            editTask={editTask}
            doneTask={doneTask}
            loadingUpdate={loadingUpdate}
            loadingGet={loadingGet}
          />
        }
      />
    </Routes>
  );
};
export default AppRoutes;
