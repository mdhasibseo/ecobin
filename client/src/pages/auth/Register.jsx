import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";

import {
  registerUser,
} from "../../services/authService";

const Register = () => {
  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await registerUser(
          formData
        );

        alert(
          "Registration Successful"
        );

        navigate(
          "/login"
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Registration Failed"
        );
      }
    };

  return (
    <AuthLayout
      title="Register"
      subtitle="Create Account"
    >
      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={
            formData.name
          }
          onChange={
            handleChange
          }
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={
            formData.email
          }
          onChange={
            handleChange
          }
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={
            formData.password
          }
          onChange={
            handleChange
          }
          className="w-full border p-3 rounded-xl"
        />

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-xl"
        >
          Register
        </button>

        <p className="text-center">
          Already have account?

          <Link
            to="/login"
            className="text-green-700 ml-2"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;