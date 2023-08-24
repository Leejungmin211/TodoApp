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
import EditDiary from "./pages/EditDiary";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <TodoPage /> },
      { path: "/diary", element: <Diary /> },
      { path: "/diary/new", element: <NewDiary /> },
      { path: "/diary/:id", element: <DiaryDetail /> },
      { path: "/diary/:id/edit", element: <EditDiary /> },
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
