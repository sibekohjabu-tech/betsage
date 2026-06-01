import { useState, useEffect, useRef } from "react";

const SPORTS = [
  { id: "all", label: "All", icon: "⚡" },
  { id: "nfl", label: "NFL", icon: "🏈" },
  { id: "nba", label: "NBA", icon: "🏀" },
  { id: "mlb", label: "MLB", icon: "⚾" },
  { id: "nhl", label: "NHL", icon: "🏒" },
  { id: "soccer", label: "Soccer", icon: "⚽" },
  { id: "ufc", label: "MMA", icon: "🥊" },
];

const SAMPLE_PICKS = [
  { id: 1, sport: "NBA", home: "Lakers", away: "Celtics", time: "7:30 PM ET", bet: "Lakers -3.5", type: "Spread", confidence: 84, odds: "-110", decimalOdds: 1.91, edge: "+4.2%", reasoning: "Lakers are 12-3 ATS at home in the last 15 games. Celtics missing key rotation players. Line value evident.", trend: "up", league: "nba" },
  { id: 2, sport: "NFL", home: "Chiefs", away: "Ravens", time: "Sun 4:25 PM", bet: "Over 47.5", type: "O/U", confidence: 76, odds: "-115", decimalOdds: 1.87, edge: "+2.8%", reasoning: "Both offenses averaging 32+ pts last month. Weather favorable. Public underweighting offensive pace.", trend: "up", league: "nfl" },
  { id: 3, sport: "MLB", home: "Yankees", away: "Red Sox", time: "8:05 PM ET", bet: "Yankees ML", type: "Moneyline", confidence: 71, odds: "-130", decimalOdds: 1.77, edge: "+1.9%", reasoning: "Cole on the mound, 9-1 in last 10 vs Boston. Bullpen edge heavily favors NYY tonight.", trend: "neutral", league: "mlb" },
  { id: 4, sport: "NHL", home: "Rangers", away: "Bruins", time: "7:00 PM ET", bet: "Under 5.5", type: "O/U", confidence: 68, odds: "-108", decimalOdds: 1.93, edge: "+1.4%", reasoning: "Both starting goalies top-10 in GAA this month. Rangers D stifling in playoff mode.", trend: "up", league: "nhl" },
];

// World Cup 2026 fixtures with Over 2.5 + straight win high-prob picks
const WC_PICKS = [
  { id: "wc1", home: "Brazil", away: "Mexico", flag_h: "🇧🇷", flag_a: "🇲🇽", time: "Jun 15 · 3PM", group: "Group D", win_pick: "Brazil Win", win_odds: "1.62", win_conf: 81, ou_pick: "Over 2.5", ou_odds: "1.74", ou_conf: 78, reasoning: "Brazil averaging 2.9 goals per game in qualifying. Mexico defence concedes from set pieces — expect a lively game." },
  { id: "wc2", home: "Germany", away: "Japan", flag_h: "🇩🇪", flag_a: "🇯🇵", time: "Jun 16 · 6PM", group: "Group E", win_pick: "Germany Win", win_odds: "1.55", win_conf: 84, ou_pick: "Over 2.5", ou_odds: "1.68", ou_conf: 82, reasoning: "Germany's high press vs Japan's transition — high tempo game likely. Germany scored 3+ in 6 of last 8 friendlies." },
  { id: "wc3", home: "France", away: "Poland", flag_h: "🇫🇷", flag_a: "🇵🇱", time: "Jun 17 · 9PM", group: "Group A", win_pick: "France Win", win_odds: "1.44", win_conf: 87, ou_pick: "Over 2.5", ou_odds: "1.71", ou_conf: 76, reasoning: "France's attacking depth is elite. Mbappé + Dembélé vs Poland's porous backline — goals very likely." },
  { id: "wc4", home: "Argentina", away: "Saudi Arabia", flag_h: "🇦🇷", flag_a: "🇸🇦", time: "Jun 18 · 3PM", group: "Group C", win_pick: "Argentina Win", win_odds: "1.35", win_conf: 89, ou_pick: "Over 2.5", ou_odds: "1.80", ou_conf: 74, reasoning: "Argentina motivated after group stage scare in Qatar. Expect a statement game — defence to score early." },
  { id: "wc5", home: "England", away: "Serbia", flag_h: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", flag_a: "🇷🇸", time: "Jun 16 · 3PM", group: "Group B", win_pick: "England Win", win_odds: "1.50", win_conf: 83, ou_pick: "Over 2.5", ou_odds: "1.78", ou_conf: 71, reasoning: "England's squad depth vs Serbia's direct style creates space. Kane hungry for a big tournament." },
  { id: "wc6", home: "Spain", away: "Croatia", flag_h: "🇪🇸", flag_a: "🇭🇷", time: "Jun 15 · 6PM", group: "Group F", win_pick: "Spain Win", win_odds: "1.58", win_conf: 80, ou_pick: "Over 2.5", ou_odds: "1.69", ou_conf: 79, reasoning: "Spain's pressing game overwhelms Croatia's aging midfield. Both teams play open football — high scoring likely." },
];

const C = {
  bg: "#0f1117", card: "#181c25", cardHover: "#1d2130", border: "#252a38",
  accent: "#f0b429", accentDim: "rgba(240,180,41,0.12)", accentBorder: "rgba(240,180,41,0.3)",
  green: "#34d399", greenDim: "rgba(52,211,153,0.12)", greenBorder: "rgba(52,211,153,0.25)",
  red: "#f87171", redDim: "rgba(248,113,113,0.12)",
  wc: "#3b82f6", wcDim: "rgba(59,130,246,0.12)", wcBorder: "rgba(59,130,246,0.3)",
  text: "#e2e8f0", muted: "#64748b", subtle: "#94a3b8", navBg: "#0d1018",
};

function ConfBar({ value }) {
  const color = value >= 80 ? C.green : value >= 65 ? C.accent : C.red;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 44, height: 4, background: "#252a38", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 2 }} />
      </div>
      <span style={{ fontFamily: "monospace", fontSize: 11, color, fontWeight: 700 }}>{value}%</span>
    </div>
  );
}

function PickCard({ pick, index, onAddToAccum, inAccum }) {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), index * 80 + 150); return () => clearTimeout(t); }, [index]);
  const edgeColor = pick.trend === "up" ? C.green : pick.trend === "down" ? C.red : C.muted;

  return (
    <div style={{
      background: inAccum ? "rgba(240,180,41,0.06)" : C.card,
      border: `1px solid ${inAccum ? C.accentBorder : C.border}`,
      borderRadius: 10, padding: "12px 14px", cursor: "pointer",
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)",
      transition: "opacity 0.4s ease, transform 0.4s ease, background 0.15s ease",
      borderLeft: `3px solid ${pick.confidence >= 80 ? C.green : pick.confidence >= 65 ? C.accent : C.red}`,
    }}>
      <div onClick={() => setExpanded(!expanded)}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ background: "#1e2433", border: `1px solid ${C.border}`, color: C.subtle, fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 4, letterSpacing: 0.8, textTransform: "uppercase" }}>{pick.sport}</span>
            <span style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>{pick.away} <span style={{ color: C.muted, fontWeight: 400 }}>vs</span> {pick.home}</span>
          </div>
          <span style={{ color: C.muted, fontSize: 11 }}>{pick.time}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8, flexWrap: "wrap" }}>
          <span style={{ background: C.accentDim, border: `1px solid ${C.accentBorder}`, color: C.accent, padding: "3px 10px", borderRadius: 5, fontFamily: "monospace", fontSize: 12, fontWeight: 700 }}>{pick.bet}</span>
          <span style={{ background: "#1e2433", border: `1px solid ${C.border}`, color: C.subtle, padding: "3px 8px", borderRadius: 5, fontFamily: "monospace", fontSize: 12 }}>{pick.odds}</span>
          <span style={{ background: "#1e2433", color: C.muted, padding: "3px 8px", borderRadius: 5, fontSize: 11 }}>{pick.type}</span>
          <span style={{ marginLeft: "auto", color: edgeColor, fontFamily: "monospace", fontSize: 12, fontWeight: 700 }}>{pick.trend === "up" ? "↑" : pick.trend === "down" ? "↓" : "→"} {pick.edge}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>Confidence</span>
            <ConfBar value={pick.confidence} />
          </div>
          <span style={{ color: C.muted, fontSize: 11 }}>{expanded ? "▲ hide" : "▼ analysis"}</span>
        </div>
        {expanded && (
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.border}`, color: C.subtle, fontSize: 12, lineHeight: 1.65 }}>
            <span style={{ color: C.accent, fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.8 }}>🧠 AI Edge · </span>{pick.reasoning}
          </div>
        )}
      </div>
      <button onClick={() => onAddToAccum(pick)} style={{
        marginTop: 10, width: "100%", padding: "7px",
        background: inAccum ? "rgba(248,113,113,0.12)" : C.accentDim,
        border: `1px solid ${inAccum ? "rgba(248,113,113,0.3)" : C.accentBorder}`,
        color: inAccum ? C.red : C.accent, borderRadius: 6, cursor: "pointer",
        fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
        transition: "all 0.15s ease"
      }}>
        {inAccum ? "✕ Remove from Accumulator" : "+ Add to Accumulator"}
      </button>
    </div>
  );
}

function WCCard({ pick, index, onAdd, inAccum, betMode }) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), index * 90 + 100); return () => clearTimeout(t); }, [index]);

  const isWin = betMode === "win";
  const selBet = isWin ? pick.win_pick : pick.ou_pick;
  const selOdds = isWin ? pick.win_odds : pick.ou_odds;
  const selConf = isWin ? pick.win_conf : pick.ou_conf;
  const added = inAccum && inAccum.bet === selBet;

  return (
    <div style={{
      background: added ? "rgba(59,130,246,0.07)" : C.card,
      border: `1px solid ${added ? C.wcBorder : C.border}`,
      borderLeft: `3px solid ${selConf >= 82 ? C.green : selConf >= 75 ? C.wc : C.accent}`,
      borderRadius: 10, padding: "12px 14px",
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)",
      transition: "opacity 0.4s ease, transform 0.4s ease",
    }}>
      {/* Match header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }} onClick={() => setExpanded(!expanded)}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 18 }}>{pick.flag_a}</span>
          <div>
            <div style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>{pick.away} vs {pick.home} <span style={{ fontSize: 14 }}>{pick.flag_h}</span></div>
            <div style={{ color: C.muted, fontSize: 10, marginTop: 1 }}>{pick.group} · {pick.time}</div>
          </div>
        </div>
        <span style={{ color: C.muted, fontSize: 11 }}>{expanded ? "▲" : "▼"}</span>
      </div>

      {/* Two bet pills always visible */}
      <div style={{ display: "flex", gap: 7, marginBottom: 8 }}>
        <div style={{
          flex: 1, padding: "7px 10px", borderRadius: 7,
          background: isWin ? "rgba(52,211,153,0.1)" : "#1e2433",
          border: `1px solid ${isWin ? C.greenBorder : C.border}`,
        }}>
          <div style={{ fontSize: 10, color: C.muted, marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.6 }}>Straight Win</div>
          <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 12, color: isWin ? C.green : C.subtle }}>{pick.win_pick}</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
            <span style={{ fontFamily: "monospace", fontSize: 11, color: C.accent }}>{pick.win_odds}</span>
            <span style={{ fontFamily: "monospace", fontSize: 10, color: isWin ? C.green : C.muted }}>{pick.win_conf}%</span>
          </div>
        </div>
        <div style={{
          flex: 1, padding: "7px 10px", borderRadius: 7,
          background: !isWin ? "rgba(59,130,246,0.1)" : "#1e2433",
          border: `1px solid ${!isWin ? C.wcBorder : C.border}`,
        }}>
          <div style={{ fontSize: 10, color: C.muted, marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.6 }}>Over 2.5 Goals</div>
          <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 12, color: !isWin ? C.wc : C.subtle }}>{pick.ou_pick}</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
            <span style={{ fontFamily: "monospace", fontSize: 11, color: C.accent }}>{pick.ou_odds}</span>
            <span style={{ fontFamily: "monospace", fontSize: 10, color: !isWin ? C.wc : C.muted }}>{pick.ou_conf}%</span>
          </div>
        </div>
      </div>

      {expanded && (
        <div style={{ marginBottom: 8, padding: "9px 10px", background: "#1e2433", borderRadius: 7, fontSize: 12, color: C.subtle, lineHeight: 1.6 }}>
          <span style={{ color: C.accent, fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>🧠 Analysis · </span>{pick.reasoning}
        </div>
      )}

      <button onClick={() => onAdd({ id: pick.id, match: `${pick.away} vs ${pick.home}`, bet: selBet, odds: parseFloat(selOdds), sport: "⚽ WC26" })} style={{
        width: "100%", padding: "7px",
        background: added ? "rgba(248,113,113,0.12)" : C.wcDim,
        border: `1px solid ${added ? "rgba(248,113,113,0.3)" : C.wcBorder}`,
        color: added ? C.red : C.wc,
        borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
        transition: "all 0.15s ease"
      }}>
        {added ? `✕ Remove from Accumulator` : `+ Add ${selBet} to Accumulator`}
      </button>
    </div>
  );
}

function AccumulatorTab({ legs, onRemove, onClear }) {
  const [stake, setStake] = useState("10");

  const totalOdds = legs.reduce((acc, l) => acc * l.odds, 1);
  const stakeNum = parseFloat(stake) || 0;
  const payout = (stakeNum * totalOdds).toFixed(2);
  const profit = (stakeNum * totalOdds - stakeNum).toFixed(2);

  return (
    <div style={{ padding: "0 16px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>
          Accumulator · {legs.length} leg{legs.length !== 1 ? "s" : ""}
        </div>
        {legs.length > 0 && (
          <button onClick={onClear} style={{ background: "transparent", border: "none", color: C.red, fontSize: 11, cursor: "pointer", fontWeight: 600 }}>Clear all</button>
        )}
      </div>

      {legs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 20px", color: C.muted }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🎰</div>
          <div style={{ fontSize: 14, marginBottom: 6, color: C.subtle }}>No legs added yet</div>
          <div style={{ fontSize: 12 }}>Tap "+ Add to Accumulator" on any pick or World Cup bet</div>
        </div>
      ) : (
        <>
          {/* Legs */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
            {legs.map((leg, i) => (
              <div key={leg.id + leg.bet} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "11px 14px",
                borderBottom: i < legs.length - 1 ? `1px solid ${C.border}` : "none",
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>{leg.sport} · {leg.match}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{leg.bet}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 13, color: C.accent, fontWeight: 700 }}>{leg.odds.toFixed(2)}</span>
                  <button onClick={() => onRemove(leg)} style={{ background: C.redDim, border: "none", color: C.red, width: 24, height: 24, borderRadius: 5, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                </div>
              </div>
            ))}
          </div>

          {/* Calculation */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ color: C.muted, fontSize: 12 }}>Combined Odds</span>
              <span style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 20, color: C.accent }}>{totalOdds.toFixed(2)}x</span>
            </div>
            {/* Stake input */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Stake ($)</div>
              <div style={{ display: "flex", gap: 6 }}>
                <input
                  type="number"
                  value={stake}
                  onChange={e => setStake(e.target.value)}
                  style={{
                    flex: 1, background: "#1e2433", border: `1px solid ${C.border}`,
                    borderRadius: 8, padding: "9px 12px", color: C.text,
                    fontSize: 14, fontFamily: "monospace", fontWeight: 700, outline: "none"
                  }}
                />
                {["5","10","25","50"].map(v => (
                  <button key={v} onClick={() => setStake(v)} style={{
                    background: stake === v ? C.accentDim : "#1e2433",
                    border: `1px solid ${stake === v ? C.accentBorder : C.border}`,
                    color: stake === v ? C.accent : C.muted,
                    borderRadius: 7, padding: "0 10px", cursor: "pointer", fontSize: 12, fontWeight: 600
                  }}>${v}</button>
                ))}
              </div>
            </div>
            {/* Payout breakdown */}
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, background: "#1e2433", borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.6 }}>Profit</div>
                <div style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 18, color: C.green, marginTop: 3 }}>+${profit}</div>
              </div>
              <div style={{ flex: 1, background: "#1e2433", borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.6 }}>Total Return</div>
                <div style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 18, color: C.text, marginTop: 3 }}>${payout}</div>
              </div>
            </div>
          </div>

          <button style={{
            width: "100%", padding: "14px",
            background: `linear-gradient(135deg, ${C.accent}, #d97706)`,
            border: "none", borderRadius: 10, cursor: "pointer",
            color: "#0f1117", fontSize: 14, fontWeight: 800, letterSpacing: 0.3
          }}>Place Accumulator Bet →</button>
        </>
      )}
    </div>
  );
}

function AskSagePanel({ onClose }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "I'm Sage — your AI edge finder. Ask me about any game, line, or betting angle and I'll give you the real breakdown." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);
    try {
      const history = [...messages, { role: "user", content: userMsg }];
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/js
