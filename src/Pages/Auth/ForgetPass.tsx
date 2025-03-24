import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

export default function ForgetPass() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const forget = async (email: string) => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Password reset email sent. Check your inbox!");
      setError("");
    } catch {
      setError("Error sending password reset email");
      setSuccess("");
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: (values) => forget(values.email),
  });

  return (
    <section className="bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Forgot Password
          </h1>
          <div className="w-20 h-1 bg-blue-500 dark:bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {error && (
          <div className="p-3 text-red-700 bg-red-50 rounded-lg">{error}</div>
        )}
        {success && (
          <div className="p-3 text-green-700 bg-green-50 rounded-lg">
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

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
