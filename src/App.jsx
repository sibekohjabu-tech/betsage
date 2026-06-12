import { useState } from "react";

// TEMP SAFE FALLBACKS (prevents blank screen)
const G = {
  bg: "#0b1220",
  text: "#ffffff",
  border: "#1f2a3a",
  dim: "#9aa4b2"
};

function SBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "6px 10px",
      borderRadius: 6,
      border: "1px solid #2a3a52",
      background: "#111a2b",
      color: "#fff"
    }}>
      {children}
    </button>
  );
}

// TEMP PLACEHOLDERS (so app never crashes)
const AuthModal = ({ onSuccess }) => (
  <div style={{ padding: 20 }}>
    <h2>Login</h2>
    <button onClick={() => onSuccess({ email: "test@user.com" })}>
      Login Test User
    </button>
  </div>
);

const SoccerPage = () => <div style={{ padding: 20 }}>Soccer Page</div>;
const WCPage = () => <div style={{ padding: 20 }}>World Cup Page</div>;
const AccaPage = () => <div style={{ padding: 20 }}>Acca Page</div>;

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ea_user"));
    } catch {
      return null;
    }
  });

  const [page, setPage] = useState("soccer");
  const [showAuth, setShowAuth] = useState(false);

  function logout() {
    localStorage.removeItem("ea_user");
    setUser(null);
    setShowAuth(true);
  }

  if (!user && !showAuth) {
    return (
      <AuthModal
        onSuccess={(u) => {
          setUser(u);
          setShowAuth(false);
          localStorage.setItem("ea_user", JSON.stringify(u));
        }}
      />
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: G.bg, color: G.text }}>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 14,
        borderBottom: `1px solid ${G.border}`,
        background: "#070E1A"
      }}>
        <div>⚡ BetSage AI</div>

        <div style={{ display: "flex", gap: 8 }}>
          <SBtn onClick={() => setPage("soccer")}>⚽</SBtn>
          <SBtn onClick={() => setPage("wc")}>🏆</SBtn>
          <SBtn onClick={() => setPage("acca")}>🎰</SBtn>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <span>{user?.email}</span>
          <SBtn onClick={logout}>Logout</SBtn>
        </div>
      </div>

      {page === "soccer" && <SoccerPage />}
      {page === "wc" && <WCPage />}
      {page === "acca" && <AccaPage />}

    </div>
  );
}
