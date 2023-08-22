import { useEffect } from "react";
import { useState, useRef } from "react";
import { useAuthContext } from "../../context/AuthContext";
import styles from "./MyProfile.module.css";
import { Button, TextButton } from "../../components/ui/Button";
import useDiary from "../../hooks/useDiary";
import useTodo from "../../hooks/useTodo";
import {
  groupedCompletedTodos,
  groupedTodosByDate,
} from "../../util/todoArray";

export default function MyProfile() {
  const {
    todoQuery: { data: todos },
  } = useTodo();
  const {
    diaryQuery: { data: diary },
  } = useDiary();
  const { displayName, authEmail, userImage } = useAuthContext();
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isAboutEdit, setIsAboutEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: null,
    about: "나의 다짐을 적어주세요",
  });
  const inputRef = useRef(null);
  const totalTodoCreationDays = todos && groupedTodosByDate(todos);
  const completedTodoCount =
    totalTodoCreationDays && groupedCompletedTodos(totalTodoCreationDays);

  useEffect(() => {
    if (isNameEdit || isAboutEdit) {
      inputRef.current.focus();
    }
  }, [isNameEdit, isAboutEdit]);

  useEffect(() => {
    setUserData(userData);
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleNameEdit = () => {
    setIsNameEdit(true);
  };

  const handleAboutEdit = () => {
    setIsAboutEdit(true);
  };

  const handleSave = () => {
    setIsNameEdit(false);
    setIsAboutEdit(false);
  };

  return (
    <section className={styles.section}>
      <div className={styles.form}>
        <img src={userImage} alt={displayName} className={styles.myImage} />
        <div className={styles.infoWrapper}>
          <div>
            {isNameEdit ? (
              <>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  value={userData.name ? userData.name : displayName}
                  ref={inputRef}
                  onChange={handleChange}
                />
                <TextButton text="저장" onClick={handleSave} />
              </>
            ) : (
              <>
                <span className={styles.textSpan}>
                  {userData.name ? userData.name : displayName}
                </span>
                <TextButton text="수정" onClick={handleNameEdit} />
              </>
            )}
          </div>
          <p>{authEmail}</p>
          <p>
            TODO(투두 완료일/총 투두 작성일):
            <span>
              {completedTodoCount && completedTodoCount}일/
              {totalTodoCreationDays && totalTodoCreationDays.length}일
            </span>
          </p>
          <p>
            PHOTO DIARY:<span>{diary && diary.length}개</span>
          </p>
          {isAboutEdit ? (
            <>
              <input
                className={styles.input}
                type="text"
                name="about"
                value={userData.about}
                ref={inputRef}
                onChange={handleChange}
              />
              <TextButton text="저장" onClick={handleSave} />
            </>
          ) : (
            <>
              <span className={styles.textSpan}>{userData.about}</span>
              <TextButton text="수정" onClick={handleAboutEdit} />
            </>
          )}
          <Button text="회원탈퇴" />
        </div>
      </div>
    </section>
  );
}
