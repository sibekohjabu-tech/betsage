import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Soccer from "./pages/Soccer";
import WorldCup from "./pages/WorldCup";
import Acca from "./pages/Acca";

import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("betsage_user"));
    } catch {
      return null;
    }
  });

  const [page, setPage] = useState("dashboard");

  const [showAuth, setShowAuth] = useState(false);

  function logout() {
    localStorage.removeItem("betsage_user");
    setUser(null);
    setShowAuth(true);
  }

  if (!user && !showAuth) {
    return (
      <AuthModal
        onSuccess={(u) => {
          setUser(u);
          localStorage.setItem("betsage_user", JSON.stringify(u));
        }}
      />
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0b1220", color: "#fff" }}>
      <Navbar
        user={user}
        page={page}
        setPage={setPage}
        logout={logout}
      />

      {page === "dashboard" && <Dashboard />}
      {page === "soccer" && <Soccer />}
      {page === "worldcup" && <WorldCup />}
      {page === "acca" && <Acca />}
    </div>
  );
}
