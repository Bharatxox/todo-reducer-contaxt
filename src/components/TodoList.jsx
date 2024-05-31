import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { TODO_TYPES } from "../context";

const TodoList = () => {
  const { todos, dispatch } = useContext(MyContext);

  const DeleteItem = (id) => {
    dispatch({ type: TODO_TYPES.REMOVE_TODO, payload: id });
  };

  const toggleCheckBox = (id) => {
    dispatch({ type: TODO_TYPES.MARK_AS_COMPLETED, payload: id });
  };
  return (
    <div>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex gap-5 items-center justify-between w-full py-2"
        >
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => toggleCheckBox(todo.id)}
            className="w-1/12"
          />
          <span
            style={{
              textDecoration: todo.isCompleted ? "line-through" : "none",
            }}
            className="w-10/12 capitalize"
          >
            {todo.task}
          </span>
          <button onClick={() => DeleteItem(todo.id)}>Delete</button>
        </li>
      ))}
    </div>
  );
};

export default TodoList;
