import { useState, useEffect, useRef } from "react";

const SPORTS = [
  { id: "nfl", label: "NFL", icon: "🏈" },
  { id: "nba", label: "NBA", icon: "🏀" },
  { id: "mlb", label: "MLB", icon: "⚾" },
  { id: "nhl", label: "NHL", icon: "🏒" },
  { id: "soccer", label: "Soccer", icon: "⚽" },
  { id: "ufc", label: "UFC/MMA", icon: "🥊" },
];

const BET_TYPES = ["Moneyline", "Spread", "Over/Under", "Player Props", "Parlays"];

const SAMPLE_PICKS = [
  {
    id: 1,
    sport: "NBA",
    match: "Lakers vs. Celtics",
    time: "Tonight 7:30 PM ET",
    bet: "Lakers -3.5",
    type: "Spread",
    confidence: 84,
    odds: "-110",
    edge: "+4.2%",
    reasoning: "Lakers are 12-3 ATS at home in the last 15 games. Celtics missing key rotation players.",
    trend: "up",
  },
  {
    id: 2,
    sport: "NFL",
    match: "Chiefs vs. Ravens",
    time: "Sunday 4:25 PM ET",
    bet: "Over 47.5",
    type: "Over/Under",
    confidence: 76,
    odds: "-115",
    edge: "+2.8%",
    reasoning: "Both offenses averaging 32+ points over last month. Weather is favorable.",
    trend: "up",
  },
  {
    id: 3,
    sport: "MLB",
    match: "Yankees vs. Red Sox",
    time: "Tonight 8:05 PM ET",
    bet: "Yankees ML",
    type: "Moneyline",
    confidence: 71,
    odds: "-130",
    edge: "+1.9%",
    reasoning: "Cole on the mound, 9-1 in last 10 starts vs. Boston. Bullpen edge significantly favors NYY.",
    trend: "neutral",
  },
];

function ConfidenceRing({ value, size = 64 }) {
  const r = size / 2 - 6;
  const circ = 2 * Math.PI * r;
  const fill = (value / 100) * circ;
  const color = value >= 80 ? "#00e5a0" : value >= 65 ? "#f5c518" : "#ff6b6b";

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={5} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={5}
        strokeDasharray={`${fill} ${circ}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 1.2s cubic-bezier(0.34,1.56,0.64,1)" }}
      />
      <text
        x={size / 2}
        y={size / 2 + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontSize={size * 0.22}
        fontWeight="700"
        fontFamily="'Space Mono', monospace"
        style={{ transform: `rotate(90deg)`, transformOrigin: "center" }}
      >
        {value}%
      </text>
    </svg>
  );
}

function PickCard({ pick, index }) {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 120 + 300);
    return () => clearTimeout(t);
  }, [index]);

  const trendColor = pick.trend === "up" ? "#00e5a0" : pick.trend === "down" ? "#ff6b6b" : "#aaa";
  const trendIcon = pick.trend === "up" ? "↑" : pick.trend === "down" ? "↓" : "→";

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "20px 22px",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease, background 0.2s ease",
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
      onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
    >
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <ConfidenceRing value={pick.confidence} size={60} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontFamily: "'Space Mono',monospace", color: "#888", letterSpacing: 2, textTransform: "uppercase" }}>
              {pick.sport} · {pick.type}
            </span>
            <span style={{ fontSize: 13, fontFamily: "'Space Mono',monospace", color: trendColor, fontWeight: 700 }}>
              {trendIcon} {pick.edge}
            </span>
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", fontFamily: "'Syne', sans-serif", marginBottom: 2 }}>
            {pick.match}
          </div>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>{pick.time}</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span style={{
              background: "rgba(0,229,160,0.12)", border: "1px solid rgba(0,229,160,0.3)",
              color: "#00e5a0", padding: "4px 12px", borderRadius: 30,
              fontFamily: "'Space Mono',monospace", fontSize: 13, fontWeight: 700
            }}>
              {pick.bet}
            </span>
            <span style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
              color: "#ccc", padding: "4px 12px", borderRadius: 30,
              fontFamily: "'Space Mono',monospace", fontSize: 13
            }}>
              {pick.odds}
            </span>
          </div>
        </div>
      </div>

      {expanded && (
        <div style={{
          marginTop: 16, paddingTop: 16,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          color: "#bbb", fontSize: 14, lineHeight: 1.6,
          fontFamily: "'DM Sans', sans-serif"
        }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <span style={{ color: "#00e5a0", fontSize: 16 }}>🧠</span>
            <span style={{ color: "#888", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>AI Analysis</span>
          </div>
          {pick.reasoning}
        </div>
      )}
    </div>
  );
}

function AskSagePanel({ onClose }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "I'm Sage — your AI edge finder. Ask me about any game, betting angle, or sports trend. I'll cut through the noise and give you the real edge." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const history = [...messages, { role: "user", content: userMsg }];
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are Sage, an elite AI sports betting analyst with deep expertise in NFL, NBA, MLB, NHL, soccer, and MMA. You analyze games with sharp statistical insight, line movement, injury reports, historical trends, and market inefficiencies.

Your style: direct, confident, data-driven, and a little edgy — like a sharp bettor who has seen everything. You give actionable insights, not wishy-washy opinions. You always mention confidence levels (as a %), expected edge, and key factors.

Format your response clearly with short paragraphs. Use em dashes liberally. When giving a pick, bold it. Be engaging but concise — no fluff. Max 3 paragraphs.`,
          messages: history,
        })
      });

      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("") || "Something went sideways. Try again.";
      setMessages(prev => [...prev, { role: "assistant", content: text }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Network error. Make sure you have API access configured." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(6,8,18,0.85)",
      backdropFilter: "blur(12px)", zIndex: 100,
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      padding: "0 0 0 0"
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        width: "100%", maxWidth: 480,
        background: "#0d1024",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "24px 24px 0 0",
        display: "flex", flexDirection: "column",
        height: "75vh",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          padding: "18px 20px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg, #00e5a0, #0066ff)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18
            }}>🧠</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "'Syne',sans-serif" }}>Ask Sage</div>
              <div style={{ color: "#00e5a0", fontSize: 11, fontFamily: "'Space Mono',monospace" }}>● Online</div>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.08)", border: "none", color: "#888",
            width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 16
          }}>✕</button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start"
            }}>
              <div style={{
                maxWidth: "85%",
                background: m.role === "user"
                  ? "linear-gradient(135deg, #0066ff, #0044cc)"
                  : "rgba(255,255,255,0.06)",
                border: m.role === "assistant" ? "1px solid rgba(255,255,255,0.08)" : "none",
                borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                padding: "12px 16px",
                color: "#e0e0e0",
                fontSize: 14,
                lineHeight: 1.65,
                fontFamily: "'DM Sans', sans-serif",
                whiteSpace: "pre-wrap",
              }}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 6, padding: "8px 0" }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#00e5a0",
                  animation: `bounce 1.2s ${i * 0.2}s infinite ease-in-out`
                }} />
              ))}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: "14px 16px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          display: "flex", gap: 10
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Ask about any game or bet..."
            style={{
              flex: 1, background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 12, padding: "12px 16px",
              color: "#fff", fontSize: 14, outline: "none",
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
          <button onClick={send} disabled={loading} style={{
            background: "linear-gradient(135deg, #00e5a0, #00b37e)",
            border: "none", borderRadius: 12,
            width: 48, height: 48, cursor: "pointer",
            fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center"
          }}>➤</button>
        </div>
      </div>
    </div>
  );
}

export default function BetSage() {
  const [activeTab, setActiveTab] = useState("picks");
  const [activeSport, setActiveSport] = useState("nba");
  const [showChat, setShowChat] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const tabs = [
    { id: "picks", label: "Today's Picks", icon: "🎯" },
    { id: "tracker", label: "Bet Tracker", icon: "📊" },
    { id: "stats", label: "Stats", icon: "📈" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#060812",
      color: "#fff",
      fontFamily: "'DM Sans', sans-serif",
      overflowX: "hidden",
      position: "relative",
    }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060812; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 2px; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(0,229,160,0.4); }
          70% { box-shadow: 0 0 0 12px rgba(0,229,160,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,229,160,0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* Background orbs */}
      <div style={{
        position: "fixed", top: -100, right: -100, width: 400, height: 400,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(0,102,255,0.12) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0
      }} />
      <div style={{
        position: "fixed", bottom: 100, left: -120, width: 350, height: 350,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 480, margin: "0 auto", paddingBottom: 100 }}>

        {/* Header */}
        <div style={{
          padding: "52px 20px 20px",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(-16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 22 }}>🧿</span>
                <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>BetSage</span>
              </div>
              <div style={{ color: "#888", fontSize: 12, fontFamily: "'Space Mono',monospace" }}>
                Monday, Jun 1 · 14 picks available
              </div>
            </div>
            <div style={{
              background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.25)",
              borderRadius: 12, padding: "8px 14px", textAlign: "center"
            }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 18, fontWeight: 700, color: "#00e5a0" }}>+31.4%</div>
              <div style={{ color: "#888", fontSize: 10, letterSpacing: 1 }}>30-DAY ROI</div>
            </div>
          </div>

          {/* Win rate banner */}
          <div style={{
            background: "linear-gradient(135deg, rgba(0,102,255,0.15), rgba(0,229,160,0.08))",
            border: "1px solid rgba(0,102,255,0.2)",
            borderRadius: 16, padding: "14px 18px",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            {[
              { label: "Win Rate", value: "67.4%" },
              { label: "Avg Edge", value: "+3.1%" },
              { label: "Picks Today", value: "14" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 17, fontWeight: 700, color: "#fff" }}>{s.value}</div>
                <div style={{ color: "#888", fontSize: 10, letterSpacing: 1, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sport filter */}
        <div style={{ padding: "0 0 0 20px", marginBottom: 20, overflowX: "auto" }}>
          <div style={{ display: "flex", gap: 8, paddingRight: 20 }}>
            {SPORTS.map(s => (
              <button key={s.id} onClick={() => setActiveSport(s.id)} style={{
                background: activeSport === s.id ? "rgba(0,229,160,0.15)" : "rgba(255,255,255,0.04)",
                border: activeSport === s.id ? "1px solid rgba(0,229,160,0.4)" : "1px solid rgba(255,255,255,0.08)",
                color: activeSport === s.id ? "#00e5a0" : "#888",
                borderRadius: 30, padding: "8px 16px",
                cursor: "pointer", fontSize: 13, fontWeight: 600,
                whiteSpace: "nowrap", transition: "all 0.2s ease",
                display: "flex", alignItems: "center", gap: 6
              }}>
                <span style={{ fontSize: 15 }}>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", margin: "0 20px 20px", background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 4 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              flex: 1, padding: "10px 8px",
              background: activeTab === t.id ? "rgba(255,255,255,0.1)" : "transparent",
              border: "none", color: activeTab === t.id ? "#fff" : "#666",
              borderRadius: 10, cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600,
              transition: "all 0.2s ease"
            }}>
              <span style={{ marginRight: 4 }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Picks */}
        {activeTab === "picks" && (
          <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ color: "#888", fontSize: 12, fontFamily: "'Space Mono',monospace", letterSpacing: 1, marginBottom: 4 }}>
              TOP PICKS · TAP TO EXPAND ANALYSIS
            </div>
            {SAMPLE_PICKS.map((pick, i) => (
              <PickCard key={pick.id} pick={pick} index={i} />
            ))}

            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px dashed rgba(255,255,255,0.1)",
              borderRadius: 16, padding: "24px",
              textAlign: "center", color: "#555"
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🔒</div>
              <div style={{ fontSize: 14, marginBottom: 4, color: "#888" }}>11 more picks available</div>
              <div style={{ fontSize: 12 }}>Unlock with Pro · $29/mo</div>
            </div>
          </div>
        )}

        {activeTab === "tracker" && (
          <div style={{ padding: "0 20px" }}>
            <div style={{ color: "#888", fontSize: 12, fontFamily: "'Space Mono',monospace", letterSpacing: 1, marginBottom: 16 }}>
              BET TRACKER · MAY 2026
            </div>
            {[
              { date: "May 31", bet: "Warriors -4.5", result: "W", profit: "+$95" },
              { date: "May 30", bet: "Eagles ML", result: "L", profit: "-$100" },
              { date: "May 30", bet: "Over 48.5 Chiefs/Raiders", result: "W", profit: "+$88" },
              { date: "May 29", bet: "Dodgers -1.5", result: "W", profit: "+$110" },
              { date: "May 28", bet: "Celtics +3", result: "W", profit: "+$92" },
            ].map((b, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.06)"
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{b.bet}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{b.date}</div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{
                    padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                    background: b.result === "W" ? "rgba(0,229,160,0.15)" : "rgba(255,107,107,0.15)",
                    color: b.result === "W" ? "#00e5a0" : "#ff6b6b"
                  }}>{b.result}</span>
                  <span style={{
                    fontFamily: "'Space Mono',monospace", fontSize: 14, fontWeight: 700,
                    color: b.profit.startsWith("+") ? "#00e5a0" : "#ff6b6b"
                  }}>{b.profit}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "stats" && (
          <div style={{ padding: "0 20px" }}>
            <div style={{ color: "#888", fontSize: 12, fontFamily: "'Space Mono',monospace", letterSpacing: 1, marginBottom: 16 }}>
              PERFORMANCE BY SPORT
            </div>
            {[
              { sport: "NBA 🏀", wins: 34, losses: 16, roi: "+22.4%" },
              { sport: "NFL 🏈", wins: 28, losses: 18, roi: "+18.1%" },
              { sport: "MLB ⚾", wins: 41, losses: 24, roi: "+12.7%" },
              { sport: "NHL 🏒", wins: 19, losses: 14, roi: "+9.3%" },
              { sport: "Soccer ⚽", wins: 22, losses: 17, roi: "+7.8%" },
            ].map((s, i) => {
              const winRate = Math.round((s.wins / (s.wins + s.losses)) * 100);
              return (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.03)", borderRadius: 14,
                  padding: "16px 18px", marginBottom: 10
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>{s.sport}</span>
                    <span style={{ fontFamily: "'Space Mono',monospace", color: "#00e5a0", fontSize: 14 }}>{s.roi}</span>
                  </div>
                  <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
                    <span style={{ fontSize: 12, color: "#888" }}>W: <span style={{ color: "#00e5a0" }}>{s.wins}</span></span>
                    <span style={{ fontSize: 12, color: "#888" }}>L: <span style={{ color: "#ff6b6b" }}>{s.losses}</span></span>
                    <span style={{ fontSize: 12, color: "#888" }}>Win%: <span style={{ color: "#fff" }}>{winRate}%</span></span>
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                    <div style={{
                      height: "100%", borderRadius: 2,
                      background: "linear-gradient(90deg, #00e5a0, #0066ff)",
                      width: `${winRate}%`, transition: "width 1s ease"
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(6,8,18,0.95)", backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "12px 20px 28px",
        display: "flex", justifyContent: "space-around", alignItems: "center",
        zIndex: 50
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            background: "transparent", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            color: activeTab === t.id ? "#00e5a0" : "#555",
            transition: "color 0.2s ease", padding: "4px 16px"
          }}>
            <span style={{ fontSize: 20 }}>{t.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 0.5 }}>{t.label.split("'")[0].split(" ")[0]}</span>
          </button>
        ))}

        {/* Ask Sage FAB */}
        <button onClick={() => setShowChat(true)} style={{
          background: "linear-gradient(135deg, #00e5a0, #00b37e)",
          border: "none", borderRadius: "50%",
          width: 56, height: 56, cursor: "pointer",
          fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 0 0 rgba(0,229,160,0.4)",
          animation: "pulse-ring 2.5s infinite",
          transition: "transform 0.2s ease"
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          🧠
        </button>
      </div>

      {showChat && <AskSagePanel onClose={() => setShowChat(false)} />}
    </div>
  );
}
