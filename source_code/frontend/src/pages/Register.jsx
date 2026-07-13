import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {
    try {
      await API.post("/users/create", form);

      alert("Registration Successful!");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "#f5f7fa",
      }}
    >
      <div
        className="card shadow p-5"
        style={{
          width: "450px",
          borderRadius: "15px",
        }}
      >
        <h2 className="text-center mb-4">
          Create Account
        </h2>

        <input
          className="form-control mb-3"
          placeholder="Full Name"
          name="full_name"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Email"
          name="email"
          type="email"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Phone Number"
          name="phone"
          onChange={handleChange}
        />

        <input
          className="form-control mb-4"
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
        />

        <button
          className="btn btn-success w-100"
          onClick={registerUser}
        >
          Register
        </button>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;