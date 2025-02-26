import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { useSnackbar } from "notistack";
import SectionTitle from "../../components/SectionTitle";

const PetDetails = () => {
  const [pet, setPet] = useState({});
  const { user } = UseAuth();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchPetDetails();
  }, []);

  const fetchPetDetails = async () => {
    const { data } = await axios.get(`http://localhost:5000/pets/${id}`);
    setPet(data);
  };

  const handleOpen = () => setOpen(!open);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const phone = form.phone.value;
    const address = form.address.value;

    const adoptionData = {
      petId: pet._id,
      petName: pet.name,
      petimage: pet.image,
      userName: user?.displayName,
      userEmail: user?.email,
      email: pet.userEmail,
      phone,
      address,
    };

    await axios
      .post("http://localhost:5000/adoptions", adoptionData)
      .then((res) => {
        if (res.data.insertedId) {
          enqueueSnackbar(
            `Congratulations, ${user?.displayName}! You’ve successfully adopted ${pet.name}!`,
            { variant: "success", autoHideDuration: 1000 }
          );
        }
      });

    setOpen(false);
  };

  const { image, name, longDescription, age, location, category } = pet || {};

  return (
    <section className="mb-8 w-[90%] mx-auto">
      <SectionTitle heading={`Everything About ${name}`} />
      <Box display="flex" justifyContent="center" mt={4}>
        <Card sx={{ maxWidth: 600, boxShadow: 3 }}>
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              sx={{ height: 400, objectFit: "cover" }}
              image={image}
              alt={name}
            />
            {category && (
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  bgcolor: "rgba(0,0,0,0.6)",
                  color: "white",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: "0.8rem",
                }}
              >
                {category}
              </Box>
            )}
          </Box>
          <CardContent>
            <Typography variant="h4" color="secondary" gutterBottom>
              {name}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {longDescription}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography
                variant="body2"
                color="text.secondary"
                display="flex"
                alignItems="center"
              >
                <MdOutlineDateRange /> {age} Year
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                display="flex"
                alignItems="center"
              >
                <FaLocationDot /> {location}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: "purple", color: "white" }}
              onClick={handleOpen}
            >
              Adopt Now
            </Button>
          </CardActions>
        </Card>
      </Box>

      {/* Adoption Modal */}
      <Dialog open={open} onClose={handleOpen}>
        <Card sx={{ width: 350, p: 2 }}>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Typography variant="h5" textAlign="center" gutterBottom>
                Adopt {name}
              </Typography>
              <TextField
                fullWidth
                label="User Name"
                defaultValue={user?.displayName}
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="User Email"
                defaultValue={user?.email}
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone No"
                name="phone"
                type="number"
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={3}
                required
                sx={{ mb: 2 }}
              />
            </CardContent>
            <CardActions>
              <Button fullWidth type="submit" variant="contained">
                Submit
              </Button>
            </CardActions>
          </form>
        </Card>
      </Dialog>
    </section>
  );
};

export default PetDetails;
