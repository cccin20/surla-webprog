import React from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

const c = {
  primary: "#4f46e5",
  primarySoft: "#eef2ff",
  surface: "#ffffff",
  surfaceAlt: "#f8fafc",
  border: "#e2e8f0",
  text: "#0f172a",
  muted: "#64748b",
  sky: "#0ea5e9",
  warning: "#f59e0b",
};

const cardSx = {
  borderRadius: 6,
  border: `1px solid ${c.border}`,
  boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)",
  backgroundColor: c.surface,
};

const monthlyOutput = [1, 2, 1, 3, 4, 3];

const roleDistribution = [
  { id: 0, value: 58, label: "Frontend", color: c.primary },
  { id: 1, value: 17, label: "Backend", color: c.sky },
  { id: 2, value: 25, label: "UI/UX", color: c.warning },
];

function ReportsPage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Stack direction={{ xs: "column", xl: "row" }} spacing={2.5}>
        <Card sx={{ ...cardSx, flex: 1.15 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: c.text }}>
              Monthly output
            </Typography>
            <Typography sx={{ mt: 0.75, color: c.muted }}>
              Lab activities and projects completed each month from January to June 2025.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <BarChart
                height={320}
                borderRadius={8}
                grid={{ horizontal: true }}
                xAxis={[{ data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], scaleType: "band" }]}
                series={[{ data: monthlyOutput, label: "Completed outputs", color: c.primary }]}
                sx={{
                  "& .MuiChartsAxis-line, & .MuiChartsAxis-tick": { stroke: c.border },
                  "& .MuiChartsAxis-tickLabel": { fill: c.muted },
                  "& .MuiChartsGrid-line": { stroke: alpha(c.border, 0.9) },
                }}
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ ...cardSx, flex: 0.85 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: c.text }}>
              Skill focus breakdown
            </Typography>
            <Typography sx={{ mt: 0.75, color: c.muted }}>
              Where my portfolio work and learning time actually goes.
            </Typography>
            <Stack alignItems="center" sx={{ mt: 1 }}>
              <PieChart
                width={320}
                height={280}
                slotProps={{ legend: { hidden: true } }}
                series={[{ innerRadius: 58, outerRadius: 100, paddingAngle: 3, cornerRadius: 6, data: roleDistribution }]}
              />
            </Stack>
            <Stack spacing={1.5}>
              {roleDistribution.map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1.5,
                    borderRadius: 4,
                    border: `1px solid ${c.border}`,
                    backgroundColor: c.surfaceAlt,
                  }}
                >
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: item.color }} />
                    <Typography sx={{ fontWeight: 600, color: c.text }}>{item.label}</Typography>
                  </Stack>
                  <Typography sx={{ color: c.muted, fontWeight: 700 }}>{item.value}%</Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default ReportsPage;
