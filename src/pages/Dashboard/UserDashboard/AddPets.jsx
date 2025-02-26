import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useSnackbar } from "notistack";
import UseAuth from "../../../hooks/UseAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPets = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
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
      image: null,
      name: "",
      category: "",
      age: "",
      location: "",
      shortDescription: "",
      longDescription: "",
    },
    validationSchema: Yup.object({
      image: Yup.mixed().required("Please select a pet image"),
      name: Yup.string().required("Please provide the pet's name"),
      category: Yup.string().required("Please select a pet category"),
      age: Yup.number()
        .required("Please provide the pet's age")
        .min(0, "Age must be zero or greater"),
      location: Yup.string().required("Please provide a location"),
      shortDescription: Yup.string().required(
        "Please provide a short description"
      ),
      longDescription: Yup.string().required(
        "Please provide a detailed description"
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      const imageFile = new FormData();
      imageFile.append("image", values.image);

      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: { "content-type": "multipart/form-data" },
      });

      if (res.data.success) {
        const petsData = {
          ...values,
          longDescription: values.longDescription.replace(/<[^>]+>/g, ""),
          adopted: false,
          addedAt: new Date().toISOString(),
          image: res.data.data.display_url,
          userEmail: user.email,
        };

        const petsRes = await axiosSecure.post("/pets", petsData);
        if (petsRes.data.insertedId) {
          resetForm();
          enqueueSnackbar("Pets added successfully!", {
            variant: "success",
            autoHideDuration: 1000,
          });
        }
      }
    },
  });

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <Typography
        variant="h4"
        color="blue-gray"
        className="text-center text-primary"
      >
        Add a New Pet
      </Typography>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          label="Pet Name"
          name="name"
          className="w-full"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <Select
          options={categoryOptions}
          placeholder="Select Pet Category"
          className="w-full"
          onChange={(option) => formik.setFieldValue("category", option.value)}
        />
        <Input
          type="number"
          label="Pet Age"
          name="age"
          className="w-full"
          onChange={formik.handleChange}
          value={formik.values.age}
        />
        <Input
          type="text"
          label="Pet Location"
          name="location"
          className="w-full"
          onChange={formik.handleChange}
          value={formik.values.location}
        />
        <Textarea
          label="Short Description"
          name="shortDescription"
          className="w-full"
          onChange={formik.handleChange}
          value={formik.values.shortDescription}
        />
        <ReactQuill
          theme="snow"
          value={formik.values.longDescription}
          onChange={(value) => formik.setFieldValue("longDescription", value)}
          className="w-full"
        />
        <Input
          type="file"
          id="image"
          name="image"
          className="w-full"
          onChange={(e) =>
            formik.setFieldValue("image", e.currentTarget.files[0])
          }
        />
        <Button type="submit" fullWidth className="bg-primary text-white">
          Add Pet
        </Button>
      </form>
    </div>
  );
};

export default AddPets;
