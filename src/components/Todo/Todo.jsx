import styles from "./Todo.module.css";

export default function Todo({ todo, onUpdate, onDelete }) {
  const { id, text, status } = todo;
  const handleChecked = (e) => {
    const status = e.target.checked ? "Completed" : "Active";
    onUpdate({ ...todo, status });
  };
  const handleDelete = () => {
    onDelete(todo);
  };

  return (
    <li className={styles.li}>
      <input
        className={styles.input}
        type="checkbox"
        id={id}
        checked={status === "Completed"}
        onChange={handleChecked}
      />
      <label className={styles.label} htmlFor={id}>
        {text}
      </label>
      <div>
        <button onClick={handleDelete}>수정</button>
        <button onClick={handleDelete}>삭제</button>
      </div>
    </li>
  );
}
