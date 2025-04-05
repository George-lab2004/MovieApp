import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useState, useEffect } from "react";
import { axiosInstanceURL, TokenSession } from "../../Services/EndPoints/URLS";

const Login = () => {
  // State for UI feedback and loading
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tmdbPopup, setTmdbPopup] = useState<Window | null>(null);
  const navigate = useNavigate();

  // Get TMDB request token for authentication
  const getRequestToken = async (): Promise<string | null> => {
    try {
      const response = await axiosInstanceURL.get(TokenSession.Token);
      const requestToken = response.data.request_token;
      localStorage.setItem("request_token", requestToken);
      return requestToken;
    } catch {
      setError("Failed to get TMDB token");
      return null;
    }
  };

  // Create TMDB session after user approves access
  const createSession = async (
    requestToken: string
  ): Promise<string | null> => {
    try {
      const response = await axiosInstanceURL.post(
        TokenSession.Session,
        { request_token: requestToken },
        { headers: { "Content-Type": "application/json" } }
      );
      const sessionId = response.data.session_id;
      localStorage.setItem("session_id", sessionId);
      return sessionId;
    } catch {
      setError("Failed to create TMDB session");
      return null;
    }
  };

  // Get TMDB account ID after successful authentication
  const getAccountID = async (): Promise<void> => {
    try {
      const sessionId = localStorage.getItem("session_id");
      if (!sessionId) return;

      const response = await axiosInstanceURL.get(
        `${TokenSession.AccountID}?session_id=${sessionId}`
      );
      localStorage.setItem("account_id", response.data.id.toString());
    } catch (error) {
      console.error("Error getting account ID:", error);
    }
  };

  // Open popup for user to approve TMDB access
  const openTmdbApprovalPopup = async (requestToken: string) => {
    const popup = window.open(
      `https://www.themoviedb.org/authenticate/${requestToken}`,
      "tmdbAuth",
      `width=600,height=700,top=${(window.innerHeight - 700) / 2},left=${
        (window.innerWidth - 600) / 2
      }`
    );

    if (!popup) {
      setError("Please allow popups for authentication");
      return;
    }

    setTmdbPopup(popup);

    // Check every second if user completed authentication
    const checkInterval = setInterval(async () => {
      if (popup.closed) {
        clearInterval(checkInterval);
        const requestToken = localStorage.getItem("request_token");

        if (requestToken) {
          const sessionId = await createSession(requestToken);
          if (sessionId) {
            await getAccountID(); // Store account ID
            navigate("/"); // Redirect to home page
            setSuccess("Login successful!");
          }
        }
      }
    }, 1000);
  };

  // Cleanup popup when component unmounts
  useEffect(() => {
    return () => {
      tmdbPopup?.close();
    };
  }, [tmdbPopup]);

  // Handle Google login
  const handleGoogleLogin = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError("");

      // 1. Authenticate with Google
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (!user) throw new Error("Authentication failed");

      // 2. Store Firebase token
      const token = await user.getIdToken();
      localStorage.setItem("token", token);

      // 3. Start TMDB authentication flow
      const requestToken = await getRequestToken();
      if (requestToken) {
        await openTmdbApprovalPopup(requestToken);
        setSuccess("Redirecting to TMDB for approval...");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle email/password login
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError("");

      // 1. Authenticate with Firebase
      const user = (await signInWithEmailAndPassword(auth, email, password))
        .user;
      if (!user) throw new Error("Authentication failed");

      // 2. Store Firebase token
      const token = await user.getIdToken();
      localStorage.setItem("token", token);

      // 3. Start TMDB authentication flow
      const requestToken = await getRequestToken();
      if (requestToken) {
        await openTmdbApprovalPopup(requestToken);
        setSuccess("Redirecting to TMDB for approval...");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Form setup
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => login(values.email, values.password),
  });

  return (
    <section className="bg-gradient-to-br from-blue-50 to-gray-300 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center min-h-screen p-4">
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
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Login with Google"}
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
