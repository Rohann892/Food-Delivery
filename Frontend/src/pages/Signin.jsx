import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const naviagte = useNavigate();

  const signinHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/api/auth/signin`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        console.log(res);
        naviagte("/");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#fff9f6]">
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-lg p-8 border-[1px] border-[#ddd]`}
      >
        <h1 className={`text-3xl font-extrabold mb-2 text-[#ff4d2d]`}>Vingo</h1>
        <p className="text-md text-gray-500">
          create your account to get started with delicious food deliveries
        </p>
        <form onSubmit={signinHandler}>
          <div className="mb-4 flex flex-col mt-3">
            <label
              htmlFor="fullName"
              className="block font-bold text-gray-500 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-500/60 rounded-full px-3 py-2 focus:outline-none focus:border-orange-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative flex flex-col">
            <label
              htmlFor="fullName"
              className="block font-bold text-gray-500 font-medium mb-1"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-500/60 rounded-full px-3 py-2 foucs:outline-none focus:border-orange-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-10 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <div
            className="text-right mt-2 text-[#ff4d2d] font-medium cursor-pointer"
            onClick={() => naviagte("/forgot-password")}
          >
            Forgot password
          </div>
          <button
            type="submit"
            className="w-full bg-[#ff4d2d] px-2 py-2 rounded-full hover:bg-[#f63614] mt-4 text-white cursor-pointer transition-duration-200"
          >
            SignIn
          </button>
        </form>
        <div className="flex items-center justify-center gap-3 my-3 border border-gray-300 py-2 rounded-full hover:bg-gray-200/50">
          <FcGoogle size={30} />
          <span>Signup with Google</span>
        </div>
        <div className="text-center mt-3">
          <p className="text-gray-600">
            Don't have an account{" "}
            <span
              className="text-blue-600 hover:underline"
              onClick={() => naviagte("/signup")}
            >
              SignUp
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
