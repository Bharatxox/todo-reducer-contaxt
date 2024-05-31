import React from "react";
import { useState } from "react";
import TodoList from "../components/TodoList";
import { MyContext } from "../context/MyContext";
import { useContext } from "react";
import { TODO_TYPES } from "../context";

const Todo = () => {
  const { dispatch } = useContext(MyContext);

  const [todo, settodo] = useState("");

  const handleInput = (e) => {
    settodo(e.target.value);
  };

  const handleClick = () => {
    if (todo === "") alert("please entre the details");
    dispatch({ type: TODO_TYPES.ADD_TODO, payload: todo });
    settodo("");
  };

  return (
    <>
      <section className="w-screen h-screen relative flex justify-center items-center">
        <div className="p-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="flex flex-col gap-5 bg-gray-800 back rounded-md p-10">
            <h1 className="font font-sans font-bold text-center">
              Grocery Bag
            </h1>
            <div className="flex gap-2">
              <input
                className="pl-4 rounded-md"
                type="text"
                placeholder="search"
                value={todo}
                onChange={handleInput}
              />
              <button onClick={handleClick}>Add Task</button>
            </div>{" "}
            Corrected closing tag
            <ul className="w-full flex flex-col justify-center items-center">
              <TodoList />
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Todo;
