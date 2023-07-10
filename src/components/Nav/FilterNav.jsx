import { useDarkMode } from "../../context/DarkModeContext";
import styles from "./FilterNav.module.css";

export default function FilterNav({ filters, filter, setFilter }) {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <nav className={styles.nav}>
      <button onClick={toggleDarkMode}>
        {!darkMode && "다크모드"}
        {darkMode && "라이트모드"}
      </button>
      <ul className={styles.filters}>
        {filters.map((item, index) => {
          return (
            <li key={index}>
              <button
                className={`${styles.filter} ${
                  filter === item && styles.selected
                }`}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
