import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import DateDropdown from "./DateDropdown.jsx";
import catwithcoin from "../../assets/coinwithcat.png";
import CustomTheme from "../../theme/CustomTheme.jsx";

const SpendingOverview = ({
  selectedDate,
  spendingData,
  isMobile,
  onDateChange,
}) => {
  const getCurrentSpending = () => {
    switch (selectedDate) {
      case "Day":
        return spendingData[selectedDate]?.Daily || "$0";
      case "Week":
        return spendingData[selectedDate]?.Weekly || "$0";
      case "Month":
        return spendingData[selectedDate]?.Monthly || "$0";
      case "Year":
        return spendingData[selectedDate]?.Yearly || "$0";
      default:
        return spendingData[selectedDate]?.Monthly || "$0";
    }
  };

  const getSpendingLabel = () => {
    switch (selectedDate) {
      case "Day":
        return "Today's Spending";
      case "Week":
        return "This Week's Spending";
      case "Month":
        return "This Month's Spending";
      case "Year":
        return "This Year's Spending";
      default:
        return "Total Spending";
    }
  };

  return (
    <Paper
      sx={{
        backgroundColor: CustomTheme.palette.background.paper,
        padding: CustomTheme.spacing(2),
        borderRadius: CustomTheme.shape.borderRadius,
        boxShadow: CustomTheme.shadows[2],
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        mb: 4,
        minHeight: "200px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: 2,
          backgroundColor: CustomTheme.palette.background.default,
          borderRadius: CustomTheme.shape.borderRadius,
          padding: CustomTheme.spacing(2),
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            flexGrow: 1,
            padding: CustomTheme.spacing(2),
          }}
        >
          <Typography
            variant={isMobile ? "h2" : "h1"}
            fontWeight="bold"
            color={CustomTheme.palette.text.primary}
            sx={{ mb: 1 }}
          >
            {getCurrentSpending()}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              color={CustomTheme.palette.text.primary}
            >
              {getSpendingLabel()}
            </Typography>
            <DateDropdown selectedDate={selectedDate} onChange={onDateChange} />
          </Box>
        </Box>
        <Box
          sx={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={catwithcoin}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "contain",
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default SpendingOverview;
