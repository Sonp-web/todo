import { useState } from "react";
import { useSelector } from "react-redux";
function useTasksApi() {
  const tokenF = useSelector((state) => state.auth.token);

  const apiUrl = import.meta.env.VITE_API_URL;
  const apiUrlReg = import.meta.env.VITE_API_URL_REG;

  const [tasks, setTasks] = useState([]);

  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(null);
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingRegistration, setLoadingRegistration] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [success, setSuccess] = useState("");

  // const loadTasks = async () => {
  //   setLoadingGet(true);
  //   console.log(tokenF);
  //   if (!tokenF) {
  //     return;
  //   }
  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${tokenF}`,
  //       },
  //     });
  //     if (!response.ok) throw new Error("Ошибка создания");
  //     const result = await response.json();
  //     console.log(result);

  //     setTasks(result);
  //   } catch (error) {
  //     console.log(error.message);
  //   } finally {
  //     setLoadingGet(false);
  //   }
  // };

  // const completedTask = async (id) => {
  //   try {
  //     const response = await fetch(`${apiUrl}/${id}/isCompleted`, {
  //       method: "PATCH",
  //       headers: {
  //         Authorization: `Bearer ${tokenF}`,
  //       },
  //     });
  //     if (!response.ok) throw new Error("Ошибка создания");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const patchTask = async (data, id) => {
  //   setLoadingUpdate(id);
  //   try {
  //     const response = await fetch(`${apiUrl}/${id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${tokenF}`,
  //       },
  //       body: JSON.stringify({ title: data }),
  //     });

  //     if (!response.ok) throw new Error("Ошибка создания");
  //     setLoadingUpdate(null);
  //   } catch (error) {
  //     console.log(error.message);
  //     setLoadingUpdate(null);
  //   }
  // };

  // const deletingTask = async (id) => {
  //   try {
  //     const response = await fetch(`${apiUrl}/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${tokenF}`,
  //       },
  //     });
  //     if (!response.ok) throw new Error("Ошибка создания");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const postTask = async (task) => {
  //   setLoadingAdd(true);
  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${tokenF}`,
  //       },
  //       body: JSON.stringify(task),
  //     });
  //     if (!response.ok) throw new Error("Ошибка создания");
  //     const result = await response.json();
  //     return result.id;
  //   } catch (error) {
  //     console.log(error.message);
  //   } finally {
  //     setLoadingAdd(false);
  //   }
  // };

  // const onSubmitLogin = async (data, setError) => {
  //   setLoadingLogin(true);
  //   try {
  //     const response = await fetch(`${apiUrlReg}/auth/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     const result = await response.json();
  //     if (!response.ok) {
  //       setError("root", {
  //         type: "manual",
  //         message: result.message || "Ошибка регистрации",
  //       });

  //       return;
  //     }

  //     // setToken(result.token);
  //   } catch (error) {
  //     setError("root", {
  //       type: "manual",
  //       message: error.message || "Ошибка регистрации",
  //     });
  //   } finally {
  //     setLoadingLogin(false);
  //   }
  // };
  // const onSubmitRegistration = async (data, setError, reset) => {
  //   setLoadingRegistration(true);
  //   try {
  //     const response = await fetch(`${apiUrlReg}/users/register`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     const result = await response.json();
  //     if (!response.ok) {
  //       setError("root", {
  //         type: "manual",
  //         message: result.message || "Ошибка регистрации",
  //       });
  //       return;
  //     } else {
  //       reset();
  //       setSuccess("Регистрация прошла успешно");
  //       setTimeout(() => setSuccess(""), 5000);
  //     }
  //   } catch (error) {
  //     setError("root", {
  //       type: "manual",
  //       message: error.message || "Ошибка регистрации",
  //     });
  //   } finally {
  //     setLoadingRegistration(false);
  //   }
  // };
  return {
    tasks,
    setTasks,
    // token,
    // setToken,
    setLoadingAdd,
    loadingAdd,
    loadingUpdate,
    loadingGet,
    loadingRegistration,
    setLoadingRegistration,
    loadingLogin,
    setLoadingLogin,
    //loadTasks,
    //completedTask,
    patchTask,
    //deletingTask,
    // postTask,
    //onSubmitLogin,
    //onSubmitRegistration,
    success,
  };
}
export default useTasksApi;
