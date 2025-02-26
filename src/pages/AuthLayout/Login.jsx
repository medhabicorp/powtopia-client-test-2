import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
import { useSnackbar } from "notistack";
import GoogleLogin from "../../hooks/GoogleLogin";
import GithubLogin from "../../hooks/GithubLogin";

const Login = () => {
  const { userLogin, setUser } = UseAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    try {
      const result = await userLogin(email.value, password.value);
      setUser(result.user);
      e.target.reset();
      enqueueSnackbar(`Welcome, ${result.user.displayName}!`, {
        variant: "success",
      });
      navigate(from, { replace: true });
    } catch {
      enqueueSnackbar("Login failed. Please check your credentials!", {
        variant: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl backdrop-blur-md bg-opacity-80 w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-4 text-purple-700 dark:text-white">
          Sign In With
        </h2>

        {/* Social Login */}
        <div className="flex justify-center gap-4">
          <GoogleLogin />
          <GithubLogin />
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-2 text-sm text-gray-500">OR</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-purple-300 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-purple-300 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring focus:ring-purple-300"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
