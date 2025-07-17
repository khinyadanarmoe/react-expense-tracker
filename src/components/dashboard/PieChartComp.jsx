import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useMediaQuery } from "@mui/material";
import CustomTheme from "../../theme/CustomTheme.jsx";

export default function PieChartComp({ data, filter }) {
  const isMobile = useMediaQuery(CustomTheme.breakpoints.down("md"));

  const chartWidth = isMobile ? 320 : 450;
  const chartHeight = isMobile ? 250 : 280;
  const margin = { top: 10, bottom: 10, left: 10, right: 10 };

  return (
    <PieChart
      series={[
        {
          data: data || [],
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          valueFormatter: (value) => `$${value.value}`,
        },
      ]}
      height={chartHeight}
      width={chartWidth}
      margin={margin}
    />
  );
}
