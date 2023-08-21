import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addUpdateDiary,
  removeDiary,
  getDiary,
  getIdDiary,
} from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function useDiary(id) {
  console.log(id);
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const diaryQuery = useQuery(["diary", uid || ""], () => getDiary(uid), {
    enabled: !!uid,
  });

  const diaryIdQuery = useQuery(
    ["diary", uid || "", id || ""],
    () => getIdDiary(uid, id),
    {
      enabled: !!uid,
    }
  );

  const addUpdateDiaryItem = useMutation(
    (diary) => addUpdateDiary(uid, diary),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["diary", uid]);
      },
    }
  );

  const removeDiaryItem = useMutation((id) => removeDiary(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["diary", uid]);
    },
  });
  return { diaryQuery, diaryIdQuery, addUpdateDiaryItem, removeDiaryItem };
}
