import { useMemo } from "react";
import dummyExpenses from "../data/dummy_data.jsx";

const useExpenseData = (selectedDate) => {
  const filteredExpenses = useMemo(() => {
    const now = new Date();

    if (selectedDate === "Day") {
      // Filter expenses for today
      const today = now.toDateString();
      return dummyExpenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate.toDateString() === today;
      });
    }

    if (selectedDate === "Week") {
      // Filter expenses for current week (last 7 days)
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 6);
      return dummyExpenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= weekAgo && expenseDate <= now;
      });
    }

    if (selectedDate === "Month") {
      // Filter expenses for current month
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      return dummyExpenses.filter((expense) => {
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
      return dummyExpenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() === currentYear;
      });
    }

    // Default: return all expenses
    return dummyExpenses;
  }, [selectedDate]);

  return { filteredExpenses };
};

export default useExpenseData;
