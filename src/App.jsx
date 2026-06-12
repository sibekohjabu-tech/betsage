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

      {page === "dashboard" && <h3>Dashboard Page</h3>}
      {page === "soccer" && <h3>Soccer Page</h3>}
      {page === "worldcup" && <h3>World Cup Page</h3>}
      {page === "acca" && <h3>Acca Page</h3>}

    </div>
  );
}
