import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

import React from "react";
import { Box, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Gauge } from "@mui/x-charts/Gauge";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const c = {
  primary: "#4f46e5",
  primarySoft: "#eef2ff",
  surface: "#ffffff",
  surfaceAlt: "#f8fafc",
  border: "#e2e8f0",
  text: "#0f172a",
  muted: "#64748b",
};

const cardSx = {
  borderRadius: 6,
  border: `1px solid ${c.border}`,
  boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)",
  backgroundColor: c.surface,
};

const projectsBarData = [3, 1, 1];

const skillLevels = [
  { label: "HTML & CSS", value: 90 },
  { label: "Tailwind CSS", value: 80 },
  { label: "JavaScript", value: 75 },
  { label: "React JS", value: 70 },
];

const skillsDistribution = [
  { id: 0, value: 58, label: "Frontend", color: "#4f46e5" },
  { id: 1, value: 17, label: "Backend", color: "#0ea5e9" },
  { id: 2, value: 25, label: "Tools", color: "#f59e0b" },
];

const updates = [
  "Currently in 3rd year BSIT specializing in Mobile and Web Application Development at National University Manila.",
  "Actively building projects with React, Vite, and Tailwind CSS while documenting the journey through articles.",
  "Working towards full-stack development — next up is Node.js, databases, and backend architecture.",
];

const tableColumns = [
  { field: "id", headerName: "#", width: 60 },
  { field: "project", headerName: "Project", flex: 1, minWidth: 200 },
  { field: "stack", headerName: "Stack", width: 200 },
  { field: "status", headerName: "Status", width: 130 },
  { field: "notes", headerName: "Notes", flex: 1, minWidth: 220 },
];

const tableRows = [
  { id: 1, project: "Portfolio Website", stack: "React · Tailwind · Vite", status: "Completed", notes: "Personal portfolio showcasing projects, skills, and blog posts" },
  { id: 2, project: "Blog Platform", stack: "React · React Router", status: "Completed", notes: "Multi-page blog app with dynamic routing and reusable card components" },
  { id: 3, project: "UI Component Library", stack: "React · Tailwind CSS", status: "In Progress", notes: "Reusable buttons, cards, and navbars built for consistency" },
  { id: 4, project: "Student Planner App", stack: "React · Mobile", status: "Completed", notes: "Task-focused interface concept for student productivity" },
  { id: 5, project: "BIYA HERO — Capstone", stack: "React · Prescriptive Analytics", status: "In Progress", notes: "Crowdsourcing app for commuters with DOTr research outreach" },
];

function DashboardPage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

      {/* Bar Chart + Skill Gauges */}
      <Stack direction={{ xs: "column", xl: "row" }} spacing={2.5}>
        <Card sx={{ ...cardSx, flex: 1.2 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: c.text }}>
              Projects by type
            </Typography>
            <Typography sx={{ mt: 0.75, color: c.muted }}>
              Breakdown of portfolio projects across Web, Mobile, and UI/UX.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <BarChart
                height={300}
                borderRadius={8}
                grid={{ horizontal: true }}
                xAxis={[{ data: ["Web", "Mobile", "UI/UX"], scaleType: "band" }]}
                yAxis={[{ min: 0, max: 4 }]}
                series={[{ data: projectsBarData, color: c.primary, label: "Projects" }]}
                sx={{
                  "& .MuiChartsAxis-line, & .MuiChartsAxis-tick": { stroke: c.border },
                  "& .MuiChartsAxis-tickLabel": { fill: c.muted },
                  "& .MuiChartsGrid-line": { stroke: alpha(c.border, 0.9) },
                }}
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ ...cardSx, flex: 0.8 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: c.text }}>
              Skill confidence
            </Typography>
            <Typography sx={{ mt: 0.75, color: c.muted }}>
              Self-assessed confidence levels across core technologies.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row", xl: "column" }} spacing={2} sx={{ mt: 2 }}>
              {skillLevels.map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    flex: 1,
                    borderRadius: 5,
                    backgroundColor: c.surfaceAlt,
                    border: `1px solid ${c.border}`,
                    px: 2,
                    py: 2.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 700, color: c.text }}>{item.label}</Typography>
                    <Typography sx={{ color: c.muted, fontSize: "0.82rem" }}>{item.value}% confidence</Typography>
                  </Box>
                  <Gauge
                    width={90}
                    height={90}
                    value={item.value}
                    innerRadius="70%"
                    outerRadius="100%"
                    cornerRadius="50%"
                    sx={{
                      "& .MuiGauge-valueArc": { fill: c.primary },
                      "& .MuiGauge-referenceArc": { fill: c.primarySoft },
                      "& text": { fill: c.text, fontWeight: 700 },
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      {/* Pie Chart + Updates */}
      <Stack direction={{ xs: "column", xl: "row" }} spacing={2.5}>
        <Card sx={{ ...cardSx, flex: 1 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: c.text }}>
              Skills distribution
            </Typography>
            <Typography sx={{ mt: 0.75, color: c.muted }}>
              How my skill set breaks down across frontend, backend, and tools.
            </Typography>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "flex-start", md: "center" }} sx={{ mt: 2 }}>
              <PieChart
                height={250}
                width={280}
                slotProps={{ legend: { hidden: true } }}
                series={[{ innerRadius: 55, outerRadius: 95, paddingAngle: 3, cornerRadius: 6, data: skillsDistribution }]}
              />
              <Stack spacing={1.5} sx={{ width: "100%" }}>
                {skillsDistribution.map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 1.5,
                      borderRadius: 4,
                      backgroundColor: c.surfaceAlt,
                      border: `1px solid ${c.border}`,
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
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ ...cardSx, flex: 1 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: c.text }}>
              Where I'm at
            </Typography>
            <Typography sx={{ mt: 0.75, color: c.muted }}>
              Honest notes on where I am in my dev journey right now.
            </Typography>
            <Stack spacing={1.5} sx={{ mt: 2.5 }}>
              {updates.map((update, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    borderRadius: 4,
                    border: `1px solid ${c.border}`,
                    backgroundColor: index === 0 ? c.primarySoft : c.surfaceAlt,
                  }}
                >
                  <Typography sx={{ fontWeight: 600, color: c.text, fontSize: "0.82rem" }}>
                    {["Currently", "Building", "Next up"][index]}
                  </Typography>
                  <Typography sx={{ mt: 0.5, color: c.muted, lineHeight: 1.7, fontSize: "0.88rem" }}>
                    {update}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      {/* Projects Table */}
      <Card sx={cardSx}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: c.text }}>
            My projects
          </Typography>
          <Typography sx={{ mt: 0.75, color: c.muted }}>
            All projects I've built or am currently working on.
          </Typography>
          <Box sx={{ mt: 2, height: 360 }}>
            <DataGrid
              rows={tableRows}
              columns={tableColumns}
              pageSizeOptions={[5]}
              initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
              disableRowSelectionOnClick
              hideFooterSelectedRowCount
              sx={{
                border: "none",
                color: c.text,
                "& .MuiDataGrid-columnHeaders": { backgroundColor: c.surfaceAlt, borderBottom: `1px solid ${c.border}` },
                "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 700 },
                "& .MuiDataGrid-cell": { borderBottom: `1px solid ${alpha(c.border, 0.9)}` },
                "& .MuiDataGrid-row:hover": { backgroundColor: alpha(c.primary, 0.04) },
                "& .MuiDataGrid-footerContainer": { borderTop: `1px solid ${c.border}` },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Map */}
      <Card sx={{ ...cardSx, overflow: "hidden" }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: c.text }}>
              Based in Manila
            </Typography>
            <Typography sx={{ mt: 0.75, color: c.muted }}>
              National University Manila · Sampaloc, Manila, Philippines
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ height: 420, width: "100%" }}>
            <MapContainer center={[14.6042, 120.9822]} zoom={15} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[14.6042, 120.9822]}>
                <Popup>National University Manila<br />Cindy Surla · BSIT Student</Popup>
              </Marker>
            </MapContainer>
          </Box>
        </CardContent>
      </Card>

    </Box>
  );
}

export default DashboardPage;
