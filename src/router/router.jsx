import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../pages/Home/Home";
import Login from "../pages/AuthLayout/Login";
import Register from "../pages/AuthLayout/Register";
import PetListing from "../pages/PetListing/PetListing";
import PetDetails from "../pages/PetDetails/PetDetails";
import DashBoard from "../Layout/DashBoard";
import AddPets from "../pages/Dashboard/UserDashboard/AddPets";
import CreateDonation from "../pages/Dashboard/UserDashboard/createDonation";
import AllUsers from "../pages/Dashboard/AdminDashBoard/AllUsers";
import AllPets from "../pages/Dashboard/AdminDashBoard/AllPets";
import AllDonations from "../pages/Dashboard/AdminDashBoard/AllDonations";
import MyAddedpets from "../pages/Dashboard/UserDashboard/MyAddedpets";
import UpdatePet from "../pages/Dashboard/UserDashboard/UpdatePet";
import AdoptionRequests from "../pages/Dashboard/UserDashboard/AdoptionRequests";
import DonationCampaigns from "../pages/DonationCampaigns/DonationCampaigns";
import DonationDatails from "../pages/DonationDatails/DonationDatails";
import PrivetRoute from "../provider/PrivetRoute";
import MyDonationCampaign from "../pages/Dashboard/UserDashboard/MyDonationCampaign";
import UpdatedDonation from "../pages/Dashboard/UserDashboard/UpdatedDonation";
import MyDonation from "../pages/Dashboard/UserDashboard/MyDonation";
import CategoryList from "../pages/CategoryList/CategoryList";
import AdminRoute from "../provider/AdminRoute";
import ErrorPage from "../components/ErrorPage";
import UserProfile from "../pages/Dashboard/UserDashboard/UserProfile";
import AboutUS from "../pages/AboutUS/AboutUS";
import Blog from "../pages/Blog/Blog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/petListing",
        element: <PetListing />,
      },
      {
        path: "/donationCampaigns",
        element: <DonationCampaigns />,
      },
      {
        path: "category/:name",
        element: <CategoryList />,
      },
      {
        path: "/petdetails/:id",
        element: (
          <PrivetRoute>
            <PetDetails />
          </PrivetRoute>
        ),
      },
      {
        path: "/donation/:id",
        element: (
          <PrivetRoute>
            <DonationDatails />
          </PrivetRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/about",
        element: <AboutUS />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashBoard />,
    children: [
      {
        path: "userProfile",
        element: (
          <PrivetRoute>
            <UserProfile />
          </PrivetRoute>
        ),
      },
      {
        path: "addPets",
        element: (
          <PrivetRoute>
            <AddPets />
          </PrivetRoute>
        ),
      },
      {
        path: "myAddedpets",
        element: (
          <PrivetRoute>
            <MyAddedpets />
          </PrivetRoute>
        ),
      },
      {
        path: "updatePet/:id",
        element: (
          <PrivetRoute>
            <UpdatePet />
          </PrivetRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/pets/${params.id}`),
      },
      {
        path: "createDonation",
        element: (
          <PrivetRoute>
            <CreateDonation />
          </PrivetRoute>
        ),
      },
      {
        path: "myDonationCampaign",
        element: (
          <PrivetRoute>
            <MyDonationCampaign />
          </PrivetRoute>
        ),
      },
      {
        path: "updateDonation/:id",
        element: (
          <PrivetRoute>
            <UpdatedDonation />
          </PrivetRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/donationCampaigns/${params.id}`),
      },
      {
        path: "adoptionRequests",
        element: (
          <PrivetRoute>
            <AdoptionRequests />
          </PrivetRoute>
        ),
      },
      {
        path: "myDonation",
        element: (
          <PrivetRoute>
            <MyDonation />
          </PrivetRoute>
        ),
      },
      {
        path: "adminProfile",
        element: (
          <AdminRoute>
            <UserProfile />
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "allPets",
        element: (
          <AdminRoute>
            <AllPets />
          </AdminRoute>
        ),
      },
      {
        path: "allDonations",
        element: (
          <AdminRoute>
            <AllDonations />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
