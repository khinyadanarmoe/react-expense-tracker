import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import FilterButtons from "./FilterButtons";
import LineChartComp from "./LineChartComp";
import PieChartComp from "./PieChartComp";
import CustomTheme from "../../theme/CustomTheme.jsx";

const ChartContainer = ({ type, data, filter, onFilterChange, title }) => {
  const isMobile = useMediaQuery(CustomTheme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: CustomTheme.palette.background.paper,
        borderRadius: CustomTheme.shape.borderRadius,
        boxShadow: CustomTheme.shadows[1],
        overflow: "hidden",
        minHeight: { xs: "400px", md: "450px" },
        width: "100%",
        padding: { xs: 2, sm: 3 },
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: CustomTheme.shadows[3],
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box sx={{ pb: 2 }}>
        <Typography
          variant="h5"
          fontWeight="600"
          color={CustomTheme.palette.text.primary}
          sx={{ mb: 2 }}
        >
          {title}
        </Typography>
        <FilterButtons currentFilter={filter} onFilterChange={onFilterChange} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 1,
          backgroundColor: CustomTheme.palette.background.default,
          borderRadius: CustomTheme.shape.borderRadius,
        }}
      >
        {type === "line" ? (
          <LineChartComp filter={filter} data={data} />
        ) : (
          <PieChartComp filter={filter} data={data} />
        )}
      </Box>
    </Box>
  );
};

export default ChartContainer;
