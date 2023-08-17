import useTodo from "../../hooks/useTodo";
import styles from "./FilterNav.module.css";

export default function FilterNav({
  filters,
  filter,
  setFilter,
  selectedDate,
}) {
  const {
    todoQuery: { isLoading, data: todos },
  } = useTodo();

  const seletedDateTodo =
    todos && todos.filter((todo) => todo.date === selectedDate);
  const completedTodo =
    todos &&
    todos.filter(
      (todo) => todo.status === "Completed" && todo.date === selectedDate
    );

  if (isLoading) return <p>Loading...</p>;
  return (
    <nav className={styles.nav}>
      <ul className={styles.filters}>
        {filters &&
          filters.map((item, index) => {
            return (
              <li key={index}>
                <button
                  className={`${styles.filter} ${
                    filter === item && styles.selected
                  }`}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              </li>
            );
          })}
      </ul>
      <p className={styles.todo}>
        {todos && `${completedTodo.length} / ${seletedDateTodo.length}`}
      </p>
    </nav>
  );
}
