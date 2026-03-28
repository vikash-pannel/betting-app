import React, { useEffect, useState } from "react";
import API from "../api";
import MatchCard from "../components/MatchCard";

const Home = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await API.get("/match/live-matches");
      setMatches(res.data);
    } catch (err) {
      console.error("Error fetching matches:", err);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2>🔥 Live Matches</h2>

      {matches.map((match, index) => (
        <MatchCard key={index} match={match} />
      ))}
    </div>
  );
};

export default Home;