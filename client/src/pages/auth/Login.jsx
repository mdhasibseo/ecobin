import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";

import { loginUser } from "../../services/authService";

import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await loginUser(formData);

    login(data.user, data.token);

    if (data.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Login Failed"
    );
  }
};

  return (
    <AuthLayout title="Login" subtitle="Welcome Back">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        />

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-xl"
        >
          Login
        </button>

        <p className="text-center">
          No Account?
          <Link to="/register" className="text-green-700 ml-2">
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
