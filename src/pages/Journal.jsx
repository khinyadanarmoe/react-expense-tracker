import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Container,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Close, Category as DefaultIcon } from "@mui/icons-material";

import CategoryCard from "../components/journal/CategoryCard";
import AddCategoryCard from "../components/journal/AddCategoryCard";
import ExpenseTable from "../components/journal/ExpenseTable";
import CustomTheme from "../theme/CustomTheme";
import dummyExpenses from "../data/dummy_data";
import { expenseCategories as defaultCategories } from "../utils/categories";
import { colorOptions } from "../utils/colors";

const Journal = () => {
  const loadFromLocalStorage = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      const parsed = item ? JSON.parse(item) : defaultValue;

      // Clear localStorage if it contains invalid data (JSX elements)
      if (key === "categories" && parsed && Array.isArray(parsed)) {
        const hasInvalidIcons = parsed.some(
          (cat) => cat.icon && typeof cat.icon === "object" && cat.icon.type
        );
        if (hasInvalidIcons) {
          localStorage.removeItem("categories");
          return defaultValue;
        }
      }

      return parsed;
    } catch {
      return defaultValue;
    }
  };

  // State for expenses and categories
  const [expenses, setExpenses] = useState(() =>
    loadFromLocalStorage("expenses", dummyExpenses)
  );

  const [categories, setCategories] = useState(() =>
    loadFromLocalStorage("categories", defaultCategories)
  );

  const [expenseForm, setExpenseForm] = useState({
    category: null,
    amount: "",
    description: "",
    date: new Date(),
  });

  // Simplified category form - removed image
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    color: "#4dabf7",
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [expenses, categories]);

  // Dialog states
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openExpenseDialog, setOpenExpenseDialog] = useState(false);

  // Handlers
  const handleCategoryClick = (category) => {
    setExpenseForm({ ...expenseForm, category });
    setOpenExpenseDialog(true);
  };

  const handleAddExpense = () => {
    if (!expenseForm.category || !expenseForm.amount || !expenseForm.date)
      return;

    // Fix date formatting to avoid timezone issues
    const localDate = new Date(expenseForm.date);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const day = String(localDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    const newExpense = {
      id: Math.max(...expenses.map((e) => e.id), 0) + 1,
      category: expenseForm.category.label,
      description: expenseForm.description || "---",
      amount: parseFloat(expenseForm.amount),
      date: formattedDate,
    };

    setExpenses([...expenses, newExpense]);
    setExpenseForm({
      category: null,
      amount: "",
      description: "",
      date: new Date(),
    });
    setOpenExpenseDialog(false);
  };

  // Simplified - always use default icon for new categories
  const handleAddCategory = () => {
    if (!categoryForm.name.trim()) return;

    const newCategory = {
      label: categoryForm.name,
      color: categoryForm.color,
      icon: "default", // Always use default icon
    };

    setCategories([...categories, newCategory]);
    setCategoryForm({ name: "", color: "#4dabf7" }); // Reset without image
    setOpenCategoryDialog(false);
  };

  // Calculate total expenses
  const totalExpenses = Array.isArray(expenses)
    ? expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0)
    : 0;

  // // Temporary function for console use
  // window.clearExpenseData = () => {
  //   localStorage.removeItem("expenses");
  //   localStorage.removeItem("categories");
  //   window.location.reload();
  // };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 3 }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box mb={4}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Add a New Expense
            </Typography>
            <Typography color="text.secondary">
              Choose the category and add the expense
            </Typography>
          </Box>

          {/* Categories Grid */}
          <Grid container spacing={2} mb={4}>
            {categories.map((category, index) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                <CategoryCard
                  category={category}
                  onClick={handleCategoryClick}
                />
              </Grid>
            ))}
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <AddCategoryCard onClick={() => setOpenCategoryDialog(true)} />
            </Grid>
          </Grid>

          {/* Recent Expenses */}
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Recent Expenses
          </Typography>
          <ExpenseTable expenses={expenses} />

          {/* Simplified Add Category Dialog */}
          <Dialog
            open={openCategoryDialog}
            onClose={() => setOpenCategoryDialog(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              Add New Category
              <IconButton
                onClick={() => setOpenCategoryDialog(false)}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <TextField
                label="Category Name"
                fullWidth
                value={categoryForm.name}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, name: e.target.value })
                }
                sx={{ my: 2 }}
              />

              <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                Choose Color:
              </Typography>
              <Box display="flex" gap={1} mb={3} flexWrap="wrap">
                {colorOptions.map((color, index) => (
                  <Box
                    key={index}
                    onClick={() => setCategoryForm({ ...categoryForm, color })}
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: color,
                      borderRadius: "50%",
                      cursor: "pointer",
                      border:
                        categoryForm.color === color
                          ? "3px solid #333"
                          : "2px solid #fff",
                      "&:hover": { transform: "scale(1.1)" },
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  />
                ))}
              </Box>

              {/* Preview */}
              {categoryForm.name && (
                <Box
                  sx={{
                    mb: 2,
                    p: 2,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Preview:
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "6px",
                        backgroundColor: categoryForm.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      <DefaultIcon sx={{ fontSize: 20 }} />
                    </Box>
                    <Typography variant="body2" fontWeight="medium">
                      {categoryForm.name}
                    </Typography>
                  </Box>
                </Box>
              )}

              <Button
                variant="contained"
                fullWidth
                onClick={handleAddCategory}
                disabled={!categoryForm.name.trim()}
              >
                Save Category
              </Button>
            </DialogContent>
          </Dialog>

          {/* Add Expense Dialog */}
          <Dialog
            open={openExpenseDialog}
            onClose={() => setOpenExpenseDialog(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              Add expense to {expenseForm.category?.label}
              <IconButton
                onClick={() => setOpenExpenseDialog(false)}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DatePicker
                label="Date"
                value={expenseForm.date}
                onChange={(date) => setExpenseForm({ ...expenseForm, date })}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: { my: 2 },
                  },
                }}
              />
              <TextField
                label="Amount"
                type="number"
                fullWidth
                value={expenseForm.amount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    value === "" ||
                    (parseFloat(value) >= 0 && !isNaN(parseFloat(value)))
                  ) {
                    setExpenseForm({ ...expenseForm, amount: value });
                  }
                }}
                onKeyDown={(e) => {
                  if (["-", "+", "e", "E"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                sx={{ mb: 2 }}
                slotProps={{
                  input: {
                    inputProps: {
                      min: 0,
                      step: 0.01,
                    },
                    startAdornment: "$",
                  },
                }}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={expenseForm.description}
                onChange={(e) =>
                  setExpenseForm({
                    ...expenseForm,
                    description: e.target.value,
                  })
                }
                sx={{ mb: 3 }}
                placeholder="Enter expense description..."
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleAddExpense}
                disabled={
                  !expenseForm.amount ||
                  expenseForm.amount <= 0 ||
                  !expenseForm.date
                }
              >
                Save Expense
              </Button>
            </DialogContent>
          </Dialog>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default Journal;
