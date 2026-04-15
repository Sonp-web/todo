import "./App.css";
import Header from "./Header";
import Input from "./Input";
import Filter from "./Filter";
import InfoDo from "./InfoDo";
import AppRoutes from "./AppRoutes";
import { setTokenF } from "./redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import { getTasks } from "./redux/slices/tasksSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(setTokenF(localStorage.getItem("token")));
    }
    dispatch(getTasks());
  }, []);
  const tokenF = useSelector((state) => state.auth.token);

  useEffect(() => {
    // loadTasks();
  }, [tokenF]);

  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          <Header />
          <Input />
          <AppRoutes />
          <Filter />
          <InfoDo />
        </>
      ) : (
        <>
          <Registration></Registration>
          <Login></Login>
        </>
      )}
    </>
  );
}

export default App;
