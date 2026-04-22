import React from "react";
import { Avatar, Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

const c = {
  primary: "#4f46e5",
  primarySoft: "#eef2ff",
  surface: "#ffffff",
  surfaceAlt: "#f8fafc",
  border: "#e2e8f0",
  text: "#0f172a",
  muted: "#64748b",
  success: "#16a34a",
  warning: "#f59e0b",
};

const cardSx = {
  borderRadius: 6,
  border: `1px solid ${c.border}`,
  boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)",
  backgroundColor: c.surface,
};

const userRows = [
  { id: 1, firstName: "Cindy", lastName: "Surla", role: "Frontend Developer", level: "Intermediate" },
  { id: 2, firstName: "Angelo", lastName: "Reyes", role: "Classmate · Group Mate", level: "Intermediate" },
  { id: 3, firstName: "Sofia", lastName: "Dela Cruz", role: "UI/UX Collaborator", level: "Beginner" },
  { id: 4, firstName: "Marcus", lastName: "Tan", role: "Backend Support", level: "Advanced" },
  { id: 5, firstName: "Rina", lastName: "Villanueva", role: "Capstone Team Member", level: "Intermediate" },
];

const levelChipSx = (level) => {
  if (level === "Advanced") return { bgcolor: alpha(c.success, 0.12), color: c.success, border: `1px solid ${alpha(c.success, 0.18)}` };
  if (level === "Intermediate") return { bgcolor: alpha(c.warning, 0.12), color: "#b45309", border: `1px solid ${alpha(c.warning, 0.18)}` };
  return { bgcolor: "#f1f5f9", color: c.muted, border: `1px solid ${c.border}` };
};

const columns = [
  { field: "id", headerName: "#", width: 60 },
  {
    field: "firstName",
    headerName: "Name",
    flex: 1.2,
    minWidth: 200,
    renderCell: (params) => (
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ py: 1 }}>
        <Avatar sx={{ bgcolor: c.primary, width: 36, height: 36 }}>
          {(params.row.firstName[0] + params.row.lastName[0]).toUpperCase()}
        </Avatar>
        <Box>
          <Typography sx={{ fontWeight: 700, color: c.text }}>
            {params.row.firstName} {params.row.lastName}
          </Typography>
          <Typography sx={{ color: c.muted, fontSize: "0.82rem" }}>{params.row.role}</Typography>
        </Box>
      </Stack>
    ),
  },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "role", headerName: "Role", flex: 1, minWidth: 200 },
  {
    field: "level",
    headerName: "Level",
    width: 150,
    renderCell: (params) => (
      <Chip label={params.value} size="small" sx={{ fontWeight: 700, borderRadius: 999, ...levelChipSx(params.value) }} />
    ),
  },
];

function UsersPage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Card sx={cardSx}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: c.text }}>
            People I've worked with
          </Typography>
          <Typography sx={{ mt: 0.75, color: c.muted }}>
            Classmates, collaborators, and teammates from academic and project work.
          </Typography>
          <Box sx={{ mt: 2, height: 500 }}>
            <DataGrid
              rows={userRows}
              columns={columns}
              pageSizeOptions={[5]}
              initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
              disableRowSelectionOnClick
              hideFooterSelectedRowCount
              rowHeight={76}
              sx={{
                border: "none",
                color: c.text,
                "& .MuiDataGrid-columnHeaders": { backgroundColor: c.surfaceAlt, borderBottom: `1px solid ${c.border}` },
                "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 700 },
                "& .MuiDataGrid-cell": { borderBottom: `1px solid ${alpha(c.border, 0.9)}`, alignItems: "center" },
                "& .MuiDataGrid-row:hover": { backgroundColor: alpha(c.primary, 0.04) },
                "& .MuiDataGrid-footerContainer": { borderTop: `1px solid ${c.border}` },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UsersPage;
