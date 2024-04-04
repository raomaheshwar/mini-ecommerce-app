import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Auth/Login";
import Dashboard from "./user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/User";
import Orders from "./user/Orders";
import Profile from "./user/Profile";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
