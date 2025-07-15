// Expense categories data for pie chart
export const expenseCategories = [
  {
    id: 0,
    value: 450,
    label: "Food & Dining",
    color: "#0088FE",
  },
  {
    id: 1,
    value: 320,
    label: "Transportation",
    color: "#00C49F",
  },
  {
    id: 2,
    value: 280,
    label: "Shopping",
    color: "#FFBB28",
  },
  {
    id: 3,
    value: 200,
    label: "Entertainment",
    color: "#FF8042",
  },
  {
    id: 4,
    value: 150,
    label: "Bills & Utilities",
    color: "#8884D8",
  },
];

// Monthly expense data for line chart
export const monthlyExpenses = [420, 380, 520, 450, 680, 580, 720, 650, 590, 480, 520, 600];
export const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const valueFormatter = (value) => `$${value.value}`;

// Legacy export for compatibility (if needed)
export const desktopOS = expenseCategories;
