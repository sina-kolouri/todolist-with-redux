import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { nanoid } from "nanoid";
import "./Header.css";
const Header = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleOnKeyDown(e) {
    const trimmedText = text.trim();
    if (e.which === 13 && trimmedText) {
      dispatch({
        type: "todos/todoAdded",
        payload: {
          id: nanoid(),
          text: trimmedText,
          compeleted: false,
        },
      });
      setText("");
    }
  }

  return (
    <>
      <div className="container-navbar mb-5">
        <span className="navbar-title h3">Todo list with Redux</span>
      </div>

      <div className="container-input m-3">
        <input
          type={text}
          value={text}
          className="form-control"
          id="exampleFormControlInput"
          placeholder="What needs to be done?"
          onChange={handleChange}
          onKeyDown={handleOnKeyDown}
        />
      </div>
    </>
  );
};

export default Header;
