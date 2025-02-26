import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { RiMenu2Fill, RiMoneyDollarBoxFill } from "react-icons/ri";
import { GrUserAdmin, GrUploadOption } from "react-icons/gr";
import { FaUsers, FaSackDollar } from "react-icons/fa6";
import { MdPets, MdCampaign } from "react-icons/md";
import { VscDiffAdded } from "react-icons/vsc";
import { IoCreateSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import UseAdmin from "../hooks/UseAdmin";
import UseAuth from "../hooks/UseAuth";

const adminLinks = [
  {
    to: "/dashboard/adminProfile",
    label: "Admin Profile",
    icon: <GrUserAdmin />,
  },
  { to: "/dashboard/allUsers", label: "All Users", icon: <FaUsers /> },
  { to: "/dashboard/allPets", label: "All Pets", icon: <MdPets /> },
  {
    to: "/dashboard/allDonations",
    label: "All Donations",
    icon: <FaSackDollar />,
  },
];

const userLinks = [
  { to: "/dashboard/userProfile", label: "User Profile", icon: <FaUsers /> },
  { to: "/dashboard/addPets", label: "Add a pet", icon: <MdPets /> },
  {
    to: "/dashboard/myAddedpets",
    label: "My added pets",
    icon: <VscDiffAdded />,
  },
  {
    to: "/dashboard/adoptionRequests",
    label: "Adoption Request",
    icon: <GrUploadOption />,
  },
  {
    to: "/dashboard/createDonation",
    label: "Create Donation Campaign",
    icon: <IoCreateSharp />,
  },
  {
    to: "/dashboard/myDonationCampaign",
    label: "My Donation Campaigns",
    icon: <MdCampaign />,
  },
  {
    to: "/dashboard/myDonation",
    label: "My Donations",
    icon: <RiMoneyDollarBoxFill />,
  },
];

const homeLink = { to: "/", label: "Home", icon: <FaHome /> };

const DashBoard = () => {
  const [open, setOpen] = useState(false);
  const { user } = UseAuth();
  const [isAdmin] = UseAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(isAdmin ? "/dashboard/adminProfile" : "/dashboard/userProfile");
  }, [isAdmin, navigate]);

  const renderLinks = (links) => (
    <>
      {links.map(({ to, label, icon }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) => (isActive ? "font-bold" : "text-sm")}
          >
            {icon && <span className="inline-block mr-2">{icon}</span>} {label}
          </NavLink>
        </li>
      ))}
      <hr className="border-gray-400 my-3" /> {/* Divider added */}
    </>
  );

  return (
    <div className="h-screen grid grid-rows-[auto,1fr]">
      {/* Mobile Navbar */}
      <div className="bg-white sticky top-0 z-50 shadow-md px-4 py-2 flex items-center justify-between md:hidden">
        <Button className="bg-base-100" onClick={() => setOpen(true)}>
          <RiMenu2Fill className="text-2xl text-secondary" />
        </Button>
        <Link to="/" className="mb-2">
          <Typography variant="h5" color="blue-gray">
            {user?.displayName}
          </Typography>
        </Link>
      </div>

      {/* Mobile Drawer Menu */}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        className="p-4 bg-primary text-white"
      >
        <div className="mb-4 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="text-white">
            {user?.displayName}
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            className="text-white text-2xl"
            onClick={() => setOpen(false)}
          >
            ✖
          </IconButton>
        </div>
        <ul className="navlinks space-y-4">
          {isAdmin && <>{renderLinks(adminLinks)}</>}
          {renderLinks(userLinks)}
          <h3 className="text-lg font-bold">Other</h3>
          <li>
            <NavLink
              to={homeLink.to}
              className={({ isActive }) => (isActive ? "font-bold" : "text-sm")}
            >
              {homeLink.icon && (
                <span className="inline-block mr-2">{homeLink.icon}</span>
              )}{" "}
              {homeLink.label}
            </NavLink>
          </li>
        </ul>
      </Drawer>

      {/* Desktop Sidebar + Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-[300px,1fr]">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col bg-primary text-white h-screen sticky top-0 px-6 py-5">
          <Link className="text-2xl font-bold mb-2">{user?.displayName}</Link>
          <ul className="space-y-4 text-base">
            {isAdmin && <>{renderLinks(adminLinks)}</>}
            {renderLinks(userLinks)}
            <li>
              <NavLink
                to={homeLink.to}
                className={({ isActive }) =>
                  isActive ? "font-bold" : "text-sm"
                }
              >
                {homeLink.icon && (
                  <span className="inline-block mr-2">{homeLink.icon}</span>
                )}{" "}
                {homeLink.label}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="bg-gray-100 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
