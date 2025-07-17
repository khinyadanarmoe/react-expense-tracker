import React, { useState } from "react";
import { Box, Typography, Grid, useMediaQuery } from "@mui/material";
import useExpenseData from "../hooks/userExpenseData.jsx";
import { useLineChartData, usePieChartData } from "../hooks/userChartData.jsx";
import SpendingOverview from "../components/dashboard/SpendingOverview.jsx";
import ChartContainer from "../components/dashboard/ChartContainer.jsx";
import CustomTheme from "../theme/CustomTheme.jsx";
import dummyExpenses from "../data/dummy_data.jsx";

const Dashboard = () => {
  const isMobile = useMediaQuery(CustomTheme.breakpoints.down("sm"));
  const [lineChartFilter, setLineChartFilter] = useState("Monthly");
  const [pieChartFilter, setPieChartFilter] = useState("Monthly");
  const [selectedDate, setSelectedDate] = useState("Month");

  // Filtered expenses for SpendingOverview only
  const { filteredExpenses } = useExpenseData(selectedDate);

  // Charts use ALL expenses, not filtered by date dropdown
  const lineChartData = useLineChartData(dummyExpenses, lineChartFilter);
  const pieChartData = usePieChartData(dummyExpenses, pieChartFilter);

  // Calculate spending data from filtered expenses (for SpendingOverview only)
  const totalSpending = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const spendingData = {
    Day: { Monthly: `$${totalSpending.toFixed(2)}` },
    Week: { Monthly: `$${totalSpending.toFixed(2)}` },
    Month: { Monthly: `$${totalSpending.toFixed(2)}` },
    Year: { Monthly: `$${totalSpending.toFixed(2)}` },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: CustomTheme.palette.background.default,
        p: { xs: 2, sm: 3 },
      }}
    >
      <SpendingOverview
        selectedDate={selectedDate}
        spendingData={spendingData}
        isMobile={isMobile}
        onDateChange={setSelectedDate}
      />

      <Typography
        variant={isMobile ? "h5" : "h4"}
        fontWeight="600"
        color={CustomTheme.palette.text.primary}
        sx={{ mt: 4, mb: 3 }}
      >
        Your Expenses Visualization Charts
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: "100%" }}>
            <ChartContainer
              type="line"
              data={lineChartData}
              filter={lineChartFilter}
              onFilterChange={setLineChartFilter}
              title={`${lineChartFilter} Expenses`}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: "100%" }}>
            <ChartContainer
              type="pie"
              data={pieChartData}
              filter={pieChartFilter}
              onFilterChange={setPieChartFilter}
              title={`${pieChartFilter} Spending Categories`}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
