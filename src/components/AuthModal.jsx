export default function AuthModal({ onSuccess }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <button onClick={() => onSuccess({ email: "test@betsage.ai" })}>
        Login
      </button>
    </div>
  );
}
