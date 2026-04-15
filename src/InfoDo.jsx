import { useSelector } from "react-redux";
const InfoDo = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  return (
    <div className="notDone">
      <p>Осталось дел {tasks.filter((item) => !item.isCompleted).length}</p>
      <button
        onClick={() =>
          //clearDone()
          {}
        }
      >
        Очистить выполненные
      </button>
      <button
        onClick={() => {
          //setNewUp(true);
        }}
      >
        Новые сверху
      </button>
      <button
        onClick={() => {
          // setNewUp(false);
        }}
      >
        Новые снизу
      </button>
    </div>
  );
};
export default InfoDo;
