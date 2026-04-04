import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { changeTask, editTask } from "./redux/slices/inputTaskSlice";
import { saving, click, deleting } from "./redux/slices/textSlice";
import withLogger from "./withLogger";
import { selectInputTask } from "./redux/slices/inputTaskSlice";

const Task = ({ task, dispatch }) => {
  const inputTask = useSelector(selectInputTask);

  const [isEdit, setIsEdit] = useState(false);
  const focusInput = useRef(null);
  const save = () => {
    if (inputTask.length != 0) {
      setIsEdit(false);
      dispatch(saving({ id: task.id, inputTask }));
    }
  };
  const back = () => {
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
        checked={task.isDone}
        value={task.isDone}
        onChange={() => dispatch(click(task.id))}
      />
      {isEdit ? (
        <input
          type="text"
          value={inputTask}
          ref={focusInput}
          onChange={(e) => dispatch(changeTask(e.target.value))}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <p style={task.isDone ? { textDecoration: "line-through" } : {}}>
          {task.text}
        </p>
      )}
      {!isEdit && (
        <button
          onClick={() => {
            dispatch(editTask(task.text));
            setIsEdit((oldEdit) => !oldEdit);
          }}
        >
          edit
        </button>
      )}
      {isEdit && (
        <>
          <button onClick={save}>Сохранить</button>
          <button onClick={back}>Отмена</button>
        </>
      )}

      <button onClick={() => dispatch(deleting(task.id))}>X</button>
    </div>
  );
};
const TaskWithLog = withLogger(Task);
export default TaskWithLog;
