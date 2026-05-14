import React, { useMemo, useState } from "react";
import {
  Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select,
  Stack, Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { BarChart } from "@mui/x-charts/BarChart";
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";
import PrintIcon from "@mui/icons-material/Print";
import FilterListIcon from "@mui/icons-material/FilterList";
import AssessmentIcon from "@mui/icons-material/Assessment";

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
const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const fullMonthLabels = ["January", "February", "March", "April", "May", "June"];

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

const focusOptions = ["All", ...new Set(reportRows.map((row) => row.focus))];

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const buildReportHtml = ({ rows, rangeLabel, focusLabel, totals, printDate }) => {
  const maxOutput = Math.max(...rows.map((row) => row.output), 1);
  const totalRole = roleDistribution.reduce((sum, item) => sum + item.value, 0);
  const completionRate = Math.min(Math.round((totals.output / 17) * 100), 100);

  const barItems = rows
    .map((row) => {
      const height = Math.max((row.output / maxOutput) * 130, 12);
      return `
        <div class="bar-item">
          <div class="bar-track">
            <div class="bar" style="height: ${height}px;"></div>
          </div>
          <span>${escapeHtml(row.month.slice(0, 3))}</span>
        </div>
      `;
    })
    .join("");

  const roleLegend = roleDistribution
    .map((item) => `
      <div class="legend-row">
        <span><i style="background: ${item.color};"></i>${escapeHtml(item.label)}</span>
        <strong>${item.value}%</strong>
      </div>
    `)
    .join("");

  const tableRows = rows
    .map((row) => `
      <tr>
        <td>${row.id}</td>
        <td>${escapeHtml(row.month)}</td>
        <td>${row.output}</td>
        <td>${escapeHtml(row.focus)}</td>
      </tr>
    `)
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Portfolio Reports</title>
      <style>
        @page { size: A4; margin: 14mm; }
        * { box-sizing: border-box; }
        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          color: #0f172a;
          background: #ffffff;
        }
        .report {
          width: 100%;
        }
        .header {
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 14px;
          margin-bottom: 18px;
        }
        h1 {
          margin: 0 0 8px;
          color: #4f46e5;
          font-size: 26px;
        }
        p {
          margin: 0;
          color: #64748b;
          font-size: 12px;
          line-height: 1.5;
        }
        .meta {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin: 18px 0;
        }
        .meta-card, .section {
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 14px;
          break-inside: avoid;
        }
        .meta-card span {
          display: block;
          color: #64748b;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .meta-card strong {
          display: block;
          margin-top: 4px;
          font-size: 18px;
        }
        .grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 14px;
          margin-bottom: 14px;
        }
        h2 {
          margin: 0 0 4px;
          font-size: 15px;
        }
        .bar-chart {
          height: 190px;
          display: flex;
          align-items: flex-end;
          gap: 16px;
          border-left: 1px solid #cbd5e1;
          border-bottom: 1px solid #cbd5e1;
          padding: 18px 12px 0;
          margin-top: 12px;
        }
        .bar-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          font-size: 10px;
          color: #475569;
        }
        .bar-track {
          height: 135px;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .bar {
          width: 34px;
          background: #4f46e5;
          border-radius: 6px 6px 0 0;
        }
        .donut {
          width: 150px;
          height: 150px;
          margin: 14px auto;
          border-radius: 50%;
          background: conic-gradient(#4f46e5 0 58%, #0ea5e9 58% 75%, #f59e0b 75% 100%);
          position: relative;
        }
        .donut::after {
          content: "";
          position: absolute;
          inset: 38px;
          border-radius: 50%;
          background: #ffffff;
        }
        .legend-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 7px 0;
          border-top: 1px solid #e2e8f0;
          font-size: 12px;
        }
        .legend-row span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }
        .legend-row i {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }
        .gauge-wrap {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .gauge {
          width: 180px;
          height: 90px;
          border-radius: 180px 180px 0 0;
          background: conic-gradient(from 270deg, #4f46e5 0 ${completionRate * 0.5}%, #e2e8f0 ${completionRate * 0.5}% 50%, transparent 50% 100%);
          position: relative;
          overflow: hidden;
        }
        .gauge::after {
          content: "";
          position: absolute;
          left: 32px;
          right: 32px;
          bottom: 0;
          height: 58px;
          border-radius: 100px 100px 0 0;
          background: #ffffff;
        }
        .gauge-value {
          font-size: 34px;
          font-weight: 700;
          color: #0f172a;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 12px;
          font-size: 11px;
        }
        th, td {
          border: 1px solid #e2e8f0;
          padding: 8px;
          text-align: left;
        }
        th {
          background: #f8fafc;
          font-weight: 700;
        }
      </style>
    </head>
    <body>
      <main class="report">
        <section class="header">
          <h1>Portfolio Reports</h1>
          <p>Generated reports, skill focus breakdown, completion rate, and monthly output.</p>
          <p>Prepared on ${escapeHtml(printDate)} | Range: ${escapeHtml(rangeLabel)} | Focus: ${escapeHtml(focusLabel)}</p>
        </section>

        <section class="meta">
          <div class="meta-card"><span>Total outputs</span><strong>${totals.output}</strong></div>
          <div class="meta-card"><span>Months covered</span><strong>${rows.length}</strong></div>
          <div class="meta-card"><span>Completion</span><strong>${completionRate}%</strong></div>
          <div class="meta-card"><span>Focus areas</span><strong>${roleDistribution.length}</strong></div>
        </section>

        <section class="grid">
          <div class="section">
            <h2>Monthly output</h2>
            <p>Lab activities and projects completed for the selected reporting range.</p>
            <div class="bar-chart">${barItems}</div>
          </div>

          <div class="section">
            <h2>Skill focus breakdown</h2>
            <p>Where my portfolio work and learning time goes.</p>
            <div class="donut"></div>
            ${roleLegend}
          </div>
        </section>

        <section class="section">
          <h2>Completion rate</h2>
          <p>Current percentage of portfolio requirements completed on time.</p>
          <div class="gauge-wrap">
            <div class="gauge"></div>
            <div class="gauge-value">${completionRate}%</div>
          </div>
        </section>

        <section class="section" style="margin-top: 14px;">
          <h2>Monthly report summary</h2>
          <p>A table view of completed outputs and their main learning focus.</p>
          <table>
            <thead>
              <tr><th>#</th><th>Month</th><th>Completed Outputs</th><th>Main Focus</th></tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>
        </section>
      </main>
    </body>
    </html>
  `;
};

function ReportsPage() {
  const [startMonth, setStartMonth] = useState("January");
  const [endMonth, setEndMonth] = useState("June");
  const [focusFilter, setFocusFilter] = useState("All");
  const [generatedFilters, setGeneratedFilters] = useState({
    startMonth: "January",
    endMonth: "June",
    focusFilter: "All",
  });

  const filteredRows = useMemo(() => {
    const startIndex = fullMonthLabels.indexOf(generatedFilters.startMonth);
    const endIndex = fullMonthLabels.indexOf(generatedFilters.endMonth);
    const min = Math.min(startIndex, endIndex);
    const max = Math.max(startIndex, endIndex);

    return reportRows.filter((row) => {
      const monthIndex = fullMonthLabels.indexOf(row.month);
      const matchesRange = monthIndex >= min && monthIndex <= max;
      const matchesFocus =
        generatedFilters.focusFilter === "All" || row.focus === generatedFilters.focusFilter;

      return matchesRange && matchesFocus;
    });
  }, [generatedFilters]);

  const filteredMonthlyOutput = fullMonthLabels.map((month) => {
    const match = filteredRows.find((row) => row.month === month);
    return match ? match.output : 0;
  });

  const totalOutput = filteredRows.reduce((sum, row) => sum + row.output, 0);
  const completionRate = Math.min(Math.round((totalOutput / 17) * 100), 100);

  const rangeLabel =
    generatedFilters.startMonth === generatedFilters.endMonth
      ? generatedFilters.startMonth
      : `${generatedFilters.startMonth} - ${generatedFilters.endMonth}`;

  const handleGenerate = () => {
    setGeneratedFilters({ startMonth, endMonth, focusFilter });
  };

  const handlePrint = () => {
    const printDate = new Date().toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
    });

    const printWindow = window.open("", "_blank", "width=1200,height=900");

    if (!printWindow) {
      return;
    }

    printWindow.document.write(buildReportHtml({
      rows: filteredRows,
      rangeLabel,
      focusLabel: generatedFilters.focusFilter,
      totals: { output: totalOutput },
      printDate,
    }));

    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

      <Card sx={cardSx}>
        <CardContent sx={{ p: 2.5 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }}>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Start Month</InputLabel>
              <Select value={startMonth} label="Start Month" onChange={(e) => setStartMonth(e.target.value)}>
                {fullMonthLabels.map((month) => (
                  <MenuItem key={month} value={month}>{month}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>End Month</InputLabel>
              <Select value={endMonth} label="End Month" onChange={(e) => setEndMonth(e.target.value)}>
                {fullMonthLabels.map((month) => (
                  <MenuItem key={month} value={month}>{month}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 230 }}>
              <InputLabel>Focus</InputLabel>
              <Select value={focusFilter} label="Focus" onChange={(e) => setFocusFilter(e.target.value)}>
                {focusOptions.map((focus) => (
                  <MenuItem key={focus} value={focus}>{focus}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={handleGenerate}
              sx={{ borderRadius: 3, textTransform: "none", fontWeight: 700 }}
            >
              Generate
            </Button>

            <Button
              variant="contained"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              disabled={!filteredRows.length}
              sx={{
                bgcolor: c.primary, borderRadius: 3,
                textTransform: "none", fontWeight: 700, px: 3,
                "&:hover": { bgcolor: "#3730a3" },
              }}
            >
              Print Report as PDF
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2, color: c.muted }}>
            <AssessmentIcon fontSize="small" />
            <Typography variant="body2">
              Showing {filteredRows.length} report rows for {rangeLabel}
              {generatedFilters.focusFilter !== "All" ? `, ${generatedFilters.focusFilter}` : ""}.
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <div>
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
                  xAxis={[{ data: monthLabels, scaleType: "band" }]}
                  series={[{ data: filteredMonthlyOutput, label: "Completed outputs", color: c.primary }]}
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
                  value={completionRate}
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
                  rows={filteredRows}
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