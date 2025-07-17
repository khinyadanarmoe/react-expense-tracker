import React, { useState } from "react";
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
  useTheme,
  useMediaQuery,
  Container,
  Avatar,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Close as CloseIcon,
  Receipt as ReceiptIcon,
  DirectionsCar as CarIcon,
  Home as HomeIcon,
  Restaurant as RestaurantIcon,
  ShoppingCart as ShoppingCartIcon,
  Hotel as HotelIcon,
  Bolt as BoltIcon,
  Pets as PetsIcon,
  CloudUpload as CloudUploadIcon,
  Category as DefaultIcon,
  LocalGroceryStore as GroceriesIcon,
  Lightbulb as UtilitiesIcon,
  Movie as EntertainmentIcon,
  Fastfood as DiningIcon,
  FitnessCenter as HealthIcon,
  School as EducationIcon,
  Flight as TravelIcon,
  Help as MiscIcon,
} from "@mui/icons-material";

import CategoryCard from "../components/journal/CategoryCard.jsx";
import AddCategoryCard from "../components/journal/AddCategoryCard.jsx";
import ExpenseTable from "../components/journal/ExpenseTable.jsx";
import CustomTheme from "../theme/CustomTheme.jsx";

const Journal = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openExpenseForm, setOpenExpenseForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#4dabf7");

  const isMobile = useMediaQuery(CustomTheme.breakpoints.down("sm"));
  // Sample expenses based on your JSON data
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: "15 Jul 2025",
      category: "Groceries",
      description: "Weekly grocery shopping",
      amount: 120.5,
    },
    {
      id: 2,
      date: "14 Jul 2025",
      category: "Utilities",
      description: "Electricity bill for September",
      amount: 85.3,
    },
    {
      id: 3,
      date: "13 Jul 2025",
      category: "Transportation",
      description: "Gas refill",
      amount: 65.0,
    },
    {
      id: 4,
      date: "12 Jul 2025",
      category: "Entertainment",
      description: "Movie night and snacks",
      amount: 45.75,
    },
    {
      id: 5,
      date: "11 Jul 2025",
      category: "Dining Out",
      description: "Lunch with friends",
      amount: 32.8,
    },
  ]);

  // Enhanced category list with icons matching your JSON data
  const [expenseCategories, setExpenseCategories] = useState([
    {
      label: "Groceries",
      color: "#4caf50",
      icon: <GroceriesIcon />,
    },
    {
      label: "Utilities",
      color: "#ff9800",
      icon: <UtilitiesIcon />,
    },
    {
      label: "Transportation",
      color: "#2196f3",
      icon: <CarIcon />,
    },
    {
      label: "Entertainment",
      color: "#e91e63",
      icon: <EntertainmentIcon />,
    },
    {
      label: "Dining Out",
      color: "#ff5722",
      icon: <DiningIcon />,
    },
    {
      label: "Health",
      color: "#009688",
      icon: <HealthIcon />,
    },
    {
      label: "Shopping",
      color: "#9c27b0",
      icon: <ShoppingCartIcon />,
    },
    {
      label: "Travel",
      color: "#607d8b",
      icon: <TravelIcon />,
    },
    {
      label: "Education",
      color: "#3f51b5",
      icon: <EducationIcon />,
    },
    {
      label: "Miscellaneous",
      color: "#795548",
      icon: <MiscIcon />,
    },
    // Keep your existing categories
    {
      label: "Stationery",
      color: "#4dabf7",
      icon: <ReceiptIcon />,
    },
    {
      label: "Accommodation",
      color: "#f783ac",
      icon: <HotelIcon />,
    },
  ]);

  // Enhanced color options
  const colorOptions = [
    "#4caf50", // Green
    "#ff9800", // Orange
    "#2196f3", // Blue
    "#e91e63", // Pink
    "#ff5722", // Deep Orange
    "#009688", // Teal
    "#9c27b0", // Purple
    "#607d8b", // Blue Grey
    "#3f51b5", // Indigo
    "#795548", // Brown
    "#4dabf7", // Light Blue
    "#f783ac", // Light Pink
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setOpenExpenseForm(true);
  };

  const handleAddExpense = () => {
    if (selectedCategory && amount && date) {
      const newExpense = {
        id: expenses.length + 1,
        date: date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        category: selectedCategory.label,
        description: description || "Add more items",
        amount: parseFloat(amount),
      };

      setExpenses([...expenses, newExpense]);

      // Reset form
      setAmount("");
      setDescription("");
      setDate(new Date());
      setOpenExpenseForm(false);
      setSelectedCategory(null);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        label: newCategoryName,
        color: selectedColor,
        icon: uploadedImage ? (
          <Avatar src={uploadedImage} sx={{ width: 24, height: 24 }} />
        ) : (
          <DefaultIcon />
        ),
      };

      setExpenseCategories([...expenseCategories, newCategory]);

      // Reset form
      setNewCategoryName("");
      setUploadedImage(null);
      setSelectedColor("#4dabf7");
      setOpenAddCategory(false);
    }
  };

  // Calculate total expenses for dashboard display
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const expenseCount = expenses.length;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: CustomTheme.palette.background.default,
        }}
      >
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 1,
              fontWeight: "bold",
              color: CustomTheme.palette.text.primary,
            }}
          >
            Add a New Expense
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 2,
              color: CustomTheme.palette.text.secondary,
            }}
          >
            Choose the category and add the expense
          </Typography>

          {/* Category Grid */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {expenseCategories.map((category, index) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                <CategoryCard
                  category={category}
                  onClick={handleCategoryClick}
                />
              </Grid>
            ))}
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <AddCategoryCard onClick={() => setOpenAddCategory(true)} />
            </Grid>
          </Grid>

          {/* Expenses Section */}
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: CustomTheme.palette.text.primary,
            }}
          >
            Recent Expenses
          </Typography>

          {/* Expense Table */}
          <ExpenseTable expenses={expenses} />

          {/* Add New Category Dialog */}
          <Dialog
            open={openAddCategory}
            onClose={() => setOpenAddCategory(false)}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                backgroundColor: CustomTheme.palette.background.paper,
                borderRadius: CustomTheme.shape.borderRadius,
              },
            }}
          >
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: CustomTheme.palette.text.primary,
              }}
            >
              Add New Category
              <IconButton onClick={() => setOpenAddCategory(false)}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              {/* Category Name */}
              <TextField
                label="Category Name"
                fullWidth
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                sx={{ mb: 3, mt: 1 }}
              />

              {/* Image Upload */}
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 1,
                  fontWeight: "bold",
                  color: CustomTheme.palette.text.primary,
                }}
              >
                Upload Icon:
              </Typography>
              <Box sx={{ mb: 3 }}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="image-upload"
                  type="file"
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                    sx={{
                      mb: 2,
                      borderColor: CustomTheme.palette.primary.main,
                      color: CustomTheme.palette.text.primary,
                    }}
                  >
                    Choose Image
                  </Button>
                </label>

                {uploadedImage && (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mb: 2 }}
                  >
                    <Avatar
                      src={uploadedImage}
                      sx={{ width: 60, height: 60 }}
                    />
                  </Box>
                )}
              </Box>

              {/* Color Picker */}
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 1,
                  fontWeight: "bold",
                  color: CustomTheme.palette.text.primary,
                }}
              >
                Choose Color:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  mb: 3,
                  flexWrap: "wrap",
                }}
              >
                {colorOptions.map((color, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: color,
                      borderRadius: "50%",
                      cursor: "pointer",
                      border:
                        selectedColor === color
                          ? "3px solid #333"
                          : "2px solid #fff",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  />
                ))}
              </Box>

              {/* Preview */}
              {newCategoryName && (
                <Box
                  sx={{
                    mb: 2,
                    p: 2,
                    backgroundColor: CustomTheme.palette.background.default,
                    borderRadius: CustomTheme.shape.borderRadius,
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
                        backgroundColor: selectedColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      {uploadedImage ? (
                        <Avatar
                          src={uploadedImage}
                          sx={{ width: 24, height: 24 }}
                        />
                      ) : (
                        <DefaultIcon />
                      )}
                    </Box>
                    <Typography variant="body2" fontWeight="medium">
                      {newCategoryName}
                    </Typography>
                  </Box>
                </Box>
              )}

              <Button
                variant="contained"
                fullWidth
                onClick={handleAddCategory}
                disabled={!newCategoryName.trim()}
                sx={{
                  backgroundColor: CustomTheme.palette.primary.main,
                  color: CustomTheme.palette.text.primary,
                  "&:hover": {
                    backgroundColor: CustomTheme.palette.primary.dark,
                  },
                  py: 1.5,
                  fontSize: "1rem",
                }}
              >
                Save Category
              </Button>
            </DialogContent>
          </Dialog>

          {/* Add Expense Dialog */}
          <Dialog
            open={openExpenseForm}
            onClose={() => setOpenExpenseForm(false)}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                backgroundColor: CustomTheme.palette.background.paper,
                borderRadius: CustomTheme.shape.borderRadius,
              },
            }}
          >
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: CustomTheme.palette.text.primary,
              }}
            >
              Add expense to {selectedCategory?.label}
              <IconButton onClick={() => setOpenExpenseForm(false)}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DatePicker
                label="Date"
                value={date}
                onChange={(newDate) => setDate(newDate)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: { mb: 2, mt: 1 },
                  },
                }}
              />
              <TextField
                label="Amount"
                type="number"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: "$",
                }}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ mb: 3 }}
                placeholder="Enter expense description..."
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleAddExpense}
                disabled={!amount || !date}
                sx={{
                  backgroundColor: CustomTheme.palette.primary.main,
                  color: CustomTheme.palette.text.primary,
                  "&:hover": {
                    backgroundColor: CustomTheme.palette.primary.dark,
                  },
                  py: 1.5,
                  fontSize: "1rem",
                }}
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
