import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/backgroundpic.png";
import { userDataContext } from "../context/userContext";
import axios from "axios";

function SignIn() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible((v) => !v);

  const { serverUrl, userData, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // empty string = no error / no success
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    // clear previous messages
    setErr("");
    setSuccess("");
    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log("Sign-in success:", result);
      setUserData(result.data);
      setLoading(false);
      navigate("/");
      const data = result.data;
      const message = (data && data.message) || "Logged in successfully.";

      setSuccess(message);

      // If you want to redirect after successful login:
      // navigate("/");  // or "/dashboard", etc.
    } catch (error) {
      console.error("Sign-in error object:", error);
      setUserData(null);
      setLoading(false);
      if (error.response) {
        console.error(
          "Sign-in failed:",
          error.response.status,
          error.response.data
        );

        const data = error.response.data;
        const message =
          (data && data.message) ||
          (data && data.error) ||
          (typeof data === "string" ? data : "") ||
          "Sign-in failed.";

        setErr(message);
      } else if (error.request) {
        console.error("No response from server:", error.request);
        setErr("No response from server. Please try again.");
      } else {
        console.error("Error setting up request:", error.message);
        setErr("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <form
        onSubmit={handleSignIn}
        className="w-full max-w-md bg-[#0000004b] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-4 rounded-2xl px-6 py-8 md:px-8 md:py-10"
      >
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-4 text-center">
          Sign In to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        <input
          type="email"
          placeholder="Enter Your Email"
          className="w-full h-12 md:h-14 outline-none border border-white bg-transparent text-white placeholder-gray-300 px-4 rounded-full text-sm md:text-base"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        {/* Password Field */}
        <div className="w-full h-12 md:h-14 border border-white bg-transparent rounded-full text-white text-sm md:text-base relative flex items-center">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter Your Password"
            className="password-input h-full w-full outline-none bg-transparent text-white placeholder-gray-300 px-4 pr-12 rounded-full"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          {/* Eye Toggle Button */}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            className="absolute right-4 flex items-center justify-center text-white hover:text-blue-200 transition-colors cursor-pointer"
          >
            {passwordVisible ? (
              // Eye Closed
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5 md:w-6 md:h-6"
              >
                <path
                  d="M3 3l18 18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.73 6.73A9.77 9.77 0 0112 6.5c5.5 0 9.5 5.5 9.5 5.5a18.7 18.7 0 01-2.33 2.78m-4.16 2.62A9.73 9.73 0 0112 17.5c-5.5 0-9.5-5.5-9.5-5.5a18.9 18.9 0 013.57-3.47"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.17 9.17a3 3 0 004.24 4.24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              // Eye Open
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5 md:w-6 md:h-6"
              >
                <path
                  d="M1.5 12s4-7.5 10.5-7.5S22.5 12 22.5 12s-4 7.5-10.5 7.5S1.5 12 1.5 12z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        {/* 🔴 Error message */}
        {err && (
          <p className="text-red-500 font-bold mt-1 w-full text-center">
            {err}
          </p>
        )}

        {/* 🟢 Success message */}
        {success && !err && (
          <p className="text-green-400 font-bold mt-1 w-full text-center">
            {success}
          </p>
        )}

        <button
          type="submit"
          className="w-full h-12 md:h-14 text-black rounded-full text-base md:text-lg mt-4 bg-white font-semibold transition-colors hover:bg-gray-100"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-white text-sm md:text-base mt-3 text-center">
          Want to create a new account?{" "}
          <span
            className="text-blue-400 underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
