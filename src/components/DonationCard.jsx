import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { MdAttachMoney } from "react-icons/md";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useRef, useState } from "react";
import CardSkeleton from "./CardSkeleton";

const DonationCard = ({ donation }) => {
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

  const { petImage, maxDonation, donatedAmount, name, _id } = donation || {};
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
                sx={{ height: 200, objectFit: "cover" }}
                image={petImage}
                alt={name}
              />
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
                <Typography
                  variant="body2"
                  color="text.secondary"
                  display="flex"
                  alignItems="center"
                >
                  <span style={{ fontWeight: "bold" }}>Max Donation:</span>{" "}
                  <MdAttachMoney /> {maxDonation}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  display="flex"
                  alignItems="center"
                >
                  <span style={{ fontWeight: "bold" }}>Total Donated:</span>{" "}
                  <MdAttachMoney /> {donatedAmount}
                </Typography>
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
                to={`/donation/${_id}`}
                variant="contained"
                sx={{ bgcolor: "purple", color: "white" }}
              >
                View Details
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
export default DonationCard;
