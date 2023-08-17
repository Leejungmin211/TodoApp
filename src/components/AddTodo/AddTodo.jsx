import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useTodo from "../../hooks/useTodo";
import styles from "./AddTodo.module.css";

export default function AddTodo({ selectedDate }) {
  const { addUpdateItem } = useTodo();
  const [text, setText] = useState("");

  const handleText = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length === 0) return;
    addUpdateItem.mutate({
      id: uuidv4(),
      text,
      status: "Active",
      date: selectedDate,
    });
    setText("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Add Todo"
        value={text}
        onChange={handleText}
      ></input>
      <button className={styles.button} type="submit">
        Add
      </button>
    </form>
  );
}
