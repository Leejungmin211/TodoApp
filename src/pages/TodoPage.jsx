import { useState } from "react";
import Calendar from "react-calendar";
import FilterNav from "../components/Nav/FilterNav";
import TodoList from "../components/TodoList/TodoList";
import styles from "./TodoPage.module.css";
import "./Calendar.css";
import { formattedDate } from "../util/date";

export default function TodoPage() {
  const filters = ["All", "Active", "Completed"];
  const [filter, setFilter] = useState(filters[0]);
  const [value, setValue] = useState(new Date());
  const today = formattedDate(value);
  const [selectedDate, setselectedDate] = useState(today);

  const handleDateChange = (date) => {
    setValue(date);
    const changedDate = date && formattedDate(date);
    setselectedDate(changedDate);
  };

  return (
    <main className={styles.mainWrapper}>
      <div>
        <Calendar
          onChange={handleDateChange}
          value={value}
          tileContent={() => {}}
        />
      </div>
      <section className={styles.bodywrapper}>
        <FilterNav
          filters={filters}
          filter={filter}
          setFilter={setFilter}
          selectedDate={selectedDate}
        />
        <TodoList filter={filter} selectedDate={selectedDate} />
      </section>
    </main>
  );
}
