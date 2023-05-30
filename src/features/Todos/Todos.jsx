import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Todos.css";

const availableColors = ["green", "red", "orange", "blue", "purple"];
const colorOptionRendered = availableColors.map((color) => {
  return (
    <option className={color} value={color}>
      {color}
    </option>
  );
});

const Todos = () => {
  const selectTodos = (state) => state.todos.entities;

  const filteredTodos = (state) => {
    const todos = Object.values(selectTodos(state));

    const { status, colors } = state.filters;
    const showAll = status === "All";
    

    if (showAll && colors.length === 0) {
      return todos;
    }
const showCompleted = status === "Completed";
    return todos.filter((todo) => {
      const statusFilter = showAll || (todo.completed === showCompleted);
      const colorFilter = colors.length === 0 || colors.includes(todo.color);
      return statusFilter && colorFilter;
    });
  };
  const todosData = useSelector(filteredTodos);

  const dispatch = useDispatch();

  function handleToggled(id) {
    dispatch({
      type: "todos/todoToggled",
      payload: id,
    });
  }

  function handleDelete(id) {
    dispatch({
      type: "todos/todoDeleted",
      payload: id,
    });
  }

  function handleColors(e, id) {
    const colorClicked = e.target.value;
    dispatch({
      type: "todos/todoColors",
      payload: { colorClicked, id },
    });
  }

  const todosRendered = todosData
    ? todosData.map((todo) => {
        return (
          <>
            <li key={todo.id} className="list-group-item mb-1">
              <div className="left">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id={todo.id}
                    checked={todo.completed}
                    onChange={() => handleToggled(todo.id)}
                  />
                </div>
                {todo.text}
              </div>
              <div className="right">
                <select
                  className="form-select form-select-sm"
                  defaultValue={todo.color}
                  onChange={(e) => handleColors(e, todo.id)}
                >
                  <option selected>choice color</option>
                  {colorOptionRendered}
                </select>

                <button
                  type="button"
                  className="btn-close ms-2"
                  onClick={() => handleDelete(todo.id)}
                ></button>
              </div>
            </li>
          </>
        );
      })
    : null;

  return <ul className="list-group list-group-flush mx-3">{todosRendered}</ul>;
};

export default Todos;
