import { useState, useEffect, useRef } from "react";
import { deleteTask, completedTask } from "./redux/slices/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { patchTask } from "./redux/slices/tasksSlice";
const Task = ({ task }) => {
  const [isEdit, setIsEdit] = useState(false);
  const focusInput = useRef(null);

  const [editText, setEditText] = useState(task.title);

  const dispatch = useDispatch();
  const loadingCompleted = useSelector((state) => state.tasks.loadingCompleted);
  const loadingDelete = useSelector((state) => state.tasks.loadingDelete);
  const loadingPatch = useSelector((state) => state.tasks.loadingPatch);

  const save = async () => {
    if (editText.length != 0) {
      console.log(editText);

      dispatch(patchTask({ data: editText, id: task.id }));
      //  await editTask(task.id, editText);
      setIsEdit(false);
    }
  };
  const back = () => {
    setEditText(task.title);
    setIsEdit(false);
  };
  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
        save();
        break;
      case "Escape":
        back();
        break;
    }
  };
  useEffect(() => {
    if (focusInput.current) {
      focusInput.current.focus();
    }
  }, [isEdit]);
  return (
    <div className="task">
      <input
        type="checkbox"
        checked={task.isCompleted}
        value={task.isCompleted}
        onChange={() => dispatch(completedTask(task.id))}
      />
      {isEdit ? (
        <input
          type="text"
          value={editText}
          ref={focusInput}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : loadingPatch == task.id ? (
        <div className="spinner"></div>
      ) : (
        <p style={task.isCompleted ? { textDecoration: "line-through" } : {}}>
          {task.title}
        </p>
      )}
      {!isEdit && (
        <button
          onClick={() => {
            setIsEdit((oldEdit) => !oldEdit);
          }}
        >
          edit
        </button>
      )}
      {isEdit && (
        <>
          <button onClick={save} disabled={loadingCompleted}>
            Сохранить
          </button>
          <button onClick={back} disabled={loadingCompleted}>
            Отмена
          </button>
        </>
      )}

      <button
        onClick={() => {
          dispatch(deleteTask(task.id));
        }}
        disabled={loadingDelete == task.id}
      >
        X
      </button>
      {loadingDelete == task.id && <div className="spinner"></div>}
    </div>
  );
};
export default Task;
