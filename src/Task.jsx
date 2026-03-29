import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { input, edit } from "./redux/actions/inputTask";
import { saving, click, deleting } from "./redux/actions/text";
import withLogger from "./withLogger";

const Task = ({ task, dispatch }) => {
  const inputTask = useSelector((state) => state.inputTask.input);

  const [isEdit, setIsEdit] = useState(false);
  const focusInput = useRef(null);
  const save = () => {
    if (inputTask.length != 0) {
      setIsEdit(false);
      dispatch(saving(task.id, inputTask));
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
          onChange={(e) => dispatch(input(e.target.value))}
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
            dispatch(edit(task.text));
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
