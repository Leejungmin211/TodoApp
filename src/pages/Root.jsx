import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";
import TopHeader from "../components/Header/TopHeader";
import { AuthContextProvider } from "../context/AuthContext";
import styles from "./Root.module.css";

const queryClient = new QueryClient();

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <div className={styles.header}>
          <TopHeader />
        </div>
        <div className={styles.main}>
          <Outlet />
        </div>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
