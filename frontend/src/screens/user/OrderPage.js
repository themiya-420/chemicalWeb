import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { placeOrder, uploadPaymentSlip } from "../../Services/api"; // Add uploadPaymentSlip API function
import ProductCard from "../../components/ProductCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const OrderPage = () => {
  const { state } = useLocation(); // Get product details from state
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({
    id: "",
    name: "",
    phone: "",
    address: "",
    quantity: 1,
  });
  const [orderPlaced, setOrderPlaced] = useState(false); // Track if the order is placed
  const [paymentSlip, setPaymentSlip] = useState(null); // Payment slip file

  // Set initial values for address and phone from local storage
  useEffect(() => {
    const savedPhone = localStorage.getItem("phone") || "";
    const savedAddress = localStorage.getItem("address") || "";
    const id = localStorage.getItem("id") || "";

    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      id: id,
      phone: savedPhone,
      address: savedAddress,
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await placeOrder({
        productId: state.product.id,
        ...orderDetails,
      });

      console.log(response);
      setOrderDetails((prev) => ({ ...prev, id: response.orderId })); // Update orderId
      setOrderPlaced(true); // Show payment section
      alert("Order placed successfully! Please upload your payment slip.");
    } catch (error) {
      alert("Failed to place the order.");
    }
  };

  const handlePaymentUpload = async () => {
    if (!paymentSlip) {
      alert("Please select a payment slip to upload.");
      return;
    }

    console.log(orderDetails.id);

    const formData = new FormData();
    formData.append("paymentSlip", paymentSlip);
    formData.append("orderId", orderDetails.id); // Include order ID

    try {
      const response = await uploadPaymentSlip(formData); // Upload payment slip to backend
      alert("Payment slip uploaded successfully!");
      console.log(response);
      navigate("/"); // Uncomment if needed
    } catch (error) {
      alert("Failed to upload payment slip.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <Navbar />
      <header className="bg-gradient-to-r from-green-500 to-green-700 text-white w-full py-6 px-4 text-center shadow-md">
        <h1 className="text-4xl font-bold">Place Your Order</h1>
        <p className="mt-2 text-lg">
          Complete your details and confirm your purchase below.
        </p>
      </header>

      <main className="w-full max-w-6xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Details */}
          <div className="col-span-1 lg:col-span-2 bg-white p-6 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Product Details
            </h2>
            <ProductCard product={state.product} />
          </div>

          {/* Order Details Form */}
          <div className="col-span-1 bg-white p-6 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your Details
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={orderDetails.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={orderDetails.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="address">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={orderDetails.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  rows="3"
                  placeholder="Enter your shipping address"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={orderDetails.quantity}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  min="1"
                  required
                />
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-200"
              >
                Confirm Order
              </button>
            </form>
          </div>
        </div>

        {/* Payment Upload Section */}
        {orderPlaced && (
          <div className="mt-6 bg-white p-6 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Payment Details
            </h2>
            <p className="text-gray-700 mb-4">
              Please make a payment to the following bank account:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Bank: ABC Bank</li>
              <li>Account Number: 123456789</li>
              <li>Branch: Main Street</li>
              <li>IFSC Code: ABCD1234</li>
            </ul>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="paymentSlip">
                Upload Payment Slip
              </label>
              <input
                type="file"
                id="paymentSlip"
                onChange={(e) => setPaymentSlip(e.target.files[0])}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handlePaymentUpload}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Upload Payment Slip
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrderPage;
