export default function Navbar({ page, setPage }) {
  return (
    <div style={{ display: "flex", gap: 10, padding: 10 }}>
      <button onClick={() => setPage("dashboard")}>🏠</button>
      <button onClick={() => setPage("soccer")}>⚽</button>
      <button onClick={() => setPage("worldcup")}>🏆</button>
      <button onClick={() => setPage("acca")}>🎰</button>
    </div>
  );
}
