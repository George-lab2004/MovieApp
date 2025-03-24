import { Link } from "react-router-dom";
import { signInWithGoogle } from "../../auth";
import { useFormik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const user = await signInWithGoogle();
      setSuccess("Successfully logged in!");
      setError("");

      console.log("User logged in:", user);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setError(`Google login failed: ${errorMessage}`);
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Login successful!");
      setError("");
      console.log("User logged in:", response.user);
    } catch {
      setError("Error logging in");
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => login(values.email, values.password),
  });

  return (
    <section className="bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Login
          </h1>
          <div className="w-20 h-1 bg-blue-500 dark:bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {error && (
          <div className="p-3 text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/30 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/30 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Login"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 py-3 bg-red-500 dark:bg-red-600 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition-all"
        >
          Login with Google
        </button>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 dark:text-blue-500">
            Sign Up
          </Link>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
          <Link to="/passwd" className="text-blue-600 dark:text-blue-500">
            Forget Password{" "}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
