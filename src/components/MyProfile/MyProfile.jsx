import { useEffect } from "react";
import { useState, useRef } from "react";
import styles from "./MyProfile.module.css";

export function MyInput({ value, handleTextChange }) {
  const [newText, newSetText] = useState(value);
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEdit) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  useEffect(() => {
    newSetText(value);
  }, [value]);

  const handleClick = () => {
    setIsEdit(true);
  };

  const handleBlur = () => {
    setIsEdit(false);
    handleTextChange(newText);
  };

  const handleChage = (e) => {
    newSetText(e.target.value);
  };

  return (
    <div>
      {isEdit ? (
        <input
          className={styles.input}
          type="text"
          value={newText}
          ref={inputRef}
          onBlur={handleBlur}
          onChange={handleChage}
        />
      ) : (
        <span onClick={handleClick}>{newText}</span>
      )}
    </div>
  );
}

export default function MyProfile() {
  const [name, setName] = useState("이름을 입력해주세요");
  const [about, setAbout] = useState("나에 대해 소개해주세요");

  return (
    <section className={styles.section}>
      <MyInput
        type="text"
        value={name}
        handleTextChange={(value) => setName(value)}
      />
      <MyInput
        type="text"
        value={about}
        handleTextChange={(value) => setAbout(value)}
      />
    </section>
  );
}
