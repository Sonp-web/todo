import { useState } from "react";
function useTasksApi() {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage?.getItem("token"));

  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(null);
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingRegistration, setLoadingRegistration] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [success, setSuccess] = useState("");

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

  const postTask = async (task) => {
    setLoadingAdd(true);
    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(task),
        },
      );
      if (!response.ok) throw new Error("Ошибка создания");
      const result = await response.json();
      return result.id;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingAdd(false);
    }
  };

  const onSubmitLogin = async (data, setError) => {
    setLoadingLogin(true);
    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();
      if (!response.ok) {
        setError("root", {
          type: "manual",
          message: result.message || "Ошибка регистрации",
        });

        return;
      }
      localStorage.setItem("token", result.token);
      setToken(result.token);
    } catch (error) {
      setError("root", {
        type: "manual",
        message: error.message || "Ошибка регистрации",
      });
    } finally {
      setLoadingLogin(false);
    }
  };
  const onSubmitRegistration = async (data, setError, reset) => {
    setLoadingRegistration(true);
    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const result = await response.json();
      if (!response.ok) {
        setError("root", {
          type: "manual",
          message: result.message || "Ошибка регистрации",
        });
        return;
      } else {
        reset();
        setSuccess("Регистрация прошла успешно");
        setTimeout(() => setSuccess(""), 5000);
      }
    } catch (error) {
      setError("root", {
        type: "manual",
        message: error.message || "Ошибка регистрации",
      });
    } finally {
      setLoadingRegistration(false);
    }
  };
  return {
    tasks,
    setTasks,
    token,
    setToken,
    setLoadingAdd,
    loadingAdd,
    loadingUpdate,
    loadingGet,
    loadingRegistration,
    setLoadingRegistration,
    loadingLogin,
    setLoadingLogin,
    loadTasks,
    completedTask,
    patchTask,
    deletingTask,
    postTask,
    onSubmitLogin,
    onSubmitRegistration,
    success,
  };
}
export default useTasksApi;
