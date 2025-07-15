import React from "react";
import { monthlyExpenses, monthLabels } from "./webUsageStats";
import { LineChart } from "@mui/x-charts/LineChart";

const LineChartComp = () => {
  return (
    <LineChart
      series={[
        {
          curve: "natural",
          data: monthlyExpenses,
          label: "Monthly Expenses",
          color: "#1976d2",
        },
      ]}
      height={300}
      width={500}
      xAxis={[
        {
          data: monthLabels,
          label: "Month",
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
