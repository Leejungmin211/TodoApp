import { useMutation, useQuery, useQueryClient } from "react-query";
import { addUpdateTodo, getTodo, removeTodo } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function useTodo() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const todoQuery = useQuery(["todos", uid || ""], () => getTodo(uid), {
    enabled: !!uid,
  });

  const addUpdateItem = useMutation((todo) => addUpdateTodo(uid, todo), {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos", uid]);
    },
  });

  const removeItem = useMutation((id) => removeTodo(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos", uid]);
    },
  });
  return { todoQuery, addUpdateItem, removeItem };
}
