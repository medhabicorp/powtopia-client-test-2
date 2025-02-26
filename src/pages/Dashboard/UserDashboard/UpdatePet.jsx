import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { useSnackbar } from "notistack";
import { useLoaderData } from "react-router-dom";

import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const categoryOptions = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Fish", label: "Fish" },
  { value: "Rabbit", label: "Rabbit" },
];

const UpdatePet = () => {
  const {
    name,
    category,
    age,
    image,
    location,
    longDescription,
    shortDescription,
    _id,
  } = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = UseAuth();

  const formik = useFormik({
    initialValues: {
      image: image || null,
      name: name || "",
      age: age || "",
      category: category || "",
      location: location || "",
      shortDescription: shortDescription || "",
      longDescription: longDescription || "",
    },
    validationSchema: Yup.object({
      image: Yup.mixed().required("Please select a pet image"),
      name: Yup.string().required("Please provide the pet's name"),
      age: Yup.number()
        .required("Please provide the pet's age")
        .min(0, "Age must be zero or greater"),
      category: Yup.string().required("Please select a pet category"),
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

      try {
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

          const petsRes = await axiosSecure.patch(`/pets/${_id}`, petsData);

          if (petsRes.data.modifiedCount > 0) {
            resetForm();
            enqueueSnackbar(`${name} updated successfully!`, {
              variant: "success",
              autoHideDuration: 1000,
            });
          }
        }
      } catch (error) {
        enqueueSnackbar("Error updating pet. Please try again.", {
          variant: "error",
        });
      }
    },
  });

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <Typography variant="h4" color="blue-gray" className="text-center mb-4">
        Update Your Pet Information
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <div className="md:flex gap-5">
          <InputField label="Pet Name" name="name" formik={formik} />
          <InputField
            label="Pet Age"
            name="age"
            type="number"
            formik={formik}
          />
        </div>
        <div className="md:flex gap-5">
          <SelectField
            options={categoryOptions}
            label="Pet Category"
            name="category"
            formik={formik}
          />
          <InputField label="Pet Location" name="location" formik={formik} />
        </div>
        <TextareaField
          label="Short Description"
          name="shortDescription"
          formik={formik}
        />
        <RichTextField
          label="Long Description"
          name="longDescription"
          formik={formik}
        />
        <FileInputField label="Pet Image" name="image" formik={formik} />
        <Button type="submit" fullWidth className="bg-primary text-white">
          Update Pet
        </Button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, type = "text", formik }) => (
  <div className="mb-4 w-full">
    <Input
      type={type}
      label={label}
      name={name}
      onChange={formik.handleChange}
      value={formik.values[name]}
    />
    {formik.errors[name] && (
      <p className="text-purple-800 text-sm">{formik.errors[name]}</p>
    )}
  </div>
);

const SelectField = ({ options, label, name, formik }) => (
  <div className="mb-4 w-full">
    <Select
      options={options}
      placeholder={label}
      onChange={(option) => formik.setFieldValue(name, option.value)}
    />
    {formik.errors[name] && (
      <p className="text-purple-800 text-sm">{formik.errors[name]}</p>
    )}
  </div>
);

const TextareaField = ({ label, name, formik }) => (
  <div className="mb-4">
    <Textarea
      label={label}
      name={name}
      onChange={formik.handleChange}
      value={formik.values[name]}
    />
    {formik.errors[name] && (
      <p className="text-purple-800 text-sm">{formik.errors[name]}</p>
    )}
  </div>
);

const RichTextField = ({ label, name, formik }) => (
  <div className="mb-4">
    <ReactQuill
      theme="snow"
      value={formik.values[name]}
      onChange={(value) => formik.setFieldValue(name, value)}
    />
    {formik.errors[name] && (
      <p className="text-purple-800 text-sm">{formik.errors[name]}</p>
    )}
  </div>
);

const FileInputField = ({ label, name, formik }) => (
  <div className="mb-4">
    <Input
      type="file"
      name={name}
      onChange={(e) => formik.setFieldValue(name, e.currentTarget.files[0])}
    />
    {formik.errors[name] && (
      <p className="text-purple-800 text-sm">{formik.errors[name]}</p>
    )}
  </div>
);

export default UpdatePet;
