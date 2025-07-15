import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PieChartComp from "../components/PieChartComp.jsx";
import LineChartComp from "../components/LineChartComp.jsx";

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Charts Section */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 2, height: { xs: "auto", md: 350 } }}>
            <Typography variant="h6" gutterBottom>
              Expense Categories
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                height: { xs: "auto", md: 280 },
              }}
            >
              <PieChartComp />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 2, height: { xs: "auto", md: 350 } }}>
            <Typography variant="h6" gutterBottom>
              Monthly Trends
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                height: { xs: "auto", md: 280 },
                overflow: "auto",
              }}
            >
              <LineChartComp />
            </Box>
          </Paper>
        </Grid>

        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: "center", minHeight: 120 }}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Total Expenses
            </Typography>
            <Typography variant={isMobile ? "h5" : "h4"} color="primary">
              $1,400
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: "center", minHeight: 120 }}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              This Month
            </Typography>
            <Typography variant={isMobile ? "h5" : "h4"} color="secondary">
              $650
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center", minHeight: 120 }}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Transactions
            </Typography>
            <Typography variant={isMobile ? "h5" : "h4"}>28</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
