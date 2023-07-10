import { useState } from "react";
import FilterNav from "../components/Nav/FilterNav";
import TodoList from "../components/TodoList/TodoList";

export default function TodoPage() {
  const filters = ["All", "Active", "Completed"];
  const [filter, setFilter] = useState(filters[0]);
  return (
    <>
      <FilterNav filters={filters} filter={filter} setFilter={setFilter} />
      <TodoList filter={filter} />
    </>
  );
}
