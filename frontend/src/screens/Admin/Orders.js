import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getAllOrders, deleteOrder, getPaymentSlips } from "../../Services/api";
import AdminNav from "../../components/AdminNav";
import Footer from "../../components/Footer";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [paymentSlips, setPaymentSlips] = useState([]);

  // Fetch all orders and payment slips on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data.map((order, index) => ({ id: index + 1, ...order }))); // Add unique IDs for DataGrid
      } catch (error) {
        console.error("Failed to fetch orders:", error.message);
      }
    };

    const fetchPaymentSlips = async () => {
      try {
        const data = await getPaymentSlips();
        setPaymentSlips(data);
      } catch (error) {
        console.error("Failed to fetch payment slips:", error.message);
      }
    };

    fetchOrders();
    fetchPaymentSlips();
  }, []);

  // Handle delete order
  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(orderId);
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
        alert("Order deleted successfully.");
      } catch (error) {
        console.error("Failed to delete order:", error.message);
      }
    }
  };

  // Define columns for DataGrid
  const columns = [
    { field: "id", headerName: "Order ID", flex: 1 },
    { field: "name", headerName: "Customer Name", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "address", headerName: "Address", flex: 2 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "product_id", headerName: "Product ID", flex: 1 },
    {
      field: "payment_slip",
      headerName: "Payment Slip",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <a
            href={`http://localhost:7001${params.value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Slip
          </a>
        ) : (
          "No Slip"
        ),
    },
    {
      field: "created_at",
      headerName: "Time & Date",
      flex: 1.5,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <button
          onClick={() => handleDeleteOrder(params.row.id)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <>
      <AdminNav />
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-green-500 to-green-700 text-white py-6 text-center shadow-md">
          <h1 className="text-4xl font-bold">Manage Orders</h1>
          <p className="mt-2 text-lg">
            View and manage all customer orders here.
          </p>
        </header>

        <main className="container mx-auto p-6">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Orders</h2>
            <div className="overflow-hidden rounded-lg bg-white shadow-md">
              <DataGrid
                rows={orders}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 50]}
                autoHeight
                disableSelectionOnClick
              />
            </div>
          </section>

          {/* Payment Slips Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Payment Slips</h2>
            {paymentSlips.length > 0 ? (
              <ul className="bg-white rounded-md shadow-md p-6">
                {paymentSlips.map((slip, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center mb-4 border-b pb-2"
                  >
                    <a
                      href={`http://localhost:7001/uploads/payment_slips/${slip}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline truncate"
                    >
                      {slip}
                    </a>
                    <span className="text-gray-600 text-sm">
                      {new Date().toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No payment slips found.</p>
            )}
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Orders;
