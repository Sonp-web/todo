import { NavLink } from "react-router-dom";
const Filter = () => {
  return (
    <div className="buttons">
      <NavLink to="/">Все</NavLink>
      <NavLink to="/active">Активные</NavLink>
      <NavLink to="/done">Завершенные</NavLink>
    </div>
  );
};
export default Filter;
