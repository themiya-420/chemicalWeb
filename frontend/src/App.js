import React, { createContext, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/user/Home";
import SignIn from "./screens/Signin";
import SignUp from "./screens/SignUp";
import AdminHome from "./screens/Admin/AdminHome";
import AddCategory from "./screens/Admin/Category";
import AddProduct from "./screens/Admin/Products";
import AddUsers from "./screens/Admin/Users";
import ManageOrders from "./screens/Admin/Orders";
import OrderPage from "./screens/user/OrderPage";

// Create a Context
const AppContext = createContext();

// Context Provider Component
const AppProvider = ({ children }) => {
  // Add any state or functions you want to provide here
  return (
    <AppContext.Provider
      value={
        {
          /* context values */
        }
      }
    >
      {children}
    </AppContext.Provider>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/category" element={<AddCategory />} />
          <Route path="/admin/product" element={<AddProduct />} />
          <Route path="/admin/users" element={<AddUsers />} />
          <Route path="/admin/orders" element={<ManageOrders />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
