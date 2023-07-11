import styles from "./FilterNav.module.css";

export default function FilterNav({ filters, filter, setFilter }) {
  return (
    <nav className={styles.nav}>
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
