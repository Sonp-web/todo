import { useState, useRef, useEffect } from "react";
import { postTask } from "./redux/slices/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
const Input = () => {
  const [text, setText] = useState("");
  const [isNull, setIsNull] = useState(false);
  const mainInput = useRef(null);

  const dispatch = useDispatch();
  const loadingPost = useSelector((state) => state.tasks.loadingPost);

  const add = async () => {
    if (text.trim().length == 0) {
      setIsNull(true);
    } else {
      dispatch(postTask({ title: text }));
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
      <button onClick={add} disabled={loadingPost}>
        Добавить
      </button>
      {loadingPost && <div className="spinner"></div>}
    </div>
  );
};
export default Input;
