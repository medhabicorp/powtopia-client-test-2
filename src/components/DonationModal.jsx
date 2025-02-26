import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import UseAuth from "../hooks/UseAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useSnackbar } from "notistack";

const DonationModal = ({
  open,
  setOpen,
  name,
  fetchAllPet,
  petImage,
  maxDonation,
  _id,
}) => {
  // console.log(maxDonation)
  const [error, setError] = useState("");
  const { user } = UseAuth();
  const [donationAmount, setDonationAmount] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (donationAmount > 0) {
      axiosSecure
        .post("/create-payment-intent", { donationAmount })
        .then((res) => {
          // console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [donationAmount, axiosSecure]);

  // donation now
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (maxDonation < donationAmount) {
      setOpen(false);
      return enqueueSnackbar(
        `Donation amount exceeds the maximum allowable limit.`,
        { variant: "error", autoHideDuration: 1000 }
      );
    }
    // console.log(donationAmount)
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log('[error]', error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
      // setError(error.message);
    } else {
      // console.log('payment intent', paymentIntent)
      if (paymentIntent.status === "succeeded") {
        // console.log('transaction id', paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
          user: user.displayName,
          email: user.email,
          donationAmount: donationAmount,
          donationDate: new Date().toISOString(),
          transactionId: paymentIntent.id,
          petName: name,
          petImage: petImage,
          petId: _id,
          refund: false,
        };

        const res = await axiosSecure.post("/payments", payment);
        if (res.data.paymentResult.insertedId) {
          fetchAllPet();
          enqueueSnackbar(
            `Thank you for your donation of ${donationAmount} taka! Your support makes a difference.`,
            {
              variant: "success",
              autoHideDuration: 3000,
            }
          );
        }
        setOpen(false);
      }
    }
  };

  return (
    <Dialog
      size="sm"
      open={open}
      handler={() => setOpen(!open)}
      className="bg-white shadow"
    >
      <Card className="mx-auto w-full shadow-sm rounded-none max-w-[24rem]">
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <Typography className="-mb-2" variant="h6">
              Max Donation Amount: {maxDonation}
            </Typography>
            <Input
              label="Amount"
              type="number"
              size="xl"
              value={donationAmount}
              onChange={(e) => setDonationAmount(Number(e.target.value) || "")}
              required
            />
            <Typography className="-mb-2" variant="h6">
              Card Details
            </Typography>
            <div className="p-2 border rounded-md">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",

                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              type="submit"
              disabled={!stripe || !clientSecret || donationAmount <= 0}
              fullWidth
            >
              Donate Now
            </Button>
            <p className="text-red-600 text-center py-2">{error}</p>
            {transactionId && (
              <p className="text-green-600 text-center py-2">
                your transaction id: {transactionId}
              </p>
            )}
          </CardFooter>
        </form>
      </Card>
    </Dialog>
  );
};

export default DonationModal;
