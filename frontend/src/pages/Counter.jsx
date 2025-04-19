import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../services/AuthContext";

export default function Counter() {
  const { user, logout } = useContext(AuthContext);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Axios helper with auth header
  const api = axios.create({
    baseURL: "http://counter-service.local",
    headers: { Authorization: `Bearer ${user.token}` },
  });

  // Fetch current count
  useEffect(() => {
    (async () => {
      const res = await api.get("/count");
      setCount(res.data.value);
      setLoading(false);
    })();
  }, []);

  const increment = async () => {
    const res = await api.post("/count/increment");
    setCount(res.data.value);
  };

  if (loading) return <p>Loading counter…</p>;

  return (
    <div className="container">
      <h2>Welcome, {user.email}</h2>
      <p>Current counter value (stored in MongoDB): {count}</p>
      <button onClick={increment}>+1</button>
      <br />
      <button onClick={logout} style={{ marginTop: "1rem" }}>
        Log Out
      </button>
    </div>
  );
}
