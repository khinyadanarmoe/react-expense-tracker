import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { expenseCategories, valueFormatter } from "./webUsageStats";

export default function PieChartComp() {
  return (
    <PieChart
      series={[
        {
          data: expenseCategories,
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          valueFormatter,
        },
      ]}
      height={200}
      width={200}
    />
  );
}
