import React, { useState } from "react";
import { loginUser } from "../Services/api";
import { useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    console.log(email, password);

    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      console.log("User logged in successfully:", response.data);
      const token = sessionStorage.setItem("token", response.token);

      const role = response.data.role;
      console.log(role);

      if (role === "admin") {
        navigate("/admin");
        alert("Login Successful! Welcome Admin");
      } else {
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("address", response.data.address);
        localStorage.setItem("phone", response.data.phone);

        navigate("/");
        alert("Login Successful");
      }

      // navigate("/");

      // Handle successful login (e.g., redirect to home)
    } catch (error) {
      console.error("Login error:", error);
      alert(error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-2">Sign In</h2>
        <div className="w-96 flex flex-row justify-center items-center">
          <img src={Logo} className="w-20 mr-16" alt="logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
