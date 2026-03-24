import { useState, useRef, useEffect } from "react";
const Input = ({ setTasks, sortingTasks,postTask, loadingAdd}) => {
  const [text, setText] = useState("");
  const [isNull, setIsNull] = useState(false);
  const mainInput = useRef(null);

  const add = async () => {
    if (text.trim().length == 0) {
      setIsNull(true);
    } else {
      const id = await postTask({ title: text });
      setTasks((oldTasks) => [
        ...oldTasks,
        {
          id,
          title: text,
          isCompleted: false,
        },
      ]);
      sortingTasks();
      setText("");
    }
  };
  const handleClick = (e) => {
    switch (e.key) {
      case "Enter":
        add();
        break;
      case "Escape":
        mainInput.current.blur();
        break;
    }
  };
  useEffect(() => {
    if (mainInput.current) {
      mainInput.current.focus();
    }
  });
  return (
    <div className="input">
      <div>
        <input
          value={text}
          type="text"
          ref={mainInput}
          placeholder="Введите текст задачи..."
          onChange={(e) => {
            setText(e.target.value);
            setIsNull(false);
          }}
          onKeyDown={handleClick}
        />
        {isNull && <p>Нельзя добавить пустую строку</p>}
      </div>
      <button onClick={add} disabled={loadingAdd}>
        Добавить
      </button>
      {loadingAdd && <div className="spinner"></div>}
    </div>
  );
};
export default Input;
