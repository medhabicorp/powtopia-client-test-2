import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
import { useSnackbar } from "notistack";
import GoogleLogin from "../../hooks/GoogleLogin";
import GithubLogin from "../../hooks/GithubLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, UserProfile, setUser } = UseAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const photo = formData.get("photo");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result = await createUser(email, password);
      setUser(result.user);
      await UserProfile({ displayName: name, photoURL: photo });
      await axiosPublic.post("/users", { name, email, photo, role: "user" });
      enqueueSnackbar(`${name} registered successfully!`, {
        variant: "success",
        autoHideDuration: 1000,
      });
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Registration failed. Please try again!", {
        variant: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-lg p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-purple-700 dark:text-white">
          Create an Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4 mt-6">
          {["name", "photo", "email", "password"].map((field) => (
            <div key={field}>
              <label
                className="block text-sm font-medium text-gray-600 dark:text-gray-300 capitalize"
                htmlFor={field}
              >
                {field}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-purple-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder={`Enter your ${field}`}
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:ring focus:ring-purple-400"
          >
            Register
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex justify-center gap-4">
          <GoogleLogin />
          <GithubLogin />
        </div>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
