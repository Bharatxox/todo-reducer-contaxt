import { useContext, useState } from "react";
import { MyContext } from "../context/MyContext";
import { TODO_TYPES } from "../context";

const TodoList = () => {
  const { state, dispatch } = useContext(MyContext);

  const [search, setSearch] = useState("");
  // const [updateBtn, setUpdateBtn] = useState(null);
  const [updateVal, setUpdateVal] = useState("");

  const DeleteItem = (id) => {
    dispatch({ type: TODO_TYPES.REMOVE_TODO, payload: id });
  };
  const UpdateTodo = (id, task) => {
    dispatch({ type: TODO_TYPES.UPDATE_TODO_INPUT, payload: id });
    setUpdateVal(task);
    // if (updateBtn === id) {
    //   setUpdateBtn(null); // Cancel update mode
    //   setUpdateVal(""); // Clear the update value
    // } else {
    //   setUpdateBtn(id); // Enter update mode
    //   setUpdateVal(task); // Set the initial value for the input field
    // }
  };

  // const finishUpdate = (e) => {
  //   setUpdateBtn(null);
  //   // setUpdateVal(e.target.value);
  // };

  const toggleCheckBox = (id) => {
    dispatch({ type: TODO_TYPES.MARK_AS_COMPLETED, payload: id });
  };

  const handleSearchBar = (e) => {
    setSearch(e.target.value);
  };

  const updateChange = (id, e) => {
    setUpdateVal(e.target.value);
    console.log(updateVal);
    dispatch({
      type: TODO_TYPES.UPDATE_TODO,
      payload: { id, value: e.target.value },
    });
  };

  const filterState = state.filter(
    (todo) => todo && todo.task.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div>
        <input
          type="text"
          className=""
          value={search}
          onChange={handleSearchBar}
        />
      </div>
      {search && filterState.length === 0 ? (
        <div>No resultant data inside the list</div>
      ) : (
        filterState.map((todo) => (
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
              {/* {todo.task} */}
              {todo.isUpdated ? (
                <input
                  type="text"
                  value={todo.task}
                  onChange={(e) => updateChange(todo.id, e)}
                  onBlur={(e) => UpdateTodo(todo.id, e)} // Finish update when input loses focus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      UpdateTodo(todo.id, e); // Finish update when Enter key is pressed
                    }
                  }}
                />
              ) : (
                <span
                  onDoubleClick={() =>
                    UpdateTodo(todo.id, todo.task, todo.isUpdated)
                  }
                  className="cursor-pointer"
                >
                  {todo.task}
                </span>
              )}
            </span>
            <button onClick={() => DeleteItem(todo.id)}>Delete</button>
            <button onClick={() => UpdateTodo(todo.id, todo.task)}>
              {todo.isUpdated ? "Done" : "Update"}
            </button>
          </li>
        ))
      )}
    </div>
  );
};

export default TodoList;
