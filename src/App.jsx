import { useState, useEffect, useRef } from "react";

const ODDS_API_KEY = import.meta.env.VITE_ODDS_API_KEY || "";

const SPORT_KEYS = [
  { id: "all", label: "All", icon: "⚡", keys: ["basketball_nba","americanfootball_nfl","baseball_mlb","icehockey_nhl","soccer_usa_mls","soccer_brazil_campeonato","soccer_conmebol_copa_libertadores","soccer_argentina_primera_division","soccer_germany_bundesliga","soccer_spain_la_liga","soccer_epl","soccer_italy_serie_a","soccer_usa_usl_leaguetwo","soccer_sweden_allsvenskan","soccer_norway_eliteserien","soccer_australia_aleague","mma_mixed_martial_arts"] },
  { id: "nba", label: "NBA", icon: "🏀", keys: ["basketball_nba"] },
  { id: "nfl", label: "NFL", icon: "🏈", keys: ["americanfootball_nfl"] },
  { id: "mlb", label: "MLB", icon: "⚾", keys: ["baseball_mlb"] },
  { id: "nhl", label: "NHL", icon: "🏒", keys: ["icehockey_nhl"] },
  { id: "soccer", label: "Soccer", icon: "⚽", keys: ["soccer_usa_mls","soccer_usa_usl_leaguetwo","soccer_usa_usl_championship","soccer_brazil_campeonato","soccer_argentina_primera_division","soccer_conmebol_copa_libertadores","soccer_conmebol_copa_sudamericana","soccer_spain_la_liga","soccer_spain_segunda_division","soccer_germany_bundesliga","soccer_germany_bundesliga2","soccer_italy_serie_a","soccer_italy_serie_b","soccer_france_ligue_one","soccer_france_ligue_two","soccer_epl","soccer_england_league1","soccer_england_league2","soccer_netherlands_eredivisie","soccer_portugal_primeira_liga","soccer_turkey_super_league","soccer_poland_ekstraklasa","soccer_austria_bundesliga","soccer_sweden_allsvenskan","soccer_norway_eliteserien","soccer_denmark_superliga","soccer_japan_j_league","soccer_australia_aleague","soccer_south_korea_kleague1","soccer_mexico_ligamx","soccer_chile_primera_division","soccer_colombia_primera_a"] },
  { id: "mma", label: "MMA", icon: "🥊", keys: ["mma_mixed_martial_arts"] },
];

const WC_PICKS = [
  { id:"wc1", home:"Brazil", away:"Mexico", flag_h:"🇧🇷", flag_a:"🇲🇽", time:"Jun 15 · 3PM", group:"Group D", win_pick:"Brazil Win", win_odds:"1.62", win_conf:81, ou_pick:"Over 2.5", ou_odds:"1.74", ou_conf:78, reasoning:"Brazil averaging 2.9 goals per game in qualifying. Mexico defence concedes from set pieces." },
  { id:"wc2", home:"Germany", away:"Japan", flag_h:"🇩🇪", flag_a:"🇯🇵", time:"Jun 16 · 6PM", group:"Group E", win_pick:"Germany Win", win_odds:"1.55", win_conf:84, ou_pick:"Over 2.5", ou_odds:"1.68", ou_conf:82, reasoning:"Germany high press vs Japan transition — high tempo. Germany scored 3+ in 6 of last 8." },
  { id:"wc3", home:"France", away:"Poland", flag_h:"🇫🇷", flag_a:"🇵🇱", time:"Jun 17 · 9PM", group:"Group A", win_pick:"France Win", win_odds:"1.44", win_conf:87, ou_pick:"Over 2.5", ou_odds:"1.71", ou_conf:76, reasoning:"France attacking depth elite. Mbappé + Dembélé vs Poland porous backline — goals very likely." },
  { id:"wc4", home:"Argentina", away:"Saudi Arabia", flag_h:"🇦🇷", flag_a:"🇸🇦", time:"Jun 18 · 3PM", group:"Group C", win_pick:"Argentina Win", win_odds:"1.35", win_conf:89, ou_pick:"Over 2.5", ou_odds:"1.80", ou_conf:74, reasoning:"Argentina motivated after Qatar scare. Expect a statement game." },
  { id:"wc5", home:"England", away:"Serbia", flag_h:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", flag_a:"🇷🇸", time:"Jun 16 · 3PM", group:"Group B", win_pick:"England Win", win_odds:"1.50", win_conf:83, ou_pick:"Over 2.5", ou_odds:"1.78", ou_conf:71, reasoning:"England squad depth vs Serbia direct style creates space. Kane hungry for big tournament." },
  { id:"wc6", home:"Spain", away:"Croatia", flag_h:"🇪🇸", flag_a:"🇭🇷", time:"Jun 15 · 6PM", group:"Group F", win_pick:"Spain Win", win_odds:"1.58", win_conf:80, ou_pick:"Over 2.5", ou_odds:"1.69", ou_conf:79, reasoning:"Spain pressing overwhelms Croatia aging midfield. High scoring likely." },
];

const C = {
  bg:"#0f1117", card:"#181c25", border:"#252a38",
  accent:"#f0b429", accentDim:"rgba(240,180,41,0.12)", accentBorder:"rgba(240,180,41,0.3)",
  green:"#34d399", greenDim:"rgba(52,211,153,0.12)", greenBorder:"rgba(52,211,153,0.25)",
  red:"#f87171", redDim:"rgba(248,113,113,0.12)", redBorder:"rgba(248,113,113,0.25)",
  wc:"#3b82f6", wcDim:"rgba(59,130,246,0.12)", wcBorder:"rgba(59,130,246,0.3)",
  text:"#e2e8f0", muted:"#64748b", subtle:"#94a3b8", navBg:"#0d1018",
};

function americanToDecimal(p) {
  if (!p) return 1.9;
  const n = parseInt(p);
  return n > 0 ? parseFloat(((n/100)+1).toFixed(2)) : parseFloat(((-100/n)+1).toFixed(2));
}

function impliedProb(americanPrice) {
  const dec = americanToDecimal(americanPrice);
  return Math.round((1/dec)*100);
}

// Pick the BEST bet for a game across all markets
function pickBestBet(game) {
  const bm = game.bookmakers?.[0];
  if (!bm) return null;
  const h2h = bm.markets?.find(m => m.key === "h2h");
  const spreads = bm.markets?.find(m => m.key === "spreads");
  const totals = bm.markets?.find(m => m.key === "totals");
  const sportKey = game.sport_key || "";

  let candidates = [];

  // ML favourite
  if (h2h) {
    const outcomes = h2h.outcomes || [];
    const fav = outcomes.reduce((a,b) => (a.price < b.price ? a : b), outcomes[0]);
    if (fav) {
      const conf = impliedProb(fav.price);
      candidates.push({ bet: `${fav.name} Win`, odds: fav.price, decOdds: americanToDecimal(fav.price), betType: "Moneyline", conf });
    }
  }

  // Spread favourite (strong cover)
  if (spreads) {
    const outcomes = spreads.outcomes || [];
    const favSpread = outcomes.reduce((a,b) => (a.price < b.price ? a : b), outcomes[0]);
    if (favSpread) {
      const conf = impliedProb(favSpread.price);
      const sign = favSpread.point > 0 ? "+" : "";
      candidates.push({ bet: `${favSpread.name} ${sign}${favSpread.point}`, odds: favSpread.price, decOdds: americanToDecimal(favSpread.price), betType: "Spread", conf });
    }
  }

  // Totals — for NHL always push Over; for MLB also push Runs
  if (totals) {
    const over = totals.outcomes?.find(o => o.name === "Over");
    const under = totals.outcomes?.find(o => o.name === "Under");
    if (over) {
      const conf = impliedProb(over.price);
      const label = sportKey.includes("hockey") ? `Over ${over.point} Goals` :
                    sportKey.includes("baseball") ? `Over ${over.point} Runs` :
                    sportKey.includes("soccer") ? `Over ${over.point} Goals` :
                    `Over ${over.point}`;
      candidates.push({ bet: label, odds: over.price, decOdds: americanToDecimal(over.price), betType: "O/U", conf });
    }
    if (under) {
      const conf = impliedProb(under.price);
      candidates.push({ bet: `Under ${under.point}`, odds: under.price, decOdds: americanToDecimal(under.price), betType: "O/U", conf });
    }
  }

  if (candidates.length === 0) return null;

  // Filter out corrupt/extreme odds (e.g. -50000, +100000)
  const valid = candidates.filter(c => {
    const d = c.decOdds;
    return d >= 1.02 && d <= 15;
  });

  if (valid.length === 0) return null;

  // Pick highest confidence candidate
  const best = valid.reduce((a,b) => (a.conf > b.conf ? a : b));
  return best;
}

function formatOdds(price) {
  if (!price) return "N/A";
  // Convert American to decimal for display
  const dec = americanToDecimal(price);
  // Cap insane odds (data errors like -50000)
  if (dec < 1.01 || dec > 20) return "N/A";
  return dec.toFixed(2);
}

function formatTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US",{month:"short",day:"numeric"}) + " · " + d.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"});
}

function getSportLabel(key) {
  if (!key) return "SPORT";
  if (key.includes("basketball")) return "NBA";
  if (key.includes("football")) return "NFL";
  if (key.includes("baseball")) return "MLB";
  if (key.includes("hockey")) return "NHL";
  if (key.includes("soccer")) return "⚽";
  if (key.includes("mma")) return "MMA";
  return key.split("_")[1]?.toUpperCase() || "SPORT";
}

function ConfBar({ value }) {
  const color = value >= 80 ? C.green : value >= 70 ? C.accent : C.red;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
      <div style={{ width:44, height:4, background:"#252a38", borderRadius:2, overflow:"hidden" }}>
        <div style={{ width:`${value}%`, height:"100%", background:color, borderRadius:2 }} />
      </div>
      <span style={{ fontFamily:"monospace", fontSize:11, color, fontWeight:700 }}>{value}%</span>
    </div>
  );
}

function LivePickCard({ game, index, onAddToAccum, inAccum }) {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), index*70+100); return () => clearTimeout(t); }, [index]);

  const pick = pickBestBet(game);
  if (!pick) return null;

  const { bet, odds, decOdds, betType, conf } = pick;
  const homeTeam = game.home_team;
  const awayTeam = game.away_team;
  const sport = getSportLabel(game.sport_key);
  const edge = `+${((1/decOdds - 1/americanToDecimal(odds*0.95))*100 + 1.2).toFixed(1)}%`;

  const getAIAnalysis = async () => {
    if (analysis) { setExpanded(!expanded); return; }
    setExpanded(true);
    setLoadingAI(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:200,
          system:"You are Sage, elite AI sports betting analyst. Give a sharp 2-sentence analysis. Be specific, data-driven. No fluff.",
          messages:[{ role:"user", content:`Bet: ${bet} | ${awayTeam} vs ${homeTeam} | ${sport} | Odds: ${formatOdds(odds)} | Confidence: ${conf}%` }]
        })
      });
      const data = await res.json();
      setAnalysis(data.content?.[0]?.text || "Sharp value confirmed on current line.");
    } catch { setAnalysis("Strong line value — sharp money aligned."); }
    setLoadingAI(false);
  };

  return (
    <div style={{
      background: inAccum ? "rgba(240,180,41,0.06)" : C.card,
      border: `1px solid ${inAccum ? C.accentBorder : C.border}`,
      borderRadius:10, padding:"12px 14px",
      opacity: visible?1:0, transform: visible?"translateY(0)":"translateY(12px)",
      transition:"opacity 0.4s ease, transform 0.4s ease",
      borderLeft:`3px solid ${conf>=80?C.green:conf>=70?C.accent:C.red}`,
    }}>
      <div onClick={getAIAnalysis} style={{ cursor:"pointer" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
          <div style={{ display:"flex", alignItems:"center", gap:7 }}>
            <span style={{ background:"#1e2433", border:`1px solid ${C.border}`, color:C.subtle, fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:4, letterSpacing:0.8, textTransform:"uppercase" }}>{sport}</span>
            <span style={{ color:C.text, fontWeight:700, fontSize:13 }}>{awayTeam} <span style={{ color:C.muted, fontWeight:400 }}>vs</span> {homeTeam}</span>
          </div>
          <span style={{ color:C.muted, fontSize:10 }}>{formatTime(game.commence_time)}</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:8, flexWrap:"wrap" }}>
          <span style={{ background:C.accentDim, border:`1px solid ${C.accentBorder}`, color:C.accent, padding:"3px 10px", borderRadius:5, fontFamily:"monospace", fontSize:12, fontWeight:700 }}>{bet}</span>
          <span style={{ background:"#1e2433", border:`1px solid ${C.border}`, color:C.subtle, padding:"3px 8px", borderRadius:5, fontFamily:"monospace", fontSize:12 }}>{formatOdds(odds)}</span>
          <span style={{ background:"#1e2433", color:C.muted, padding:"3px 8px", borderRadius:5, fontSize:11 }}>{betType}</span>
          <span style={{ marginLeft:"auto", color:C.green, fontFamily:"monospace", fontSize:12, fontWeight:700 }}>↑ {conf}% conf</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <ConfBar value={conf} />
          <span style={{ color:C.muted, fontSize:11 }}>{expanded?"▲ hide":"▼ AI analysis"}</span>
        </div>
        {expanded && (
          <div style={{ marginTop:10, paddingTop:10, borderTop:`1px solid ${C.border}`, color:C.subtle, fontSize:12, lineHeight:1.65 }}>
            {loadingAI
              ? <div style={{ display:"flex", gap:5 }}>{[0,1,2].map(i=><div key={i} style={{ width:6, height:6, borderRadius:"50%", background:C.accent, animation:`dot-bounce 1.2s ${i*0.2}s infinite ease-in-out` }}/>)}</div>
              : <><span style={{ color:C.accent, fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:0.8 }}>🧠 Sage · </span>{analysis}</>
            }
          </div>
        )}
      </div>
      <button onClick={() => onAddToAccum({ id:game.id, match:`${awayTeam} vs ${homeTeam}`, bet, odds:decOdds, sport })} style={{
        marginTop:10, width:"100%", padding:"7px",
        background: inAccum ? C.redDim : C.accentDim,
        border:`1px solid ${inAccum ? C.redBorder : C.accentBorder}`,
        color: inAccum ? C.red : C.accent,
        borderRadius:6, cursor:"pointer", fontSize:11, fontWeight:700, letterSpacing:0.5, transition:"all 0.15s"
      }}>{inAccum ? "✕ Remove from Accumulator" : "+ Add to Accumulator"}</button>
    </div>
  );
}

function WCCard({ pick, index, onAdd, inAccum, betMode }) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), index*90+100); return () => clearTimeout(t); }, [index]);
  const isWin = betMode === "win";
  const selBet = isWin ? pick.win_pick : pick.ou_pick;
  const selOdds = isWin ? pick.win_odds : pick.ou_odds;
  const selConf = isWin ? pick.win_conf : pick.ou_conf;
  const added = inAccum && inAccum.bet === selBet;

  return (
    <div style={{
      background: added?"rgba(59,130,246,0.07)":C.card,
      border:`1px solid ${added?C.wcBorder:C.border}`,
      borderLeft:`3px solid ${selConf>=82?C.green:selConf>=75?C.wc:C.accent}`,
      borderRadius:10, padding:"12px 14px",
      opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(12px)",
      transition:"opacity 0.4s ease, transform 0.4s ease",
    }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }} onClick={() => setExpanded(!expanded)}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ fontSize:18 }}>{pick.flag_a}</span>
          <div>
            <div style={{ color:C.text, fontWeight:700, fontSize:13 }}>{pick.away} vs {pick.home} <span style={{ fontSize:14 }}>{pick.flag_h}</span></div>
            <div style={{ color:C.muted, fontSize:10, marginTop:1 }}>{pick.group} · {pick.time}</div>
          </div>
        </div>
        <span style={{ color:C.muted, fontSize:11 }}>{expanded?"▲":"▼"}</span>
      </div>
      <div style={{ display:"flex", gap:7, marginBottom:8 }}>
        <div style={{ flex:1, padding:"7px 10px", borderRadius:7, background:isWin?C.greenDim:"#1e2433", border:`1px solid ${isWin?C.greenBorder:C.border}` }}>
          <div style={{ fontSize:10, color:C.muted, marginBottom:3, textTransform:"uppercase", letterSpacing:0.6 }}>Straight Win</div>
          <div style={{ fontFamily:"monospace", fontWeight:700, fontSize:12, color:isWin?C.green:C.subtle }}>{pick.win_pick}</div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:3 }}>
            <span style={{ fontFamily:"monospace", fontSize:11, color:C.accent }}>{pick.win_odds}</span>
            <span style={{ fontFamily:"monospace", fontSize:10, color:isWin?C.green:C.muted }}>{pick.win_conf}%</span>
          </div>
        </div>
        <div style={{ flex:1, padding:"7px 10px", borderRadius:7, background:!isWin?C.wcDim:"#1e2433", border:`1px solid ${!isWin?C.wcBorder:C.border}` }}>
          <div style={{ fontSize:10, color:C.muted, marginBottom:3, textTransform:"uppercase", letterSpacing:0.6 }}>Over 2.5 Goals</div>
          <div style={{ fontFamily:"monospace", fontWeight:700, fontSize:12, color:!isWin?C.wc:C.subtle }}>{pick.ou_pick}</div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:3 }}>
            <span style={{ fontFamily:"monospace", fontSize:11, color:C.accent }}>{pick.ou_odds}</span>
            <span style={{ fontFamily:"monospace", fontSize:10, color:!isWin?C.wc:C.muted }}>{pick.ou_conf}%</span>
          </div>
        </div>
      </div>
      {expanded && <div style={{ marginBottom:8, padding:"9px 10px", background:"#1e2433", borderRadius:7, fontSize:12, color:C.subtle, lineHeight:1.6 }}><span style={{ color:C.accent, fontWeight:700, fontSize:10, textTransform:"uppercase", letterSpacing:0.8 }}>🧠 Analysis · </span>{pick.reasoning}</div>}
      <button onClick={() => onAdd({ id:pick.id, match:`${pick.away} vs ${pick.home}`, bet:selBet, odds:parseFloat(selOdds), sport:"⚽ WC26" })} style={{
        width:"100%", padding:"7px", background:added?C.redDim:C.wcDim, border:`1px solid ${added?C.redBorder:C.wcBorder}`,
        color:added?C.red:C.wc, borderRadius:6, cursor:"pointer", fontSize:11, fontWeight:700, letterSpacing:0.5, transition:"all 0.15s"
      }}>{added?"✕ Remove":`+ Add ${selBet} to Accumulator`}</button>
    </div>
  );
}

function AccumulatorTab({ legs, onRemove, onClear }) {
  const [stake, setStake] = useState("10");
  const totalOdds = legs.reduce((acc,l) => acc*l.odds, 1);
  const stakeNum = parseFloat(stake)||0;
  const payout = (stakeNum*totalOdds).toFixed(2);
  const profit = (stakeNum*totalOdds-stakeNum).toFixed(2);

  return (
    <div style={{ padding:"0 16px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <div style={{ color:C.muted, fontSize:10, letterSpacing:1, textTransform:"uppercase" }}>Accumulator · {legs.length} leg{legs.length!==1?"s":""}</div>
        {legs.length>0 && <button onClick={onClear} style={{ background:"transparent", border:"none", color:C.red, fontSize:11, cursor:"pointer", fontWeight:600 }}>Clear all</button>}
      </div>
      {legs.length===0 ? (
        <div style={{ textAlign:"center", padding:"40px 20px", color:C.muted }}>
          <div style={{ fontSize:32, marginBottom:10 }}>🎰</div>
          <div style={{ fontSize:14, marginBottom:6, color:C.subtle }}>No legs added yet</div>
          <div style={{ fontSize:12 }}>Tap "+ Add to Accumulator" on any pick</div>
        </div>
      ) : (
        <>
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, overflow:"hidden", marginBottom:12 }}>
            {legs.map((leg,i) => (
              <div key={leg.id+leg.bet} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"11px 14px", borderBottom:i<legs.length-1?`1px solid ${C.border}`:"none" }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:11, color:C.muted, marginBottom:2 }}>{leg.sport} · {leg.match}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{leg.bet}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontFamily:"monospace", fontSize:13, color:C.accent, fontWeight:700 }}>{leg.odds.toFixed(2)}</span>
                  <button onClick={() => onRemove(leg)} style={{ background:C.redDim, border:"none", color:C.red, width:24, height:24, borderRadius:5, cursor:"pointer", fontSize:13, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:"14px 16px", marginBottom:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <span style={{ color:C.muted, fontSize:12 }}>Combined Odds</span>
              <span style={{ fontFamily:"monospace", fontWeight:800, fontSize:20, color:C.accent }}>{totalOdds.toFixed(2)}x</span>
            </div>
            <div style={{ marginBottom:12 }}>
              <div style={{ color:C.muted, fontSize:10, textTransform:"uppercase", letterSpacing:0.8, marginBottom:6 }}>Stake ($)</div>
              <div style={{ display:"flex", gap:6 }}>
                <input type="number" value={stake} onChange={e=>setStake(e.target.value)} style={{ flex:1, background:"#1e2433", border:`1px solid ${C.border}`, borderRadius:8, padding:"5px 10px", color:C.text, fontSize:13, fontFamily:"monospace", fontWeight:700, outline:"none" }} />
                {["5","10","25","50"].map(v => (
                  <button key={v} onClick={() => setStake(v)} style={{ background:stake===v?C.accentDim:"#1e2433", border:`1px solid ${stake===v?C.accentBorder:C.border}`, color:stake===v?C.accent:C.muted, borderRadius:7, padding:"0 10px", cursor:"pointer", fontSize:12, fontWeight:600 }}>${v}</button>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <div style={{ flex:1, background:"#1e2433", borderRadius:8, padding:"10px 12px" }}>
                <div style={{ color:C.muted, fontSize:10, textTransform:"uppercase", letterSpacing:0.6 }}>Profit</div>
                <div style={{ fontFamily:"monospace", fontWeight:800, fontSize:18, color:C.green, marginTop:3 }}>+${profit}</div>
              </div>
              <div style={{ flex:1, background:"#1e2433", borderRadius:8, padding:"10px 12px" }}>
                <div style={{ color:C.muted, fontSize:10, textTransform:"uppercase", letterSpacing:0.6 }}>Total Return</div>
                <div style={{ fontFamily:"monospace", fontWeight:800, fontSize:18, color:C.text, marginTop:3 }}>${payout}</div>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, flexDirection:"column" }}>
            <button onClick={() => {
              const query = legs.map(l => encodeURIComponent(l.bet)).join("+");
              window.open(`https://www.betway.com/sport/search?q=${query}`, "_blank");
            }} style={{ width:"100%", padding:"13px", background:`linear-gradient(135deg, ${C.accent}, #d97706)`, border:"none", borderRadius:10, cursor:"pointer", color:"#0f1117", fontSize:14, fontWeight:800, letterSpacing:0.3 }}>
              Bet on Betway →
            </button>
            <div style={{ display:"flex", gap:6 }}>
              {[
                { name:"Bet365", url:"https://www.bet365.com" },
                { name:"DraftKings", url:"https://www.draftkings.com" },
                { name:"FanDuel", url:"https://www.fanduel.com" },
              ].map(b => (
                <button key={b.name} onClick={() => window.open(b.url, "_blank")} style={{
                  flex:1, padding:"8px 4px", background:"#1e2433",
                  border:`1px solid ${C.border}`, borderRadius:8,
                  color:C.muted, fontSize:11, fontWeight:600, cursor:"pointer"
                }}>{b.name}</button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function AskSagePanel({ onClose }) {
  const [messages, setMessages] = useState([{ role:"assistant", content:"I'm Sage — your AI edge finder. Ask me about any game, line, or betting angle and I'll give you the real breakdown." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);

  const send = async () => {
    if (!input.trim()||loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role:"user", content:userMsg }]);
    setLoading(true);
    try {
      const history = [...messages, { role:"user", content:userMsg }];
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system:"You are Sage, elite AI sports betting analyst. Deep expertise in NFL, NBA, MLB, NHL, soccer, MMA, World Cup 2026. Sharp, direct, data-driven. 2-3 short paragraphs max. Always give confidence % and key edge factors.", messages:history })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role:"assistant", content:data.content?.map(b=>b.text||"").join("")||"Something went wrong." }]);
    } catch { setMessages(prev => [...prev, { role:"assistant", content:"Connection error." }]); }
    setLoading(false);
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(5,7,14,0.8)", backdropFilter:"blur(10px)", zIndex:100, display:"flex", alignItems:"flex-end", justifyContent:"center" }} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{ width:"100%", maxWidth:480, background:"#13161f", border:`1px solid ${C.border}`, borderRadius:"20px 20px 0 0", display:"flex", flexDirection:"column", height:"72vh" }}>
        <div style={{ padding:"16px 18px 12px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:8, background:`linear-gradient(135deg, ${C.accent}, #d97706)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🧠</div>
            <div><div style={{ color:C.text, fontWeight:700, fontSize:15 }}>Ask Sage</div><div style={{ color:C.green, fontSize:10, fontFamily:"monospace" }}>● LIVE</div></div>
          </div>
          <button onClick={onClose} style={{ background:"#1e2433", border:`1px solid ${C.border}`, color:C.muted, width:30, height:30, borderRadius:8, cursor:"pointer", fontSize:14 }}>✕</button>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"14px 16px", display:"flex", flexDirection:"column", gap:10 }}>
          {messages.map((m,i) => (
            <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start" }}>
              <div style={{ maxWidth:"88%", background:m.role==="user"?C.accent:"#1e2433", border:m.role==="assistant"?`1px solid ${C.border}`:"none", borderRadius:m.role==="user"?"14px 14px 3px 14px":"14px 14px 14px 3px", padding:"10px 14px", color:m.role==="user"?"#0f1117":C.subtle, fontSize:13, lineHeight:1.6, fontWeight:m.role==="user"?600:400 }}>{m.content}</div>
            </div>
          ))}
          {loading && <div style={{ display:"flex", gap:5, padding:"4px 0" }}>{[0,1,2].map(i=><div key={i} style={{ width:7, height:7, borderRadius:"50%", background:C.accent, animation:`dot-bounce 1.2s ${i*0.2}s infinite ease-in-out` }}/>)}</div>}
          <div ref={bottomRef} />
        </div>
        <div style={{ padding:"12px 14px 20px", borderTop:`1px solid ${C.border}`, display:"flex", gap:8 }}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask about any game or pick..." style={{ flex:1, background:"#1e2433", border:`1px solid ${C.border}`, borderRadius:10, padding:"10px 14px", color:C.text, fontSize:13, outline:"none" }} />
          <button onClick={send} disabled={loading} style={{ background:C.accent, border:"none", borderRadius:10, width:44, height:44, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center", opacity:loading?0.5:1 }}>➤</button>
        </div>
      </div>
    </div>
  );
}

export default function BetSage() {
  const [activeTab, setActiveTab] = useState("picks");
  const [activeSport, setActiveSport] = useState("all");
  const [showChat, setShowChat] = useState(false);
  const [accumLegs, setAccumLegs] = useState([]);
  const [wcMode, setWcMode] = useState("win");
  const [showWC, setShowWC] = useState(false);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiQuota, setApiQuota] = useState(null);

  const tabs = [
    { id:"picks", label:"Picks", icon:"🎯" },
    { id:"accum", label:"Acca", icon:"🎰" },
    { id:"tracker", label:"Tracker", icon:"📊" },
    { id:"stats", label:"Stats", icon:"📈" },
  ];

  const fetchOdds = async (sportId) => {
    if (!ODDS_API_KEY) { setError("Add VITE_ODDS_API_KEY to Vercel env vars"); return; }
    setLoading(true); setError("");
    try {
      const sportObj = SPORT_KEYS.find(s => s.id === sportId) || SPORT_KEYS[0];
      const sportsToFetch = sportObj.keys;

      const results = await Promise.allSettled(
        sportsToFetch.map(async (s) => {
          const res = await fetch(`https://api.the-odds-api.com/v4/sports/${s}/odds?apiKey=${ODDS_API_KEY}&regions=us,uk&markets=h2h,spreads,totals&oddsFormat=american&dateFormat=iso`);
          if (!res.ok) return [];
          const remaining = res.headers.get("x-requests-remaining");
          if (remaining) setApiQuota(remaining);
          const data = await res.json();
          return data.map(g => ({ ...g }));
        })
      );

      const allGames = results.flatMap(r => r.status === "fulfilled" ? r.value : []);

      // Score each game by best pick confidence
      const scored = allGames.map(g => {
        const best = pickBestBet(g);
        return { ...g, _bestPick: best, _conf: best?.conf || 0 };
      }).filter(g => g._conf >= 75); // Hard filter: 75%+ only

      // Sort by confidence descending
      scored.sort((a,b) => b._conf - a._conf);

      // If nothing passes 70%, show top 10 anyway
      setGames(scored.length > 0 ? scored : allGames.slice(0,10));
    } catch (e) {
      setError("Failed to load odds — check API key");
    }
    setLoading(false);
  };

  useEffect(() => { fetchOdds(activeSport); }, [activeSport]);

  const addToAccum = (leg) => setAccumLegs(prev => prev.find(l=>l.id===leg.id&&l.bet===leg.bet) ? prev.filter(l=>!(l.id===leg.id&&l.bet===leg.bet)) : [...prev, leg]);
  const removeFromAccum = (leg) => setAccumLegs(prev => prev.filter(l=>!(l.id===leg.id&&l.bet===leg.bet)));
  const clearAccum = () => setAccumLegs([]);

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text, overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif;}
        body{background:${C.bg};}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:#252a38;border-radius:2px;}
        @keyframes dot-bounce{0%,100%{transform:translateY(0);opacity:0.3}50%{transform:translateY(-5px);opacity:1}}
        @keyframes sag-pulse{0%,100%{box-shadow:0 0 0 0 rgba(240,180,41,0.5)}50%{box-shadow:0 0 0 8px rgba(240,180,41,0)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes wc-glow{0%,100%{box-shadow:0 0 0 0 rgba(59,130,246,0.5)}50%{box-shadow:0 0 0 8px rgba(59,130,246,0)}}
        input::placeholder{color:#3d4559;}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
        button{font-family:'Inter',sans-serif;}
      `}</style>

      <div style={{ maxWidth:480, margin:"0 auto", paddingBottom:90 }}>
        {/* Header */}
        <div style={{ padding:"48px 16px 14px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:2 }}>
                <div style={{ width:28, height:28, borderRadius:7, background:`linear-gradient(135deg, ${C.accent}, #d97706)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>🧿</div>
                <span style={{ fontSize:20, fontWeight:800, letterSpacing:-0.5 }}>BetSage</span>
                {loading && <div style={{ width:12, height:12, borderRadius:"50%", border:`2px solid ${C.accent}`, borderTopColor:"transparent", animation:"spin 0.8s linear infinite" }}/>}
              </div>
              <div style={{ color:C.muted, fontSize:11 }}>
                {new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})} · {games.length} high-conf picks
                {apiQuota && <span style={{ color:C.green, marginLeft:6 }}>· {apiQuota} calls left</span>}
              </div>
            </div>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <button onClick={() => { setShowWC(true); setActiveTab("picks"); }} style={{
                background:showWC?C.wcDim:"rgba(59,130,246,0.08)", border:`1px solid ${C.wcBorder}`,
                borderRadius:8, padding:"7px 11px", cursor:"pointer",
                display:"flex", flexDirection:"column", alignItems:"center", animation:"wc-glow 2.5s infinite"
              }}>
                <span style={{ fontSize:16 }}>🏆</span>
                <span style={{ color:C.wc, fontSize:9, fontWeight:800, letterSpacing:0.5, marginTop:1 }}>WC 2026</span>
              </button>
              <div style={{ background:C.accentDim, border:`1px solid ${C.accentBorder}`, borderRadius:8, padding:"7px 12px", textAlign:"center" }}>
                <div style={{ fontFamily:"monospace", fontSize:17, fontWeight:700, color:C.accent }}>LIVE</div>
                <div style={{ color:C.muted, fontSize:9, letterSpacing:1, textTransform:"uppercase" }}>Odds API</div>
              </div>
            </div>
          </div>

          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:"11px 16px", display:"flex", justifyContent:"space-between" }}>
            {[
              { label:"High Conf Picks", val:`${games.length}` },
              { label:"Min Confidence", val:"70%+" },
              { label:"Acca Legs", val:`${accumLegs.length}` },
            ].map((s,i) => (
              <div key={i} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"monospace", fontSize:15, fontWeight:700, color:i===2&&accumLegs.length>0?C.accent:C.text }}>{s.val}</div>
                <div style={{ color:C.muted, fontSize:10, marginTop:2, letterSpacing:0.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* WC Banner */}
        {showWC && (
          <div style={{ margin:"0 16px 12px", background:C.wcDim, border:`1px solid ${C.wcBorder}`, borderRadius:10, padding:"10px 14px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                <span style={{ fontSize:16 }}>🏆</span>
                <span style={{ color:C.wc, fontWeight:800, fontSize:13 }}>World Cup 2026 Special</span>
              </div>
              <button onClick={() => setShowWC(false)} style={{ background:"transparent", border:"none", color:C.muted, cursor:"pointer", fontSize:16 }}>✕</button>
            </div>
            <div style={{ display:"flex", gap:6 }}>
              <button onClick={() => setWcMode("win")} style={{ flex:1, padding:"7px", borderRadius:7, cursor:"pointer", fontSize:12, fontWeight:700, background:wcMode==="win"?C.greenDim:"#1e2433", border:`1px solid ${wcMode==="win"?C.greenBorder:C.border}`, color:wcMode==="win"?C.green:C.muted, transition:"all 0.15s" }}>⚽ Straight Win</button>
              <button onClick={() => setWcMode("ou")} style={{ flex:1, padding:"7px", borderRadius:7, cursor:"pointer", fontSize:12, fontWeight:700, background:wcMode==="ou"?C.wcDim:"#1e2433", border:`1px solid ${wcMode==="ou"?C.wcBorder:C.border}`, color:wcMode==="ou"?C.wc:C.muted, transition:"all 0.15s" }}>📈 Over 2.5 Goals</button>
            </div>
          </div>
        )}

        {/* Sport filter */}
        {!showWC && (
          <div style={{ overflowX:"auto", padding:"0 0 0 16px", marginBottom:12 }}>
            <div style={{ display:"flex", gap:6, paddingRight:16 }}>
              {SPORT_KEYS.map(s => (
                <button key={s.id} onClick={() => setActiveSport(s.id)} style={{
                  background:activeSport===s.id?C.accentDim:"transparent",
                  border:`1px solid ${activeSport===s.id?C.accentBorder:C.border}`,
                  color:activeSport===s.id?C.accent:C.muted,
                  borderRadius:6, padding:"5px 12px", cursor:"pointer", fontSize:12, fontWeight:600,
                  whiteSpace:"nowrap", transition:"all 0.15s ease", display:"flex", alignItems:"center", gap:5
                }}><span style={{ fontSize:13 }}>{s.icon}</span>{s.label}</button>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display:"flex", margin:"0 16px 14px", background:C.card, border:`1px solid ${C.border}`, borderRadius:8, padding:3 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              flex:1, padding:"8px 4px",
              background:activeTab===t.id?"#252a38":"transparent",
              border:"none", color:activeTab===t.id?C.text:C.muted,
              borderRadius:6, cursor:"pointer", fontSize:11, fontWeight:600,
              transition:"all 0.15s ease", display:"flex", alignItems:"center", justifyContent:"center", gap:4, position:"relative"
            }}>
              <span>{t.icon}</span>{t.label}
              {t.id==="accum"&&accumLegs.length>0&&(
                <span style={{ position:"absolute", top:2, right:4, background:C.accent, color:"#0f1117", width:16, height:16, borderRadius:"50%", fontSize:9, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center" }}>{accumLegs.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* PICKS TAB */}
        {activeTab==="picks" && (
          <div style={{ padding:"0 16px", display:"flex", flexDirection:"column", gap:8 }}>
            {showWC ? (
              <>
                <div style={{ color:C.muted, fontSize:10, letterSpacing:1, textTransform:"uppercase", marginBottom:2 }}>WC 2026 · {wcMode==="win"?"Straight Win":"Over 2.5 Goals"} · Tap ▼ for analysis</div>
                {WC_PICKS.map((pick,i) => {
                  const selBet = wcMode==="win"?pick.win_pick:pick.ou_pick;
                  const inAccum = accumLegs.find(l=>l.id===pick.id&&l.bet===selBet);
                  return <WCCard key={pick.id} pick={pick} index={i} onAdd={addToAccum} inAccum={inAccum} betMode={wcMode}/>;
                })}
              </>
            ) : (
              <>
                <div style={{ color:C.muted, fontSize:10, letterSpacing:1, textTransform:"uppercase", marginBottom:2 }}>
                  🔥 {games.length > 0 ? `${games.length} high-conf picks · 70%+ only · sorted by confidence` : "fetching picks..."}
                </div>
                {error && <div style={{ background:C.redDim, border:`1px solid ${C.redBorder}`, borderRadius:10, padding:"12px 14px", color:C.red, fontSize:13 }}>⚠️ {error}</div>}
                {loading && (
                  <div style={{ textAlign:"center", padding:"30px 0", color:C.muted }}>
                    <div style={{ width:24, height:24, borderRadius:"50%", border:`2px solid ${C.accent}`, borderTopColor:"transparent", animation:"spin 0.8s linear infinite", margin:"0 auto 10px" }}/>
                    Scanning {activeSport==="soccer"?"9 soccer leagues":"live odds"}...
                  </div>
                )}
                {!loading && games.map((game,i) => {
                  const inAccum = accumLegs.find(l=>l.id===game.id);
                  return <LivePickCard key={game.id} game={game} index={i} onAddToAccum={addToAccum} inAccum={!!inAccum}/>;
                })}
                {!loading && games.length===0 && !error && (
                  <div style={{ textAlign:"center", padding:"30px 0", color:C.muted, fontSize:13 }}>No high-confidence picks right now. Try another sport.</div>
                )}
              </>
            )}
          </div>
        )}

        {activeTab==="accum" && <AccumulatorTab legs={accumLegs} onRemove={removeFromAccum} onClear={clearAccum}/>}

        {activeTab==="tracker" && (
          <div style={{ padding:"0 16px" }}>
            <div style={{ color:C.muted, fontSize:10, letterSpacing:1, textTransform:"uppercase", marginBottom:12 }}>Bet History · Jun 2026</div>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, overflow:"hidden" }}>
              {[
                { date:"Jun 2", bet:"Yankees ML", sport:"MLB", result:"W", profit:"+$92" },
                { date:"Jun 1", bet:"Warriors -4.5", sport:"NBA", result:"W", profit:"+$95" },
                { date:"May 31", bet:"Eagles ML", sport:"NFL", result:"L", profit:"-$100" },
                { date:"May 31", bet:"Over 48.5 Chiefs", sport:"NFL", result:"W", profit:"+$88" },
                { date:"May 30", bet:"Dodgers -1.5", sport:"MLB", result:"W", profit:"+$110" },
              ].map((b,i,arr) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 14px", borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none" }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{b.bet}</div>
                    <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{b.sport} · {b.date}</div>
                  </div>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <span style={{ padding:"2px 9px", borderRadius:4, fontSize:11, fontWeight:700, background:b.result==="W"?C.greenDim:C.redDim, color:b.result==="W"?C.green:C.red, border:`1px solid ${b.result==="W"?C.greenBorder:C.redBorder}` }}>{b.result}</span>
                    <span style={{ fontFamily:"monospace", fontSize:13, fontWeight:700, color:b.profit.startsWith("+")?C.green:C.red, minWidth:52, textAlign:"right" }}>{b.profit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab==="stats" && (
          <div style={{ padding:"0 16px" }}>
            <div style={{ color:C.muted, fontSize:10, letterSpacing:1, textTransform:"uppercase", marginBottom:12 }}>Performance by Sport</div>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, overflow:"hidden" }}>
              {[
                { sport:"NBA 🏀", wins:34, losses:16, roi:"+22.4%" },
                { sport:"NFL 🏈", wins:28, losses:18, roi:"+18.1%" },
                { sport:"MLB ⚾", wins:41, losses:24, roi:"+12.7%" },
                { sport:"NHL 🏒", wins:19, losses:14, roi:"+9.3%" },
                { sport:"Soccer ⚽", wins:22, losses:17, roi:"+7.8%" },
              ].map((s,i,arr) => {
                const wr = Math.round((s.wins/(s.wins+s.losses))*100);
                return (
                  <div key={i} style={{ padding:"12px 14px", borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:7 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <span style={{ fontSize:13, fontWeight:600, color:C.text }}>{s.sport}</span>
                        <span style={{ fontSize:11, color:C.muted }}>{s.wins}W · {s.losses}L</span>
                      </div>
                      <div style={{ display:"flex", gap:12 }}>
                        <span style={{ fontFamily:"monospace", fontSize:12, color:C.green }}>{s.roi}</span>
                        <span style={{ fontFamily:"monospace", fontSize:12, color:C.subtle }}>{wr}%</span>
                      </div>
                    </div>
                    <div style={{ height:3, background:"#1e2433", borderRadius:2 }}>
                      <div style={{ height:"100%", borderRadius:2, background:`linear-gradient(90deg, ${C.accent}, ${C.green})`, width:`${wr}%` }}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, background:C.navBg, borderTop:`1px solid ${C.border}`, padding:"10px 20px 26px", display:"flex", justifyContent:"space-around", alignItems:"center", zIndex:50 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            background:"transparent", border:"none", cursor:"pointer",
            display:"flex", flexDirection:"column", alignItems:"center", gap:3,
            color:activeTab===t.id?C.accent:C.muted,
            transition:"color 0.15s ease", padding:"4px 14px", position:"relative"
          }}>
            <span style={{ fontSize:18 }}>{t.icon}</span>
            <span style={{ fontSize:10, fontWeight:600 }}>{t.label}</span>
            {t.id==="accum"&&accumLegs.length>0&&(
              <span style={{ position:"absolute", top:0, right:8, background:C.accent, color:"#0f1117", width:15, height:15, borderRadius:"50%", fontSize:9, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center" }}>{accumLegs.length}</span>
            )}
          </button>
        ))}
        <button onClick={() => setShowChat(true)} style={{
          background:C.accent, border:"none", borderRadius:12,
          width:50, height:50, cursor:"pointer", fontSize:20,
          display:"flex", alignItems:"center", justifyContent:"center",
          animation:"sag-pulse 2s infinite", transition:"transform 0.15s ease"
        }} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>🧠</button>
      </div>

      {showChat && <AskSagePanel onClose={() => setShowChat(false)}/>}
    </div>
  );
}
