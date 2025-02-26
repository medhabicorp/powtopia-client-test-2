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
import { useLoaderData } from "react-router-dom";

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

  const categoryOptions = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Fish", label: "Fish" },
    { value: "Rabbit", label: "Rabbit" },
  ];

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
      // image upload to imgbb and then get an url
      const imageFile = new FormData();
      imageFile.append("image", values.image);

      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        // now send the menu item data to the server with the image url
        const plainTextDescription = values.longDescription.replace(
          /<[^>]+>/g,
          ""
        );

        const petsData = {
          ...values,
          longDescription: plainTextDescription,
          adopted: false,
          addedAt: new Date().toISOString(),
          image: res.data.data.display_url,
          userEmail: user.email,
        };

        const petsRes = await axiosSecure.patch(`/pets/${_id}`, petsData);
        // console.log(petsRes.data)
        if (petsRes.data.modifiedCount > 0) {
          // show success popup
          resetForm();
          enqueueSnackbar(`${name} updated successful!`, {
            variant: "success",
            autoHideDuration: 1000,
          });
        }
      }
    },
  });

  return (
    <div>
      <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <Typography variant="h4" color="blue-gray" className="text-center mb-4">
          Updated Pet
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {/* Image Upload */}
          <div className="mb-4">
            <Input
              type="file"
              id="image"
              name="image"
              onChange={(e) =>
                formik.setFieldValue("image", e.currentTarget.files[0])
              }
              className="file-input"
            />
            {formik.errors.image && (
              <p className="text-purple-800 text-sm">
                {formik.errors.petImage}
              </p>
            )}
          </div>

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
            {/* Pet Age */}
            <div className="mb-4 w-full">
              <Input
                type="number"
                label="Pet Age"
                name="age"
                onChange={formik.handleChange}
                value={formik.values.age}
              />
              {formik.errors.age && (
                <p className="text-purple-800 text-sm">{formik.errors.age}</p>
              )}
            </div>
          </div>

          <div className="md:flex gap-5">
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
            {/* Pet Location */}
            <div className="mb-4 w-full">
              <Input
                label="Pet Location"
                name="location"
                onChange={formik.handleChange}
                value={formik.values.location}
              />
              {formik.errors.location && (
                <p className="text-purple-800 text-sm">
                  {formik.errors.location}
                </p>
              )}
            </div>
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
              onChange={(value) =>
                formik.setFieldValue("longDescription", value)
              }
            />
            {formik.errors.longDescription && (
              <p className="text-purple-800 text-sm">
                {formik.errors.longDescription}
              </p>
            )}
          </div>
          {/* Submit Button */}
          <Button type="submit" fullWidth className="bg-primary text-white">
            updated Pet
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePet;
