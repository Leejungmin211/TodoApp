import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";
import "./App.css";
import MyPage from "./pages/MyPage";
import Diary from "./pages/Diary";
import NewDiary from "./pages/NewDiary";
import Root from "./pages/Root";
import TodoPage from "./pages/TodoPage";
import { ModalContextProvider } from "./context/ModalContext";
import DiaryDetail from "./pages/DiaryDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <TodoPage /> },
      { path: "/diary", element: <Diary /> },
      { path: "/diary/new", element: <NewDiary /> },
      { path: "/diary/:id", element: <DiaryDetail /> },
      { path: "/mypage", element: <MyPage /> },
    ],
  },
]);

function App() {
  return (
    <DarkModeProvider>
      <ModalContextProvider>
        <RouterProvider router={router} />
      </ModalContextProvider>
    </DarkModeProvider>
  );
}

export default App;
