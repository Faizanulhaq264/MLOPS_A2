import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Counter from "./pages/Counter";
import { useContext } from "react";
import { AuthContext } from "./services/AuthContext";

export default function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/app" /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/app"
        element={
          user ? (
            <Counter />
          ) : (
            <Navigate to="/login" replace state={{ from: "/app" }} />
          )
        }
      />
    </Routes>
  );
}
