import { useState, useRef, useEffect } from "react";

import { useSelector } from "react-redux";
import { adding } from "./redux/actions/text";
import { input, clear } from "./redux/actions/input";
import withLogger from "./withLogger";

const Input = ({ dispatch }) => {
  const inputRedux = useSelector((state) => state.input.input);

  const [isNull, setIsNull] = useState(false);
  const mainInput = useRef(null);
  const add = () => {
    if (inputRedux.trim().length == 0) {
      setIsNull(true);
    } else {
      dispatch(adding(inputRedux));
      dispatch(clear());
      setIsNull(false);
    }
  };
  const handleClick = (e) => {
    switch (e.key) {
      case "Enter":
        if (inputRedux.trim().length == 0) {
          setIsNull(true);
        } else {
          dispatch(adding(inputRedux));
          dispatch(clear());
          setIsNull(false);
        }
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
          type="text"
          value={inputRedux}
          ref={mainInput}
          placeholder="Введите текст задачи..."
          onChange={(e) => {
            dispatch(input(e.target.value));
          }}
          onKeyDown={handleClick}
        />
        {isNull && <p>Нельзя добавить пустую строку</p>}
      </div>
      <button onClick={add}>Добавить</button>
    </div>
  );
};
const InputWithLog = withLogger(Input);
export default InputWithLog;
