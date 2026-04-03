import { useSelector } from "react-redux";
import { clearDone, newUp, newDown } from "./redux/slices/textSlice";
import withLogger from "./withLogger";
const InfoDo = ({ dispatch }) => {
  const tasks = useSelector((state) => state.text.tasks);
  return (
    <div className="notDone">
      <p>Осталось дел {tasks.filter((item) => !item.isDone).length}</p>
      <button onClick={() => dispatch(clearDone())}>
        Очистить выполненные
      </button>
      <button
        onClick={() => {
          dispatch(newUp());
        }}
      >
        Новые сверху
      </button>
      <button
        onClick={() => {
          dispatch(newDown());
        }}
      >
        Новые снизу
      </button>
    </div>
  );
};
const InfoDoWithLog = withLogger(InfoDo);
export default InfoDoWithLog;
