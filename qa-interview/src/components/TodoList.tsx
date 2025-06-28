import React from "react";
import type { Todo } from "../types/todo";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  className?: string;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onRemove,
  className = "",
}) => {
  if (todos.length === 0) {
    return <div className={className}>No todos yet</div>;
  }

  return (
    <div className={className}>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`todo-item ${todo.completed ? "completed" : ""}`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="todo-checkbox"
          />
          <span className="todo-text">{todo.text}</span>
          <button onClick={() => onRemove(todo.id)} className="remove-button">
            ×
          </button>
        </div>
      ))}
    </div>
  );
};
