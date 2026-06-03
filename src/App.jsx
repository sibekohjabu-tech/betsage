import { useState, useEffect, useRef } from "react";

const ODDS_API_KEY = import.meta.env.VITE_ODDS_API_KEY || "";

// ─── THEME ───────────────────────────────────────────────────────────────────
const C = {
  bg: "#080d14",
  card: "#0e1520",
  cardHover: "#131d2e",
  border: "#1a2540",
  borderHover: "#243460",
  // Aqua
  aqua: "#00d4c8",
  aquaDim: "rgba(0,212,200,0.10)",
  aquaBorder: "rgba(0,212,200,0.28)",
  // Gold
  gold: "#f5c542",
  goldDim: "rgba(245,197,66,0.10)",
  goldBorder: "rgba(245,197,66,0.28)",
  // Royal Blue
  blue: "#3b6ff5",
  blueDim: "rgba(59,111,245,0.12)",
  blueBorder: "rgba(59,111,245,0.30)",
  // Status
  green: "#2ecc71",
  greenDim: "rgba(46,204,113,0.10)",
  greenBorder: "rgba(46,204,113,0.25)",
  red: "#e74c3c",
  redDim: "rgba(231,76,60,0.10)",
  redBorder: "rgba(231,76,60,0.25)",
  text: "#e8f0fe",
  muted: "#5a7090",
  subtle: "#8ba0bc",
  navBg: "#060b12",
};

// ─── SPORTS ──────────────────────────────────────────────────────────────────
const SPORTS = [
  {
    id: "soccer", label: "Football", icon: "⚽", color: C.aqua,
    betTypes: ["Match Winner", "Over/Under Goals", "Both Teams Score", "1st Half Result", "Asian Handicap", "Clean Sheet"],
    keys: [
      // Top European leagues
      "soccer_epl","soccer_spain_la_liga","soccer_germany_bundesliga","soccer_italy_serie_a",
      "soccer_france_ligue_one","soccer_netherlands_eredivisie","soccer_portugal_primeira_liga",
      "soccer_turkey_super_league","soccer_england_league1","soccer_england_league2",
      "soccer_spain_segunda_division","soccer_germany_bundesliga2","soccer_italy_serie_b",
      "soccer_france_ligue_two","soccer_belgium_first_div","soccer_scotland_premiership",
      "soccer_greece_super_league","soccer_poland_ekstraklasa","soccer_czech_liga",
      "soccer_austria_bundesliga","soccer_switzerland_superleague","soccer_denmark_superliga",
      "soccer_sweden_allsvenskan","soccer_norway_eliteserien","soccer_finland_veikkausliiga",
      "soccer_russia_premier_league","soccer_ukraine_premier_league","soccer_romania_liga_1",
      "soccer_serbia_superliga","soccer_croatia_hnl","soccer_slovakia_superliga",
      "soccer_hungary_liga","soccer_bulgaria_primera_liga",
      // Africa & Middle East
      "soccer_south_africa_premiership","soccer_morocco_botola_pro","soccer_egypt_premier_league",
      "soccer_nigeria_professional_league","soccer_kenya_premier_league",
      "soccer_ghana_premier_league","soccer_tunisia_ligue_pro","soccer_algeria_professional_league",
      "soccer_israel_premier_league","soccer_saudi_arabia_pro_league","soccer_uae_pro_league",
      // Americas
      "soccer_usa_mls","soccer_usa_usl_championship","soccer_usa_usl_leaguetwo",
      "soccer_brazil_campeonato","soccer_argentina_primera_division","soccer_argentina_reservas",
      "soccer_mexico_ligamx","soccer_colombia_primera_a","soccer_chile_primera_division",
      "soccer_peru_primera_division","soccer_ecuador_primera_a","soccer_venezuela_primera_liga",
      "soccer_conmebol_copa_libertadores","soccer_conmebol_copa_sudamericana",
      "soccer_concacaf_champions_cup",
      // Asia & Oceania
      "soccer_japan_j_league","soccer_south_korea_kleague1","soccer_china_super_league",
      "soccer_australia_aleague","soccer_india_super_league",
      // International
      "soccer_uefa_european_championship","soccer_uefa_nations_league",
      "soccer_conmebol_copa_america","soccer_world_cup","soccer_fifa_world_cup_qualifiers_conmebol",
      "soccer_uefa_champs_league","soccer_uefa_europa_league","soccer_uefa_europa_conference_league",
    ],
  },
  {
    id: "mlb", label: "Baseball", icon: "⚾", color: C.gold,
    betTypes: ["Match Winner", "Run Line", "Over/Under Runs", "1st 5 Innings", "Player Hits", "Player Strikeouts"],
    keys: ["baseball_mlb"],
  },
  {
    id: "nba", label: "Basketball", icon: "🏀", color: C.blue,
    betTypes: ["Match Winner", "Point Spread", "Over/Under Points", "1st Quarter", "Player Points", "Player Assists"],
    keys: ["basketball_nba"],
  },
  {
    id: "nhl", label: "Hockey", icon: "🏒", color: C.aqua,
    betTypes: ["Match Winner", "Puck Line", "Over/Under Goals", "1st Period", "Player Shots", "Goal Scorer"],
    keys: ["icehockey_nhl"],
  },
  {
    id: "tennis", label: "Tennis", icon: "🎾", color: C.gold,
    betTypes: ["Match Winner", "Set Betting", "Over/Under Games", "1st Set Winner", "Total Sets", "Break of Serve"],
    keys: ["tennis_atp_french_open","tennis_wta_french_open","tennis_atp_wimbledon","tennis_wta_wimbledon","tennis_atp_us_open","tennis_wta_us_open"],
  },
  {
    id: "nfl", label: "NFL", icon: "🏈", color: C.blue,
    betTypes: ["Match Winner", "Point Spread", "Over/Under Points", "1st Half", "Player Touchdowns", "Player Receiving Yards"],
    keys: ["americanfootball_nfl"],
  },
  {
    id: "mma", label: "MMA/UFC", icon: "🥊", color: C.red,
    betTypes: ["Fight Winner", "Method of Victory", "Round Betting", "Fight Goes Distance", "Over/Under Rounds", "KO/TKO"],
    keys: ["mma_mixed_martial_arts"],
  },
];

const WC_PICKS = [
  { id:"wc1", home:"Brazil", away:"Mexico", flag_h:"🇧🇷", flag_a:"🇲🇽", time:"Jun 15 · 3PM", group:"Group D", win_pick:"Brazil Win", win_odds:"1.62", win_conf:81, ou_pick:"Over 2.5 Goals", ou_odds:"1.74", ou_conf:78, reasoning:"Brazil averaging 2.9 goals per game in qualifying. Mexico defence concedes from set pieces." },
  { id:"wc2", home:"Germany", away:"Japan", flag_h:"🇩🇪", flag_a:"🇯🇵", time:"Jun 16 · 6PM", group:"Group E", win_pick:"Germany Win", win_odds:"1.55", win_conf:84, ou_pick:"Over 2.5 Goals", ou_odds:"1.68", ou_conf:82, reasoning:"Germany high press vs Japan transition. Germany scored 3+ in 6 of last 8." },
  { id:"wc3", home:"France", away:"Poland", flag_h:"🇫🇷", flag_a:"🇵🇱", time:"Jun 17 · 9PM", group:"Group A", win_pick:"France Win", win_odds:"1.44", win_conf:87, ou_pick:"Over 2.5 Goals", ou_odds:"1.71", ou_conf:76, reasoning:"France depth is elite. Mbappé + Dembélé vs Poland porous backline." },
  { id:"wc4", home:"Argentina", away:"Saudi Arabia", flag_h:"🇦🇷", flag_a:"🇸🇦", time:"Jun 18 · 3PM", group:"Group C", win_pick:"Argentina Win", win_odds:"1.35", win_conf:89, ou_pick:"Over 2.5 Goals", ou_odds:"1.80", ou_conf:74, reasoning:"Argentina motivated after Qatar scare. Statement game incoming." },
  { id:"wc5", home:"England", away:"Serbia", flag_h:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", flag_a:"🇷🇸", time:"Jun 16 · 3PM", group:"Group B", win_pick:"England Win", win_odds:"1.50", win_conf:83, ou_pick:"Over 2.5 Goals", ou_odds:"1.78", ou_conf:71, reasoning:"England depth vs Serbia's direct style. Kane hungry for a big tournament." },
  { id:"wc6", home:"Spain", away:"Croatia", flag_h:"🇪🇸", flag_a:"🇭🇷", time:"Jun 15 · 6PM", group:"Group F", win_pick:"Spain Win", win_odds:"1.58", win_conf:80, ou_pick:"Over 2.5 Goals", ou_odds:"1.69", ou_conf:79, reasoning:"Spain pressing overwhelms Croatia's aging midfield. High scoring likely." },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function americanToDecimal(p) {
  if (!p) return 1.9;
  const n = parseInt(p);
  return n > 0 ? parseFloat(((n / 100) + 1).toFixed(2)) : parseFloat(((-100 / n) + 1).toFixed(2));
}
function impliedProb(p) {
  const d = americanToDecimal(p);
  return Math.round((1 / d) * 100);
}
function fmtDec(p) {
  const d = americanToDecimal(p);
  if (d < 1.01 || d > 20) return null;
  return d.toFixed(2);
}
function fmtTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) + " · " + d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}
function sportColor(key) {
  if (!key) return C.aqua;
  if (key.includes("soccer") || key.includes("football")) return C.aqua;
  if (key.includes("baseball") || key.includes("mlb")) return C.gold;
  if (key.includes("basketball") || key.includes("nba")) return C.blue;
  if (key.includes("hockey") || key.includes("nhl")) return C.aqua;
  if (key.includes("tennis")) return C.gold;
  if (key.includes("football") || key.includes("nfl")) return C.blue;
  if (key.includes("mma")) return C.red;
  return C.aqua;
}

// Extract all market bets from a game
function extractBets(game) {
  const bm = game.bookmakers?.[0];
  if (!bm) return [];
  const bets = [];
  const sportKey = game.sport_key || "";

  for (const market of (bm.markets || [])) {
    if (market.key === "h2h") {
      for (const o of (market.outcomes || [])) {
        const dec = fmtDec(o.price);
        if (!dec) continue;
        const conf = impliedProb(o.price);
        bets.push({ type: "Match Winner", label: `${o.name} Win`, odds: dec, rawOdds: o.price, conf, category: "main" });
      }
    }
    if (market.key === "spreads") {
      for (const o of (market.outcomes || [])) {
        const dec = fmtDec(o.price);
        if (!dec) continue;
        const conf = impliedProb(o.price);
        const sign = o.point > 0 ? "+" : "";
        const label = sportKey.includes("soccer") ? `${o.name} ${sign}${o.point} Handicap` :
                      sportKey.includes("baseball") ? `${o.name} ${sign}${o.point} Run Line` :
                      `${o.name} ${sign}${o.point} Spread`;
        bets.push({ type: "Handicap/Spread", label, odds: dec, rawOdds: o.price, conf, category: "spread" });
      }
    }
    if (market.key === "totals") {
      for (const o of (market.outcomes || [])) {
        const dec = fmtDec(o.price);
        if (!dec) continue;
        const conf = impliedProb(o.price);
        const unit = sportKey.includes("soccer") ? "Goals" : sportKey.includes("baseball") ? "Runs" : sportKey.includes("hockey") ? "Goals" : sportKey.includes("tennis") ? "Games" : "Points";
        bets.push({ type: `${o.name}/${unit}`, label: `${o.name} ${o.point} ${unit}`, odds: dec, rawOdds: o.price, conf, category: "totals" });
      }
    }
    if (market.key === "h2h_h1") {
      for (const o of (market.outcomes || [])) {
        const dec = fmtDec(o.price);
        if (!dec) continue;
        bets.push({ type: "1st Half Winner", label: `1H: ${o.name}`, odds: dec, rawOdds: o.price, conf: impliedProb(o.price), category: "half" });
      }
    }
    if (market.key === "totals_h1") {
      for (const o of (market.outcomes || [])) {
        const dec = fmtDec(o.price);
        if (!dec) continue;
        bets.push({ type: "1st Half O/U", label: `1H ${o.name} ${o.point}`, odds: dec, rawOdds: o.price, conf: impliedProb(o.price), category: "half" });
      }
    }
    if (market.key === "btts") {
      for (const o of (market.outcomes || [])) {
        const dec = fmtDec(o.price);
        if (!dec) continue;
        bets.push({ type: "Both Teams Score", label: `BTTS: ${o.name}`, odds: dec, rawOdds: o.price, conf: impliedProb(o.price), category: "special" });
      }
    }
  }
  return bets.filter(b => b.conf >= 55).sort((a, b) => b.conf - a.conf);
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function ConfBadge({ value }) {
  const color = value >= 82 ? C.green : value >= 72 ? C.aqua : value >= 62 ? C.gold : C.muted;
  return (
    <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 800, color, background: `${color}18`, border: `1px solid ${color}40`, padding: "2px 8px", borderRadius: 20 }}>
      {value}%
    </span>
  );
}

function BetPill({ bet, selected, onToggle }) {
  const color = bet.conf >= 82 ? C.green : bet.conf >= 72 ? C.aqua : bet.conf >= 62 ? C.gold : C.muted;
  return (
    <div onClick={() => onToggle(bet)} style={{
      background: selected ? `${color}18` : C.card,
      border: `1px solid ${selected ? color : C.border}`,
      borderRadius: 10, padding: "10px 12px", cursor: "pointer",
      transition: "all 0.15s ease",
      position: "relative",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <span style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 0.8 }}>{bet.type}</span>
        <ConfBadge value={bet.conf} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{bet.label}</span>
        <span style={{ fontFamily: "monospace", fontSize: 15, fontWeight: 800, color }}>
          {bet.odds}
        </span>
      </div>
      {selected && (
        <div style={{ position: "absolute", top: 6, left: 6, width: 6, height: 6, borderRadius: "50%", background: color }} />
      )}
    </div>
  );
}

function GameCard({ game, sportColor: sColor, selectedBets, onToggleBet }) {
  const [expanded, setExpanded] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [filter, setFilter] = useState("all");

  const bets = extractBets(game);
  const topBet = bets[0];
  if (!topBet) return null;

  const categories = ["all", ...new Set(bets.map(b => b.category))];
  const filtered = filter === "all" ? bets : bets.filter(b => b.category === filter);
  const catLabels = { all: "All", main: "Winner", spread: "Handicap", totals: "O/U", half: "1st Half", special: "Special" };

  const anySelected = bets.some(b => selectedBets.find(s => s.id === `${game.id}-${b.label}`));

  const getAnalysis = async () => {
    if (analysis) { setExpanded(!expanded); return; }
    setExpanded(true);
    setLoadingAI(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 250,
          system: "You are Sage, elite AI sports betting analyst. Give a sharp 3-sentence breakdown covering: 1) form/stats, 2) key edge/angle, 3) best bet recommendation. Be specific and direct.",
          messages: [{ role: "user", content: `${game.away_team} vs ${game.home_team} | Sport: ${game.sport_key} | Top pick: ${topBet.label} @ ${topBet.odds} | Confidence: ${topBet.conf}%` }]
        })
      });
      const data = await res.json();
      setAnalysis(data.content?.[0]?.text || "Strong value on current market.");
    } catch { setAnalysis("Sharp money aligned on this line."); }
    setLoadingAI(false);
  };

  return (
    <div style={{
      background: C.card, border: `1px solid ${anySelected ? sColor + "50" : C.border}`,
      borderRadius: 14, overflow: "hidden",
      borderTop: `2px solid ${sColor}`,
    }}>
      {/* Match header */}
      <div style={{ padding: "12px 14px 10px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 2 }}>
            {game.away_team} <span style={{ color: C.muted, fontWeight: 400, fontSize: 12 }}>vs</span> {game.home_team}
          </div>
          <div style={{ fontSize: 11, color: C.muted }}>{fmtTime(game.commence_time)}</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={getAnalysis} style={{
            background: C.blueDim, border: `1px solid ${C.blueBorder}`,
            color: C.blue, borderRadius: 8, padding: "4px 10px",
            fontSize: 11, fontWeight: 700, cursor: "pointer"
          }}>🧠 AI</button>
        </div>
      </div>

      {/* AI Analysis */}
      {expanded && (
        <div style={{ margin: "0 14px 10px", padding: "10px 12px", background: "#0a1220", borderRadius: 10, border: `1px solid ${C.blueBorder}` }}>
          {loadingAI
            ? <div style={{ display: "flex", gap: 5 }}>{[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: C.aqua, animation: `dot-bounce 1.2s ${i*0.2}s infinite ease-in-out` }} />)}</div>
            : <span style={{ fontSize: 12, color: C.subtle, lineHeight: 1.65 }}><span style={{ color: C.aqua, fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>🧠 Sage · </span>{analysis}</span>
          }
        </div>
      )}

      {/* Category filter pills */}
      {bets.length > 3 && (
        <div style={{ display: "flex", gap: 6, padding: "0 14px 10px", overflowX: "auto" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              background: filter === cat ? `${sColor}20` : "transparent",
              border: `1px solid ${filter === cat ? sColor : C.border}`,
              color: filter === cat ? sColor : C.muted,
              borderRadius: 20, padding: "3px 12px", cursor: "pointer",
              fontSize: 11, fontWeight: 600, whiteSpace: "nowrap"
            }}>{catLabels[cat] || cat}</button>
          ))}
        </div>
      )}

      {/* Bet options grid */}
      <div style={{ padding: "0 14px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {filtered.map((bet, i) => {
          const betId = `${game.id}-${bet.label}`;
          const isSelected = !!selectedBets.find(s => s.id === betId);
          return (
            <BetPill key={i} bet={bet} selected={isSelected} onToggle={() => onToggleBet({ id: betId, match: `${game.away_team} vs ${game.home_team}`, bet: bet.label, odds: parseFloat(bet.odds), sport: game.sport_key?.includes("soccer") ? "⚽" : game.sport_key?.includes("baseball") ? "⚾" : game.sport_key?.includes("basketball") ? "🏀" : "🏒", type: bet.type })} />
          );
        })}
      </div>
    </div>
  );
}

function SportLandingPage({ sport, onBack, selectedBets, onToggleBet }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [betTypeFilter, setBetTypeFilter] = useState("All");
  const [apiQuota, setApiQuota] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      if (!ODDS_API_KEY) { setError("Add VITE_ODDS_API_KEY to Vercel"); setLoading(false); return; }
      setLoading(true);
      try {
        // Fetch in batches of 8 to avoid rate limits
        const batches = [];
        const batchSize = 8;
        for (let i = 0; i < sport.keys.length; i += batchSize) {
          batches.push(sport.keys.slice(i, i + batchSize));
        }
        const allResults = [];
        for (const batch of batches) {
          const results = await Promise.allSettled(
            batch.map(async (key) => {
              const markets = sport.id === "soccer"
                ? "h2h,spreads,totals,btts"
                : sport.id === "tennis"
                ? "h2h,spreads,totals"
                : "h2h,spreads,totals,h2h_h1,totals_h1";
              try {
                const res = await fetch(`https://api.the-odds-api.com/v4/sports/${key}/odds?apiKey=${ODDS_API_KEY}&regions=us,uk,eu&markets=${markets}&oddsFormat=american&dateFormat=iso`);
                if (!res.ok) return [];
                const rem = res.headers.get("x-requests-remaining");
                if (rem) setApiQuota(rem);
                const data = await res.json();
                return Array.isArray(data) ? data : [];
              } catch { return []; }
            })
          );
          allResults.push(...results);
        }
        const results = allResults;
        const all = results.flatMap(r => r.status === "fulfilled" ? r.value : []);
        // Sort by most bet options (richest data first)
        all.sort((a, b) => (b.bookmakers?.[0]?.markets?.length || 0) - (a.bookmakers?.[0]?.markets?.length || 0));
        setGames(all.slice(0, 50));
      } catch { setError("Failed to load — check API key"); }
      setLoading(false);
    };
    fetchGames();
  }, [sport.id]);

  const gamesWithBets = games.map(g => ({ game: g, bets: extractBets(g) })).filter(({ bets }) => bets.length > 0);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text }}>
      {/* Header */}
      <div style={{ padding: "52px 16px 0", background: `linear-gradient(180deg, ${sport.color}18 0%, transparent 100%)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <button onClick={onBack} style={{ background: C.card, border: `1px solid ${C.border}`, color: C.muted, width: 36, height: 36, borderRadius: 10, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 24 }}>{sport.icon}</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: C.text }}>{sport.label}</span>
            </div>
            <div style={{ color: C.muted, fontSize: 11, marginTop: 1 }}>
              {loading ? "Loading..." : `${gamesWithBets.length} games · ${apiQuota ? `${apiQuota} calls left` : ""}`}
            </div>
          </div>
        </div>

        {/* Bet type filter */}
        <div style={{ overflowX: "auto", paddingBottom: 12 }}>
          <div style={{ display: "flex", gap: 6, paddingRight: 4 }}>
            {["All", ...sport.betTypes].map(t => (
              <button key={t} onClick={() => setBetTypeFilter(t)} style={{
                background: betTypeFilter === t ? `${sport.color}20` : "transparent",
                border: `1px solid ${betTypeFilter === t ? sport.color : C.border}`,
                color: betTypeFilter === t ? sport.color : C.muted,
                borderRadius: 20, padding: "5px 14px", cursor: "pointer",
                fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", transition: "all 0.15s"
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Games */}
      <div style={{ padding: "8px 16px 100px", display: "flex", flexDirection: "column", gap: 12 }}>
        {error && <div style={{ background: C.redDim, border: `1px solid ${C.redBorder}`, borderRadius: 10, padding: "12px 14px", color: C.red, fontSize: 13 }}>⚠️ {error}</div>}
        {loading && (
          <div style={{ textAlign: "center", padding: "50px 0", color: C.muted }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${sport.color}`, borderTopColor: "transparent", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
            <div style={{ fontSize: 13 }}>Scanning {sport.keys.length} leagues...</div>
          </div>
        )}
        {!loading && gamesWithBets.map(({ game }) => (
          <GameCard key={game.id} game={game} sportColor={sport.color} selectedBets={selectedBets} onToggleBet={onToggleBet} />
        ))}
        {!loading && gamesWithBets.length === 0 && !error && (
          <div style={{ textAlign: "center", padding: "40px 0", color: C.muted, fontSize: 13 }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>😴</div>
            No games available right now. Check back soon.
          </div>
        )}
      </div>
    </div>
  );
}

function AccumulatorTab({ legs, onRemove, onClear }) {
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
    { id: "bet365", name: "Bet365", url: "https://www.bet365.com", color: "#027b5b" },
    { id: "sportybet", name: "SportyBet", url: "https://www.sportybet.com", color: "#ff6b35" },
    { id: "betika", name: "Betika", url: "https://www.betika.com", color: "#e91e63" },
    { id: "1xbet", name: "1xBet", url: "https://www.1xbet.com", color: "#1565c0" },
    { id: "hollywoodbets", name: "Hollywood", url: "https://www.hollywoodbets.net", color: "#ffd700" },
    { id: "supabets", name: "Supabets", url: "https://www.supabets.co.za", color: "#9c27b0" },
    { id: "pinnacle", name: "Pinnacle", url: "https://www.pinnacle.com", color: "#e4002b" },
    { id: "draftkings", name: "DraftKings", url: "https://www.draftkings.com", color: "#62d76b" },
    { id: "fanduel", name: "FanDuel", url: "https://www.fanduel.com", color: "#1493ff" },
  ];

  const selectedBook = bookmakers.find(b => b.id === bookmaker) || bookmakers[0];

  return (
    <div style={{ padding: "0 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>
          Accumulator · {legs.length} leg{legs.length !== 1 ? "s" : ""}
        </div>
        {legs.length > 0 && <button onClick={onClear} style={{ background: "transparent", border: "none", color: C.red, fontSize: 11, cursor: "pointer", fontWeight: 600 }}>Clear all</button>}
      </div>

      {legs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 20px", color: C.muted }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🎰</div>
          <div style={{ fontSize: 14, marginBottom: 6, color: C.subtle }}>No legs added yet</div>
          <div style={{ fontSize: 12 }}>Tap any bet pill on a game to add it</div>
        </div>
      ) : (
        <>
          {/* Legs */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
            {legs.map((leg, i) => (
              <div key={leg.id} style={{ display: "flex", alignItems: "center", padding: "11px 14px", borderBottom: i < legs.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, color: C.muted, marginBottom: 1 }}>{leg.sport} · {leg.match}</div>
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

          {/* Odds + stake */}
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
                <div style={{ color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.6 }}>Profit</div>
                <div style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 18, color: C.green, marginTop: 2 }}>+${profit}</div>
              </div>
              <div style={{ flex: 1, background: "#0a1220", borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.6 }}>Return</div>
                <div style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 18, color: C.text, marginTop: 2 }}>${payout}</div>
              </div>
            </div>
          </div>

          {/* Bookmaker selector */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>Bet With</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {bookmakers.map(b => (
                <button key={b.id} onClick={() => setBookmaker(b.id)} style={{
                  background: bookmaker === b.id ? `${b.color}20` : "#0a1220",
                  border: `1px solid ${bookmaker === b.id ? b.color : C.border}`,
                  color: bookmaker === b.id ? b.color : C.muted,
                  borderRadius: 8, padding: "6px 12px", cursor: "pointer",
                  fontSize: 12, fontWeight: 700, transition: "all 0.15s"
                }}>{b.name}</button>
              ))}
            </div>
          </div>

          {/* Place bet button */}
          <button onClick={() => window.open(selectedBook.url, "_blank")} style={{
            width: "100%", padding: "15px",
            background: `linear-gradient(135deg, ${C.aqua}, ${C.blue})`,
            border: "none", borderRadius: 12, cursor: "pointer",
            color: "#060b12", fontSize: 15, fontWeight: 900, letterSpacing: 0.3,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8
          }}>
            Place on {selectedBook.name} →
          </button>
        </>
      )}
    </div>
  );
}

function WCCard({ pick, betMode, onAdd, inAccum }) {
  const [expanded, setExpanded] = useState(false);
  const isWin = betMode === "win";
  const selBet = isWin ? pick.win_pick : pick.ou_pick;
  const selOdds = isWin ? pick.win_odds : pick.ou_odds;
  const selConf = isWin ? pick.win_conf : pick.ou_conf;
  const added = inAccum;

  return (
    <div style={{
      background: C.card, border: `1px solid ${added ? C.aquaBorder : C.border}`,
      borderRadius: 14, padding: "12px 14px",
      borderTop: `2px solid ${C.blue}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }} onClick={() => setExpanded(!expanded)}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20 }}>{pick.flag_a}</span>
          <div>
            <div style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>{pick.away} vs {pick.home} <span style={{ fontSize: 16 }}>{pick.flag_h}</span></div>
            <div style={{ color: C.muted, fontSize: 10, marginTop: 1 }}>{pick.group} · {pick.time}</div>
          </div>
        </div>
        <span style={{ color: C.muted, fontSize: 12 }}>{expanded ? "▲" : "▼"}</span>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <div style={{ flex: 1, padding: "8px 10px", borderRadius: 8, background: isWin ? C.greenDim : "#0a1220", border: `1px solid ${isWin ? C.greenBorder : C.border}` }}>
          <div style={{ fontSize: 9, color: C.muted, marginBottom: 2, textTransform: "uppercase", letterSpacing: 0.6 }}>Straight Win</div>
          <div style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 13, color: isWin ? C.green : C.subtle }}>{pick.win_pick}</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span style={{ fontFamily: "monospace", fontSize: 12, color: C.gold }}>{pick.win_odds}</span>
            <ConfBadge value={pick.win_conf} />
          </div>
        </div>
        <div style={{ flex: 1, padding: "8px 10px", borderRadius: 8, background: !isWin ? C.aquaDim : "#0a1220", border: `1px solid ${!isWin ? C.aquaBorder : C.border}` }}>
          <div style={{ fontSize: 9, color: C.muted, marginBottom: 2, textTransform: "uppercase", letterSpacing: 0.6 }}>Over 2.5 Goals</div>
          <div style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 13, color: !isWin ? C.aqua : C.subtle }}>{pick.ou_pick}</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span style={{ fontFamily: "monospace", fontSize: 12, color: C.gold }}>{pick.ou_odds}</span>
            <ConfBadge value={pick.ou_conf} />
          </div>
        </div>
      </div>
      {expanded && <div style={{ marginBottom: 10, padding: "9px 10px", background: "#0a1220", borderRadius: 8, fontSize: 12, color: C.subtle, lineHeight: 1.6 }}><span style={{ color: C.aqua, fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>🧠 Analysis · </span>{pick.reasoning}</div>}
      <button onClick={() => onAdd({ id: `wc-${pick.id}`, match: `${pick.away} vs ${pick.home}`, bet: selBet, odds: parseFloat(selOdds), sport: "🏆 WC26", type: isWin ? "Match Winner" : "Over/Under" })} style={{
        width: "100%", padding: "8px",
        background: added ? C.redDim : C.aquaDim,
        border: `1px solid ${added ? C.redBorder : C.aquaBorder}`,
        color: added ? C.red : C.aqua,
        borderRadius: 8, cursor: "pointer", fontSize: 11, fontWeight: 700, transition: "all 0.15s"
      }}>{added ? "✕ Remove" : `+ Add ${selBet}`}</button>
    </div>
  );
}

function AskSagePanel({ onClose }) {
  const [messages, setMessages] = useState([{ role: "assistant", content: "I'm Sage — your AI edge finder. Ask me about any game, player prop, line movement, or betting angle across any sport." }]);
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
          system: "You are Sage, elite AI sports betting analyst with expertise in football (soccer), baseball, basketball, hockey, tennis, NFL, and MMA. You specialise in finding value bets, player props, handicaps, and both team/individual performance trends. Sharp, direct, data-driven. Max 3 paragraphs. Always state confidence % and key edge.",
          messages,
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.content?.map(b => b.text || "").join("") || "Error." }]);
    } catch { setMessages(prev => [...prev, { role: "assistant", content: "Connection error." }]); }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(4,8,18,0.85)", backdropFilter: "blur(12px)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ width: "100%", maxWidth: 480, background: "#0a1220", border: `1px solid ${C.aquaBorder}`, borderRadius: "20px 20px 0 0", display: "flex", flexDirection: "column", height: "75vh" }}>
        <div style={{ padding: "16px 18px 12px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${C.aqua}, ${C.blue})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🧠</div>
            <div>
              <div style={{ color: C.text, fontWeight: 800, fontSize: 16 }}>Ask Sage</div>
              <div style={{ color: C.green, fontSize: 10, fontFamily: "monospace" }}>● AI Analyst · LIVE</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: C.card, border: `1px solid ${C.border}`, color: C.muted, width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "88%", background: m.role === "user" ? `linear-gradient(135deg, ${C.aqua}, ${C.blue})` : "#131d2e", border: m.role === "assistant" ? `1px solid ${C.border}` : "none", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding: "10px 14px", color: m.role === "user" ? "#060b12" : C.subtle, fontSize: 13, lineHeight: 1.65, fontWeight: m.role === "user" ? 700 : 400 }}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && <div style={{ display: "flex", gap: 5, padding: "4px 0" }}>{[0,1,2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: C.aqua, animation: `dot-bounce 1.2s ${i*0.2}s infinite ease-in-out` }} />)}</div>}
          <div ref={bottomRef} />
        </div>
        <div style={{ padding: "12px 14px 24px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask about any game, prop, or angle..." style={{ flex: 1, background: "#131d2e", border: `1px solid ${C.border}`, borderRadius: 12, padding: "11px 14px", color: C.text, fontSize: 13, outline: "none" }} />
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

  // Sport landing page
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
          input::placeholder{color:#2a3a55;}
          input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
          button{font-family:'Inter',sans-serif;}
        `}</style>
        <SportLandingPage sport={activeSport} onBack={() => setActiveSport(null)} selectedBets={accumLegs} onToggleBet={toggleBet} />
        {/* Floating acca counter */}
        {accumLegs.length > 0 && (
          <div onClick={() => { setActiveSport(null); setActiveTab("acca"); }} style={{
            position: "fixed", bottom: 24, right: 16, zIndex: 90,
            background: `linear-gradient(135deg, ${C.aqua}, ${C.blue})`,
            borderRadius: 30, padding: "10px 18px 10px 14px",
            display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
            boxShadow: `0 4px 20px ${C.aqua}40`
          }}>
            <span style={{ fontSize: 16 }}>🎰</span>
            <span style={{ color: "#060b12", fontWeight: 900, fontSize: 13 }}>{accumLegs.length} leg{accumLegs.length !== 1 ? "s" : ""} · View Acca</span>
          </div>
        )}
        {showChat && <AskSagePanel onClose={() => setShowChat(false)} />}
        <button onClick={() => setShowChat(true)} style={{
          position: "fixed", bottom: 90, right: 16, zIndex: 89,
          background: `linear-gradient(135deg, ${C.gold}, #d4a017)`,
          border: "none", borderRadius: "50%", width: 48, height: 48,
          cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 4px 16px ${C.gold}40`
        }}>🧠</button>
      </>
    );
  }

  const tabs = [
    { id: "home", label: "Sports", icon: "🏠" },
    { id: "acca", label: "Acca", icon: "🎰" },
    { id: "wc", label: "WC 2026", icon: "🏆" },
    { id: "tracker", label: "Tracker", icon: "📊" },
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
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes shimmer{0%{opacity:0.6}50%{opacity:1}100%{opacity:0.6}}
        input::placeholder{color:#2a3a55;}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
        button{font-family:'Inter',sans-serif;}
      `}</style>

      <div style={{ maxWidth: 480, margin: "0 auto", paddingBottom: 90 }}>

        {/* HOME TAB */}
        {activeTab === "home" && (
          <>
            {/* Header */}
            <div style={{ padding: "52px 16px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg, ${C.aqua}, ${C.blue})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>🧿</div>
                    <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.5, color: C.text }}>BetSage</span>
                  </div>
                  <div style={{ color: C.muted, fontSize: 11 }}>
                    {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                  </div>
                </div>
                <button onClick={() => setShowChat(true)} style={{
                  background: `linear-gradient(135deg, ${C.aqua}20, ${C.blue}20)`,
                  border: `1px solid ${C.aquaBorder}`,
                  borderRadius: 12, padding: "8px 14px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6,
                  animation: "pulse-aqua 3s infinite"
                }}>
                  <span style={{ fontSize: 16 }}>🧠</span>
                  <span style={{ color: C.aqua, fontSize: 12, fontWeight: 700 }}>Ask Sage</span>
                </button>
              </div>

              {/* Stats strip */}
              <div style={{ background: `linear-gradient(135deg, ${C.aqua}10, ${C.blue}10)`, border: `1px solid ${C.aquaBorder}`, borderRadius: 14, padding: "14px 18px", display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
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

              {/* WC Banner */}
              <div onClick={() => setActiveTab("wc")} style={{
                background: `linear-gradient(135deg, ${C.blue}20, ${C.aqua}10)`,
                border: `1px solid ${C.blueBorder}`,
                borderRadius: 14, padding: "14px 16px",
                display: "flex", alignItems: "center", gap: 12, cursor: "pointer", marginBottom: 24
              }}>
                <div style={{ fontSize: 32 }}>🏆</div>
                <div>
                  <div style={{ color: C.text, fontWeight: 800, fontSize: 15 }}>World Cup 2026</div>
                  <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>Special high-confidence picks · Tap to view</div>
                </div>
                <div style={{ marginLeft: "auto", color: C.blue, fontSize: 18 }}>→</div>
              </div>

              <div style={{ color: C.muted, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>Select a Sport</div>
            </div>

            {/* Sport cards grid */}
            <div style={{ padding: "0 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {SPORTS.map(sport => (
                <div key={sport.id} onClick={() => setActiveSport(sport)} style={{
                  background: C.card, border: `1px solid ${C.border}`,
                  borderRadius: 16, padding: "18px 16px",
                  cursor: "pointer", transition: "all 0.2s ease",
                  borderTop: `2px solid ${sport.color}`,
                  position: "relative", overflow: "hidden"
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.cardHover; e.currentTarget.style.borderColor = sport.color + "60"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = C.card; e.currentTarget.style.borderColor = C.border; }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{sport.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 4 }}>{sport.label}</div>
                  <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.4 }}>
                    {sport.betTypes.slice(0, 3).join(" · ")}
                  </div>
                  <div style={{ position: "absolute", top: 12, right: 12, width: 8, height: 8, borderRadius: "50%", background: sport.color, animation: "shimmer 2s infinite" }} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* ACCA TAB */}
        {activeTab === "acca" && (
          <div style={{ padding: "52px 0 0" }}>
            <div style={{ padding: "0 16px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: C.text }}>🎰 Accumulator</span>
              {accumLegs.length > 0 && <span style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}`, color: C.gold, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{accumLegs.length} legs</span>}
            </div>
            <AccumulatorTab legs={accumLegs} onRemove={removeBet} onClear={clearBets} />
          </div>
        )}

        {/* WC TAB */}
        {activeTab === "wc" && (
          <div style={{ padding: "52px 16px 0" }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 4 }}>🏆 World Cup 2026</div>
              <div style={{ color: C.muted, fontSize: 12 }}>High-confidence picks for the tournament</div>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <button onClick={() => setWcMode("win")} style={{ flex: 1, padding: "9px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700, background: wcMode === "win" ? C.greenDim : "#0a1220", border: `1px solid ${wcMode === "win" ? C.greenBorder : C.border}`, color: wcMode === "win" ? C.green : C.muted, transition: "all 0.15s" }}>⚽ Straight Win</button>
              <button onClick={() => setWcMode("ou")} style={{ flex: 1, padding: "9px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700, background: wcMode === "ou" ? C.aquaDim : "#0a1220", border: `1px solid ${wcMode === "ou" ? C.aquaBorder : C.border}`, color: wcMode === "ou" ? C.aqua : C.muted, transition: "all 0.15s" }}>📈 Over 2.5 Goals</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {WC_PICKS.map(pick => {
                const selBet = wcMode === "win" ? pick.win_pick : pick.ou_pick;
                const inAccum = !!accumLegs.find(l => l.id === `wc-${pick.id}`);
                return <WCCard key={pick.id} pick={pick} betMode={wcMode} onAdd={toggleBet} inAccum={inAccum} />;
              })}
            </div>
          </div>
        )}

        {/* TRACKER TAB */}
        {activeTab === "tracker" && (
          <div style={{ padding: "52px 16px 0" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 16 }}>📊 Bet History</div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
              {[
                { date: "Jun 3", bet: "Yankees ML", sport: "⚾ MLB", result: "W", profit: "+$92", odds: "1.77" },
                { date: "Jun 2", bet: "Warriors -4.5", sport: "🏀 NBA", result: "W", profit: "+$95", odds: "1.91" },
                { date: "Jun 1", bet: "Eagles ML", sport: "🏈 NFL", result: "L", profit: "-$100", odds: "2.10" },
                { date: "Jun 1", bet: "Over 48.5 Runs", sport: "⚾ MLB", result: "W", profit: "+$88", odds: "1.87" },
                { date: "May 31", bet: "Dodgers Run Line -1.5", sport: "⚾ MLB", result: "W", profit: "+$110", odds: "2.00" },
                { date: "May 30", bet: "Celtics +3 Spread", sport: "🏀 NBA", result: "W", profit: "+$92", odds: "1.91" },
              ].map((b, i, arr) => (
                <div key={i} style={{ display: "flex", alignItems: "center", padding: "12px 14px", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{b.bet}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{b.sport} · {b.date} · {b.odds}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ padding: "2px 9px", borderRadius: 5, fontSize: 11, fontWeight: 800, background: b.result === "W" ? C.greenDim : C.redDim, color: b.result === "W" ? C.green : C.red, border: `1px solid ${b.result === "W" ? C.greenBorder : C.redBorder}` }}>{b.result}</span>
                    <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 800, color: b.profit.startsWith("+") ? C.green : C.red, minWidth: 52, textAlign: "right" }}>{b.profit}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, background: C.greenDim, border: `1px solid ${C.greenBorder}`, borderRadius: 12, padding: "12px 14px" }}>
                <div style={{ color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>Month P&L</div>
                <div style={{ color: C.green, fontFamily: "monospace", fontWeight: 800, fontSize: 20, marginTop: 3 }}>+$377</div>
              </div>
              <div style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px" }}>
                <div style={{ color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>Record</div>
                <div style={{ color: C.text, fontFamily: "monospace", fontWeight: 800, fontSize: 20, marginTop: 3 }}>5-1</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.navBg, borderTop: `1px solid ${C.border}`, padding: "10px 8px 26px", display: "flex", justifyContent: "space-around", alignItems: "center", zIndex: 50 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            background: "transparent", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            color: activeTab === t.id ? C.aqua : C.muted,
            transition: "color 0.15s ease", padding: "4px 12px", position: "relative"
          }}>
            <span style={{ fontSize: 19 }}>{t.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 600 }}>{t.label}</span>
            {t.id === "acca" && accumLegs.length > 0 && (
              <span style={{ position: "absolute", top: 0, right: 6, background: C.gold, color: "#060b12", width: 16, height: 16, borderRadius: "50%", fontSize: 9, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>{accumLegs.length}</span>
            )}
          </button>
        ))}
        <button onClick={() => setShowChat(true)} style={{
          background: `linear-gradient(135deg, ${C.aqua}, ${C.blue})`,
          border: "none", borderRadius: 14, width: 52, height: 52,
          cursor: "pointer", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center",
          animation: "pulse-aqua 3s infinite", transition: "transform 0.15s ease"
        }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>🧠</button>
      </div>

      {showChat && <AskSagePanel onClose={() => setShowChat(false)} />}
    </div>
  );
}
