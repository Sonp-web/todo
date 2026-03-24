import { useState, useEffect, useRef } from "react";
const Task = ({ task, deleteTask, editTask, doneTask, loadingUpdate }) => {
  const [isEdit, setIsEdit] = useState(false);
  const focusInput = useRef(null);
  const [editText, setEditText] = useState(task.title);
  const save = async () => {
    if (editText.length != 0) {
      await editTask(task.id, editText);
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
        onChange={() => doneTask(task.id)}
        disabled={loadingUpdate}
      />
      {isEdit ? (
        <input
          type="text"
          value={editText}
          ref={focusInput}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
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
          <button onClick={save} disabled={loadingUpdate}>
            Сохранить
          </button>
          <button onClick={back} disabled={loadingUpdate}>
            Отмена
          </button>
        </>
      )}

      <button onClick={() => deleteTask(task.id)} disabled={loadingUpdate}>
        X
      </button>
      {loadingUpdate && <div className="spinner"></div>}
    </div>
  );
};
export default Task;
