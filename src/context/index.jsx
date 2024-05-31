import React from "react";
import { v4 as uuidv4 } from "uuid";
import { MyContext } from "./MyContext";
import { useReducer } from "react";

const initialState = [
  {
    id: uuidv4(),
    task: "task",
    isCompleted: false,
  },
];

export const TODO_TYPES = {
  ADD_TODO: "ADD_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  MARK_AS_COMPLETED: "MARK_AS_COMPLETED",
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case TODO_TYPES.ADD_TODO:
      return [
        ...state,
        { task: action.payload, id: uuidv4(), isCompleted: false },
      ];

    case TODO_TYPES.REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.payload);

    case TODO_TYPES.MARK_AS_COMPLETED:
      // return;
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );

    default:
      return state;
  }
};

export const MyContextProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  return (
    <MyContext.Provider value={{ todos, dispatch }}>
      {todos && children}
    </MyContext.Provider>
  );
};
