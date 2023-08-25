export function groupedTodosByDate(todos) {
  const totalTodoValue = todos.reduce((groupedTodos, todo) => {
    const todoDate = todo.date;
    if (!groupedTodos[todoDate]) {
      groupedTodos[todoDate] = [];
    }
    groupedTodos[todoDate].push(todo);
    return groupedTodos;
  }, {});
  return Object.values(totalTodoValue);
}

export function groupedCompletedTodos(todos) {
  return todos.reduce((count, todo) => {
    const completedSameDateTodos = todo.filter((t) => t.status === "Completed");

    if (todo.length === completedSameDateTodos.length) {
      return count + 1;
    }
    return count;
  }, 0);
}

export function groupedCompletedTodosByDate(todos) {
  return todos.reduce((completedDates, todo) => {
    const completedSameDateTodos = todo.filter((t) => t.status === "Completed");
    if (todo.length === completedSameDateTodos.length) {
      const todoDate = todo[0].date;
      completedDates.push(todoDate);
    }
    return completedDates;
  }, []);
}
