import React, { useRef } from "react";
import {
  Box, Button, Card, CardContent, Stack, Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { BarChart } from "@mui/x-charts/BarChart";
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";
import PrintIcon from "@mui/icons-material/Print";

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

const reportColumns = [
  { field: "id", headerName: "#", width: 70 },
  { field: "month", headerName: "Month", flex: 1, minWidth: 120 },
  { field: "output", headerName: "Completed Outputs", flex: 1, minWidth: 170 },
  { field: "focus", headerName: "Main Focus", flex: 1.4, minWidth: 190 },
];

const reportRows = [
  { id: 1, month: "January", output: 1, focus: "React components" },
  { id: 2, month: "February", output: 2, focus: "Routing and page layout" },
  { id: 3, month: "March", output: 1, focus: "Article content" },
  { id: 4, month: "April", output: 3, focus: "Dashboard UI" },
  { id: 5, month: "May", output: 4, focus: "Charts and user records" },
  { id: 6, month: "June", output: 3, focus: "Polish and validation" },
];

function ReportsPage() {
  const printRef = useRef();

  const handlePrint = () => {
    const printContent = printRef.current;

    if (!printContent) {
      return;
    }

    const printDate = new Date().toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
    });

    const printWindow = window.open("", "_blank", "width=1200,height=900");

    if (!printWindow) {
      return;
    }

    const headMarkup = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => node.outerHTML)
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Portfolio Reports</title>
        ${headMarkup}
      <style>
        @page {
          size: A4;
          margin: 16mm;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #ffffff;
          color: #0f172a;
        }

        .report-shell {
          padding: 28px;
        }

        .report-header {
          margin-bottom: 24px;
          padding-bottom: 14px;
          border-bottom: 1px solid #d1d5db;
        }

        .report-header h1 {
          margin: 0 0 6px;
          font-size: 28px;
          font-weight: 700;
          color: #4f46e5;
        }

        .report-header p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
          line-height: 1.5;
        }

        .report-content .MuiCard-root {
          box-shadow: none !important;
          border: 1px solid #e2e8f0;
          break-inside: avoid;
          page-break-inside: avoid;
        }

        .report-content .MuiCardContent-root {
          padding: 24px;
        }

        .report-content svg {
          max-width: 100%;
        }
      </style>
      </head>
      <body>
        <main class="report-shell">
          <header class="report-header">
            <h1>Portfolio Reports</h1>
            <p>Generated reports, skill focus breakdown, completion rate, and monthly output.</p>
            <p>Prepared on ${printDate}</p>
          </header>
          <section class="report-content">
            ${printContent.outerHTML}
          </section>
        </main>
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          sx={{
            bgcolor: c.primary, borderRadius: 3,
            textTransform: "none", fontWeight: 700, px: 3,
            "&:hover": { bgcolor: "#3730a3" },
          }}
        >
          Print Report as PDF
        </Button>
      </Box>

      <div ref={printRef}>
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
                  series={[{
                    innerRadius: 58, outerRadius: 100,
                    paddingAngle: 3, cornerRadius: 6,
                    data: roleDistribution,
                  }]}
                />
              </Stack>
              <Stack spacing={1.5}>
                {roleDistribution.map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      display: "flex", alignItems: "center",
                      justifyContent: "space-between", p: 1.5,
                      borderRadius: 4, border: `1px solid ${c.border}`,
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

        <Stack direction={{ xs: "column", lg: "row" }} spacing={2.5} sx={{ mt: 2.5 }}>
          <Card sx={{ ...cardSx, flex: 0.7 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: c.text }}>
                Completion rate
              </Typography>
              <Typography sx={{ mt: 0.75, color: c.muted }}>
                Current percentage of portfolio requirements completed on time.
              </Typography>
              <Stack alignItems="center" sx={{ mt: 2 }}>
                <Gauge
                  width={250}
                  height={180}
                  value={82}
                  startAngle={-110}
                  endAngle={110}
                  text={({ value }) => `${value}%`}
                />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ ...cardSx, flex: 1.3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: c.text }}>
                Monthly report summary
              </Typography>
              <Typography sx={{ mt: 0.75, color: c.muted }}>
                A table view of completed outputs and their main learning focus.
              </Typography>
              <Box sx={{ mt: 2, height: 350 }}>
                <DataGrid
                  rows={reportRows}
                  columns={reportColumns}
                  pageSizeOptions={[6]}
                  initialState={{ pagination: { paginationModel: { pageSize: 6 } } }}
                  disableRowSelectionOnClick
                  hideFooterSelectedRowCount
                  sx={{
                    border: "none",
                    color: c.text,
                    "& .MuiDataGrid-columnHeaders": { backgroundColor: c.surfaceAlt, borderBottom: `1px solid ${c.border}` },
                    "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 700 },
                    "& .MuiDataGrid-cell": { borderBottom: `1px solid ${alpha(c.border, 0.9)}` },
                    "& .MuiDataGrid-footerContainer": { borderTop: `1px solid ${c.border}` },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </div>
    </Box>
  );
}

export default ReportsPage;
