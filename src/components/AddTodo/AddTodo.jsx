import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../../context/AuthContext";
import { useModalContext } from "../../context/ModalContext";
import useTodo from "../../hooks/useTodo";
import styles from "./AddTodo.module.css";
import LoginModal from "../login/LoginModal";

export default function AddTodo({ selectedDate }) {
  const { user } = useAuthContext();
  const { loginModalOpen, openModal } = useModalContext();
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
        placeholder="투두를 입력해주세요"
        value={text}
        onChange={handleText}
      ></input>
      {user ? (
        <button className={styles.button} type="submit">
          Add
        </button>
      ) : (
        <button className={styles.button} onClick={openModal}>
          Add
        </button>
      )}
      {loginModalOpen && <LoginModal />}
    </form>
  );
}
