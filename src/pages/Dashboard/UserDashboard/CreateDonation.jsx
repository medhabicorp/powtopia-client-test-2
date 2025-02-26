import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Textarea, Button, Typography } from "@material-tailwind/react";
import Select from "react-select";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useSnackbar } from "notistack";
import ReactQuill from "react-quill";
import UseAuth from "../../../hooks/UseAuth";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const CreateDonation = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = UseAuth();

  const categoryOptions = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Fish", label: "Fish" },
    { value: "Rabbit", label: "Rabbit" },
  ];

  const formik = useFormik({
    initialValues: {
      petImage: null,
      name: "",
      category: "",
      maxDonation: "",
      lastDate: "",
      shortDescription: "",
      longDescription: "",
    },
    validationSchema: Yup.object({
      petImage: Yup.mixed().required("Please upload a pet image"),
      name: Yup.string().required("Please provide the pet's name"),
      maxDonation: Yup.number()
        .required("Please specify the maximum donation amount")
        .min(1, "Donation amount must be at least 1"),
      category: Yup.string().required("Please select a pet category"),
      lastDate: Yup.date().required(
        "Please select the last date for donations"
      ),
      shortDescription: Yup.string().required(
        "Please provide a short description"
      ),
      // .max(100, "Short description must be 100 characters or less"),
      longDescription: Yup.string()
        .required("Please provide a detailed description")
        .min(50, "Long description must be at least 50 characters"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // Upload image to imgbb
        const imageFile = new FormData();
        imageFile.append("image", values.petImage);

        const res = await axiosPublic.post(imageHostingAPI, imageFile, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });

        if (res.data.success) {
          // Prepare data for the database
          const plainTextDescription = values.longDescription.replace(
            /<[^>]+>/g,
            ""
          );

          const campaignData = {
            petImage: res.data.data.display_url,
            name: values.name,
            category: values.category,
            maxDonation: values.maxDonation,
            donatedAmount: 0,
            lastDate: values.lastDate,
            shortDescription: values.shortDescription,
            longDescription: plainTextDescription,
            createdAt: new Date().toISOString(),
            userEmail: user?.email,
            isDonationStopped: false,
          };

          const donationRes = await axiosSecure.post(
            "/donationCampaigns",
            campaignData
          );
          // console.log(donationRes.data)
          if (donationRes.data.insertedId) {
            // show success popup
            resetForm();
            enqueueSnackbar(`${values.name} added successful!`, {
              variant: "success",
              autoHideDuration: 1000,
            });
          }
        }
      } catch (error) {
        console.error("Error creating donation campaign:", error);
        alert("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <div className="w-full md:max-w-2xl mx-auto md:p-6 p-3 bg-white shadow-md rounded-lg">
      <Typography variant="h4" className="text-lg md:text-3xl text-center mb-4">
        Create Donation Campaign
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {/* Pet Image */}

        <div className="md:flex gap-5">
          {/* Pet Name */}
          <div className="mb-4 w-full">
            <Input
              className="w-full"
              label="Pet Name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && (
              <p className="text-purple-800 text-sm">{formik.errors.name}</p>
            )}
          </div>
          {/* Pet Category */}
          <div className="mb-4 w-full">
            <Select
              options={categoryOptions}
              placeholder="Select Pet Category"
              onChange={(option) =>
                formik.setFieldValue("category", option.value)
              }
            />
            {formik.errors.category && (
              <p className="text-purple-800 text-sm">
                {formik.errors.category}
              </p>
            )}
          </div>
        </div>

        {/* Maximum Donation */}
        <div className="mb-4">
          <Input
            type="number"
            label="Maximum Donation Amount"
            name="maxDonation"
            onChange={formik.handleChange}
            value={formik.values.maxDonation}
          />
          {formik.errors.maxDonation && (
            <p className="text-purple-800 text-sm">
              {formik.errors.maxDonation}
            </p>
          )}
        </div>

        {/* Last Date */}
        <div className="mb-4">
          <Input
            type="date"
            label="Last Date of Donation"
            name="lastDate"
            onChange={formik.handleChange}
            value={formik.values.lastDate}
          />
          {formik.errors.lastDate && (
            <p className="text-purple-800 text-sm">{formik.errors.lastDate}</p>
          )}
        </div>

        {/* Short Description */}
        <div className="mb-4">
          <Textarea
            label="Short Description"
            name="shortDescription"
            onChange={formik.handleChange}
            value={formik.values.shortDescription}
          />
          {formik.errors.shortDescription && (
            <p className="text-purple-800 text-sm">
              {formik.errors.shortDescription}
            </p>
          )}
        </div>

        {/* Long Description */}
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
        <div className="mb-4">
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
        </div>
        {/* Submit Button */}
        <Button type="submit" fullWidth className="bg-purple-500 text-white">
          Create Donation Campaign
        </Button>
      </form>
    </div>
  );
};

export default CreateDonation;
