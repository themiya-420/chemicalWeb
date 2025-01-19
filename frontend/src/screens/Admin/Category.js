import React, { useState, useEffect } from "react";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../Services/api"; // Import API functions
import AdminNav from "../../components/AdminNav";
import Footer from "../../components/Footer";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]); // State for categories
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [editingCategory, setEditingCategory] = useState(null); // State for category being edited
  const [newCategoryName, setNewCategoryName] = useState(""); // State for new category name
  const [message, setMessage] = useState(""); // State for feedback message

  const token = sessionStorage.getItem("token"); // Get the token from session storage

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const data = await getCategories(token); // Call API to get categories
      setCategories(data);
    } catch (error) {
      setMessage("Failed to fetch categories.");
    }
  };

  // Add new category
  const handleAddCategory = async () => {
    if (!newCategoryName) return;

    try {
      const response = await addCategory({ name: newCategoryName }, token);
      setMessage(response.message);
      setNewCategoryName(""); // Clear input
      fetchCategories(); // Refresh categories
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Update category
  const handleUpdateCategory = async (id, name) => {
    try {
      const response = await updateCategory(id, { name }, token);
      setMessage(response.message);
      setEditingCategory(null); // Stop editing mode
      fetchCategories(); // Refresh categories
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      const response = await deleteCategory(id, token);
      setMessage(response.message);
      fetchCategories(); // Refresh categories
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <AdminNav />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <header className="bg-gradient-to-r w-screen -mt-32 mb-20 from-green-500 to-green-700 text-white py-6 text-center shadow-md">
          <h1 className="text-4xl font-bold">Manage Categories</h1>
          <p className="mt-2 text-lg">View and manage all Categories here.</p>
        </header>
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
          {/* Search Input */}
          <div className="mb-4 flex justify-center">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm w-full max-w-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Add Category */}
          <div className="mb-6 flex items-center gap-2">
            <input
              type="text"
              placeholder="New category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm w-full max-w-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <button
              onClick={handleAddCategory}
              className="bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700 transition duration-200"
            >
              Add Category
            </button>
          </div>

          {/* Feedback Message */}
          {message && (
            <p className="text-center text-green-600 mb-4 font-medium">
              {message}
            </p>
          )}

          {/* Categories Table */}
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-3 text-left">ID</th>
                  <th className="border p-3 text-left">Category Name</th>
                  <th className="border p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-100">
                    <td className="border p-3">{category.id}</td>
                    <td className="border p-3">
                      {editingCategory === category.id ? (
                        <input
                          type="text"
                          defaultValue={category.name}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      ) : (
                        category.name
                      )}
                    </td>
                    <td className="border p-3 flex gap-2">
                      {editingCategory === category.id ? (
                        <button
                          onClick={() =>
                            handleUpdateCategory(category.id, newCategoryName)
                          }
                          className="bg-blue-600 text-white py-1 px-3 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditingCategory(category.id)}
                          className="bg-yellow-600 text-white py-1 px-3 rounded-md shadow-md hover:bg-yellow-700 transition duration-200"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="bg-red-600 text-white py-1 px-3 rounded-md shadow-md hover:bg-red-700 transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManageCategories;
