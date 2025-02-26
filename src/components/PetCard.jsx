import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useRef, useState } from "react";
import CardSkeleton from "./CardSkeleton";

const PetCard = ({ pet }) => {
  const [loading, setLoading] = useState(true);
  const [inView, setInView] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setInView(entries[0].isIntersecting);
      },
      { threshold: 0.4 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  const { _id, image, name, shortDescription, age, location, category } =
    pet || {};
  return (
    <div ref={cardRef}>
      {inView ? (
        <Card sx={{ mt: 2, bgcolor: "white", boxShadow: 3 }}>
          <Box sx={{ position: "relative" }}>
            {loading ? (
              <Skeleton width={500} height={300} />
            ) : (
              <CardMedia
                component="img"
                sx={{
                  height: 200,
                  objectFit: "cover",
                }}
                image={image}
                alt={name}
              />
            )}
            {!loading && category && (
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
            {loading ? (
              <Skeleton width={150} count={3} />
            ) : (
              <>
                <Typography variant="h5" color="secondary" gutterBottom>
                  {name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {shortDescription}
                </Typography>
                <Box display="flex" justifyContent="space-between">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    display="flex"
                    alignItems="center"
                  >
                    <MdOutlineDateRange /> {age} year
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
              </>
            )}
          </CardContent>
          <CardActions>
            {loading ? (
              <Skeleton width={100} height={30} />
            ) : (
              <Button
                fullWidth
                component={Link}
                to={`/petdetails/${_id}`}
                variant="contained"
                sx={{ bgcolor: "purple", color: "white" }}
              >
                Learn More
              </Button>
            )}
          </CardActions>
        </Card>
      ) : (
        <CardSkeleton />
      )}
    </div>
  );
};
export default PetCard;
