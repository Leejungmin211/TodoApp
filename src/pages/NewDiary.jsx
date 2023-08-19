import { useState } from "react";
import styles from "./NewDiary.module.css";
import { Button, TextButton } from "../components/ui/Button";
import NoteDiary from "../images/noteDiary.png";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { uploaderImage } from "../api/uploader";
import useDiary from "../hooks/useDiary";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

export default function NewDiary() {
  const navigate = useNavigate();
  const todayDate = dayjs(new Date()).format("YYYY.MM.DD HH:mm:ss");
  const { addUpdateDiaryItem } = useDiary();
  const [diary, setDiary] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files[0]);
      return;
    }
    setDiary((diary) => ({ ...diary, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isButtonClicked) {
      return;
    }

    setIsUploading(true);
    setIsButtonClicked(true);
    uploaderImage(file)
      .then((url) =>
        addUpdateDiaryItem.mutate(
          { ...diary, id: uuidv4(), date: todayDate, url },
          {
            onSuccess: () => {
              toast.success("다이어리가 등록되었습니다.", {
                style: {
                  marginTop: "80px",
                  padding: "12px",
                },
                iconTheme: {
                  primary: "var(--color-orange)",
                  secondary: "#FFFAEE",
                },
              });
              setTimeout(() => {
                navigate("/diary");
              }, 3000);
            },
          }
        )
      )
      .finally(() => {
        setIsUploading(false);
        setIsButtonClicked(false);
      });
  };

  return (
    <div className={styles.section}>
      <Toaster position="top-right" reverseOrder={false} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div>
            <div className={styles.imageContainer}>
              {!file && (
                <>
                  <img
                    src={NoteDiary}
                    alt="diary"
                    className={styles.diaryImg}
                  />
                  <p className={styles.pictureText}>
                    오늘의 순간을 사진으로 기록하세요.
                  </p>
                </>
              )}
              {file && (
                <>
                  <img
                    className={styles.urlImage}
                    src={URL.createObjectURL(file)}
                    alt="file"
                  />
                </>
              )}
            </div>
            <div className={styles.fileContainer}>
              <label htmlFor="file" className={styles.fileLabel}>
                사진 업로드
              </label>
              <input
                className={styles.fileUploader}
                id="file"
                type="file"
                accept="image/*"
                name="file"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="mood"
              className={styles.textInput}
              placeholder="오늘의 감정은 어떤가요?"
              value={diary.mood ?? ""}
              onChange={handleChange}
              autocomplete="off"
              required
            />
            <input
              type="text"
              name="title"
              className={styles.textInput}
              placeholder="제목을 입력해주세요."
              value={diary.title ?? ""}
              onChange={handleChange}
              required
            />
            <textarea
              rows={10}
              name="content"
              className={styles.textarea}
              placeholder="내용을 입력해주세요."
              value={diary.content ?? ""}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <div>
            <span className={styles.cancel} onClick={() => navigate("/diary")}>
              <FaArrowLeft />
              <TextButton text="나가기" />
            </span>
          </div>
          <Button
            text={isUploading ? "업로드중" : "등록하기"}
            disabled={isUploading && isButtonClicked}
          />
        </div>
      </form>
    </div>
  );
}
