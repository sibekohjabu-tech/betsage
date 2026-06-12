export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ea_user"));
    } catch {
      return null;
    }
  });

  const [page, setPage] = useState("soccer"); // default working page
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
        }}
      />
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: G.bg, color: G.text }}>
      
      {/* TOP NAV BAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 18px",
        borderBottom: `1px solid ${G.border}`,
        background: "#070E1A"
      }}>
        
        <div style={{ fontWeight: 900, fontSize: 16 }}>
          ⚡ BetSage AI
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <SBtn active={page === "soccer"} onClick={() => setPage("soccer")}>
            ⚽ Soccer
          </SBtn>

          <SBtn active={page === "wc"} onClick={() => setPage("wc")}>
            🏆 World Cup
          </SBtn>

          <SBtn active={page === "acca"} onClick={() => setPage("acca")}>
            🎰 Acca
          </SBtn>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ fontSize: 12, color: G.dim }}>
            {user?.email}
          </span>

          <SBtn onClick={logout}>
            Logout
          </SBtn>
        </div>
      </div>

      {/* MAIN ROUTER */}
      {page === "soccer" && <SoccerPage />}
      {page === "wc" && <WCPage />}
      {page === "acca" && <AccaPage />}

    </div>
  );
}
