import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AddTodo({ handleAdd }) {
  const [text, setText] = useState("");
  const handleText = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length === 0) return;
    handleAdd({ id: uuidv4(), text, status: "Active" });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add Todo"
        value={text}
        onChange={handleText}
      ></input>
      <button type="submit">Add</button>
    </form>
  );
}
