import "./App.css";
import Header from "./Header";
import Input from "./Input";
import Filter from "./Filter";
import InfoDo from "./InfoDo";
import AppRoutes from "./AppRoutes";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import useTasksApi from "./useTasksApi";
function App() {
  const [newUp, setNewUp] = useState(false);
  const {
    loadTasks,
    setTasks,
    deletingTask,
    patchTask,
    completedTask,
    token,
    setLoadingAdd,
    loadingAdd,
    tasks,
    setLoadingUpdate,
    loadingUpdate,
    loadingGet,
    loadingRegistration,
    postTask,
    setToken,
    loadingLogin,
    setLoadingLogin,
    onSubmitRegistration,
    success,
    onSubmitLogin,
  } = useTasksApi();

  const sortingTasks = () => {
    setTasks((oldTasks) =>
      newUp
        ? [...oldTasks].sort((a, b) => b.id - a.id)
        : [...oldTasks].sort((a, b) => a.id - b.id),
    );
    console.log("sort");
  };
  useEffect(() => {
    loadTasks();
  }, [token]);

  useEffect(() => {
    sortingTasks();
  }, [newUp]);

  const deleteTask = (id) => {
    deletingTask(id);
    setTasks((oldTasks) => oldTasks.filter((item) => item.id != id));
  };
  const editTask = async (id, text) => {
    await patchTask(text, id);
    setTasks((oldTasks) =>
      oldTasks.map((item) => (item.id == id ? { ...item, title: text } : item)),
    );
  };
  const doneTask = (id) => {
    completedTask(id);
    setTasks((oldTasks) =>
      oldTasks.map((item) =>
        item.id == id ? { ...item, isCompleted: !item.isCompleted } : item,
      ),
    );
  };
  const clearDone = () => {
    setTasks((oldTasks) =>
      oldTasks.filter((item) =>
        !item.isCompleted ? item : deleteTask(item.id),
      ),
    );
  };

  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          <Header />
          <Input
            setTasks={setTasks}
            sortingTasks={sortingTasks}
            token={token}
            setLoadingAdd={setLoadingAdd}
            loadingAdd={loadingAdd}
            postTask={postTask}
          />
          <AppRoutes
            tasks={tasks}
            deleteTask={deleteTask}
            editTask={editTask}
            doneTask={doneTask}
            setLoadingUpdate={setLoadingUpdate}
            loadingUpdate={loadingUpdate}
            loadingGet={loadingGet}
          />
          <Filter />
          <InfoDo
            tasks={tasks}
            clearDone={clearDone}
            setNewUp={setNewUp}
            loadingAdd={loadingAdd}
          />{" "}
        </>
      ) : (
        <>
          <Registration
            onSubmitRegistration={onSubmitRegistration}
            loadingRegistratio={loadingRegistration}
            success={success}
          ></Registration>
          <Login
            setToken={setToken}
            loadingLogin={loadingLogin}
            setLoadingLogin={setLoadingLogin}
            onSubmitLogin={onSubmitLogin}
          ></Login>
        </>
      )}
    </>
  );
}

export default App;
