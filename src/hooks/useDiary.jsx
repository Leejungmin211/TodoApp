import { useMutation, useQuery, useQueryClient } from "react-query";
import { addUpdateDiary, removeDiary, getDiary } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function useDiary() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const diaryQuery = useQuery(["diary", uid || ""], () => getDiary(uid), {
    enabled: !!uid,
  });

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
  return { diaryQuery, addUpdateDiaryItem, removeDiaryItem };
}
