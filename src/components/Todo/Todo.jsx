import { useEffect, useRef, useState } from "react";
import useTodo from "../../hooks/useTodo";
import styles from "./Todo.module.css";

export default function Todo({ todo, todo: { id, text, status } }) {
  const { addUpdateItem, removeItem } = useTodo();
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEdit) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  useEffect(() => {
    setEditText(text);
  }, [text]);

  const handleChecked = (e) => {
    const status = e.target.checked ? "Completed" : "Active";
    addUpdateItem.mutate({ ...todo, status });
  };
  const handleDelete = () => {
    removeItem.mutate(id);
  };
  const handelEdit = () => {
    setIsEdit(true);
  };
  const handleEditText = (e) => {
    setEditText(e.target.value);
  };
  const handleSave = () => {
    addUpdateItem.mutate({ ...todo, text: editText });
    setIsEdit(false);
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
      {isEdit ? (
        <input
          className={styles.edit}
          type="text"
          id={id}
          value={editText}
          onChange={handleEditText}
          ref={inputRef}
        />
      ) : (
        <label className={styles.label} htmlFor={id}>
          {text}
        </label>
      )}
      <div>
        {isEdit ? (
          <button className={styles.button} onClick={handleSave}>
            저장
          </button>
        ) : (
          <button className={styles.button} onClick={handelEdit}>
            수정
          </button>
        )}
        <button className={styles.button} onClick={handleDelete}>
          삭제
        </button>
      </div>
    </li>
  );
}
