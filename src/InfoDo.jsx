import { useSelector, useDispatch } from "react-redux";
import { deleteTask, setNewUp } from "./redux/slices/tasksSlice";
const InfoDo = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const clearDone = () => {
    tasks.filter((item) => {
      if (item.isCompleted) {
        dispatch(deleteTask(item.id));
        return true;
      }
    });
  };

  return (
    <div className="notDone">
      <p>Осталось дел {tasks.filter((item) => !item.isCompleted).length}</p>
      <button onClick={() => clearDone()}>Очистить выполненные</button>
      <button
        onClick={() => {
          dispatch(setNewUp(true));
        }}
      >
        Новые сверху
      </button>
      <button
        onClick={() => {
          dispatch(setNewUp(false));
        }}
      >
        Новые снизу
      </button>
    </div>
  );
};
export default InfoDo;
