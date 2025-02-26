import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useSnackbar } from "notistack";
import UseAuth from "../../../hooks/UseAuth";
import { useLoaderData } from "react-router-dom";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const UpdatedDonation = () => {
  const {
    _id,
    petImage,
    name,
    maxDonation,
    lastDate,
    longDescription,
    shortDescription,
  } = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = UseAuth();

  const formik = useFormik({
    initialValues: {
      petImage: petImage || null,
      name: name || "",
      maxDonation: maxDonation || "",
      lastDate: lastDate || "",
      shortDescription: shortDescription || "",
      longDescription: longDescription || "",
    },
    validationSchema: Yup.object({
      petImage: Yup.mixed().required("Please upload a pet image"),
      name: Yup.string().required("Please provide the pet's name"),
      maxDonation: Yup.number()
        .required("Please specify the maximum donation amount")
        .min(1, "Donation amount must be at least 1"),
      lastDate: Yup.date().required(
        "Please select the last date for donations"
      ),
      shortDescription: Yup.string().required(
        "Please provide a short description"
      ),
      longDescription: Yup.string()
        .required("Please provide a detailed description")
        .min(50, "Long description must be at least 50 characters"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const imageFile = new FormData();
        imageFile.append("image", values.petImage);

        const res = await axiosPublic.post(imageHostingAPI, imageFile, {
          headers: { "content-type": "multipart/form-data" },
        });

        if (res.data.success) {
          const DonationData = {
            ...values,
            longDescription: values.longDescription.replace(/<[^>]+>/g, ""),
            image: res.data.data.display_url,
            userEmail: user.email,
          };

          const donationRes = await axiosSecure.patch(
            `/donationCampaigns/${_id}`,
            DonationData
          );

          if (donationRes.data.modifiedCount > 0) {
            resetForm();
            enqueueSnackbar(`${name} Donation campaign updated successfully!`, {
              variant: "success",
              autoHideDuration: 1000,
            });
          }
        }
      } catch (error) {
        enqueueSnackbar("Failed to update donation campaign.", {
          variant: "error",
        });
      }
    },
  });

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <Typography variant="h4" className="text-center text-primary mb-4">
        Update Donation Campaign
      </Typography>
      <form onSubmit={formik.handleSubmit} className="mb-4">
        <div className="flex flex-wrap gap-4">
          <Input
            label="Pet Name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
          />
          <Input
            type="number"
            label="Maximum Donation Amount"
            name="maxDonation"
            onChange={formik.handleChange}
            value={formik.values.maxDonation}
            error={formik.errors.maxDonation}
          />
          <Input
            type="date"
            label="Last Date of Donation"
            name="lastDate"
            onChange={formik.handleChange}
            value={formik.values.lastDate}
            error={formik.errors.lastDate}
            className="mb-4"
          />
        </div>
        <Textarea
          label="Short Description"
          name="shortDescription"
          onChange={formik.handleChange}
          value={formik.values.shortDescription}
          error={formik.errors.shortDescription}
          className="mb-4"
        />
        <div className="mb-4">
          <ReactQuill
            theme="snow"
            value={formik.values.longDescription}
            onChange={(value) => formik.setFieldValue("longDescription", value)}
          />
          {formik.errors.longDescription && (
            <p className="text-purple-800 text-sm">
              {formik.errors.longDescription}
            </p>
          )}
        </div>
        <Input
          type="file"
          name="petImage"
          onChange={(e) =>
            formik.setFieldValue("petImage", e.currentTarget.files[0])
          }
        />
        {formik.errors.petImage && (
          <p className="text-purple-800 text-sm">{formik.errors.petImage}</p>
        )}
        <Button type="submit" fullWidth className="bg-primary text-white mt-4">
          Update Donation
        </Button>
      </form>
    </div>
  );
};

export default UpdatedDonation;
