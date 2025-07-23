import { useMemo } from "react";

const useExpenseData = (selectedDate, expenses) => {
  const filteredExpenses = useMemo(() => {
    // Use expenses from localStorage if available, fallback to dummy data
    const expensesToFilter =
      expenses || JSON.parse(localStorage.getItem("expenses") || "[]");

    const now = new Date();

    if (selectedDate === "Day") {
      // Filter expenses for today
      const today = new Date();
      const todayYear = today.getFullYear();
      const todayMonth = today.getMonth();
      const todayDate = today.getDate();

      return expensesToFilter.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getFullYear() === todayYear &&
          expenseDate.getMonth() === todayMonth &&
          expenseDate.getDate() === todayDate
        );
      });
    }

    if (selectedDate === "Week") {
      // Filter expenses for current week (last 7 days)
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 6);
      return expensesToFilter.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= weekAgo && expenseDate <= now;
      });
    }

    if (selectedDate === "Month") {
      // Filter expenses for current month
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      return expensesToFilter.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getMonth() === currentMonth &&
          expenseDate.getFullYear() === currentYear
        );
      });
    }

    if (selectedDate === "Year") {
      // Filter expenses for current year
      const currentYear = now.getFullYear();
      return expensesToFilter.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() === currentYear;
      });
    }

    // Default: return all expenses
    return expensesToFilter;
  }, [selectedDate, expenses]);

  return { filteredExpenses };
};

export default useExpenseData;
