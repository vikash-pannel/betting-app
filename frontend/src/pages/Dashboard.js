import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {user && <p>Welcome {user.name} 🎉</p>}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;