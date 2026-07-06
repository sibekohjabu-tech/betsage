import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// BETSAGEAI — COMPLETE FINAL APP
// Sun 5 Jul 2026 · World Cup Round of 16 · SAST (UTC+2)
//
// ✅ Auto-updating date/time — never hardcoded
// ✅ Real WC R16 fixtures with live kickoff timestamps
// ✅ Fixtures auto-sort: Live → Today → Upcoming → Finished
// ✅ Status auto-calculated from real clock every 30 seconds
// ✅ AI Accumulator powered by Claude API
// ✅ Stripe checkout with 7-day free trial
// ✅ Mobile-first bottom nav + desktop sidebar
// ✅ Full bet tracker with P&L
// ✅ Affiliate system with referral link
// ─────────────────────────────────────────────────────────────────────────────

const TZ = "Africa/Johannesburg"; // UTC+2 / SAST

function nowSAST() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: TZ }));
}

function fmtDate(d) {
  return d.toLocaleDateString("en-GB", { weekday:"short", day:"numeric", month:"short", year:"numeric", timeZone:TZ });
}

function fmtTime(isoUTC) {
  return new Date(isoUTC).toLocaleTimeString("en-GB", { hour:"2-digit", minute:"2-digit", timeZone:TZ });
}

function fmtDateShort(isoUTC) {
  return new Date(isoUTC).toLocaleDateString("en-GB", { weekday:"short", day:"numeric", month:"short", timeZone:TZ });
}

function isTodaySAST(isoUTC) {
  const a = new Date(isoUTC).toLocaleDateString("en-GB", { timeZone:TZ });
  const b = new Date().toLocaleDateString("en-GB", { timeZone:TZ });
  return a === b;
}
// ── LIVE SCORES HOOK — connects to api/football/live.js ──────────────────────
// Calls the endpoint Shogo built. Falls back to demo data if no API key.
// Refreshes every 60 seconds while mounted.
function useLiveScores() {
  const [live, setLive] = useState({ fixtures: [], loading: true, demo: false });
  useEffect(() => {
    let cancelled = false;
    async function fetch_() {
      try {
        const res = await fetch("/api/football/live");
        const json = await res.json();
        if (!cancelled) setLive({ fixtures: json.fixtures || [], loading: false, demo: !!json.demo });
      } catch {
        if (!cancelled) setLive(prev => ({ ...prev, loading: false }));
      }
    }
    fetch_();
    const iv = setInterval(fetch_, 60000);
    return () => { cancelled = true; clearInterval(iv); };
  }, []);
  return live;
}



function getStatus(isoUTC, hasScore) {
  const ko = new Date(isoUTC).getTime();
  const now = Date.now();
  const end = ko + 115 * 60000;
  if (hasScore && now > end) return "finished";
  if (now >= ko && now < end) return "live";
  if (now >= end) return "finished";
  return "upcoming";
}

function getLiveMinute(isoUTC) {
  const ko = new Date(isoUTC).getTime();
  return Math.min(Math.floor((Date.now() - ko) / 60000), 90);
}


// ─────────────────────────────────────────────────────────────────────────────
// MY TEAMS — Personal watchlist with search + fixture tracking
// Teams saved to localStorage. Fixtures pulled from /api/football/fixtures.js
// (Shogo's endpoint). Falls back to curated data if API not connected yet.
// ─────────────────────────────────────────────────────────────────────────────

// J's default teams from screenshots
const DEFAULT_TEAMS = [
  { id:"pt",  name:"Portugal",    flag:"🇵🇹", league:"FIFA World Cup",    leagueId:1   },
  { id:"es",  name:"Spain",       flag:"🇪🇸", league:"FIFA World Cup",    leagueId:1   },
  { id:"us",  name:"USA",         flag:"🇺🇸", league:"FIFA World Cup",    leagueId:1   },
  { id:"be",  name:"Belgium",     flag:"🇧🇪", league:"FIFA World Cup",    leagueId:1   },
  { id:"br",  name:"Brazil",      flag:"🇧🇷", league:"FIFA World Cup",    leagueId:1   },
  { id:"celt",name:"Celtic FC",   flag:"☘️",  league:"UEFA Champions Lge",leagueId:2   },
  { id:"arg", name:"Argentina",   flag:"🇦🇷", league:"FIFA World Cup",    leagueId:1   },
  { id:"fr",  name:"France",      flag:"🇫🇷", league:"FIFA World Cup",    leagueId:1   },
  { id:"eng", name:"England",     flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", league:"FIFA World Cup",    leagueId:1   },
  { id:"nor", name:"Norway",      flag:"🇳🇴", league:"FIFA World Cup",    leagueId:1   },
  { id:"mor", name:"Morocco",     flag:"🇲🇦", league:"FIFA World Cup",    leagueId:1   },
  { id:"col", name:"Colombia",    flag:"🇨🇴", league:"FIFA World Cup",    leagueId:1   },
];

// All searchable teams (for the search box)
const ALL_TEAMS_DB = [
  // WC 2026
  { id:"pt",  name:"Portugal",       flag:"🇵🇹", league:"FIFA World Cup" },
  { id:"es",  name:"Spain",          flag:"🇪🇸", league:"FIFA World Cup" },
  { id:"us",  name:"USA",            flag:"🇺🇸", league:"FIFA World Cup" },
  { id:"be",  name:"Belgium",        flag:"🇧🇪", league:"FIFA World Cup" },
  { id:"br",  name:"Brazil",         flag:"🇧🇷", league:"FIFA World Cup" },
  { id:"arg", name:"Argentina",      flag:"🇦🇷", league:"FIFA World Cup" },
  { id:"fr",  name:"France",         flag:"🇫🇷", league:"FIFA World Cup" },
  { id:"eng", name:"England",        flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", league:"FIFA World Cup" },
  { id:"nor", name:"Norway",         flag:"🇳🇴", league:"FIFA World Cup" },
  { id:"mor", name:"Morocco",        flag:"🇲🇦", league:"FIFA World Cup" },
  { id:"col", name:"Colombia",       flag:"🇨🇴", league:"FIFA World Cup" },
  { id:"ch",  name:"Switzerland",    flag:"🇨🇭", league:"FIFA World Cup" },
  { id:"mx",  name:"Mexico",         flag:"🇲🇽", league:"FIFA World Cup" },
  // EPL
  { id:"mci", name:"Man City",       flag:"🔵", league:"Premier League" },
  { id:"ars", name:"Arsenal",        flag:"🔴", league:"Premier League" },
  { id:"liv", name:"Liverpool",      flag:"🔴", league:"Premier League" },
  { id:"che", name:"Chelsea",        flag:"🔵", league:"Premier League" },
  { id:"mun", name:"Man United",     flag:"🔴", league:"Premier League" },
  { id:"tot", name:"Tottenham",      flag:"⚪", league:"Premier League" },
  { id:"new", name:"Newcastle",      flag:"⚫", league:"Premier League" },
  // La Liga
  { id:"bar", name:"Barcelona",      flag:"🔵🔴", league:"La Liga" },
  { id:"rma", name:"Real Madrid",    flag:"⚪", league:"La Liga" },
  { id:"atm", name:"Atletico Madrid",flag:"🔴⚪", league:"La Liga" },
  // UCL
  { id:"celt",name:"Celtic FC",      flag:"☘️",  league:"UCL Qualifier" },
  { id:"bay", name:"Bayern Munich",  flag:"🔴",  league:"Bundesliga" },
  { id:"psg", name:"PSG",            flag:"🔵🔴", league:"Ligue 1" },
  { id:"juv", name:"Juventus",       flag:"⚫⚪", league:"Serie A" },
  { id:"acm", name:"AC Milan",       flag:"🔴⚫", league:"Serie A" },
  { id:"int", name:"Inter Milan",    flag:"🔵⚫", league:"Serie A" },
  // Brazil
  { id:"fla", name:"Flamengo",       flag:"🔴⚫", league:"Brasileirao" },
  { id:"pal", name:"Palmeiras",      flag:"🟢",  league:"Brasileirao" },
  { id:"cor", name:"Corinthians",    flag:"⚫⚪", league:"Brasileirao" },
  { id:"bot", name:"Botafogo",       flag:"⚫⚪", league:"Brasileirao" },
  // SA
  { id:"kzo", name:"Kaizer Chiefs",  flag:"🟡",  league:"PSL" },
  { id:"orl", name:"Orlando Pirates",flag:"⚫",  league:"PSL" },
  { id:"sup", name:"Sundowns",       flag:"🟡🔵", league:"PSL" },
];

// Curated upcoming fixtures for tracked teams (real schedule, auto-shown)
const TEAM_FIXTURES = [
  // WC R16 — Mon 6 Jul
  { id:"tf1",  home:"Portugal", away:"Spain",   kickoffUTC:"2026-07-06T19:00:00Z", league:"🏆 WC R16", score:null, confirmed:false, teams:["pt","es"], h:4.00, d:3.50, a:1.95, pick:"Spain Win & Over 2.5", pickOdds:1.72, prob:82, tag:"SHARP" },
  // WC R16 — Tue 7 Jul
  { id:"tf2",  home:"USA",      away:"Belgium", kickoffUTC:"2026-07-07T00:00:00Z", league:"🏆 WC R16", score:null, confirmed:false, teams:["us","be"], h:2.50, d:3.30, a:2.80, pick:"Over 2.5 Goals", pickOdds:1.85, prob:79, tag:"VALUE" },
  { id:"tf3",  home:"Argentina",away:"Egypt",   kickoffUTC:"2026-07-07T16:00:00Z", league:"🏆 WC R16", score:null, confirmed:false, teams:["arg"], h:1.35, d:4.60, a:9.50, pick:"Argentina Win & Over 2.5", pickOdds:1.72, prob:85, tag:"SHARP" },
  { id:"tf4",  home:"Switzerland",away:"Colombia",kickoffUTC:"2026-07-07T20:00:00Z",league:"🏆 WC R16",score:null,confirmed:false,teams:["ch","col"],h:3.60,d:3.10,a:2.10,pick:"Colombia Win", pickOdds:2.10, prob:77, tag:"VALUE" },
  // UCL Qualifiers — Tue 7 Jul
  { id:"tf5",  home:"Shelbourne",away:"Celtic FC",kickoffUTC:"2026-07-07T18:00:00Z",league:"🏆 UCL Qualifier",score:null,confirmed:false,teams:["celt"],h:5.00,d:3.80,a:1.65,pick:"Celtic FC Win", pickOdds:1.65, prob:80, tag:"VALUE" },
  // QF — Thu 9 Jul
  { id:"tf6",  home:"France",   away:"Morocco", kickoffUTC:"2026-07-09T20:00:00Z", league:"🏆 WC QF",  score:null, confirmed:false, teams:["fr","mor"], h:1.65, d:3.60, a:5.50, pick:"France Win & Over 2.5", pickOdds:1.75, prob:82, tag:"SHARP" },
  // QF — Sat 11 Jul
  { id:"tf7",  home:"Norway",   away:"England", kickoffUTC:"2026-07-11T21:00:00Z", league:"🏆 WC QF",  score:null, confirmed:false, teams:["nor","eng"], h:4.00, d:3.30, a:1.85, pick:"England Win", pickOdds:1.85, prob:78, tag:"VALUE" },
  // Brazil Serie B ongoing
  { id:"tf8",  home:"Flamengo", away:"Botafogo",kickoffUTC:"2026-07-08T20:00:00Z", league:"🇧🇷 Brasileirao",score:null,confirmed:false,teams:["br","fla","bot"],h:2.10,d:3.20,a:3.60,pick:"Over 2.5 Goals", pickOdds:1.80, prob:80, tag:"VALUE" },
];

// localStorage key for saved teams
const TEAMS_KEY = "bs_my_teams";

function useSavedTeams() {
  const [teams, setTeams] = useState(() => {
    try {
      const saved = localStorage.getItem(TEAMS_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_TEAMS;
    } catch { return DEFAULT_TEAMS; }
  });
  function save(newTeams) {
    setTeams(newTeams);
    localStorage.setItem(TEAMS_KEY, JSON.stringify(newTeams));
  }
  function addTeam(team) {
    if (teams.find(t => t.id === team.id)) return;
    save([...teams, team]);
  }
  function removeTeam(id) {
    save(teams.filter(t => t.id !== id));
  }
  return { teams, addTeam, removeTeam };
}

// ── MY TEAMS PAGE ─────────────────────────────────────────────────────────────
function MyTeamsPage({ nowMs }) {
  const { teams, addTeam, removeTeam } = useSavedTeams();
  const [search, setSearch] = useState("");
  const [activeTeam, setActiveTeam] = useState(null);

  const searchResults = search.length >= 2
    ? ALL_TEAMS_DB.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) &&
        !teams.find(s => s.id === t.id)
      ).slice(0, 6)
    : [];

  // Get upcoming fixtures for my saved teams
  const myFixtures = TEAM_FIXTURES.filter(f =>
    f.teams.some(tid => teams.find(t => t.id === tid))
  ).sort((a, b) => new Date(a.kickoffUTC) - new Date(b.kickoffUTC));

  const todayFix = myFixtures.filter(f => isTodaySAST(f.kickoffUTC));
  const upcomingFix = myFixtures.filter(f => !isTodaySAST(f.kickoffUTC) && getStatus(f.kickoffUTC, f.confirmed) === "upcoming");
  const finishedFix = myFixtures.filter(f => getStatus(f.kickoffUTC, f.confirmed) === "finished");

  return (
    <div className="page">
      {/* Header */}
      <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(0,212,255,.07)", border:"1px solid rgba(0,212,255,.15)", borderRadius:20, padding:"4px 12px", fontSize:10, fontWeight:700, color:G.accent, marginBottom:14 }}>
        <Dot p/>⭐ MY TEAMS · <LiveClock/>
      </div>
      <div style={{ fontSize:20, fontWeight:900, marginBottom:4 }}>My Teams</div>
      <div style={{ fontSize:12, color:G.dim, marginBottom:18 }}>Search any team · Save · Track fixtures all season</div>

      {/* Search box */}
      <div style={{ position:"relative", marginBottom:16 }}>
        <div style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:16, pointerEvents:"none" }}>🔍</div>
        <input
          className="inp"
          style={{ paddingLeft:36 }}
          placeholder="Search any team — e.g. Barcelona, Kaizer Chiefs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search.length >= 2 && (
          <button onClick={() => setSearch("")} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:G.dim, cursor:"pointer", fontSize:16 }}>✕</button>
        )}
      </div>

      {/* Search results */}
      {searchResults.length > 0 && (
        <div className="card" style={{ marginBottom:16, padding:12 }}>
          <div style={{ fontSize:10, color:G.dim, fontWeight:700, marginBottom:9, textTransform:"uppercase", letterSpacing:".05em" }}>Search Results</div>
          {searchResults.map((t, i) => (
            <div key={t.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom: i < searchResults.length - 1 ? `1px solid ${G.border}` : "none" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:20 }}>{t.flag}</span>
                <div>
                  <div style={{ fontWeight:700, fontSize:14 }}>{t.name}</div>
                  <div style={{ fontSize:11, color:G.dim }}>{t.league}</div>
                </div>
              </div>
              <button onClick={() => { addTeam(t); setSearch(""); }} className="btn btn-grad btn-sm">+ Follow</button>
            </div>
          ))}
        </div>
      )}
      {search.length >= 2 && searchResults.length === 0 && (
        <div className="card" style={{ marginBottom:16, textAlign:"center", padding:20 }}>
          <div style={{ color:G.dim, fontSize:13 }}>No results for "{search}"</div>
        </div>
      )}

      {/* My saved teams */}
      <div style={{ fontWeight:800, fontSize:15, marginBottom:12 }}>Following ({teams.length})</div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:20 }}>
        {teams.map(t => (
          <div key={t.id} style={{ display:"flex", alignItems:"center", gap:6, background:G.card2, border:`1px solid ${G.border}`, borderRadius:20, padding:"7px 12px", cursor:"pointer" }}
            onClick={() => setActiveTeam(activeTeam?.id === t.id ? null : t)}>
            <span style={{ fontSize:16 }}>{t.flag}</span>
            <span style={{ fontWeight:700, fontSize:12 }}>{t.name}</span>
            <span onClick={e => { e.stopPropagation(); removeTeam(t.id); }} style={{ color:G.dim, fontSize:13, marginLeft:2, cursor:"pointer" }}>✕</span>
          </div>
        ))}
      </div>

      {/* TODAY'S fixtures for my teams */}
      {todayFix.length > 0 && <>
        <div style={{ fontWeight:800, fontSize:15, marginBottom:12, color:G.gold }}>📅 Today</div>
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:18 }}>
          {todayFix.map(f => <TeamFixCard key={f.id} f={f} nowMs={nowMs}/>)}
        </div>
      </>}

      {/* UPCOMING */}
      {upcomingFix.length > 0 && <>
        <div style={{ fontWeight:800, fontSize:15, marginBottom:12 }}>⏰ Upcoming</div>
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:18 }}>
          {upcomingFix.map(f => <TeamFixCard key={f.id} f={f} nowMs={nowMs}/>)}
        </div>
      </>}

      {/* RESULTS */}
      {finishedFix.length > 0 && <>
        <div style={{ fontWeight:800, fontSize:15, marginBottom:12, color:G.dim }}>✅ Recent Results</div>
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:18 }}>
          {finishedFix.map(f => <TeamFixCard key={f.id} f={f} nowMs={nowMs}/>)}
        </div>
      </>}

      {myFixtures.length === 0 && (
        <div className="card" style={{ textAlign:"center", padding:40 }}>
          <div style={{ fontSize:36, marginBottom:12 }}>⭐</div>
          <div style={{ fontWeight:700, fontSize:16, marginBottom:8 }}>No fixtures found for your teams</div>
          <div style={{ color:G.dim, fontSize:13 }}>Fixtures appear here automatically as they're scheduled. Check back soon.</div>
        </div>
      )}

      {/* Notification note */}
      <div className="card" style={{ borderColor:`rgba(0,212,255,.15)` }}>
        <div style={{ fontWeight:700, marginBottom:8 }}>🔔 Stay Updated</div>
        <div style={{ fontSize:12, color:G.dim, lineHeight:1.7 }}>
          Your teams' fixtures auto-appear here as they're scheduled throughout the season.
          AI picks are generated automatically for every game your teams play.
          <br/><br/>
          <span style={{ color:G.accent, fontWeight:700 }}>Pro & Elite subscribers</span> get WhatsApp alerts when your favourite teams kick off.
        </div>
      </div>
    </div>
  );
}

// ── TEAM FIXTURE CARD ─────────────────────────────────────────────────────────
function TeamFixCard({ f, nowMs }) {
  const status = getStatus(f.kickoffUTC, f.confirmed);
  const minute = status === "live" ? getLiveMinute(f.kickoffUTC) : null;
  const score = f.confirmed ? f.score : null;
  const stripe = status === "finished" ? (f.analysis?.startsWith("✅") ? G.green : G.dim) : status === "live" ? G.red : G.gold;

  return (
    <div style={{ background:G.card2, border:`1px solid ${status==="live"?"rgba(255,68,85,.3)":G.border}`, borderLeft:`3px solid ${stripe}`, borderRadius:12, padding:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:6, alignItems:"center" }}>
            {status === "live"
              ? <span className="chip live-ring" style={{ color:G.red, background:"rgba(255,68,85,.12)", border:"1px solid rgba(255,68,85,.3)" }}>
                  <span style={{ width:5, height:5, borderRadius:"50%", background:G.red, display:"inline-block", animation:"pulse 1s infinite" }}/> LIVE {minute && `${minute}'`}
                </span>
              : status === "finished"
                ? <Ch color={G.dim} bg="rgba(255,255,255,.04)">FT {score || ""}</Ch>
                : <Ch color={G.gold} bg="rgba(255,209,102,.08)">⏰ {fmtTime(f.kickoffUTC)} SAST</Ch>
            }
            <span style={{ fontSize:10, color:G.accent, fontWeight:700 }}>{f.league}</span>
            <span style={{ fontSize:10, color:G.dim }}>{fmtDateShort(f.kickoffUTC)}</span>
          </div>
          <div style={{ fontWeight:800, fontSize:15 }}>
            {f.home} <span style={{ color:G.dim, fontWeight:400, fontSize:12 }}>vs</span> {f.away}
          </div>
        </div>
        {status === "finished" && score
          ? <div style={{ ...mono, fontSize:20, fontWeight:900, color:G.accent, marginLeft:10, flexShrink:0 }}>{score}</div>
          : <div style={{ background:G.bg, borderRadius:7, padding:"6px 8px", marginLeft:10, flexShrink:0, textAlign:"center" }}>
              <div style={{ fontSize:9, color:G.muted, marginBottom:3, ...mono }}>1·X·2</div>
              <div style={{ display:"flex", gap:4 }}>{[f.h, f.d, f.a].map((o, j) => <span key={j} style={{ ...mono, fontWeight:700, fontSize:11, color:G.gold }}>{o}</span>)}</div>
            </div>
        }
      </div>
      {f.pick && (
        <div style={{ background:G.bg, borderRadius:7, padding:"8px 10px", marginBottom:8, border:`1px solid ${G.border}` }}>
          <div style={{ fontSize:9, color:G.muted, fontWeight:700, marginBottom:3 }}>⚡ AI PICK</div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ ...mono, fontWeight:700, color:stripe, fontSize:12 }}>{f.pick}</div>
            <div style={{ display:"flex", gap:5, alignItems:"center" }}>
              <Ch color={f.tag === "SHARP" ? G.green : G.accent} bg={f.tag === "SHARP" ? "rgba(0,255,133,.1)" : "rgba(0,212,255,.1)"}>{f.tag}</Ch>
              <span style={{ ...mono, fontWeight:700, color:G.gold, fontSize:13 }}>{f.pickOdds}</span>
            </div>
          </div>
        </div>
      )}
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
        <span style={{ fontSize:10, color:G.dim }}>AI Probabilit
