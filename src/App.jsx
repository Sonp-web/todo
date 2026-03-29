import "./App.css";
import Header from "./Header";
import InputWithLog from "./Input";
import Filter from "./Filter";
import InfoDoWithLog from "./InfoDo";
import AppRoutes from "./AppRoutes";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

function App() {
  return (
    <>
      <>
        <Header />
        <InputWithLog />
        <AppRoutes />
        <Filter />
        <InfoDoWithLog />
      </>
    </>
  );
}

export default App;
