import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import AdminNav from "../../components/AdminNav";
import Footer from "../../components/Footer";
import Logo from "../../images/logo.png";
const AdminHome = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  return (
    <>
      <AdminNav className="fixed" />
      <div className="flex flex-col items-center justify-center min-h-[84vh] bg-gray-100">
        <img src={Logo} alt="logo" className="w-40" />
        <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
        <p className="text-lg mb-8">Manage your application efficiently</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <button
            onClick={() => navigate("/admin/category")}
            className="bg-green-600 text-white p-4 rounded-lg shadow-md hover:bg-green-700 transition duration-200"
          >
            Manage Categories
          </button>
          <button
            onClick={() => navigate("/admin/product")}
            className="bg-green-600 text-white p-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Manage Products
          </button>
          <button
            onClick={() => navigate("/admin/users")}
            className="bg-green-600 text-white p-4 rounded-lg shadow-md hover:bg-purple-700 transition duration-200"
          >
            Manage Users
          </button>
          <button
            onClick={() => navigate("/admin/orders")}
            className="bg-green-600 text-white p-4 rounded-lg shadow-md hover:bg-purple-700 transition duration-200"
          >
            Manage Orders
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminHome;
