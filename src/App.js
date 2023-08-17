import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";
import "./App.css";
import MyPage from "./pages/MyPage";
import Root from "./pages/Root";
import TodoPage from "./pages/TodoPage";
import { ModalContextProvider } from "./context/ModalContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <TodoPage /> },
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
