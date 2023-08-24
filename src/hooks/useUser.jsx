import { useMutation, useQuery, useQueryClient } from "react-query";
import { addUpdateUser, getUser, removeUser } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function useUser() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const userQuery = useQuery(["members", uid || ""], () => getUser(uid), {
    enabled: !!uid,
  });

  const addUpdatedUserData = useMutation((user) => addUpdateUser(uid, user), {
    onSuccess: () => {
      queryClient.invalidateQueries(["members", uid]);
    },
  });

  const removeUserData = useMutation(() => removeUser(uid), {
    onSuccess: () => {
      queryClient.invalidateQueries(["members", uid]);
    },
  });

  return { userQuery, addUpdatedUserData, removeUserData };
}
