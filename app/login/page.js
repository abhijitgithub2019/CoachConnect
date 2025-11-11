"use client";
import { useState } from "react";
import MenuBar from "../menu/nav/page";
// import AdvertiseToHome from "@/component/advertiseToHome";
import { LoginUser, PostUser } from "../apiCall/signUpApi";
import { redirect } from "next/navigation";
import EmailOtpLogin from "../../component/emailOtpLogin";

export default function AuthForm() {
  const [isSignup, setIsSignup] = useState(true);
  const [isSignupError, setIsSignupError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [otpMode, setOtpMode] = useState(false);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("At least 8 characters");
    if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
    if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
    if (!/[0-9]/.test(password)) errors.push("One number");
    if (!/[^A-Za-z0-9]/.test(password)) errors.push("One special character");
    return errors;
  };

  const validateForm = () => {
    const newErrors = {};
    if (isSignup && !formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (isSignup) {
      const pwdErrors = validatePassword(formData.password);
      if (pwdErrors.length > 0) newErrors.password = pwdErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(false);
    if (validateForm()) {
      setSubmitted(true);
      if (isSignup) {
        const signUp = async () => {
          let res = await PostUser(formData);
          if (res.error) {
            setIsSignupError(res.error);
            alert(res.error);
          } else if (res.status === 201) {
            setIsSignupError("Signup successful!");
            // alert(
            //   "Welcome to CoachConnect, Registration is created sucessfully"
            // );
            redirect("/CoachDashborad");
          }
        };
        signUp();
        // setFormData({ name: "", email: "", password: "" });
      } else {
        const login = async () => {
          let res = await LoginUser(formData);
          if (res.error) {
            setIsSignupError(res.error);
          } else if (res.status === 200) {
            setIsSignupError("Login successful!");
            redirect("/CoachDashborad");
            // alert("Welcome to CoachConnect, LogIn successfull");
          }
        };
        login();
        // Add login logic here
        //setFormData({ name: "", email: "", password: "" });
      }
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen w-full">
      <MenuBar></MenuBar>
      {/* <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-emerald-700">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          {isSignup && (
            <>
              <label
                className="block mb-2 font-medium text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 mb-3 border rounded ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-emerald-400`}
                required={isSignup}
              />
            </>
          )}

          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 mb-3 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-emerald-400`}
            required
          />
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-2 mb-1 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-emerald-400`}
            required
            autoComplete={isSignup ? "new-password" : "current-password"}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mb-3">{errors.name}</p>
          )}
          {errors.email && (
            <p className="text-red-500 text-sm mb-3">{errors.email}</p>
          )}
          {errors.password &&
            (Array.isArray(errors.password) ? (
              <ul className="text-red-500 text-sm mb-3 list-disc list-inside">
                {errors.password.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            ) : (
              <p className="text-red-500 text-sm mb-3">{errors.password}</p>
            ))}

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsSignup(!isSignup);
              setErrors({});
              setSubmitted(false);
              setFormData({ name: "", email: "", password: "" });
            }}
            className="text-emerald-600 hover:underline font-semibold"
          >
            {isSignup ? "Login" : "Sign up"}
          </button>
        </p>

        {submitted && (
          <p className="mt-4 text-green-600 font-medium text-center">
            {isSignupError ? isSignupError : null}
          </p>
        )}
      </div> */}
      <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-emerald-700">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        {/* ✅ OTP or Password Mode Toggle */}
        {!isSignup && (
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setOtpMode(false)}
              className={`px-4 py-2 rounded-l ${
                !otpMode
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Password Login
            </button>
            <button
              onClick={() => setOtpMode(true)}
              className={`px-4 py-2 rounded-r ${
                otpMode
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Login with OTP
            </button>
          </div>
        )}

        {/* ✅ If user chooses OTP mode */}
        {!isSignup && otpMode ? (
          <EmailOtpLogin />
        ) : (
          // ✅ Default form (Sign Up or Password Login)
          <form onSubmit={handleSubmit} noValidate>
            {isSignup && (
              <>
                <label
                  className="block mb-2 font-medium text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-2 mb-3 border rounded ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-emerald-400`}
                  required={isSignup}
                />
              </>
            )}

            <label
              className="block mb-2 font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 mb-3 border rounded ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-emerald-400`}
              required
            />

            {!otpMode && (
              <>
                <label
                  className="block mb-2 font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full p-2 mb-1 border rounded ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-emerald-400`}
                  required
                  autoComplete={isSignup ? "new-password" : "current-password"}
                />
              </>
            )}

            {/* Error messages */}
            {errors.name && (
              <p className="text-red-500 text-sm mb-3">{errors.name}</p>
            )}
            {errors.email && (
              <p className="text-red-500 text-sm mb-3">{errors.email}</p>
            )}
            {errors.password &&
              (Array.isArray(errors.password) ? (
                <ul className="text-red-500 text-sm mb-3 list-disc list-inside">
                  {errors.password.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-red-500 text-sm mb-3">{errors.password}</p>
              ))}

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded transition"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>
        )}

        {/* Signup/Login Toggle */}
        <p className="mt-4 text-center text-gray-700">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsSignup(!isSignup);
              setErrors({});
              setSubmitted(false);
              setFormData({ name: "", email: "", password: "" });
            }}
            className="text-emerald-600 hover:underline font-semibold"
          >
            {isSignup ? "Login" : "Sign up"}
          </button>
        </p>

        {submitted && (
          <p className="mt-4 text-green-600 font-medium text-center">
            {isSignupError ? isSignupError : null}
          </p>
        )}
      </div>
    </div>
  );
}
