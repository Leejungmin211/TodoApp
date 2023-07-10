import { useEffect, useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from "./TodoList.module.css";

export default function TodoList({ filter }) {
  const [todos, setTodos] = useState(readTodo);

  const handleAdd = (todo) => {
    setTodos([...todos, todo]);
  };
  const handleUpdate = (todo) => {
    setTodos(todos.map((item) => (item.id === todo.id ? todo : item)));
  };
  const handleDelete = (todo) => {
    setTodos(todos.filter((item) => item.id !== todo.id));
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filtered = getFilterList(todos, filter);
  return (
    <section className={styles.wrapper}>
      <ul>
        {filtered.map((item) => {
          return (
            <Todo
              key={item.id}
              todo={item}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          );
        })}
      </ul>
      <AddTodo handleAdd={handleAdd} />
    </section>
  );
}

function readTodo() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}
function getFilterList(todos, filter) {
  if (filter === "All") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}
