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
import useUser from "../../hooks/useUser";
import { useModalContext, ModalTypes } from "../../context/ModalContext";
import ConfirmModal from "../Modal/ConfirmModal";

export default function MyProfile() {
  const {
    todoQuery: { data: todos },
  } = useTodo();

  const {
    diaryQuery: { data: diary },
  } = useDiary();

  const {
    userQuery: { data: user },
    addUpdatedUserData,
  } = useUser();
  const { displayName, authEmail, userImage } = useAuthContext();
  const { modalState, openModal } = useModalContext();
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isEmailEdit, setIsEmailEdit] = useState(false);
  const [isAboutEdit, setIsAboutEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user ? user.name : displayName,
    about: user ? user.about : "나의 다짐을 적어주세요",
  });
  const totalTodoCreationDays = todos && groupedTodosByDate(todos);
  const completedTodoCount =
    totalTodoCreationDays && groupedCompletedTodos(totalTodoCreationDays);
  const completedTodoPercent =
    completedTodoCount &&
    totalTodoCreationDays &&
    Math.floor((completedTodoCount / totalTodoCreationDays.length) * 100);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isNameEdit || isAboutEdit || isEmailEdit) {
      inputRef.current.focus();
    }
  }, [isNameEdit, isAboutEdit, isEmailEdit]);

  useEffect(() => {
    if (user) setUserData(user);
  }, [user]);

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

  const handleEmailEdit = () => {
    setIsEmailEdit(true);
  };

  const handleSave = () => {
    addUpdatedUserData.mutate({ ...userData });
    setIsNameEdit(false);
    setIsAboutEdit(false);
    setIsEmailEdit(false);
  };

  return (
    <section className={styles.section}>
      <div className={styles.form}>
        <img src={userImage} alt={displayName} className={styles.myImage} />
        <div className={styles.infoWrapper}>
          <div className={styles.editInput}>
            {isNameEdit ? (
              <div>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  value={userData.name}
                  ref={inputRef}
                  onChange={handleChange}
                />
                <TextButton text="저장" onClick={handleSave} />
              </div>
            ) : (
              <>
                <span className={styles.editSpan}>
                  {userData.name || displayName || "나의 이름을 입력해주세요."}
                </span>
                <TextButton text="수정" onClick={handleNameEdit} />
              </>
            )}
          </div>
          <div className={styles.editInput}>
            {isEmailEdit ? (
              <div>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  value={userData.email}
                  ref={inputRef}
                  onChange={handleChange}
                />
                <TextButton text="저장" onClick={handleSave} />
              </div>
            ) : (
              <>
                <span className={styles.editSpan}>
                  {userData.email || authEmail || "이메일 주소를 입력해주세요."}
                </span>
                <TextButton text="수정" onClick={handleEmailEdit} />
              </>
            )}
          </div>
          <p>
            TODO(투두 완료일/총 투두 작성일):
            <span className={styles.textStyle}>
              {completedTodoCount && completedTodoCount}일/
              {totalTodoCreationDays && totalTodoCreationDays.length}일
            </span>
          </p>
          {completedTodoCount !== undefined &&
            totalTodoCreationDays !== undefined && (
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${completedTodoPercent}%` }}
                ></div>
              </div>
            )}
          <p>
            PHOTO DIARY:
            <span className={styles.textStyle}>{diary && diary.length}개</span>
          </p>
          <div className={styles.editInput}>
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
                <span className={styles.editSpan}>
                  {userData.about
                    ? userData.about
                    : "다짐이나 목표를 적어주세요."}
                </span>
                <TextButton text="수정" onClick={handleAboutEdit} />
              </>
            )}
          </div>
        </div>
      </div>
      <Button
        text="회원탈퇴"
        onClick={() => openModal(ModalTypes.DELETE_USER)}
      />
      {modalState.type === ModalTypes.DELETE_USER && (
        <ConfirmModal
          text="정말로 회원을 탈퇴하시겠습니까?"
          type="deleteUser"
        />
      )}
    </section>
  );
}
