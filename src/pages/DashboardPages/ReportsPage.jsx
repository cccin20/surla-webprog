import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

function ReportsPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
        {/* BAR CHART */}
        <Box>
          <Typography variant="h6">Monthly Sales</Typography>
          <BarChart
            series={[
              { data: [10, 20, 30, 40, 50], label: "Sales" },
            ]}
            height={300}
            xAxis={[
              {
                data: ["Jan", "Feb", "Mar", "Apr", "May"],
                scaleType: "band",
              },
            ]}
          />
        </Box>

        {/* PIE CHART */}
        <Box>
          <Typography variant="h6">User Distribution</Typography>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "Admin" },
                  { id: 1, value: 20, label: "Users" },
                  { id: 2, value: 30, label: "Guests" },
                ],
              },
            ]}
            width={300}
            height={300}
          />
        </Box>
      </Stack>
    </>
  );
}

export default ReportsPage;