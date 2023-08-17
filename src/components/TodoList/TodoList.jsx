import useTodo from "../../hooks/useTodo";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from "./TodoList.module.css";

export default function TodoList({ filter, selectedDate, todayDate }) {
  const {
    todoQuery: { isLoading, data: todos },
  } = useTodo();

  if (isLoading) return <p>Loading...</p>;

  const filtered =
    !isLoading && filter && getFilterList(todos, filter, selectedDate);
  return (
    <section className={styles.wrapper}>
      {selectedDate && <p className={styles.day}>{selectedDate}</p>}
      <ul className={styles.ul}>
        {filtered &&
          filtered.map((item) => {
            return <Todo key={item.id} todo={item} />;
          })}
      </ul>
      <AddTodo selectedDate={selectedDate} />
    </section>
  );
}

function getFilterList(todos, filter, selectedDate) {
  if (!filter || !selectedDate || !todos) {
    return [];
  }

  if (filter && filter === "All") {
    return todos.filter((todo) => todo.date === selectedDate);
  }
  return todos.filter(
    (todo) => todo.status === filter && todo.date === selectedDate
  );
}
