import useTodo from "../../hooks/useTodo";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from "./TodoList.module.css";
import ClipBoard from "../../images/clipboard.png";
import Loading from "../ui/Loading";

export default function TodoList({ filter, selectedDate, todayDate }) {
  const {
    todoQuery: { isLoading, data: todos },
  } = useTodo();

  if (isLoading)
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );

  const filtered =
    !isLoading && filter && getFilterList(todos, filter, selectedDate);
  return (
    <section className={styles.wrapper}>
      {selectedDate && <p className={styles.day}>{selectedDate}</p>}
      <ul className={styles.ul}>
        {filtered && filtered.length !== 0 ? (
          filtered.map((item) => {
            return <Todo key={item.id} todo={item} />;
          })
        ) : (
          <div className={styles.imgWrapper}>
            <img src={ClipBoard} alt="No todos" className={styles.image} />
            <p className={styles.noTodo}>
              오늘의 할 일이 없어요. 새로운 계획을 작성해보세요.
            </p>
          </div>
        )}
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
