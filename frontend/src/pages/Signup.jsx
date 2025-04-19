import { useState, useContext } from "react";
import { AuthContext } from "../services/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { signup, login } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form.email, form.password);   // create account
      await login(form.email, form.password);    // log straight in
      nav("/app");
    } catch (e) {
      setErr(e.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      {err && <p className="error">{err}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Create account</button>
      </form>
      <p>
        Already registered? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
