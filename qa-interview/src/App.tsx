import React from "react";
import { TodoProvider } from "./context/TodoProvider";
import { TodoList } from "./components/TodoList";
import { Input } from "./components/Input";
import { useTodos } from "./context/TodoProvider";
import "./App.css";

const TodoApp: React.FC = () => {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();

  return (
    <div className="app">
      <div className="todo-container">
        <h1>Todo List</h1>
        <Input
          onSubmit={addTodo}
          placeholder="What needs to be done?"
          className="todo-input"
        />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onRemove={removeTodo}
          className="todo-list"
        />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};

export default App;
