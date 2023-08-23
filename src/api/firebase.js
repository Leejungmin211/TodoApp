import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  deleteUser,
} from "firebase/auth";
import { getDatabase, ref, set, get, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const database = getDatabase(app);

export async function login() {
  signInWithPopup(auth, googleProvider).catch(console.error);
}

export async function loginGitHub() {
  signInWithPopup(auth, githubProvider).catch(console.error);
}

export async function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

export async function deleteAuthUser() {
  const user = auth.currentUser;
  console.log(user);
  deleteUser(user).catch(console.error);
}

export async function getTodo(userId) {
  return get(ref(database, `todos/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
}

export async function addUpdateTodo(userId, todo) {
  return set(ref(database, `todos/${userId}/${todo.id}`), todo);
}

export async function removeTodo(userId, todoId) {
  return remove(ref(database, `todos/${userId}/${todoId}`));
}

export async function getDiary(userId) {
  return get(ref(database, `diary/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    const dataArray = Object.values(items);
    return dataArray.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
  });
}

export async function getIdDiary(userId, diaryId) {
  return get(ref(database, `diary/${userId}/${diaryId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return items;
  });
}

export async function addUpdateDiary(userId, diary) {
  return set(ref(database, `diary/${userId}/${diary.id}`), diary);
}

export async function removeDiary(userId, diaryId) {
  return remove(ref(database, `diary/${userId}/${diaryId}`));
}

export async function getUser(userId) {
  return get(ref(database, `members/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return items;
  });
}

export async function addUpdateUser(userId, user) {
  return set(ref(database, `members/${userId}`), user);
}
