import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ArticleIcon from "@mui/icons-material/Article";

const drawerWidth = 240;

const dashboardColors = {
  primary: "#4f46e5",
  primaryDark: "#4338ca",
  primarySoft: "#eef2ff",
  surface: "#ffffff",
  surfaceAlt: "#f8fafc",
  border: "#e2e8f0",
  text: "#0f172a",
  muted: "#64748b",
};

const dashboardNavItems = [
  {
    label: "Dashboard",
    title: "Dashboard",
    to: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    label: "Reports",
    title: "Reports",
    to: "/dashboard/reports",
    icon: <AssessmentIcon />,
  },
  {
    label: "Articles",
    title: "Articles",
    to: "/dashboard/articles",
    icon: <ArticleIcon />,
  },
  {
    label: "Users",
    title: "Users",
    to: "/dashboard/users",
    icon: <PeopleIcon />,
  },
];

const AppBar = styled(MuiAppBar)(() => ({
  zIndex: 1201,
  backgroundColor: alpha(dashboardColors.surface, 0.94),
  color: dashboardColors.text,
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  borderBottom: `1px solid ${dashboardColors.border}`,
  backdropFilter: "blur(12px)",
}));

const Drawer = styled(MuiDrawer)(() => ({
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    backgroundColor: dashboardColors.surface,
    borderRight: `1px solid ${dashboardColors.border}`,
    boxShadow: "8px 0 24px rgba(15, 23, 42, 0.04)",
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 999,
  backgroundColor: dashboardColors.surfaceAlt,
  border: `1px solid ${dashboardColors.border}`,
  marginRight: theme.spacing(2),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  padding: theme.spacing(0, 2),
  height: "100%",
  display: "flex",
  alignItems: "center",
  color: dashboardColors.muted,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: dashboardColors.text,
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  width: 180,
  "& input::placeholder": {
    color: dashboardColors.muted,
    opacity: 1,
  },
}));

const getPageTitle = (pathname) =>
  dashboardNavItems.find((item) => item.to === pathname)?.title || "Dashboard";

const DashLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const navigate = useNavigate();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleLogout = () => navigate("/");

  const userType = localStorage.getItem("userType");

  const filteredNavItems = dashboardNavItems.filter((item) => {
    if (item.label === "Users") {
      return userType === "admin";
    }
    return true;
  });

  const drawerContent = (
    <>
      <DrawerHeader>
        <IconButton
          onClick={handleDrawerClose}
          sx={{
            color: dashboardColors.text,
            "&:hover": { backgroundColor: dashboardColors.primarySoft },
          }}
        >
          {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>

      <Box sx={{ px: open ? 2.5 : 1.5, py: 2 }}>
        <Box
          sx={{
            px: open ? 2 : 0,
            py: 1.5,
            borderRadius: 4,
            background: "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)",
            color: "#fff",
            textAlign: open ? "left" : "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: open ? "1rem" : "0.8rem",
              letterSpacing: "0.04em",
            }}
          >
            {open ? (userType === "admin" ? "Surla Admin" : "Surla Editor") : "SA"}
          </Typography>
          {open && (
            <Typography
              sx={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", mt: 0.5 }}
            >
              MUI dashboard pages
            </Typography>
          )}
        </Box>
      </Box>

      <Divider />

      <List sx={{ px: 1.5, py: 1.5 }}>
        {filteredNavItems.map(({ label, to, icon }) => (
          <ListItem key={to} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to={to}
              selected={location.pathname === to}
              onClick={handleDrawerClose}
              sx={{
                minHeight: 50,
                mb: 0.75,
                borderRadius: 3,
                px: 2.5,
                justifyContent: open ? "initial" : "center",
                color: dashboardColors.text,
                "&.Mui-selected": {
                  backgroundColor: dashboardColors.primarySoft,
                  color: dashboardColors.primary,
                  "& .MuiListItemIcon-root": {
                    color: dashboardColors.primary,
                  },
                },
                "&:hover": {
                  backgroundColor: alpha(dashboardColors.primary, 0.06),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: dashboardColors.muted,
                }}
              >
                {icon}
              </ListItemIcon>

              <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: dashboardColors.surfaceAlt,
      }}
    >
      <CssBaseline />

      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 3,
              border: `1px solid ${dashboardColors.border}`,
              backgroundColor: dashboardColors.surface,
              "&:hover": {
                backgroundColor: dashboardColors.primarySoft,
              },
            }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {pageTitle}
            </Typography>
            <Typography sx={{ color: dashboardColors.muted, fontSize: "0.85rem" }}>
              Dashboard workspace
            </Typography>
          </Box>

          <Search sx={{ display: { xs: "none", md: "block" } }}>
            <SearchIconWrapper>
              <SearchIcon fontSize="small" />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search here" />
          </Search>

          <Button
            onClick={handleLogout}
            variant="contained"
            sx={{
              color: "#fff",
              fontWeight: 700,
              px: 2.25,
              borderRadius: 999,
              backgroundColor: dashboardColors.primary,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: dashboardColors.primaryDark,
                boxShadow: "none",
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        sx={{ flexShrink: 0 }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3.5 },
          pb: { xs: 12, md: 12 },
          background:
            "radial-gradient(circle at top right, rgba(79,70,229,0.08), transparent 22%), #f8fafc",
          minHeight: "100vh",
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;