import React, { useState } from "react";
import {
  Avatar, Box, Button, Card, CardContent, Chip,
  Dialog, DialogActions, DialogContent, DialogTitle,
  FormControl, IconButton, InputAdornment, InputLabel,
  MenuItem, Select, Stack, Switch, TextField,
  Tooltip, Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import usersSeed from "../../data/users.json";

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
  error: "#dc2626",
};

const cardSx = {
  borderRadius: 6,
  border: `1px solid ${c.border}`,
  boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)",
  backgroundColor: c.surface,
};

const initialUsers = usersSeed.map((user, index) => ({
  id: Number(user.id ?? index + 1),
  firstName: String(user.firstName ?? "").trim(),
  lastName: String(user.lastName ?? "").trim(),
  username: String(user.username ?? "").trim().toLowerCase(),
  email: String(user.email ?? "").trim().toLowerCase(),
  contact: String(user.contact ?? user.contactNumber ?? "").trim(),
  age: Number(user.age ?? 0),
  role: String(user.role ?? "").trim(),
  gender: String(user.gender ?? "").trim(),
  status: user.status ?? (user.isActive === false ? "inactive" : "active"),
  level: String(user.level ?? "Beginner").trim(),
  address: String(user.address ?? "").trim(),
}));

const emptyForm = {
  firstName: "", lastName: "", username: "", email: "",
  contact: "", age: "", password: "", role: "", gender: "",
  status: "active", level: "Beginner", address: "",
};

const passwordRequirements = [
  { test: (v) => v.length >= 8, message: "at least 8 characters" },
  { test: (v) => /[A-Z]/.test(v), message: "one uppercase letter" },
  { test: (v) => /[a-z]/.test(v), message: "one lowercase letter" },
  { test: (v) => /\d/.test(v), message: "one number" },
  { test: (v) => /[^A-Za-z0-9]/.test(v), message: "one special character" },
];

const passwordHelperText = "Use 8+ characters with uppercase, lowercase, number, and special character.";

const statusChipSx = (status) => {
  if (status === "active") return { bgcolor: alpha(c.success, 0.12), color: c.success, border: `1px solid ${alpha(c.success, 0.18)}` };
  return { bgcolor: alpha(c.error, 0.1), color: c.error, border: `1px solid ${alpha(c.error, 0.18)}` };
};

function validate(form, users, modalId) {
  const errors = {};

  if (!form.firstName.trim()) {
    errors.firstName = "First name is required.";
  } else if (form.firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters.";
  }

  if (!form.lastName.trim()) {
    errors.lastName = "Last name is required.";
  } else if (form.lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters.";
  }

  if (!form.username.trim()) {
    errors.username = "Username is required.";
  } else if (/\s/.test(form.username)) {
    errors.username = "Username must not contain spaces.";
  } else if (
    users.some((u) => u.username === form.username.toLowerCase() && u.id !== modalId)
  ) {
    errors.username = "Username already exists.";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  } else if (
    users.some((u) => u.email === form.email.toLowerCase() && u.id !== modalId)
  ) {
    errors.email = "Email address already exists.";
  }

  if (!form.contact.trim()) {
    errors.contact = "Contact number is required.";
  } else if (!/^\d{11}$/.test(form.contact)) {
    errors.contact = "Contact number must be exactly 11 digits.";
  }

  if (!form.age) {
    errors.age = "Age is required.";
  } else if (!/^\d+$/.test(String(form.age))) {
    errors.age = "Age must be a number only.";
  }

  if (!modalId || form.password) {
    const missing = passwordRequirements
      .filter((r) => !r.test(form.password))
      .map((r) => r.message);
    if (!form.password) {
      errors.password = "Password is required.";
    } else if (missing.length > 0) {
      errors.password = `Password needs ${missing.join(", ")}.`;
    }
  }

  if (!form.role.trim()) errors.role = "Role is required.";
  if (!form.gender) errors.gender = "Gender is required.";
  if (!form.address.trim()) errors.address = "Address is required.";

  return errors;
}

function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [modalId, setModalId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      u.firstName.toLowerCase().includes(q) ||
      u.lastName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q);
    const matchRole = !filterRole || u.role === filterRole;
    const matchGender = !filterGender || u.gender === filterGender;
    const matchStatus = !filterStatus || u.status === filterStatus;
    return matchSearch && matchRole && matchGender && matchStatus;
  });

  const uniqueRoles = [...new Set(users.map((u) => u.role))];

  const resetForm = () => {
    setForm(emptyForm);
    setErrors({});
  };

  const openModal = (user = null) => {
    if (user) {
      setModalId(user.id);
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        contact: user.contact,
        age: String(user.age),
        password: "",
        role: user.role,
        gender: user.gender,
        status: user.status,
        level: user.level,
        address: user.address ?? "",
      });
    } else {
      setModalId(null);
      resetForm();
    }
    setShowPassword(false);
    setDialogOpen(true);
  };

  const closeModal = () => {
    setDialogOpen(false);
    resetForm();
    setModalId(null);
    setShowPassword(false);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form, users, modalId);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (modalId) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === modalId
            ? {
                ...u, ...form,
                age: Number(form.age),
                username: form.username.toLowerCase(),
                email: form.email.toLowerCase(),
              }
            : u
        )
      );
    } else {
      const nextId = Math.max(...users.map((u) => u.id), 0) + 1;
      const newUser = {
        ...form,
        id: nextId,
        age: Number(form.age),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        username: form.username.trim().toLowerCase(),
        email: form.email.trim().toLowerCase(),
        contact: form.contact.trim(),
        role: form.role.trim(),
        address: form.address.trim(),
      };
      const newUsers = [...users, newUser];
      setUsers(newUsers);
      setSearch("");
      setFilterRole("");
      setFilterGender("");
      setFilterStatus("");
      const lastPage = Math.ceil(newUsers.length / paginationModel.pageSize) - 1;
      setPaginationModel((prev) => ({ ...prev, page: lastPage }));
    }

    closeModal();
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      )
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "firstName",
      headerName: "Full Name",
      flex: 1.2,
      minWidth: 210,
      renderCell: (params) => (
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ py: 1 }}>
          <Avatar sx={{ bgcolor: c.primary, width: 36, height: 36 }}>
            {(params.row.firstName[0] + params.row.lastName[0]).toUpperCase()}
          </Avatar>
          <Box>
            <Typography sx={{ fontWeight: 700, color: c.text }}>
              {params.row.firstName} {params.row.lastName}
            </Typography>
            <Typography sx={{ color: c.muted, fontSize: "0.78rem" }}>
              @{params.row.username}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    { field: "username", headerName: "Username", flex: 0.8, minWidth: 150 },
    { field: "role", headerName: "Role", flex: 1, minWidth: 160 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            fontWeight: 700, borderRadius: 999,
            textTransform: "capitalize",
            ...statusChipSx(params.value),
          }}
        />
      ),
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1.3,
      minWidth: 220,
      renderCell: (params) => (
        <Typography sx={{ color: c.text, fontSize: "0.9rem" }} noWrap>
          {params.value || "No address"}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 190,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            size="small"
            variant="outlined"
            onClick={() => openModal(params.row)}
            sx={{
              borderRadius: 1.5,
              textTransform: "uppercase",
              fontWeight: 700,
              minWidth: 58,
              px: 1.25,
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => toggleStatus(params.row.id)}
            sx={{
              borderRadius: 1.5,
              textTransform: "uppercase",
              fontWeight: 700,
              minWidth: 88,
              px: 1.25,
              bgcolor: params.row.status === "active" ? c.warning : c.success,
              "&:hover": {
                bgcolor: params.row.status === "active" ? "#d97706" : "#15803d",
              },
            }}
          >
            {params.row.status === "active" ? "Disable" : "Activate"}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Card sx={cardSx}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr auto" },
              alignItems: "center",
              columnGap: 4,
              rowGap: 2,
              mb: 3,
              width: "100%",
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: c.text }}>
                People I've worked with
              </Typography>
              <Typography sx={{ mt: 0.5, color: c.muted }}>
                Classmates, collaborators, and teammates from academic and project work.
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={() => openModal()}
              sx={{
                bgcolor: c.primary, borderRadius: 3,
                textTransform: "none", fontWeight: 700,
                whiteSpace: "nowrap", px: 3,
                minHeight: 44,
                boxShadow: "0 10px 22px rgba(79, 70, 229, 0.22)",
                justifySelf: { xs: "start", sm: "end" },
                "&:hover": {
                  bgcolor: "#3730a3",
                  boxShadow: "0 10px 22px rgba(55, 48, 163, 0.24)",
                },
              }}
            >
              Add User
            </Button>
          </Box>

          {/* Search + Filters */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 1.5 }}>
            <TextField
              placeholder="Search by name, email, or username…"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: c.muted, fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                flex: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  "& fieldset": { borderColor: c.border },
                  "&:hover fieldset": { borderColor: c.primary },
                },
              }}
            />
            <FormControl size="small" sx={{ flex: 1, minWidth: 140 }}>
              <InputLabel>Role</InputLabel>
              <Select value={filterRole} label="Role" onChange={(e) => setFilterRole(e.target.value)} sx={{ borderRadius: 3 }}>
                <MenuItem value="">All Roles</MenuItem>
                {uniqueRoles.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ flex: 1, minWidth: 120 }}>
              <InputLabel>Gender</InputLabel>
              <Select value={filterGender} label="Gender" onChange={(e) => setFilterGender(e.target.value)} sx={{ borderRadius: 3 }}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ flex: 1, minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select value={filterStatus} label="Status" onChange={(e) => setFilterStatus(e.target.value)} sx={{ borderRadius: 3 }}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Typography sx={{ color: c.muted, fontSize: "0.82rem" }}>
            Showing {filtered.length} of {users.length} users
          </Typography>

          <Box sx={{ mt: 2.5, height: 540 }}>
            <DataGrid
              rows={filtered}
              columns={columns}
              pageSizeOptions={[5]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
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
                "& .MuiDataGrid-virtualScroller": { overflowX: "auto" },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onClose={closeModal} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
        <DialogTitle sx={{ fontWeight: 700, color: c.text, px: 3, pt: 3, pb: 1 }}>
          {modalId ? "Edit User" : "Add User"}
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          <Stack spacing={2.25} sx={{ mt: 1 }}>

            {/* Row 1: First Name + Last Name */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="First Name" name="firstName" size="small" fullWidth
                value={form.firstName} onChange={handleChange}
                error={!!errors.firstName} helperText={errors.firstName || "At least 2 characters"}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
              <TextField
                label="Last Name" name="lastName" size="small" fullWidth
                value={form.lastName} onChange={handleChange}
                error={!!errors.lastName} helperText={errors.lastName || "At least 2 characters"}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Stack>

            {/* Row 2: Age + Gender */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Age" name="age" size="small" fullWidth
                value={form.age} onChange={handleChange}
                error={!!errors.age} helperText={errors.age || "Numbers only"}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
              <FormControl size="small" fullWidth error={!!errors.gender}>
                <InputLabel>Gender</InputLabel>
                <Select name="gender" value={form.gender} label="Gender" onChange={handleChange} sx={{ borderRadius: 2 }}>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {errors.gender && (
                  <Typography sx={{ fontSize: "0.75rem", color: c.error, mt: 0.5, ml: 1.5 }}>
                    {errors.gender}
                  </Typography>
                )}
              </FormControl>
            </Stack>

            {/* Row 3: Contact + Email */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Contact Number" name="contact" size="small" fullWidth
                value={form.contact} onChange={handleChange}
                error={!!errors.contact} helperText={errors.contact || "Must be 11 digits"}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
              <TextField
                label="Email Address" name="email" size="small" fullWidth
                value={form.email} onChange={handleChange}
                error={!!errors.email} helperText={errors.email}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Stack>

            {/* Row 4: Role + Username */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormControl size="small" fullWidth error={!!errors.role}>
                <InputLabel>Role</InputLabel>
                <Select name="role" value={form.role} label="Role" onChange={handleChange} sx={{ borderRadius: 2 }}>
                  {uniqueRoles.map((role) => (
                    <MenuItem key={role} value={role}>{role}</MenuItem>
                  ))}
                </Select>
                {errors.role && (
                  <Typography sx={{ fontSize: "0.75rem", color: c.error, mt: 0.5, ml: 1.5 }}>
                    {errors.role}
                  </Typography>
                )}
              </FormControl>
              <TextField
                label="Username" name="username" size="small" fullWidth
                value={form.username} onChange={handleChange}
                error={!!errors.username} helperText={errors.username || "Must not contain spaces"}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Stack>

            {/* Row 5: Password with show/hide */}
            <TextField
              label={modalId ? "New Password (leave blank to keep)" : "Password"}
              name="password" size="small" fullWidth
              type={showPassword ? "text" : "password"}
              value={form.password} onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password || passwordHelperText}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            {/* Row 6: Address multiline */}
            <TextField
              label="Address" name="address" size="small" fullWidth
              multiline rows={3}
              value={form.address} onChange={handleChange}
              error={!!errors.address} helperText={errors.address}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            {/* Row 7: Status Switch */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <Switch
                checked={form.status === "active"}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, status: e.target.checked ? "active" : "inactive" }))
                }
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": { color: c.primary },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: c.primary },
                }}
              />
              <Typography sx={{ color: c.text, fontSize: "0.9rem" }}>
                User status: {form.status === "active" ? "Active" : "Inactive"}
              </Typography>
            </Stack>

          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={closeModal} sx={{ borderRadius: 3, textTransform: "none", color: c.muted }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              bgcolor: c.primary, borderRadius: 3,
              textTransform: "none", fontWeight: 700, px: 4,
              "&:hover": { bgcolor: "#3730a3" },
            }}
          >
            {modalId ? "Update User" : "Save User"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UsersPage;
