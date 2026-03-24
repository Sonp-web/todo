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

function App() {
  const [tasks, setTasks] = useState([]);
  const [newUp, setNewUp] = useState(false);
  const [token, setToken] = useState(localStorage?.getItem("token"));
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(null);
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingRegistration, setLoadingRegistration] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const loadTasks = async () => {
    setLoadingGet(true);
    if (!token) {
      return;
    }
    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/todos",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) throw new Error("Ошибка создания");
      const result = await response.json();
      console.log(result);

      setTasks(result);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingGet(false);
    }
  };
  const completedTask = async (id) => {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}/isCompleted`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) throw new Error("Ошибка создания");
    } catch (error) {
      console.log(error.message);
    }
  };

  const patchTask = async (data, id) => {
    setLoadingUpdate(id);
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: data }),
        },
      );

      if (!response.ok) throw new Error("Ошибка создания");
      setLoadingUpdate(null);
    } catch (error) {
      console.log(error.message);
      setLoadingUpdate(null);
    }
  };

  const deletingTask = async (id) => {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) throw new Error("Ошибка создания");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [token]);

  useEffect(() => {
    sortingTasks();
  }, [newUp]);

  const sortingTasks = () => {
    setTasks((oldTasks) =>
      newUp
        ? [...oldTasks].sort((a, b) => b.id - a.id)
        : [...oldTasks].sort((a, b) => a.id - b.id),
    );
    console.log("sort");
  };

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
          />{" "}
        </>
      ) : (
        <>
          <Registration
            loadingRegistration={loadingRegistration}
            setLoadingRegistration={setLoadingRegistration}
          ></Registration>
          <Login
            setToken={setToken}
            loadingLogin={loadingLogin}
            setLoadingLogin={setLoadingLogin}
          ></Login>
        </>
      )}
    </>
  );
}

export default App;

crypto.randomUUID();
