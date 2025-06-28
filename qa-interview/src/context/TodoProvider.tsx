import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import type { Todo, TodoContextType } from "../types/todo";

// Create the context
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Action types
type TodoAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: string }
  | { type: "REMOVE_TODO"; payload: string };

// Reducer function
const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          text: action.payload,
          completed: false,
        },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

// Provider component
export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, dispatch] = useReducer(todoReducer, [], () => {
    // Initialize from localStorage if available
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Save to localStorage whenever todos change
  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    if (text.trim()) {
      dispatch({ type: "ADD_TODO", payload: text });
    }
  }, []);

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  }, []);

  const removeTodo = useCallback((id: string) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  }, []);

  const value = {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// Custom hook to use the todo context
export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
