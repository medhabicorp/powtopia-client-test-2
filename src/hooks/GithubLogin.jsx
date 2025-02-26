import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";
import { FaGithub } from "react-icons/fa";

const GithubLogin = () => {
  const { gitHubLogin } = UseAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleGithubLogin = async () => {
    try {
      const result = await gitHubLogin();
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
      onClick={handleGithubLogin}
      className="w-full py-2 px-4 flex items-center justify-center text-secondary font-semibold rounded-lg border-2 border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:text-white focus:ring-offset-2"
    >
      <FaGithub className="mr-2" />
      GitHub
    </button>
  );
};

export default GithubLogin;
