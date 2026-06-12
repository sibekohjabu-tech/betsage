import { useState } from "react";

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("betsage_user"));
    } catch {
      return null;
    }
  });

  const [page, setPage] = useState("dashboard");

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Login</h2>
        <button
          onClick={() => {
            const u = { email: "test@betsage.ai" };
            localStorage.setItem("betsage_user", JSON.stringify(u));
            setUser(u);
          }}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>

      <h2>⚡ BetSage AI</h2>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setPage("dashboard")}>🏠</button>
        <button onClick={() => setPage("soccer")}>⚽</button>
        <button onClick={() => setPage("worldcup")}>🏆</button>
        <button onClick={() => setPage("acca")}>🎰</button>
      </div>

      <hr />

      {page === "dashboard" && (
  <div style={{ padding: 20 }}>
    <h2>📊 BetSage Dashboard</h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
        gap: 12,
        marginTop: 20,
      }}
    >
      <div style={{
        padding: 15,
        border: "1px solid #ddd",
        borderRadius: 10
      }}>
        <h4>Win Rate</h4>
        <p>--%</p>
      </div>

      <div style={{
        padding: 15,
        border: "1px solid #ddd",
        borderRadius: 10
      }}>
        <h4>Today's Picks</h4>
        <p>0</p>
      </div>

      <div style={{
        padding: 15,
        border: "1px solid #ddd",
        borderRadius: 10
      }}>
        <h4>Active Accas</h4>
        <p>0</p>
      </div>

      <div style={{
        padding: 15,
        border: "1px solid #ddd",
        borderRadius: 10
      }}>
        <h4>ROI</h4>
        <p>--</p>
      </div>
    </div>
  </div>
)}
      {<div style={{ padding: 20 }}>
  <h2>⚽ Soccer Hub</h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: 12,
      marginTop: 20,
    }}
  >
    <div style={{ padding: 15, border: "1px solid #ddd", borderRadius: 10 }}>
      <h3>🔥 Over 2.5 Goals</h3>
      <p>Find high-probability goal matches.</p>
    </div>

    <div style={{ padding: 15, border: "1px solid #ddd", borderRadius: 10 }}>
      <h3>⚡ First Half Over 0.5</h3>
      <p>Matches likely to have an early goal.</p>
    </div>

    <div style={{ padding: 15, border: "1px solid #ddd", borderRadius: 10 }}>
      <h3>📈 Handicap Bets</h3>
      <p>Home, away and underdog handicap selections.</p>
    </div>

    <div style={{ padding: 15, border: "1px solid #ddd", borderRadius: 10 }}>
      <h3>🚩 Corners Markets</h3>
      <p>Over 4.5, 8.5 and team corners opportunities.</p>
    </div>

    <div style={{ padding: 15, border: "1px solid #ddd", borderRadius: 10 }}>
      <h3>🎯 Correct Score</h3>
      <p>AI-generated scoreline predictions.</p>
    </div>
  </div>
</div>
      {page === "worldcup" && <h3>World Cup Page</h3>}
      {page === "acca" && <h3>Acca Page</h3>}

    </div>
  );
}
