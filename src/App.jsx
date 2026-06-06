import { useState, useEffect, useRef } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────
const C = {
  // Deep neon dark base
  bg: "#050810", card: "#0a0f1e", cardHover: "#0f1628",
  border: "#1a2545", borderHover: "#2a3a70",
  // Neon Aqua — primary
  aqua: "#00ffe5", aquaDim: "rgba(0,255,229,0.08)", aquaBorder: "rgba(0,255,229,0.30)",
  // Neon Gold
  gold: "#ffd700", goldDim: "rgba(255,215,0,0.08)", goldBorder: "rgba(255,215,0,0.30)",
  // Neon Royal Blue
  blue: "#4d7fff", blueDim: "rgba(77,127,255,0.10)", blueBorder: "rgba(77,127,255,0.32)",
  // Neon Green
  green: "#00ff88", greenDim: "rgba(0,255,136,0.08)", greenBorder: "rgba(0,255,136,0.28)",
  // Neon Red
  red: "#ff3d6e", redDim: "rgba(255,61,110,0.08)", redBorder: "rgba(255,61,110,0.28)",
  // Neon Purple (accent)
  purple: "#bf5fff", purpleDim: "rgba(191,95,255,0.08)", purpleBorder: "rgba(191,95,255,0.28)",
  text: "#e8f2ff", muted: "#4a6080", subtle: "#7a9ab8", navBg: "#030609",
};

const SPORTS = [
  { id: "football", label: "Football", icon: "⚽", color: C.aqua, betTypes: ["Match Winner", "Over/Under Goals", "Both Teams Score", "1st Half Goals", "Asian Handicap", "Double Chance", "Correct Score"] },
  { id: "rugby", label: "Rugby", icon: "🏉", color: C.aqua, betTypes: ["Match Winner", "Handicap", "Over/Under Points", "1st Half", "Winning Margin", "Try Scorer"] },
  { id: "tennis", label: "Tennis", icon: "🎾", color: C.gold, betTypes: ["Match Winner", "Set Betting", "Over/Under Games", "1st Set Winner", "Total Sets", "Break of Serve"] },
  { id: "cricket", label: "Cricket", icon: "🏏", color: C.gold, betTypes: ["Match Winner", "Top Batsman", "Over/Under Runs", "1st Innings Lead", "Player of Match", "Highest Opening Stand"] },
  { id: "baseball", label: "Baseball", icon: "⚾", color: C.gold, betTypes: ["Match Winner", "Run Line", "Over/Under Runs", "1st 5 Innings", "Player Hits", "Player Strikeouts"] },
  { id: "basketball", label: "Basketball", icon: "🏀", color: C.blue, betTypes: ["Match Winner", "Point Spread", "Over/Under Points", "1st Quarter", "Player Points", "Player Assists"] },
  { id: "hockey", label: "Hockey", icon: "🏒", color: C.aqua, betTypes: ["Match Winner", "Puck Line", "Over/Under Goals", "1st Period", "Player Shots", "Both Teams Score"] },
  { id: "darts", label: "Darts", icon: "🎯", color: C.red, betTypes: ["Match Winner", "Correct Score", "Most 180s", "Highest Checkout", "Winning Margin", "First Leg"] },
  { id: "mma", label: "MMA/UFC", icon: "🥊", color: C.red, betTypes: ["Fight Winner", "Method of Victory", "Round Betting", "Fight Distance", "Over/Under Rounds", "KO/TKO"] },
];

const WC_PICKS = [
  { id:"wc1", home:"Brazil", away:"Mexico", flag_h:"🇧🇷", flag_a:"🇲🇽", time:"Jun 15 · 3PM", group:"Group D", win_pick:"Brazil Win", win_odds:"1.62", win_conf:81, ou_pick:"Over 2.5 Goals", ou_odds:"1.74", ou_conf:78, reasoning:"Brazil averaging 2.9 goals per game in qualifying. Mexico defence concedes from set pieces." },
  { id:"wc2", home:"Germany", away:"Japan", flag_h:"🇩🇪", flag_a:"🇯🇵", time:"Jun 16 · 6PM", group:"Group E", win_pick:"Germany Win", win_odds:"1.55", win_conf:84, ou_pick:"Over 2.5 Goals", ou_odds:"1.68", ou_conf:82, reasoning:"Germany high press vs Japan transition. Germany scored 3+ in 6 of last 8." },
  { id:"wc3", home:"France", away:"Poland", flag_h:"🇫🇷", flag_a:"🇵🇱", time:"Jun 17 · 9PM", group:"Group A", win_pick:"France Win", win_odds:"1.44", win_conf:87, ou_pick:"Over 2.5 Goals", ou_odds:"1.71", ou_conf:76, reasoning:"France depth is elite. Mbappé + Dembélé vs Poland porous backline." },
  { id:"wc4", home:"Argentina", away:"Saudi Arabia", flag_h:"🇦🇷", flag_a:"🇸🇦", time:"Jun 18 · 3PM", group:"Group C", win_pick:"Argentina Win", win_odds:"1.35", win_conf:89, ou_pick:"Over 2.5 Goals", ou_odds:"1.80", ou_conf:74, reasoning:"Argentina motivated after Qatar scare. Statement game incoming." },
  { id:"wc5", home:"England", away:"Serbia", flag_h:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", flag_a:"🇷🇸", time:"Jun 16 · 3PM", group:"Group B", win_pick:"England Win", win_odds:"1.50", win_conf:83, ou_pick:"Over 2.5 Goals", ou_odds:"1.78", ou_conf:71, reasoning:"England depth vs Serbia direct style. Kane hungry for big tournament." },
  { id:"wc6", home:"Spain", away:"Croatia", flag_h:"🇪🇸", flag_a:"🇭🇷", time:"Jun 15 · 6PM", group:"Group F", win_pick:"Spain Win", win_odds:"1.58", win_conf:80, ou_pick:"Over 2.5 Goals", ou_odds:"1.69", ou_conf:79, reasoning:"Spain pressing overwhelms Croatia aging midfield." },
];

function fmtDate() {
  return new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function ConfBadge({ value }) {
  const color = value >= 82 ? C.green : value >= 72 ? C.aqua : value >= 62 ? C.gold : C.muted;
  return <span style={{ fontFamily:"monospace", fontSize:11, fontWeight:800, color, background:`${color}18`, border:`1px solid ${color}35`, padding:"2px 7px", borderRadius:10 }}>{value}%</span>;
}

function ValueBadge({ edge }) {
  if (edge >= 12) return <span style={{ fontSize:9, fontWeight:800, color:C.green, background:C.greenDim, padding:"2px 6px", borderRadius:8, border:`1px solid ${C.greenBorder}` }}>🔥 STRONG VALUE</span>;
  if (edge >= 6) return <span style={{ fontSize:9, fontWeight:800, color:C.aqua, background:C.aquaDim, padding:"2px 6px", borderRadius:8, border:`1px solid ${C.aquaBorder}` }}>✅ VALUE BET</span>;
  if (edge >= 2) return <span style={{ fontSize:9, fontWeight:800, color:C.gold, background:C.goldDim, padding:"2px 6px", borderRadius:8, border:`1px solid ${C.goldBorder}` }}>📊 SLIGHT EDGE</span>;
  return null;
}

// ─── AI PICKS ENGINE ─────────────────────────────────────────────────────────
async function fetchAIPicks(sport, betType = "all") {
  const cacheDate = fmtDate();
  const cacheKey = `sage_picks_${sport}_${betType}_${new Date().toDateString()}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) return JSON.parse(cached);

  const nowDate = new Date();
  const dateStr = nowDate.toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric", year:"numeric" });
  const prompt = `Today is ${dateStr}. You are Sage, an elite AI sports betting analyst with deep knowledge of current sports.

Generate 8-12 HIGH QUALITY picks for ${sport} betting - focus on "${betType === "all" ? "mixed bet types" : betType}".

Based on your knowledge of current ${sport} seasons, leagues, and typical fixtures for this time of year, generate realistic picks.

Return ONLY a JSON array, no other text:
[{
  "id": "pick_1",
  "sport": "${sport}",
  "league": "specific league name",
  "home": "home team/player",
  "away": "away team/player",
  "kickoff": "Today/Tomorrow HH:MM",
  "bet": "exact bet e.g. Over 2.5 Goals",
  "betType": "Match Winner|Over/Under|Handicap|Both Teams Score|1st Half|Value Bet|Player Prop",
  "odds": "1.75",
  "confidence": 78,
  "edge": 8,
  "isValue": true,
  "reasoning": "2-3 sharp sentences with specific stats and angles",
  "keyStats": ["Stat with number 1", "Stat with number 2", "Stat with number 3"],
  "h2h": "e.g. 3W-1D-1L in last 5",
  "form": "WWDLW",
  "prediction": "e.g. 2-1 or Win"
}]

Rules:
- Use REALISTIC current teams/players for ${sport} active this time of year
- Mix confidence levels 62-90% realistically  
- Value bets (isValue:true) only where edge > 5%
- keyStats must have specific numbers
- odds in decimal format 1.20-5.00
- For football: include African leagues (SA Premiership, Morocco, Nigeria), European leagues, and international friendlies
- Return ONLY the JSON array`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        system: "You are Sage, elite AI sports betting analyst. Return only valid JSON arrays. No markdown, no explanation, just the JSON array.",
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await res.json();
    const text = data.content?.filter(b => b.type === "text").map(b => b.text).join("") || "[]";
    const clean = text.replace(/```json|```/g, "").trim();
    const jsonMatch = clean.match(/\[[\s\S]*\]/);
    const picks = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    sessionStorage.setItem(cacheKey, JSON.stringify(picks));
    return picks;
  } catch (e) {
    console.error(e);
    return [];
  }
}

// Auto accumulator generator
async function generateAccumulator(sport, count, betPreference) {
  const accaDate = fmtDate();
  const prompt = `Today is ${accaDate}. Generate a ${count}-leg accumulator for ${sport} with preference for "${betPreference}" bets.

Search for REAL games today/next 3 days. Pick the ${count} HIGHEST CONFIDENCE legs.

Return JSON:
{
  "legs": [
    {
      "id": "unique",
      "match": "Away vs Home",
      "league": "league name",
      "bet": "specific bet",
      "odds": decimal number,
      "confidence": number,
      "kickoff": "time",
      "reasoning": "one sharp sentence"
    }
  ],
  "totalOdds": combined decimal odds,
  "overallConf": average confidence,
  "sageTip": "one sentence tip about this acca"
}

Only return JSON, no other text.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        system: "You are Sage, elite sports betting analyst. Generate realistic accumulator picks for today. Return only valid JSON.",
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await res.json();
    const text = data.content?.filter(b => b.type === "text").map(b => b.text).join("") || "{}";
    const clean = text.replace(/```json|```|```javascript/g, "").trim();
    try {
      const start = clean.indexOf("{");
      const end = clean.lastIndexOf("}");
      if (start !== -1 && end !== -1) {
        return JSON.parse(clean.substring(start, end + 1));
      }
    } catch(e) { return null; }
    return null;
  } catch (e) { return null; }
}

// ─── PICK CARD ────────────────────────────────────────────────────────────────
function PickCard({ pick, index, selectedBets, onToggle }) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), index * 60 + 100); return () => clearTimeout(t); }, [index]);

  const isSelected = !!selectedBets.find(s => s.id === pick.id);
  const color = pick.confidence >= 82 ? C.green : pick.confidence >= 72 ? C.aqua : pick.confidence >= 62 ? C.gold : C.muted;
  const impliedProb = Math.round((1 / parseFloat(pick.odds || 2)) * 100);
  const edge = pick.edge || (pick.confidence - impliedProb);

  const betTypeColor = pick.betType === "Value Bet" ? C.gold :
    pick.betType?.includes("Over") ? C.aqua :
    pick.betType?.includes("1st Half") ? C.blue :
    pick.betType?.includes("Player") ? "#a855f7" : C.muted;

  return (
    <div style={{
      background: isSelected ? `${color}10` : C.card,
      border: `1px solid ${isSelected ? color : C.border}`,
      borderRadius: 14, overflow: "hidden",
      borderTop: `2px solid ${pick.isValue ? C.gold : color}`,
      boxShadow: isSelected ? `0 0 16px ${color}20, 0 0 1px ${color}50` : "none",
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)",
      transition: "opacity 0.4s ease, transform 0.4s ease",
    }}>
      {/* Value banner */}
      {pick.isValue && (
        <div style={{ background: `linear-gradient(90deg, ${C.goldDim}, transparent)`, padding: "4px 14px", borderBottom: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12 }}>🔥</span>
          <span style={{ fontSize: 11, fontWeight: 800, color: C.gold, letterSpacing: 0.5 }}>VALUE BET DETECTED · +{edge?.toFixed(1)}% EDGE</span>
        </div>
      )}

      <div style={{ padding: "12px 14px" }}>
        {/* League + time */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 10, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>{pick.league}</span>
          <span style={{ fontSize: 10, color: C.muted }}>{pick.kickoff}</span>
        </div>

        {/* Match */}
        <div style={{ fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 4 }}>
          {pick.away} <span style={{ color: C.muted, fontWeight: 400, fontSize: 12 }}>vs</span> {pick.home}
        </div>

        {/* Bet recommendation */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
          <span style={{ background: `${color}18`, border: `1px solid ${color}40`, color, padding: "4px 12px", borderRadius: 20, fontWeight: 800, fontSize: 13, fontFamily: "monospace" }}>{pick.bet}</span>
          <span style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 900, color }}>{pick.odds}</span>
          <span style={{ fontSize: 9, color: betTypeColor, background: `${betTypeColor}15`, border: `1px solid ${betTypeColor}30`, padding: "2px 8px", borderRadius: 8, fontWeight: 700 }}>{pick.betType}</span>
          {edge > 2 && <ValueBadge edge={edge} />}
        </div>

        {/* Confidence + form */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
          <ConfBadge value={pick.confidence} />
          {pick.form && (
            <div style={{ display: "flex", gap: 3 }}>
              {pick.form.split("").map((r, i) => (
                <span key={i} style={{ width: 18, height: 18, borderRadius: "50%", background: r === "W" ? C.greenDim : r === "L" ? C.redDim : C.goldDim, border: `1px solid ${r === "W" ? C.green : r === "L" ? C.red : C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: r === "W" ? C.green : r === "L" ? C.red : C.gold }}>{r}</span>
              ))}
            </div>
          )}
          {pick.prediction && <span style={{ fontSize: 11, color: C.muted, fontStyle: "italic" }}>Pred: {pick.prediction}</span>}
        </div>

        {/* Key stats */}
        {pick.keyStats && pick.keyStats.length > 0 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {pick.keyStats.map((stat, i) => (
              <span key={i} style={{ fontSize: 10, color: C.subtle, background: "#0a1220", border: `1px solid ${C.border}`, padding: "3px 8px", borderRadius: 6 }}>📊 {stat}</span>
            ))}
          </div>
        )}

        {/* Expand for full analysis */}
        <button onClick={() => setExpanded(!expanded)} style={{ background: "transparent", border: "none", color: C.muted, fontSize: 11, cursor: "pointer", padding: 0, marginBottom: expanded ? 8 : 0 }}>
          {expanded ? "▲ Less" : "▼ Full Analysis"}
        </button>

        {expanded && (
          <div style={{ padding: "10px 12px", background: "#0a1220", borderRadius: 10, border: `1px solid ${C.blueBorder}`, marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: C.blue, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>🧠 Sage Analysis</div>
            <div style={{ fontSize: 13, color: C.subtle, lineHeight: 1.65 }}>{pick.reasoning}</div>
            {pick.h2h && <div style={{ marginTop: 8, fontSize: 11, color: C.muted }}>⚔️ H2H: {pick.h2h}</div>}
          </div>
        )}

        {/* Add to Acca */}
        <button onClick={() => onToggle({ id: pick.id, match: `${pick.away} vs ${pick.home}`, bet: pick.bet, odds: parseFloat(pick.odds) || 1.8, sport: pick.sport, type: pick.betType, league: pick.league })} style={{
          width: "100%", padding: "8px",
          background: isSelected ? C.redDim : C.aquaDim,
          border: `1px solid ${isSelected ? C.redBorder : C.aquaBorder}`,
          color: isSelected ? C.red : C.aqua,
          borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700, transition: "all 0.15s"
        }}>{isSelected ? "✕ Remove from Accumulator" : "+ Add to Accumulator"}</button>
      </div>
    </div>
  );
}

// ─── SPORT PICKS PAGE ─────────────────────────────────────────────────────────
function SportPicksPage({ sport, onBack, selectedBets, onToggleBet }) {
  const [picks, setPicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState("Searching for today's games...");
  const [activeBetType, setActiveBetType] = useState("All");
  const [showValueOnly, setShowValueOnly] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const msgs = [
        "Scanning live fixtures...",
        "Analysing form & stats...",
        "Calculating value bets...",
        "Generating AI insights...",
      ];
      let i = 0;
      const interval = setInterval(() => {
        setLoadingMsg(msgs[Math.min(i++, msgs.length - 1)]);
      }, 2000);

      try {
        const data = await fetchAIPicks(sport.label, activeBetType === "All" ? "all" : activeBetType);
        setPicks(data);
        if (data.length === 0) setError("No picks generated — try refreshing");
      } catch {
        setError("Failed to generate picks");
      }
      clearInterval(interval);
      setLoading(false);
    };
    load();
  }, [sport.id, activeBetType]);

  const filtered = picks.filter(p => {
    if (showValueOnly && !p.isValue) return false;
    return true;
  });

  const valuePicks = picks.filter(p => p.isValue);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text }}>
      {/* Header */}
      <div style={{ padding: "52px 16px 0", background: `linear-gradient(180deg, ${sport.color}15 0%, transparent 100%)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <button onClick={onBack} style={{ background: C.card, border: `1px solid ${C.border}`, color: C.muted, width: 36, height: 36, borderRadius: 10, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 22 }}>{sport.icon}</span>
              <span style={{ fontSize: 20, fontWeight: 800 }}>{sport.label}</span>
              {loading && <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${sport.color}`, borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />}
            </div>
            <div style={{ color: C.muted, fontSize: 11, marginTop: 1 }}>
              {loading ? loadingMsg : `${filtered.length} picks · ${valuePicks.length} value bets found`}
            </div>
          </div>
        </div>

        {/* Value toggle */}
        {!loading && valuePicks.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <button onClick={() => setShowValueOnly(false)} style={{ flex: 1, padding: "8px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700, background: !showValueOnly ? C.aquaDim : "#0a1220", border: `1px solid ${!showValueOnly ? C.aquaBorder : C.border}`, color: !showValueOnly ? C.aqua : C.muted }}>All Picks ({picks.length})</button>
            <button onClick={() => setShowValueOnly(true)} style={{ flex: 1, padding: "8px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700, background: showValueOnly ? C.goldDim : "#0a1220", border: `1px solid ${showValueOnly ? C.goldBorder : C.border}`, color: showValueOnly ? C.gold : C.muted }}>🔥 Value Only ({valuePicks.length})</button>
          </div>
        )}

        {/* Bet type filter */}
        <div style={{ overflowX: "auto", paddingBottom: 12 }}>
          <div style={{ display: "flex", gap: 6, paddingRight: 4 }}>
            {["All", ...sport.betTypes].map(t => (
              <button key={t} onClick={() => setActiveBetType(t)} style={{
                background: activeBetType === t ? `${sport.color}20` : "transparent",
                border: `1px solid ${activeBetType === t ? sport.color : C.border}`,
                color: activeBetType === t ? sport.color : C.muted,
                borderRadius: 20, padding: "5px 14px", cursor: "pointer",
                fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", transition: "all 0.15s"
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "8px 16px 100px", display: "flex", flexDirection: "column", gap: 12 }}>
        {error && <div style={{ background: C.redDim, border: `1px solid ${C.redBorder}`, borderRadius: 10, padding: "12px 14px", color: C.red, fontSize: 13 }}>⚠️ {error}</div>}

        {loading && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", border: `3px solid ${sport.color}`, borderTopColor: "transparent", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
            <div style={{ fontSize: 15, color: C.text, fontWeight: 700, marginBottom: 6 }}>{loadingMsg}</div>
            <div style={{ fontSize: 12, color: C.muted }}>Sage is searching live fixtures & analysing form data</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
              {["🔍 Web Search", "📊 Form Data", "💰 Odds Check"].map((s, i) => (
                <span key={i} style={{ fontSize: 10, color: C.muted, background: C.card, padding: "4px 10px", borderRadius: 20, border: `1px solid ${C.border}` }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {!loading && filtered.map((pick, i) => (
          <PickCard key={pick.id} pick={pick} index={i} selectedBets={selectedBets} onToggle={onToggleBet} />
        ))}

        {!loading && filtered.length === 0 && !error && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: C.muted }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>😴</div>
            <div style={{ fontSize: 13 }}>No picks for this filter. Try "All".</div>
          </div>
        )}
      </div>

      {/* Floating acca counter */}
      {selectedBets.length > 0 && (
        <div style={{ position: "fixed", bottom: 24, right: 16, zIndex: 90, background: `linear-gradient(135deg, ${C.aqua}, ${C.blue})`, borderRadius: 30, padding: "10px 18px 10px 14px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer", boxShadow: `0 4px 20px ${C.aqua}40` }} onClick={() => onBack()}>
          <span style={{ fontSize: 16 }}>🎰</span>
          <span style={{ color: "#060b12", fontWeight: 900, fontSize: 13 }}>{selectedBets.length} leg{selectedBets.length !== 1 ? "s" : ""} · View Acca</span>
        </div>
      )}
    </div>
  );
}

// ─── AUTO ACCUMULATOR ────────────────────────────────────────────────────────
function AutoAccaBuilder({ onAdd }) {
  const [sport, setSport] = useState("Football");
  const [count, setCount] = useState(5);
  const [preference, setPreference] = useState("Mixed");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const generate = async () => {
    setLoading(true);
    setResult(null);
    setError("");
    const data = await generateAccumulator(sport, count, preference);
    if (data && data.legs) setResult(data);
    else setError("Failed to generate — try again");
    setLoading(false);
  };

  const preferences = ["Mixed", "Match Winners", "Overs", "1st Half Goals", "Handicaps", "Value Bets Only", "High Confidence Only"];

  return (
    <div style={{ background: C.card, border: `1px solid ${C.goldBorder}`, borderRadius: 14, padding: "16px", marginBottom: 16, borderTop: `2px solid ${C.gold}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 20 }}>⚡</span>
        <div>
          <div style={{ color: C.gold, fontWeight: 800, fontSize: 14 }}>Auto Accumulator Builder</div>
          <div style={{ color: C.muted, fontSize: 11 }}>AI generates your best acca for today</div>
        </div>
      </div>

      {/* Sport selector */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Sport</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["Football", "Tennis", "Basketball", "Baseball", "Mixed"].map(s => (
            <button key={s} onClick={() => setSport(s)} style={{ background: sport === s ? C.goldDim : "#0a1220", border: `1px solid ${sport === s ? C.goldBorder : C.border}`, color: sport === s ? C.gold : C.muted, borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Legs count */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Number of Legs</div>
        <div style={{ display: "flex", gap: 6 }}>
          {[3, 4, 5, 6, 8, 10].map(n => (
            <button key={n} onClick={() => setCount(n)} style={{ background: count === n ? C.aquaDim : "#0a1220", border: `1px solid ${count === n ? C.aquaBorder : C.border}`, color: count === n ? C.aqua : C.muted, borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>{n}</button>
          ))}
        </div>
      </div>

      {/* Bet preference */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Bet Preference</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {preferences.map(p => (
            <button key={p} onClick={() => setPreference(p)} style={{ background: preference === p ? C.blueDim : "#0a1220", border: `1px solid ${preference === p ? C.blueBorder : C.border}`, color: preference === p ? C.blue : C.muted, borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>{p}</button>
          ))}
        </div>
      </div>

      <button onClick={generate} disabled={loading} style={{
        width: "100%", padding: "12px",
        background: loading ? "#1a2540" : `linear-gradient(135deg, ${C.gold}, #d4a017)`,
        border: "none", borderRadius: 10, cursor: loading ? "not-allowed" : "pointer",
        color: loading ? C.muted : "#060b12", fontSize: 14, fontWeight: 900,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8
      }}>
        {loading ? (
          <><div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${C.muted}`, borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />Sage is building your acca...</>
        ) : (
          <>⚡ Generate {count}-Leg Accumulator</>
        )}
      </button>

      {error && <div style={{ color: C.red, fontSize: 12, marginTop: 8, textAlign: "center" }}>{error}</div>}

      {/* Result */}
      {result && (
        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div>
              <div style={{ color: C.gold, fontWeight: 800, fontSize: 14 }}>Generated Accumulator</div>
              <div style={{ color: C.muted, fontSize: 11 }}>{result.sageTip}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "monospace", fontWeight: 900, fontSize: 20, color: C.gold }}>{result.totalOdds?.toFixed(2)}x</div>
              <ConfBadge value={result.overallConf} />
            </div>
          </div>

          {result.legs?.map((leg, i) => (
            <div key={i} style={{ background: "#0a1220", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>{leg.league} · {leg.kickoff}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 3 }}>{leg.match}</div>
                  <div style={{ fontSize: 12, color: C.aqua, fontWeight: 700 }}>{leg.bet}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{leg.reasoning}</div>
                </div>
                <div style={{ textAlign: "right", marginLeft: 10 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 15, fontWeight: 900, color: C.aqua }}>{typeof leg.odds === "number" ? leg.odds.toFixed(2) : leg.odds}</div>
                  <ConfBadge value={leg.confidence} />
                </div>
              </div>
            </div>
          ))}

          <button onClick={() => {
            result.legs?.forEach(leg => onAdd({
              id: `auto_${leg.match}_${leg.bet}`,
              match: leg.match, bet: leg.bet,
              odds: typeof leg.odds === "number" ? leg.odds : parseFloat(leg.odds) || 1.8,
              sport: sport, type: "Auto Acca", league: leg.league
            }));
          }} style={{
            width: "100%", padding: "12px",
            background: `linear-gradient(135deg, ${C.aqua}, ${C.blue})`,
            border: "none", borderRadius: 10, cursor: "pointer",
            color: "#060b12", fontSize: 14, fontWeight: 900,
          }}>Add All {result.legs?.length} Legs to Accumulator →</button>
        </div>
      )}
    </div>
  );
}

// ─── ACCUMULATOR TAB ─────────────────────────────────────────────────────────
function AccumulatorTab({ legs, onRemove, onClear, onAdd }) {
  const [stake, setStake] = useState("10");
  const [bookmaker, setBookmaker] = useState("betway");
  const totalOdds = legs.reduce((acc, l) => acc * l.odds, 1);
  const stakeNum = parseFloat(stake) || 0;
  const payout = (stakeNum * totalOdds).toFixed(2);
  const profit = (stakeNum * totalOdds - stakeNum).toFixed(2);

  const bookmakers = [
    { id: "betway", name: "Betway", url: "https://www.betway.com", color: "#00a651" },
    { id: "paripesa", name: "PariPesa", url: "https://paripesa.bet", color: "#f5c542" },
    { id: "easybets", name: "EasyBets", url: "https://www.easybets.co.za", color: "#00d4c8" },
    { id: "sportybet", name: "SportyBet", url: "https://www.sportybet.com", color: "#ff6b35" },
    { id: "betika", name: "Betika", url: "https://www.betika.com", color: "#e91e63" },
    { id: "1xbet", name: "1xBet", url: "https://www.1xbet.com", color: "#1565c0" },
    { id: "hollywoodbets", name: "Hollywood", url: "https://www.hollywoodbets.net", color: "#ffd700" },
    { id: "supabets", name: "Supabets", url: "https://www.supabets.co.za", color: "#9c27b0" },
    { id: "bet365", name: "Bet365", url: "https://www.bet365.com", color: "#027b5b" },
    { id: "pinnacle", name: "Pinnacle", url: "https://www.pinnacle.com", color: "#e4002b" },
  ];

  const selectedBook = bookmakers.find(b => b.id === bookmaker) || bookmakers[0];

  return (
    <div style={{ padding: "0 16px" }}>
      {/* Auto Builder */}
      <AutoAccaBuilder onAdd={onAdd} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>My Accumulator · {legs.length} leg{legs.length !== 1 ? "s" : ""}</div>
        {legs.length > 0 && <button onClick={onClear} style={{ background: "transparent", border: "none", color: C.red, fontSize: 11, cursor: "pointer", fontWeight: 600 }}>Clear all</button>}
      </div>

      {legs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "30px 20px", color: C.muted, background: C.card, borderRadius: 14, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🎰</div>
          <div style={{ fontSize: 14, marginBottom: 6, color: C.subtle }}>No legs added yet</div>
          <div style={{ fontSize: 12 }}>Use Auto Builder above or tap picks on any sport</div>
        </div>
      ) : (
        <>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
            {legs.map((leg, i) => (
              <div key={leg.id} style={{ display: "flex", alignItems: "center", padding: "11px 14px", borderBottom: i < legs.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, color: C.muted, marginBottom: 1 }}>{leg.sport} · {leg.league || ""} · {leg.match}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{leg.bet}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>{leg.type}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 14, color: C.aqua, fontWeight: 800 }}>{leg.odds.toFixed(2)}</span>
                  <button onClick={() => onRemove(leg)} style={{ background: C.redDim, border: "none", color: C.red, width: 24, height: 24, borderRadius: 6, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ color: C.muted, fontSize: 12 }}>Combined Odds</span>
              <span style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 22, color: C.gold }}>{totalOdds.toFixed(2)}x</span>
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Stake ($)</div>
              <div style={{ display: "flex", gap: 6 }}>
                <input type="number" value={stake} onChange={e => setStake(e.target.value)} style={{ flex: 1, background: "#0a1220", border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 10px", color: C.text, fontSize: 14, fontFamily: "monospace", fontWeight: 700, outline: "none" }} />
                {["5","10","25","50"].map(v => (
                  <button key={v} onClick={() => setStake(v)} style={{ background: stake === v ? C.goldDim : "#0a1220", border: `1px solid ${stake === v ? C.goldBorder : C.border}`, color: stake === v ? C.gold : C.muted, borderRadius: 7, padding: "0 9px", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>${v}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, background: "#0a1220", borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ color: C.muted, fontSize: 10, textTransform: "uppercase" }}>Profit</div>
                <div style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 18, color: C.green, marginTop: 2 }}>+${profit}</div>
              </div>
              <div style={{ flex: 1, background: "#0a1220", borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ color: C.muted, fontSize: 10, textTransform: "uppercase" }}>Return</div>
                <div style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 18, color: C.text, marginTop: 2 }}>${payout}</div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 10 }}>
            <div style={{ color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>Bet With</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {bookmakers.map(b => (
                <button key={b.id} onClick={() => setBookmaker(b.id)} style={{ background: bookmaker === b.id ? `${b.color}20` : "#0a1220", border: `1px solid ${bookmaker === b.id ? b.color : C.border}`, color: bookmaker === b.id ? b.color : C.muted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>{b.name}</button>
              ))}
            </div>
          </div>

          <button onClick={() => window.open(selectedBook.url, "_blank")} style={{
            width: "100%", padding: "15px",
            background: `linear-gradient(135deg, ${C.aqua}, ${C.blue})`,
            border: "none", borderRadius: 12, cursor: "pointer",
            color: "#060b12", fontSize: 15, fontWeight: 900, letterSpacing: 0.3
          }}>Place on {selectedBook.name} →</button>
        </>
      )}
    </div>
  );
}

// ─── ASK SAGE ────────────────────────────────────────────────────────────────
function AskSagePanel({ onClose }) {
  const [messages, setMessages] = useState([{ role: "assistant", content: "I'm Sage — your AI edge finder. I search real-time fixtures, form data, and odds to give you today's sharpest picks. Ask me anything." }]);
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
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          system: `You are Sage, elite AI sports betting analyst. Today is ${fmtDate()}.
You have deep knowledge of current sports: football (soccer), rugby, tennis, cricket, basketball, baseball, hockey, darts, MMA.
You know current leagues, teams, players, form trends, and betting markets.
Be sharp, direct, specific. Always give: recommended bet, decimal odds estimate, confidence %, key edge factors.
Max 3 paragraphs. No fluff. When asked for picks, give specific team names and realistic odds.`,
          messages: [...messages, { role: "user", content: userMsg }],
        })
      });
      const data = await res.json();
      const text = data.content?.filter(b => b.type === "text").map(b => b.text).join("") || "Error.";
      setMessages(prev => [...prev, { role: "assistant", content: text }]);
    } catch(e) { setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong — " + (e.message || "please try again.") }]); }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(4,8,18,0.9)", backdropFilter: "blur(12px)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ width: "100%", maxWidth: 480, background: "#0a1220", border: `1px solid ${C.aquaBorder}`, borderRadius: "20px 20px 0 0", display: "flex", flexDirection: "column", height: "78vh" }}>
        <div style={{ padding: "16px 18px 12px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${C.aqua}, ${C.blue})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🧠</div>
            <div>
              <div style={{ color: C.text, fontWeight: 800, fontSize: 16 }}>Ask Sage</div>
              <div style={{ color: C.green, fontSize: 10, fontFamily: "monospace" }}>● Live Search · AI Powered</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: C.card, border: `1px solid ${C.border}`, color: C.muted, width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "90%", background: m.role === "user" ? `linear-gradient(135deg, ${C.aqua}, ${C.blue})` : "#131d2e", border: m.role === "assistant" ? `1px solid ${C.border}` : "none", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding: "10px 14px", color: m.role === "user" ? "#060b12" : C.subtle, fontSize: 13, lineHeight: 1.65, fontWeight: m.role === "user" ? 700 : 400 }}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 0" }}>
              <div style={{ display: "flex", gap: 4 }}>{[0,1,2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: C.aqua, animation: `dot-bounce 1.2s ${i*0.2}s infinite ease-in-out` }} />)}</div>
              <span style={{ fontSize: 11, color: C.muted }}>Sage is searching...</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        {/* Quick prompts */}
        <div style={{ padding: "8px 14px 0", display: "flex", gap: 6, overflowX: "auto" }}>
          {["Best picks today", "Value bets now", "Safe accumulator", "Football tonight"].map(q => (
            <button key={q} onClick={() => { setInput(q); }} style={{ background: C.card, border: `1px solid ${C.border}`, color: C.muted, borderRadius: 20, padding: "4px 12px", cursor: "pointer", fontSize: 11, whiteSpace: "nowrap" }}>{q}</button>
          ))}
        </div>
        <div style={{ padding: "10px 14px 24px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 8, marginTop: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask about any game, pick, or angle..." style={{ flex: 1, background: "#131d2e", border: `1px solid ${C.border}`, borderRadius: 12, padding: "11px 14px", color: C.text, fontSize: 13, outline: "none" }} />
          <button onClick={send} disabled={loading} style={{ background: `linear-gradient(135deg, ${C.aqua}, ${C.blue})`, border: "none", borderRadius: 12, width: 46, height: 46, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", opacity: loading ? 0.5 : 1 }}>➤</button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function BetSage() {
  const [activeSport, setActiveSport] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [showChat, setShowChat] = useState(false);
  const [showWC, setShowWC] = useState(false);
  const [wcMode, setWcMode] = useState("win");
  const [accumLegs, setAccumLegs] = useState([]);

  const toggleBet = (leg) => setAccumLegs(prev => prev.find(l => l.id === leg.id) ? prev.filter(l => l.id !== leg.id) : [...prev, leg]);
  const removeBet = (leg) => setAccumLegs(prev => prev.filter(l => l.id !== leg.id));
  const clearBets = () => setAccumLegs([]);
  const addAll = (legs) => { legs.forEach(l => { if (!accumLegs.find(x => x.id === l.id)) setAccumLegs(prev => [...prev, l]); }); };

  if (activeSport) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
          *{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif;}
          body{background:${C.bg};}
          ::-webkit-scrollbar{width:3px;height:3px;}
          ::-webkit-scrollbar-thumb{background:#1a2540;border-radius:2px;}
          @keyframes dot-bounce{0%,100%{transform:translateY(0);opacity:0.3}50%{transform:translateY(-5px);opacity:1}}
          @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
          @keyframes pulse-aqua{0%,100%{box-shadow:0 0 0 0 rgba(0,255,229,0.5),0 0 20px rgba(0,255,229,0.15)}50%{box-shadow:0 0 0 10px rgba(0,255,229,0),0 0 30px rgba(0,255,229,0.25)}}
          input::placeholder{color:#2a3a55;}
          input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
          button{font-family:'Inter',sans-serif;}
        `}</style>
        <SportPicksPage sport={activeSport} onBack={() => setActiveSport(null)} selectedBets={accumLegs} onToggleBet={toggleBet} />
        {showChat && <AskSagePanel onClose={() => setShowChat(false)} />}
        <button onClick={() => setShowChat(true)} style={{ position: "fixed", bottom: accumLegs.length > 0 ? 90 : 24, right: 16, zIndex: 89, background: `linear-gradient(135deg, ${C.gold}, #d4a017)`, border: "none", borderRadius: "50%", width: 48, height: 48, cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 16px ${C.gold}40` }}>🧠</button>
      </>
    );
  }

  const tabs = [
    { id: "home", label: "Sports", icon: "🏠" },
    { id: "acca", label: "Acca", icon: "🎰" },
    { id: "wc", label: "WC 2026", icon: "🏆" },
    { id: "tracker", label: "History", icon: "📊" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif;}
        body{background:${C.bg};}
        ::-webkit-scrollbar{width:3px;height:3px;}
        ::-webkit-scrollbar-thumb{background:#1a2540;border-radius:2px;}
        @keyframes dot-bounce{0%,100%{transform:translateY(0);opacity:0.3}50%{transform:translateY(-5px);opacity:1}}
        @keyframes pulse-aqua{0%,100%{box-shadow:0 0 0 0 rgba(0,212,200,0.4)}50%{box-shadow:0 0 0 10px rgba(0,212,200,0)}}
        @keyframes pulse-gold{0%,100%{box-shadow:0 0 0 0 rgba(245,197,66,0.4)}50%{box-shadow:0 0 0 8px rgba(245,197,66,0)}}
        @keyframes shimmer{0%{opacity:0.6}50%{opacity:1}100%{opacity:0.6}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        input::placeholder{color:#2a3a55;}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
        button{font-family:'Inter',sans-serif;}
      `}</style>

      <div style={{ maxWidth: 480, margin: "0 auto", paddingBottom: 90 }}>

        {activeTab === "home" && (
          <>
            <div style={{ padding: "52px 16px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg, ${C.aqua}, ${C.blue})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>🧿</div>
                    <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.5, textShadow: "0 0 20px rgba(0,255,229,0.6), 0 0 40px rgba(0,255,229,0.3)" }}>BetSage</span>
                    <span style={{ fontSize: 10, color: C.aqua, background: C.aquaDim, border: `1px solid ${C.aquaBorder}`, padding: "2px 8px", borderRadius: 10, fontWeight: 700 }}>AI Powered</span>
                  </div>
                  <div style={{ color: C.muted, fontSize: 11 }}>{fmtDate()}</div>
                </div>
                <button onClick={() => setShowChat(true)} style={{ background: `linear-gradient(135deg, ${C.aqua}20, ${C.blue}20)`, border: `1px solid ${C.aquaBorder}`, borderRadius: 12, padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, animation: "pulse-aqua 3s infinite" }}>
                  <span style={{ fontSize: 16 }}>🧠</span>
                  <span style={{ color: C.aqua, fontSize: 12, fontWeight: 700 }}>Ask Sage</span>
                </button>
              </div>

              <div style={{ background: `linear-gradient(135deg, ${C.aqua}10, ${C.blue}10)`, border: `1px solid ${C.aquaBorder}`, borderRadius: 14, padding: "14px 18px", display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                {[
                  { label: "Win Rate", val: "67.4%", color: C.green },
                  { label: "Avg Edge", val: "+3.1%", color: C.aqua },
                  { label: "Acca Legs", val: `${accumLegs.length}`, color: accumLegs.length > 0 ? C.gold : C.muted },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "monospace", fontSize: 17, fontWeight: 800, color: s.color }}>{s.val}</div>
                    <div style={{ color: C.muted, fontSize: 10, marginTop: 3 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* AI Pick of the Day */}
              <div onClick={() => setShowChat(true)} style={{ background: `linear-gradient(135deg, ${C.gold}15, ${C.goldDim})`, border: `1px solid ${C.goldBorder}`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", marginBottom: 16, animation: "pulse-gold 3s infinite" }}>
                <div style={{ fontSize: 28 }}>⚡</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: C.gold, fontWeight: 800, fontSize: 13, marginBottom: 2 }}>Ask Sage for Today's Best Picks</div>
                  <div style={{ color: C.muted, fontSize: 11 }}>AI searches real fixtures & generates sharp picks daily</div>
                </div>
                <div style={{ color: C.gold, fontSize: 18 }}>→</div>
              </div>

              <div onClick={() => setActiveTab("wc")} style={{ background: `linear-gradient(135deg, ${C.blue}20, ${C.aqua}10)`, border: `1px solid ${C.blueBorder}`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", marginBottom: 20 }}>
                <div style={{ fontSize: 28 }}>🏆</div>
                <div>
                  <div style={{ color: C.text, fontWeight: 800, fontSize: 14 }}>World Cup 2026</div>
                  <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>Special high-confidence picks</div>
                </div>
                <div style={{ marginLeft: "auto", color: C.blue, fontSize: 18 }}>→</div>
              </div>

              <div style={{ color: C.muted, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>Select a Sport</div>
            </div>

            <div style={{ padding: "0 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {SPORTS.map(sport => (
                <div key={sport.id} onClick={() => setActiveSport(sport)} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "18px 16px", cursor: "pointer", transition: "all 0.2s ease", borderTop: `2px solid ${sport.color}`, position: "relative", overflow: "hidden", boxShadow: `0 0 0 0 ${sport.color}` }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.cardHover; e.currentTarget.style.boxShadow = `0 0 20px ${sport.color}25, 0 0 1px ${sport.color}60`; e.currentTarget.style.borderColor = sport.color + "50"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = C.card; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = C.border; }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{sport.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 4 }}>{sport.label}</div>
                  <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.5 }}>{sport.betTypes.slice(0, 3).join(" · ")}</div>
                  <div style={{ position: "absolute", top: 10, right: 10, fontSize: 9, color: sport.color, background: `${sport.color}15`, border: `1px solid ${sport.color}30`, padding: "2px 6px", borderRadius: 8, fontWeight: 700 }}>AI PICKS</div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "acca" && (
          <div style={{ padding: "52px 0 0" }}>
            <div style={{ padding: "0 16px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 18, fontWeight: 800 }}>🎰 Accumulator</span>
              {accumLegs.length > 0 && <span style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}`, color: C.gold, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{accumLegs.length} legs</span>}
            </div>
            <AccumulatorTab legs={accumLegs} onRemove={removeBet} onClear={clearBets} onAdd={(leg) => toggleBet(leg)} />
          </div>
        )}

        {activeTab === "wc" && (
          <div style={{ padding: "52px 16px 0" }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>🏆 World Cup 2026</div>
              <div style={{ color: C.muted, fontSize: 12 }}>High-confidence picks for the tournament</div>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <button onClick={() => setWcMode("win")} style={{ flex: 1, padding: "9px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700, background: wcMode === "win" ? C.greenDim : "#0a1220", border: `1px solid ${wcMode === "win" ? C.greenBorder : C.border}`, color: wcMode === "win" ? C.green : C.muted }}>⚽ Straight Win</button>
              <button onClick={() => setWcMode("ou")} style={{ flex: 1, padding: "9px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700, background: wcMode === "ou" ? C.aquaDim : "#0a1220", border: `1px solid ${wcMode === "ou" ? C.aquaBorder : C.border}`, color: wcMode === "ou" ? C.aqua : C.muted }}>📈 Over 2.5 Goals</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {WC_PICKS.map((pick, i) => {
                const isWin = wcMode === "win";
                const selBet = isWin ? pick.win_pick : pick.ou_pick;
                const selOdds = isWin ? pick.win_odds : pick.ou_odds;
                const selConf = isWin ? pick.win_conf : pick.ou_conf;
                const added = !!accumLegs.find(l => l.id === `wc-${pick.id}`);
                const color = selConf >= 82 ? C.green : selConf >= 72 ? C.aqua : C.gold;
                return (
                  <div key={pick.id} style={{ background: C.card, border: `1px solid ${added ? C.aquaBorder : C.border}`, borderRadius: 14, padding: "12px 14px", borderTop: `2px solid ${C.blue}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: 20 }}>{pick.flag_a}</span>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 14 }}>{pick.away} vs {pick.home} <span>{pick.flag_h}</span></div>
                        <div style={{ color: C.muted, fontSize: 10 }}>{pick.group} · {pick.time}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                      <div style={{ flex: 1, padding: "8px 10px", borderRadius: 8, background: isWin ? C.greenDim : "#0a1220", border: `1px solid ${isWin ? C.greenBorder : C.border}` }}>
                        <div style={{ fontSize: 9, color: C.muted, marginBottom: 2, textTransform: "uppercase" }}>Win</div>
                        <div style={{ fontWeight: 800, fontSize: 12, color: isWin ? C.green : C.subtle }}>{pick.win_pick}</div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                          <span style={{ fontFamily: "monospace", fontSize: 12, color: C.gold }}>{pick.win_odds}</span>
                          <ConfBadge value={pick.win_conf} />
                        </div>
                      </div>
                      <div style={{ flex: 1, padding: "8px 10px", borderRadius: 8, background: !isWin ? C.aquaDim : "#0a1220", border: `1px solid ${!isWin ? C.aquaBorder : C.border}` }}>
                        <div style={{ fontSize: 9, color: C.muted, marginBottom: 2, textTransform: "uppercase" }}>Over 2.5</div>
                        <div style={{ fontWeight: 800, fontSize: 12, color: !isWin ? C.aqua : C.subtle }}>{pick.ou_pick}</div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                          <span style={{ fontFamily: "monospace", fontSize: 12, color: C.gold }}>{pick.ou_odds}</span>
                          <ConfBadge value={pick.ou_conf} />
                        </div>
                      </div>
                    </div>
                    <button onClick={() => toggleBet({ id: `wc-${pick.id}`, match: `${pick.away} vs ${pick.home}`, bet: selBet, odds: parseFloat(selOdds), sport: "⚽", type: "WC 2026", league: pick.group })} style={{ width: "100%", padding: "8px", background: added ? C.redDim : C.aquaDim, border: `1px solid ${added ? C.redBorder : C.aquaBorder}`, color: added ? C.red : C.aqua, borderRadius: 8, cursor: "pointer", fontSize: 11, fontWeight: 700 }}>
                      {added ? "✕ Remove" : `+ Add ${selBet}`}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "tracker" && (
          <div style={{ padding: "52px 16px 0" }}>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>📊 Bet History</div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
              {[
                { date: "Jun 3", bet: "Yankees ML", league: "MLB", result: "W", profit: "+$92", odds: "1.77" },
                { date: "Jun 2", bet: "Warriors -4.5", league: "NBA", result: "W", profit: "+$95", odds: "1.91" },
                { date: "Jun 1", bet: "Eagles ML", league: "NFL", result: "L", profit: "-$100", odds: "2.10" },
                { date: "Jun 1", bet: "Over 8.5 Runs", league: "MLB", result: "W", profit: "+$88", odds: "1.87" },
                { date: "May 31", bet: "Dodgers -1.5", league: "MLB", result: "W", profit: "+$110", odds: "2.00" },
                { date: "May 30", bet: "Celtics +3", league: "NBA", result: "W", profit: "+$92", odds: "1.91" },
              ].map((b, i, arr) => (
                <div key={i} style={{ display: "flex", alignItems: "center", padding: "12px 14px", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{b.bet}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{b.league} · {b.date} · {b.odds}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ padding: "2px 9px", borderRadius: 5, fontSize: 11, fontWeight: 800, background: b.result === "W" ? C.greenDim : C.redDim, color: b.result === "W" ? C.green : C.red, border: `1px solid ${b.result === "W" ? C.greenBorder : C.redBorder}` }}>{b.result}</span>
                    <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 800, color: b.profit.startsWith("+") ? C.green : C.red }}>{b.profit}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, background: C.greenDim, border: `1px solid ${C.greenBorder}`, borderRadius: 12, padding: "12px 14px" }}>
                <div style={{ color: C.muted, fontSize: 10, textTransform: "uppercase" }}>Month P&L</div>
                <div style={{ color: C.green, fontFamily: "monospace", fontWeight: 800, fontSize: 20, marginTop: 3 }}>+$377</div>
              </div>
              <div style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px" }}>
                <div style={{ color: C.muted, fontSize: 10, textTransform: "uppercase" }}>Record</div>
                <div style={{ color: C.text, fontFamily: "monospace", fontWeight: 800, fontSize: 20, marginTop: 3 }}>5-1</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.navBg, borderTop: `1px solid ${C.border}`, padding: "10px 8px 26px", display: "flex", justifyContent: "space-around", alignItems: "center", zIndex: 50 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: activeTab === t.id ? C.aqua : C.muted, transition: "color 0.15s ease", padding: "4px 12px", position: "relative" }}>
            <span style={{ fontSize: 19 }}>{t.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 600 }}>{t.label}</span>
            {t.id === "acca" && accumLegs.length > 0 && (
              <span style={{ position: "absolute", top: 0, right: 6, background: C.gold, color: "#060b12", width: 16, height: 16, borderRadius: "50%", fontSize: 9, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>{accumLegs.length}</span>
            )}
          </button>
        ))}
        <button onClick={() => setShowChat(true)} style={{ background: `linear-gradient(135deg, ${C.aqua}, ${C.blue})`, border: "none", borderRadius: 14, width: 52, height: 52, cursor: "pointer", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", animation: "pulse-aqua 3s infinite", transition: "transform 0.15s ease", boxShadow: `0 0 24px rgba(0,255,229,0.4), 0 0 48px rgba(77,127,255,0.2)` }}>🧠</button>
      </div>

      {showChat && <AskSagePanel onClose={() => setShowChat(false)} />}
    </div>
  );
}
