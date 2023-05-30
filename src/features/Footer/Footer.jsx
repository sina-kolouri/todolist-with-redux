import React from "react";
import "./Footer.css";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const Footer = () => {
  // Actions

  function handleMarkAll() {
    dispatch({
      type: "todos/todoMarkAll",
    });
  }

  function handleClear() {
    dispatch({
      type: "todos/todoClear",
    });
  }

  // remaining
  const selectTodoEntities = (state) => state.todos.entities;
  const selectTodos = createSelector(selectTodoEntities, (todoEntities) =>
    Object.values(todoEntities)
  );

  const count = useSelector((state) => {
    const todos = selectTodos(state).filter((todo) => !todo.completed);
    return todos.length;
  });

  // status
  const dispatch = useDispatch();
  function handleStatus(status) {
    dispatch({
      type: "filters/status",
      payload: status,
    });
  }
  const statusState = useSelector((state) => state.filters.status);
  const statusData = ["All", "Active", "Completed"];
  const statusRendered = statusData.map((status) => {
    const isChecked = statusState === status ? true : false;
    return (
      <div className="form-check " key={status}>
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id={nanoid()}
          checked={isChecked}
          onChange={() => handleStatus(status)}
        />
        <label className="form-check-label">{status}</label>
      </div>
    );
  });

  // color
  function handleColors(color, changeType) {
    dispatch({
      type: "filters/colors",
      payload: {
        changeType,
        color,
      },
    });
  }
  const colorState = useSelector((state) => state.filters.colors);
  const availableColors = ["green", "red", "orange", "blue", "purple"];
  const renderedColors = availableColors.map((color) => {
    const isChecked = colorState.includes(color);
    const changeType = isChecked ? "remove" : "add";
    return (
      <div className="form-check" key={color}>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id={nanoid()}
          checked={isChecked}
          onChange={() => handleColors(color, changeType)}
        />
        <label className="form-check-label" htmlFor="flexCheckChecked1">
          <span className={color}></span> {color}
        </label>
      </div>
    );
  });

  return (
    <>
      <hr className="mt-5" />
      <div className="container">
        <div className="container-functions text-center">
          <h4>Actions</h4>

          <div className="container-button1">
            <button
              type="button"
              className="btn btn-secondary btn-sm my-1"
              onClick={handleMarkAll}
            >
              Mark All Completed
            </button>
          </div>

          <div className="container-button2">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleClear}
            >
              Clear Completed
            </button>
          </div>
        </div>

        <div>
          <h4>Remaining Todos</h4>
          <div className="text-center">
            <span>{count} item left</span>
          </div>
        </div>

        <div className="container-status">
          <h4>Filter by status</h4>
          {statusRendered}
        </div>

        <div className="container-color">
          <h4>Filter by color</h4>
          {renderedColors}
        </div>
      </div>
    </>
  );
};

export default Footer;