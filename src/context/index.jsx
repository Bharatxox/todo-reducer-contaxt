import React from "react";
import { v4 as uuidv4 } from "uuid";
import { MyContext } from "./MyContext";
import { useReducer } from "react";

const initialState = [
  // {
  //   id: uuidv4(),
  //   task: "task",
  //   isCompleted: false,
  // },
];

export const TODO_TYPES = {
  ADD_TODO: "ADD_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  MARK_AS_COMPLETED: "MARK_AS_COMPLETED",
  // SEARCH_TODO: "SEARCH_TODO",
  UPDATE_TODO: "UPDATE_TODO",
  UPDATE_TODO_INPUT: "UPDATE_TODO_INPUT",
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case TODO_TYPES.ADD_TODO:
      return [
        ...state,
        {
          task: action.payload,
          id: uuidv4(),
          isCompleted: false,
          isUpdated: false,
          time: Date.now(),
        },
      ];

    case TODO_TYPES.UPDATE_TODO:
      return state.map((todo) => {
        return todo.id === action.payload.id
          ? { ...todo, task: action.payload.value }
          : todo;
      });

    case TODO_TYPES.REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.payload);

    // case TODO_TYPES.SEARCH_TODO:
    //   return state.filter((todo) => {
    //     todo.task.toLowerCase().includes(action.payload);
    //   });

    case TODO_TYPES.MARK_AS_COMPLETED:
      // return;
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );

    case TODO_TYPES.UPDATE_TODO_INPUT:
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, isUpdated: !todo.isUpdated }
          : todo
      );

    default:
      return state;
  }
};

export const MyContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  console.log(state);

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
};
