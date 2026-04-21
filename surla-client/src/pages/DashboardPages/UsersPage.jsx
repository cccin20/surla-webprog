import React from "react";
import { Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "age", headerName: "Age", width: 110 },
];

const rows = [
  { id: 1, firstName: "Jon", lastName: "Snow", age: 14 },
  { id: 2, firstName: "Cersei", lastName: "Lannister", age: 31 },
  { id: 3, firstName: "Jaime", lastName: "Lannister", age: 31 },
  { id: 4, firstName: "Arya", lastName: "Stark", age: 11 },
  { id: 5, firstName: "Daenerys", lastName: "Targaryen", age: 25 },
];

function UsersPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
        />
      </Box>
    </>
  );
}

export default UsersPage;