import React, { useState } from "react";
import { supabase } from "./client.js"; // Make sure this is correctly set up as per previous instructions
import "./index.css"; // Your CSS file

function App() {
  const [isSignIn, setIsSignIn] = useState(true); // State to toggle between Sign In and Sign Up
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    country: "",
    password: "",
  });

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle change for Sign Up form
  const handleSignUpChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle change for Sign In form
  const handleSignInChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Sign Up submission
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signUp({
      email: signUpData.email,
      password: signUpData.password,
      data: { fullName: signUpData.fullName, phoneNumber: signUpData.phoneNumber, country: signUpData.country },
    });

    setLoading(false);
    if (error) {
      setErrorMessage(error.message);
    } else {
      console.log("Sign Up successful!");
      // Optionally reset the form or redirect
      setSignUpData({ fullName: "", email: "", phoneNumber: "", country: "", password: "" });
    }
  };

  // Handle Sign In submission
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signIn({
      email: signInData.email,
      password: signInData.password,
    });

    setLoading(false);
    if (error) {
      setErrorMessage(error.message);
    } else {
      console.log("Sign In successful!");
      // Optionally reset the form or redirect
      setSignInData({ email: "", password: "" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-xl rounded-lg">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {isSignIn ? (
          <>
            <h2 className="text-3xl font-extrabold text-center text-gray-900">Sign In</h2>
            <form className="mt-8 space-y-6" onSubmit={handleSignInSubmit}>
              <div className="rounded-md shadow-sm space-y-4">
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={signInData.email}
                    onChange={handleSignInChange}
                    required
                    className="w-full px-4 py-3 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={signInData.password}
                    onChange={handleSignInChange}
                    required
                    className="w-full px-4 py-3 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-4 py-3 font-semibold text-white ${loading ? 'bg-gray-400' : 'bg-indigo-600'} rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                  {loading ? "Loading..." : "Sign In"}
                </button>
              </div>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => setIsSignIn(false)}
                className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-extrabold text-center text-gray-900">Sign Up</h2>
            <form className="mt-8 space-y-6" onSubmit={handleSignUpSubmit}>
              <div className="rounded-md shadow-sm space-y-4">
                <div className="relative">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={signUpData.fullName}
                    onChange={handleSignUpChange}
                    required
                    className="w-full px-4 py-3 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    required
                    className="w-full px-4 py-3 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={signUpData.phoneNumber}
                    onChange={handleSignUpChange}
                    required
                    className="w-full px-4 py-3 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    value={signUpData.country}
                    onChange={handleSignUpChange}
                    required
                    className="w-full px-4 py-3 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your country"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                    required
                    className="w-full px-4 py-3 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Create a password"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-4 py-3 font-semibold text-white ${loading ? 'bg-gray-400' : 'bg-indigo-600'} rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                  {loading ? "Loading..." : "Register"}
                </button>
              </div>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => setIsSignIn(true)}
                className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Sign In
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;