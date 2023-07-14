import { useState } from "react";
import FilterNav from "../components/Nav/FilterNav";
import TodoList from "../components/TodoList/TodoList";

export default function TodoPage() {
  const filters = ["All", "Active", "Completed"];
  const [todos, setTodos] = useState(readTodo);
  const [filter, setFilter] = useState(filters[0]);

  return (
    <>
      <FilterNav
        filters={filters}
        todos={todos}
        filter={filter}
        setFilter={setFilter}
      />
      <TodoList filter={filter} todos={todos} setTodos={setTodos} />
    </>
  );
}

function readTodo() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}
