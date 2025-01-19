import React, { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../Services/api";
import AdminNav from "../../components/AdminNav";
import Footer from "../../components/Footer";

const AddProduct = () => {
  const [products, setProducts] = useState([]); // List of products
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    image1: null,
    image2: null,
    image3: null,
  });
  const [editingProduct, setEditingProduct] = useState(null); // Product being edited
  const [message, setMessage] = useState(""); // Feedback message

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      setMessage("Failed to fetch products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProductData({ ...productData, [name]: files[0] });
  };

  // Add or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        setMessage("Product updated successfully.");
      } else {
        await createProduct(formData);
        setMessage("Product added successfully.");
      }
      fetchProducts();
      setEditingProduct(null);
      setProductData({
        name: "",
        description: "",
        price: "",
        categoryId: "",
        image1: null,
        image2: null,
        image3: null,
      });
    } catch (error) {
      setMessage("Failed to save product.");
    }
  };

  // Delete Product
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setMessage("Product deleted successfully.");
      fetchProducts();
    } catch (error) {
      setMessage("Failed to delete product.");
    }
  };

  return (
    <>
      <AdminNav />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r w-screen from-green-500 to-green-700 text-white py-6 text-center shadow-md">
          <h1 className="text-4xl font-bold">Manage Products</h1>
          <p className="mt-2 text-lg">View and manage all Products here.</p>
        </header>
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
          {/* Feedback Message */}
          {message && (
            <p className="text-center text-green-600 mb-4 font-medium">
              {message}
            </p>
          )}

          {/* Add / Edit Product Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={productData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <textarea
              name="description"
              placeholder="Product Description"
              value={productData.description}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="3"
              required
            ></textarea>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={productData.price}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="text"
              name="categoryId"
              placeholder="Category ID"
              value={productData.categoryId}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="file"
              name="image1"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="file"
              name="image2"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="file"
              name="image3"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-md shadow-md hover:bg-green-700 transition duration-200"
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
          </form>

          {/* Products Table */}
          <div className="overflow-x-auto mt-6">
            <table className="table-auto border-collapse border border-gray-300 w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-3 text-left">ID</th>
                  <th className="border p-3 text-left">Name</th>
                  <th className="border p-3 text-left">Price</th>
                  <th className="border p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-100">
                    <td className="border p-3">{product.id}</td>
                    <td className="border p-3">{product.name}</td>
                    <td className="border p-3">${product.price}</td>
                    <td className="border p-3 flex gap-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="bg-yellow-600 text-white py-1 px-3 rounded-md shadow-md hover:bg-yellow-700 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
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

export default AddProduct;
