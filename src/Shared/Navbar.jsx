import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import logo from "../../src/assets/logo/logo circle.png";
import menuIcon from "../../src/assets/logo/menuIcon.png";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, userLogout } = UseAuth();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    userLogout();
    handleMenuClose();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      sx={{ bgcolor: darkMode ? "#333" : "white" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Section - Logo & Theme Toggle */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton
            onClick={toggleDarkMode}
            color="inherit"
            className="border-2 border-black p-2"
          >
            {darkMode ? (
              <Brightness7 className=" text-white" />
            ) : (
              <Brightness4 />
            )}
          </IconButton>
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="flex flex-col items-center py-2">
              <img
                src={logo}
                alt="Logo"
                style={{ height: "50px", borderRadius: "50%" }}
              />
              <span className="font-bold text-purple-800 lg:text-2xl">
                POWTOPIA
              </span>
            </div>
          </NavLink>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          onClick={toggleMobileMenu}
          color="inherit"
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <img
            src={menuIcon}
            alt="Menu"
            className="bg-gray-600 border-2 border-gray-700 p-2 rounded-full h-10"
          />
        </IconButton>

        {/* Desktop Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {[
            { to: "/", label: "Home" },
            { to: "/petListing", label: "Pet-Listing" },
            { to: "/donationCampaigns", label: "Donations" },
            ...(user
              ? [
                  { to: "/about", label: "About Us" },
                  { to: "/blog", label: "Blog" },
                ]
              : []),
          ].map(({ to, label }) => (
            <Button
              key={to}
              component={NavLink}
              to={to}
              sx={{
                color: darkMode ? "white" : "inherit",
                "&.active": { color: "#F44336" },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        {/* Right Section - Profile & Menu */}
        <Box>
          {user ? (
            <>
              <IconButton onClick={handleMenuOpen} color="inherit">
                <Avatar
                  src={user?.photoURL || "https://via.placeholder.com/40"}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  component={Link}
                  to="/dashboard"
                  onClick={handleMenuClose}
                >
                  Dashboard
                </MenuItem>
                <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                className="border-purple-500 text-purple-500 hover:bg-purple-100"
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                className="bg-purple-500 text-white hover:bg-purple-600"
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>

      {/* Added Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            alignItems: "center",
            bgcolor: darkMode ? "#444" : "#f9f9f9",
            p: 2,
            gap: 1,
          }}
        >
          {[
            { to: "/", label: "Home" },
            { to: "/petListing", label: "Pet Listing" },
            { to: "/donationCampaigns", label: "Donation Campaigns" },
            ...(user
              ? [
                  { to: "/about", label: "About Us" },
                  { to: "/blog", label: "Blog" },
                ]
              : []),
          ].map(({ to, label }) => (
            <Button
              key={to}
              component={NavLink}
              to={to}
              sx={{
                color: darkMode ? "white" : "inherit",
                "&.active": { color: "#F44336" },
              }}
              onClick={toggleMobileMenu}
            >
              {label}
            </Button>
          ))}
        </Box>
      )}
    </AppBar>
  );
};

export default Navbar;
