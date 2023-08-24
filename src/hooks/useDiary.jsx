import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addUpdateDiary,
  removeDiary,
  getDiary,
  getIdDiary,
  userRemoveDiary,
} from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function useDiary(id) {
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

  const removeUserDiaryItem = useMutation(() => userRemoveDiary(uid), {
    onSuccess: () => {
      queryClient.invalidateQueries(["diary", uid]);
    },
  });

  return {
    diaryQuery,
    diaryIdQuery,
    addUpdateDiaryItem,
    removeDiaryItem,
    removeUserDiaryItem,
  };
}
