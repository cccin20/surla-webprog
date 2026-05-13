import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import {
  fetchArticles,
  createArticle,
  updateArticle,
} from "../../services/ArticleService";

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

const emptyForm = {
  title: "",
  slug: "",
  image: "",
  author: "",
  content: "",
  preview: "",
  status: "draft",
};

const statusChipSx = (status) => {
  const base = {
    fontWeight: 700,
    borderRadius: 999,
    textTransform: "capitalize",
  };
  if (status === "published") {
    return { ...base, bgcolor: alpha(c.success, 0.1), color: c.success };
  }
  return { ...base, bgcolor: alpha(c.warning, 0.1), color: c.warning };
};

function DashArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [modalId, setModalId] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(true);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const response = await fetchArticles();
      const formatted = response.data.map((article) => ({
        ...article,
        id: article._id,
        paragraphs: article.content?.length || 0,
      }));
      setArticles(formatted);
    } catch (error) {
      console.error("Failed to load articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const filtered = useMemo(
    () =>
      articles.filter((a) => {
        const q = search.toLowerCase();
        const matchSearch =
          !q ||
          a.title?.toLowerCase().includes(q) ||
          a.slug?.toLowerCase().includes(q) ||
          a.author?.toLowerCase().includes(q);
        const matchStatus = !filterStatus || a.status === filterStatus;
        return matchSearch && matchStatus;
      }),
    [articles, search, filterStatus]
  );

  const resetForm = () => {
    setForm(emptyForm);
    setModalId(null);
  };

  const openModal = (article = null) => {
    if (article) {
      setModalId(article.id);
      setForm({
        title: article.title,
        slug: article.slug,
        image: article.image || "",
        author: article.author,
        content: article.content?.join("\n\n") || "",
        preview: article.preview,
        status: article.status,
      });
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };

  const closeModal = () => {
    setDialogOpen(false);
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      content: form.content
        .split("\n\n")
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
    };

    try {
      if (modalId) {
        await updateArticle(modalId, payload);
      } else {
        await createArticle(payload);
      }
      await loadArticles();
      closeModal();
    } catch (error) {
      console.error("Failed to save article:", error);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    try {
      await updateArticle(id, { status: newStatus });
      await loadArticles();
    } catch (error) {
      console.error("Failed to toggle article status:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100,
      renderCell: (params) => (
        <Typography sx={{ fontSize: "0.8rem", color: c.muted }}>
          {params.value.slice(-6).toUpperCase()}
        </Typography>
      ),
    },
    { field: "slug", headerName: "Slug", width: 150 },
    { field: "title", headerName: "Title", flex: 1, minWidth: 200 },
    {
      field: "paragraphs",
      headerName: "Paragraphs",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    { field: "preview", headerName: "Preview", flex: 1.5, minWidth: 250 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={statusChipSx(params.value)}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 190,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => openModal(params.row)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => handleToggleStatus(params.row.id, params.row.status)}
            sx={{
              bgcolor: params.row.status === "published" ? c.warning : c.success,
              "&:hover": {
                bgcolor: params.row.status === "published" ? "#d97706" : "#15803d",
              },
            }}
          >
            {params.row.status === "published" ? "Disable" : "Enable"}
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
              gap: 2,
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: c.text }}>
                Articles
              </Typography>
              <Typography sx={{ mt: 0.5, color: c.muted }}>
                Manage your articles and content.
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => openModal()}
              sx={{
                bgcolor: c.primary,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,
                px: 3,
                minHeight: 44,
                justifySelf: { xs: "start", sm: "end" },
              }}
            >
              Add Article
            </Button>
          </Box>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 1.5 }}>
            <TextField
              placeholder="Search Articles..."
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
              sx={{ flex: 2, "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
            <FormControl size="small" sx={{ flex: 1, minWidth: 160 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
                sx={{ borderRadius: 3 }}
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Box sx={{ mt: 2.5, height: 600 }}>
            <DataGrid
              rows={filtered}
              columns={columns}
              loading={loading}
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              disableRowSelectionOnClick
              hideFooterSelectedRowCount
              rowHeight={68}
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: c.surfaceAlt,
                  borderBottom: `1px solid ${c.border}`,
                },
                "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 700 },
                "& .MuiDataGrid-cell": {
                  borderBottom: `1px solid ${alpha(c.border, 0.9)}`,
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={closeModal} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: 700, color: c.text }}>
            {modalId ? "Edit Article" : "Add Article"}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Title" name="title" size="small" fullWidth
                value={form.title} onChange={handleChange} required
              />
              <TextField
                label="Slug" name="slug" size="small" fullWidth
                value={form.slug} onChange={handleChange} required
                helperText="A unique, URL-friendly identifier (e.g., 'my-first-article')."
              />
              <TextField
                label="Author" name="author" size="small" fullWidth
                value={form.author} onChange={handleChange} required
              />
              <TextField
                label="Image URL" name="image" size="small" fullWidth
                value={form.image} onChange={handleChange}
                helperText="Optional image shown on the public article card."
              />
              <TextField
                label="Preview" name="preview" size="small" fullWidth
                multiline rows={2}
                value={form.preview} onChange={handleChange}
                helperText="A short summary of the article."
              />
              <TextField
                label="Content" name="content" size="small" fullWidth
                multiline rows={8}
                value={form.content} onChange={handleChange}
                helperText="The full article content. Separate paragraphs with a double line break."
              />
              <FormControl size="small" fullWidth>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={form.status} label="Status" onChange={handleChange}>
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="published">Published</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modalId ? "Save Changes" : "Create Article"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default DashArticleListPage;
