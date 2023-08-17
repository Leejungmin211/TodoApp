import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
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
