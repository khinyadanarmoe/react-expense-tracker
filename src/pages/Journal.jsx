import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { expenseCategories } from "../components/webUsageStats";

const Journal = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Extract category labels for the autocomplete
  const categoryOptions = expenseCategories.map((category) => category.label);

  const handleSubmit = () => {
    if (selectedCategory && amount && date) {
      console.log({
        category: selectedCategory,
        amount: parseFloat(amount),
        description,
        date: date.toISOString(),
      });
      // Reset form
      setSelectedCategory(null);
      setAmount("");
      setDescription("");
      setDate(new Date());
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="md">
        <Box>
          <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
            Add New Expense
          </Typography>

          <Paper
            sx={{ p: { xs: 2, sm: 3 }, maxWidth: { xs: "100%", sm: 600 } }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Autocomplete
                  value={selectedCategory}
                  onChange={(event, newValue) => setSelectedCategory(newValue)}
                  options={categoryOptions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Expense Category"
                      fullWidth
                      required
                      size={isMobile ? "medium" : "medium"}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  fullWidth
                  required
                  size={isMobile ? "medium" : "medium"}
                  InputProps={{
                    startAdornment: "$",
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Expense Date"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      required
                      size={isMobile ? "medium" : "medium"}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  multiline
                  rows={isMobile ? 2 : 3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  size={isMobile ? "medium" : "medium"}
                  placeholder="Optional description..."
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={!selectedCategory || !amount || !date}
                  size={isMobile ? "medium" : "large"}
                  fullWidth={isMobile}
                  sx={{
                    minWidth: { xs: "100%", sm: 150 },
                    py: { xs: 1.5, sm: 1 },
                  }}
                >
                  Add Expense
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default Journal;
