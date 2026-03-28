import React, { useState } from "react";

const MatchCard = ({ match }) => {
  const [coins, setCoins] = useState(1000);

  const handleBet = (team) => {
    if (coins < 100) {
      alert("Not enough coins");
      return;
    }

    setCoins(coins - 100);
    alert(`Bet placed on ${team}`);
  };

  return (
    <div style={styles.card}>
      <h3>
        {match.teamA} vs {match.teamB}
      </h3>

      <p>Coins: {coins}</p>
      <p>Status: {match.status}</p>

      <div style={styles.buttons}>
        <button onClick={() => handleBet(match.teamA)}>
          Bet on {match.teamA}
        </button>

        <button onClick={() => handleBet(match.teamB)}>
          Bet on {match.teamB}
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: "#1e1e2f",
    color: "#fff",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
};

export default MatchCard;