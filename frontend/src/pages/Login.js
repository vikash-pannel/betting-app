import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      alert("Login success");

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Save user (IMPORTANT)
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Redirect
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login Page</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>

      <p>
        Don't have account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;