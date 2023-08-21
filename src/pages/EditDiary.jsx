import { useState } from "react";
import styles from "./NewDiary.module.css";
import { ArrowButton, Button } from "../components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import { uploaderImage } from "../api/uploader";
import useDiary from "../hooks/useDiary";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export default function NewDiary() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    diaryIdQuery: { data: diaryData },
  } = useDiary(id);
  const { addUpdateDiaryItem } = useDiary();
  const [diary, setDiary] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  console.log(diaryData);

  useEffect(() => {
    if (diaryData) {
      setDiary(diaryData);
    }
  }, [diaryData, id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files[0]);
      return;
    }
    setDiary((diary) => ({ ...diary, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isButtonClicked) return;

    setIsUploading(true);
    setIsButtonClicked(true);

    const updateData = file
      ? { ...diary, url: await uploaderImage(file) }
      : diary;

    addUpdateDiaryItem.mutate(updateData, {
      onSuccess: () => {
        toast.success("다이어리가 수정되었습니다.", {
          style: {
            fontSize: "15px",
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
      onError: () => {
        toast.error(
          "업로드에 실패했습니다. 모든 내용이 첨부되었는지 확인해주세요.",
          {
            style: {
              fontSize: "15px",
              marginTop: "80px",
              padding: "12px",
            },
            iconTheme: {
              primary: "var(--color-orange)",
              secondary: "#FFFAEE",
            },
          }
        );
        setIsUploading(false);
        setIsButtonClicked(false);
        return;
      },
    });
  };

  return (
    <div className={styles.section}>
      <Toaster position="top-right" reverseOrder={false} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div>
            <div className={styles.imageContainer}>
              {diary.url && !file && (
                <>
                  <img className={styles.urlImage} src={diary.url} alt="file" />
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
              autoComplete="off"
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
            <ArrowButton text="나가기" onClick={() => navigate("/diary")} />
          </div>
          <Button
            text={isUploading ? "업로드중" : "수정하기"}
            disabled={isUploading && isButtonClicked}
          />
        </div>
      </form>
    </div>
  );
}
