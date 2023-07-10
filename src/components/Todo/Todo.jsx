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
    <li>
      <input
        type="checkbox"
        id={id}
        checked={status === "Completed"}
        onChange={handleChecked}
      />
      <label htmlFor={id}>{text}</label>
      <button onClick={handleDelete}>delete</button>
    </li>
  );
}
