import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useMediaQuery } from "@mui/material";
import CustomTheme from "../../theme/CustomTheme.jsx";

const LineChartComp = ({ data, filter }) => {
  const isMobile = useMediaQuery(CustomTheme.breakpoints.down("md"));

  const getAxisLabel = () => {
    switch (filter) {
      case "Daily":
        return "Day";
      case "Weekly":
        return "Week";
      case "Monthly":
        return "Month";
      default:
        return "Period";
    }
  };

  const chartWidth = isMobile ? 320 : 450;
  const chartHeight = isMobile ? 250 : 280;

  return (
    <LineChart
      series={[
        {
          curve: "natural",
          data: data?.data || [],
          label: `${filter} Expenses`,
          color: CustomTheme.palette.primary.contrastText,
        },
      ]}
      height={chartHeight}
      width={chartWidth}
      xAxis={[
        {
          data: data?.labels || [],
          label: getAxisLabel(),
          scaleType: "point",
        },
      ]}
      yAxis={[
        {
          label: "Amount ($)",
          valueFormatter: (value) => `$${value}`,
        },
      ]}
      tooltip={{
        valueFormatter: (value) => `$${value}`,
      }}
      legend={{ position: "top" }}
      sx={{ margin: "0 auto" }}
      grid={{ vertical: true, horizontal: true }}
    />
  );
};

export default LineChartComp;
