import React from "react";
import { Button, Box } from "@mui/material";
import CustomTheme from "../../theme/CustomTheme.jsx";

const FilterButtons = ({ currentFilter, onFilterChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        mb: 2,
        justifyContent: "center",
        minHeight: "50px", // Fixed height for button row
        alignItems: "center",
      }}
    >
      {["Daily", "Weekly", "Monthly"].map((period) => (
        <Button
          key={period}
          variant={currentFilter === period ? "contained" : "outlined"}
          onClick={() => onFilterChange(period)}
          sx={{
            minWidth: { xs: "80px", md: "100px" }, // Responsive using breakpoints
            height: "40px", // Fixed button height
            backgroundColor:
              currentFilter === period
                ? CustomTheme.palette.primary.main
                : "transparent",
            color:
              currentFilter === period
                ? CustomTheme.palette.text.primary
                : CustomTheme.palette.text.primary,
            borderColor: CustomTheme.palette.primary.main,
            fontSize: "0.875rem", // Fixed font size
            "&:hover": {
              backgroundColor:
                currentFilter === period
                  ? CustomTheme.palette.primary.dark
                  : CustomTheme.palette.primary.main,
            },
          }}
        >
          {period}
        </Button>
      ))}
    </Box>
  );
};

export default FilterButtons;
