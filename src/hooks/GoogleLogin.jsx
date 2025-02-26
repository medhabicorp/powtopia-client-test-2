import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";
import useAxiosPublic from "./useAxiosPublic";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
  const { googleLogin } = UseAuth();
  const { enqueueSnackbar } = useSnackbar();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        photo: result.user?.photoURL,
        role: "user",
      };
      await axiosPublic.post("/users", userInfo);
      enqueueSnackbar(`${result.user?.displayName} login successful.`, {
        variant: "success",
        autoHideDuration: 1000,
      });
      navigate("/");
    } catch {
      enqueueSnackbar("Login failed! Please try again.", {
        variant: "error",
        autoHideDuration: 5000,
      });
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full py-2 px-4 flex items-center justify-center text-secondary font-semibold rounded-lg border-2 border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:text-white focus:ring-offset-2"
    >
      <FcGoogle className="mr-2" />
      Google
    </button>
  );
};

export default GoogleLogin;
