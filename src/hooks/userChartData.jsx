import { useMemo } from "react";

export const useLineChartData = (expenses, filter) => {
  return useMemo(() => {
    if (filter === "Monthly") {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthlyData = monthNames.map(() => 0);

      expenses.forEach((expense) => {
        const date = new Date(expense.date);
        const monthIndex = date.getMonth();
        monthlyData[monthIndex] += expense.amount;
      });

      return {
        data: monthlyData,
        labels: monthNames,
      };
    }

    if (filter === "Weekly") {
      // Group by weeks (last 8 weeks)
      const weekLabels = [];
      const weeklyData = [];
      const now = new Date();

      for (let i = 7; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - i * 7);
        weekLabels.push(`Week ${8 - i}`);

        const weekExpenses = expenses.filter((expense) => {
          const expenseDate = new Date(expense.date);
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          return expenseDate >= weekStart && expenseDate <= weekEnd;
        });

        const weekTotal = weekExpenses.reduce(
          (sum, expense) => sum + expense.amount,
          0
        );
        weeklyData.push(weekTotal);
      }

      return {
        data: weeklyData,
        labels: weekLabels,
      };
    }

    if (filter === "Daily") {
      // Group by last 7 days
      const dailyLabels = [];
      const dailyData = [];
      const now = new Date();

      for (let i = 6; i >= 0; i--) {
        const day = new Date(now);
        day.setDate(now.getDate() - i);
        dailyLabels.push(day.toLocaleDateString("en-US", { weekday: "short" }));

        const dayExpenses = expenses.filter((expense) => {
          const expenseDate = new Date(expense.date);
          return expenseDate.toDateString() === day.toDateString();
        });

        const dayTotal = dayExpenses.reduce(
          (sum, expense) => sum + expense.amount,
          0
        );
        dailyData.push(dayTotal);
      }

      return {
        data: dailyData,
        labels: dailyLabels,
      };
    }

    // Default fallback
    return {
      data: [0],
      labels: ["No Data"],
    };
  }, [expenses, filter]);
};

export const usePieChartData = (expenses, filter) => {
  return useMemo(() => {
    let filteredExpenses = expenses;

    // Apply filter to pie chart data 
    if (filter === "Daily") {
      const now = new Date();
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(now.getDate() - 6);

      filteredExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= sevenDaysAgo && expenseDate <= now;
      });
    } else if (filter === "Weekly") {
      const now = new Date();
      const eightWeeksAgo = new Date(now);
      eightWeeksAgo.setDate(now.getDate() - 8 * 7);

      filteredExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= eightWeeksAgo && expenseDate <= now;
      });
    } else if (filter === "Monthly") {
      const currentYear = new Date().getFullYear();

      filteredExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() === currentYear;
      });
    }

    // Group by category
    const categoryTotals = filteredExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    return Object.entries(categoryTotals).map(([category, amount], index) => ({
      id: index,
      value: amount,
      label: category,
    }));
  }, [expenses, filter]);
};
export default useLineChartData;
