import {
  Box,
  Typography,
  Link,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import {
  Facebook,
  GitHub,
  Reddit,
  Twitter,
  X,
  YouTube,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
        color: "white",
        textAlign: "center",
        py: 4,
        px: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        POWTOPIA
      </Typography>

      {/* Navigation Links & Newsletter Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
          my: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>
            Home
          </NavLink>
          <NavLink
            to="/about"
            style={{ textDecoration: "none", color: "white" }}
          >
            About
          </NavLink>
          <NavLink
            to="/petListing"
            style={{ textDecoration: "none", color: "white" }}
          >
            Pet Listing
          </NavLink>
          <NavLink
            to="/DonationCampaigns"
            style={{ textDecoration: "none", color: "white" }}
          >
            Donation Campaigns
          </NavLink>
          <NavLink
            to="/team"
            style={{ textDecoration: "none", color: "white" }}
          >
            Team
          </NavLink>
        </Box>

        {/* Newsletter Section */}

        <Box sx={{ display: "flex", flexDirection: { xs: "column", gap: 1 } }}>
          <Typography variant="h6" fontWeight="bold">
            Subscribe to Our Newsletter
          </Typography>
          <div className="flex">
            <TextField
              variant="outlined"
              placeholder="Enter Your Email"
              sx={{
                background: "white",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "red" },
                  "&:hover fieldset": { borderColor: "darkred" },
                  "&.Mui-focused fieldset": { borderColor: "darkred" },
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "red",
                color: "white",
                borderRadius: "5px",
              }}
            >
              Subscribe
            </Button>
          </div>
        </Box>
      </Box>

      <Divider sx={{ backgroundColor: "white", my: 2 }} />

      <Typography>
        &copy; {new Date().getFullYear()} Copyright. All Rights Reserved.
      </Typography>

      {/* Social Media Icons */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        <Link href="#" color="inherit">
          <X />
        </Link>
        <Link href="#" color="inherit">
          <Facebook />
        </Link>
        <Link href="#" color="inherit">
          <YouTube />
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
