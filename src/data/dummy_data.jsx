const dummyExpenses = [
  // Today's expenses (for Day filter)
  {
    id: 1,
    category: "Groceries",
    amount: 120,
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: 2,
    category: "Dining Out",
    amount: 45,
    date: new Date().toISOString().split("T")[0],
  },

  // Yesterday's expenses (for Week filter)
  {
    id: 3,
    category: "Transportation",
    amount: 30,
    date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
  },
  {
    id: 4,
    category: "Entertainment",
    amount: 60,
    date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
  },

  // This week's expenses
  {
    id: 5,
    category: "Groceries",
    amount: 95,
    date: new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0],
  },
  {
    id: 6,
    category: "Health",
    amount: 70,
    date: new Date(Date.now() - 3 * 86400000).toISOString().split("T")[0],
  },
  {
    id: 7,
    category: "Travel",
    amount: 150,
    date: new Date(Date.now() - 4 * 86400000).toISOString().split("T")[0],
  },

  // This month's expenses
  { id: 8, category: "Education", amount: 200, date: "2025-07-08" },
  { id: 9, category: "Miscellaneous", amount: 30, date: "2025-07-16" },
  { id: 10, category: "Shopping", amount: 100, date: "2025-07-16" },

  // Previous months for Year view
  { id: 11, category: "Groceries", amount: 80, date: "2025-06-05" },
  { id: 12, category: "Dining Out", amount: 50, date: "2025-06-06" },
  { id: 13, category: "Transportation", amount: 40, date: "2025-05-13" },
  { id: 14, category: "Entertainment", amount: 75, date: "2025-05-14" },
  { id: 15, category: "Groceries", amount: 110, date: "2025-04-15" },

  // Previous year (to test Year filter)
  { id: 16, category: "Groceries", amount: 125, date: "2024-05-01" },
  { id: 17, category: "Dining Out", amount: 55, date: "2024-05-02" },
  { id: 18, category: "Transportation", amount: 35, date: "2024-04-03" },
  { id: 19, category: "Entertainment", amount: 65, date: "2024-04-05" },
  { id: 20, category: "Groceries", amount: 105, date: "2024-03-06" },
];

export default dummyExpenses;
