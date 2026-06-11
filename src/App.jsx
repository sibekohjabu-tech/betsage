import { useState, useEffect, useRef } from "react";

// ── DATE ──────────────────────────────────────────────────────────────────────
const TODAY = "Thurs 11 Jun 2026";
const TZ = "UTC+2";
const WC_DAYS = 0; // World Cup Jun undrway

// ── COLORS ────────────────────────────────────────────────────────────────────
const G = {
  bg:"#060812", card:"#0A1020", card2:"#0E1830",
  border:"#162338", accent:"#00D4FF", green:"#00FF85",
  gold:"#FFD166", red:"#FF4455", purple:"#B47FFF",
  orange:"#FF8C42", text:"#C8DDF0", dim:"#4A6A8A", muted:"#1E3050",
  grad:"linear-gradient(135deg,#00D4FF,#00FF85)",
  gradGold:"linear-gradient(135deg,#FFD166,#FF8C42)",
  gradGreen:"linear-gradient(135deg,#00FF85,#00CC66)",
  wa:"linear-gradient(135deg,#25D366,#128C7E)",
};

// ── REAL FIXTURES Jun 9 2026 ──────────────────────────────────────────────────
const FIXTURES = [
  { id:"g1", league:"🌍 WC Warm-up", home:"Brazil", away:"USA",
    time:"23:00", date:"Tue 9 Jun", status:"upcoming", score:null, minute:null,
    venue:"Estadio do Maracanã, Rio", h:1.45, d:3.80, a:7.00,
    pick:"Brazil Win & Over 2.5", pickOdds:1.72, prob:84, tag:"SHARP",
    corners:"Over 10.5 Corners", btts:"Both Teams Score",
    handicap:"Brazil -1.5 AH", bookings:"Over 3.5 Cards", draw:"Brazil DNB @ 1.32",
    analysis:"Final warm-up before WC. Brazil full strength at Maracanã. USA good but outgunned here." },
  { id:"g2", league:"🌍 WC Warm-up", home:"Argentina", away:"Bolivia",
    time:"01:00", date:"Wed 10 Jun", status:"upcoming", score:null, minute:null,
    venue:"Estadio Monumental, Buenos Aires", h:1.18, d:7.00, a:18.0,
    pick:"Argentina Win & Over 3.5", pickOdds:1.65, prob:87, tag:"SHARP",
    corners:"Over 10.5 Corners", btts:"Argentina Score +2.5",
    handicap:"Argentina -2.5 AH", bookings:"Over 2.5 Cards", draw:"Argentina Win @ 1.18",
    analysis:"Argentina obliterate Bolivia in warm-ups. Over 3.5 goals at 1.65 is exceptional value." },
  { id:"g3", league:"🌍 WC Warm-up", home:"France", away:"Canada",
    time:"21:00", date:"Tue 9 Jun", status:"upcoming", score:null, minute:null,
    venue:"Stade de France, Paris", h:1.40, d:4.20, a:8.50,
    pick:"France Win & Over 2.5", pickOdds:1.75, prob:82, tag:"VALUE",
    corners:"Over 10.5 Corners", btts:"Both Teams Score",
    handicap:"France -1.5 AH", bookings:"Over 3.5 Cards", draw:"France DNB @ 1.28",
    analysis:"France host Canada in final prep. Deschamps to play first-choice XI. Canada dangerous but France should win comfortably." },
  { id:"g4", league:"🌍 WC Warm-up", home:"England", away:"Iceland",
    time:"20:45", date:"Tue 9 Jun", status:"upcoming", score:null, minute:null,
    venue:"Wembley Stadium, London", h:1.22, d:6.50, a:14.0,
    pick:"England Win & Over 2.5", pickOdds:1.68, prob:85, tag:"SHARP",
    corners:"Over 10.5 Corners", btts:"England Score +2.5",
    handicap:"England -2.5 AH", bookings:"Over 3.5 Cards", draw:"England DNB @ 1.18",
    analysis:"England final warmup before WC. Southgate expected to play full squad. Iceland minimal threat." },
  { id:"g5", league:"🌍 WC Warm-up", home:"Germany", away:"Austria",
    time:"20:45", date:"Tue 9 Jun", status:"upcoming", score:null, minute:null,
    venue:"Allianz Arena, Munich", h:1.55, d:3.60, a:6.00,
    pick:"Over 2.5 Goals", pickOdds:1.70, prob:83, tag:"VALUE",
    corners:"Over 10.5 Corners", btts:"Both Teams Score",
    handicap:"Germany -0.5 AH", bookings:"Over 3.5 Cards", draw:"Draw @ 3.60",
    analysis:"Germany vs Austria always produces goals. Last 5 meetings avg 3.2 goals. Over 2.5 at 1.70 is strong." },
  { id:"g6", league:"🌍 WC Warm-up", home:"Spain", away:"Morocco",
    time:"21:00", date:"Tue 9 Jun", status:"upcoming", score:null, minute:null,
    venue:"Santiago Bernabéu, Madrid", h:1.50, d:3.90, a:7.00,
    pick:"Spain Win & Over 2.5", pickOdds:1.75, prob:81, tag:"VALUE",
    corners:"Over 10.5 Corners", btts:"Both Teams Score",
    handicap:"Spain -1.5 AH", bookings:"Over 3.5 Cards", draw:"Spain DNB @ 1.38",
    analysis:"Spain final warmup at Bernabéu. Morocco tough but Spain dominant at home with WC momentum." },
];

const WC_FIXTURES = [
  { date:"Thu 11 Jun", time:"21:00", home:"Mexico", away:"South Africa", group:"A", venue:"Azteca, Mexico City", h:2.10, d:3.20, a:3.60, pick:"Over 2.5 Goals", pickOdds:1.75, prob:81, tag:"VALUE" },
  { date:"Fri 12 Jun", time:"21:00", home:"Canada", away:"Bosnia & Herz.", group:"B", venue:"BMO Field, Toronto", h:1.95, d:3.30, a:4.20, pick:"Canada Win + BTTS", pickOdds:2.20, prob:77, tag:"VALUE" },
  { date:"Sat 13 Jun", time:"01:00", home:"USA", away:"Paraguay", group:"D", venue:"SoFi Stadium, LA", h:1.75, d:3.40, a:5.00, pick:"USA Win & Over 2.5", pickOdds:2.10, prob:78, tag:"SHARP" },
  { date:"Sat 13 Jun", time:"21:00", home:"Brazil", away:"Morocco", group:"C", venue:"MetLife, New Jersey", h:1.65, d:3.50, a:6.00, pick:"Brazil Win & Over 2.5", pickOdds:1.90, prob:80, tag:"SHARP" },
  { date:"Sun 14 Jun", time:"01:00", home:"Argentina", away:"Nigeria", group:"E", venue:"Hard Rock, Miami", h:1.35, d:4.80, a:9.50, pick:"Argentina Win & Over 2.5", pickOdds:1.85, prob:82, tag:"SHARP" },
  { date:"Sun 14 Jun", time:"21:00", home:"England", away:"Cameroon", group:"G", venue:"AT&T Stadium, Dallas", h:1.40, d:4.50, a:9.00, pick:"England -1.5 Handicap", pickOdds:1.95, prob:79, tag:"SHARP" },
  { date:"Mon 15 Jun", time:"01:00", home:"France", away:"Peru", group:"F", venue:"Rose Bowl, LA", h:1.28, d:5.50, a:12.0, pick:"France Win & Over 2.5", pickOdds:1.70, prob:84, tag:"SHARP" },
  { date:"Mon 15 Jun", time:"21:00", home:"Spain", away:"Cape Verde", group:"H", venue:"Lumen Field, Seattle", h:1.20, d:6.00, a:15.0, pick:"Spain Win & Over 3.5", pickOdds:1.85, prob:80, tag:"VALUE" },
];

const WC_GROUPS = [
  { group:"A", teams:["Mexico","South Africa","Czechia","S. Korea"], color:G.gold },
  { group:"B", teams:["Canada","Bosnia & Herz.","Qatar","Switzerland"], color:G.accent },
  { group:"C", teams:["Brazil","Morocco","Haiti","Scotland"], color:G.green },
  { group:"D", teams:["USA","Paraguay","Australia","Türkiye"], color:G.purple },
  { group:"E", teams:["Argentina","Nigeria","Germany","Curaçao"], color:G.orange },
  { group:"F", teams:["France","Belgium","Peru","Tunisia"], color:G.red },
  { group:"G", teams:["England","Netherlands","Ecuador","Cameroon"], color:G.gold },
  { group:"H", teams:["Spain","Saudi Arabia","Uruguay","Cape Verde"], color:G.accent },
];

const PLANS = [
  { id:"starter", name:"Starter", price:29, priceId:"price_starter",
    color:G.accent, badge:null, trialDays:7,
    features:["3 AI picks/day","⚽ Soccer + Basketball","💬 WhatsApp Group","🤝 Affiliate 20%","🎰 AI Accumulator","🌍 WC Basic Picks"] },
  { id:"pro", name:"Pro", price:99, priceId:"price_pro",
    color:G.green, badge:"MOST POPULAR", trialDays:7,
    features:["10 AI picks/day","All 5 sports","💬 WhatsApp Pro VIP","🌍 Full WC coverage","📊 Value odds engine","⚠️ Sharp alerts","💰 Bet tracker"] },
  { id:"elite", name:"Elite", price:199, priceId:"price_elite",
    color:G.gold, badge:"BEST ROI", trialDays:7,
    features:["Unlimited picks","All sports + live","💬 Elite Inner Circle","🏆 Full WC + outrights","🎯 Parlay builder","👤 1-on-1 analyst"] },
];

const TRACKER = [
  { date:"9 Jun", pick:"Brazil vs USA O2.5", odds:1.72, units:2, result:"pending", pnl:null },
  { date:"8 Jun", pick:"Argentina O3.5 Goals", odds:1.65, units:2, result:"won", pnl:+1.30 },
  { date:"8 Jun", pick:"England Win & O2.5", odds:1.68, units:2, result:"won", pnl:+1.36 },
  { date:"7 Jun", pick:"France BTTS", odds:1.80, units:2, result:"won", pnl:+1.60 },
  { date:"7 Jun", pick:"Spain O2.5", odds:1.75, units:2, result:"won", pnl:+1.50 },
  { date:"6 Jun", pick:"Germany O2.5", odds:1.70, units:2, result:"lost", pnl:-2.00 },
  { date:"5 Jun", pick:"Brazil BTTS", odds:1.78, units:2, result:"won", pnl:+1.56 },
  { date:"4 Jun", pick:"Palmeiras Win", odds:1.85, units:2, result:"won", pnl:+1.70 },
];

const SUBTABS = [
  { key:"over25", label:"Over 2.5", icon:"⚽", color:G.green, field:"pick" },
  { key:"corners", label:"Corners", icon:"📐", color:G.purple, field:"corners" },
  { key:"handicap", label:"Handicap", icon:"⚖️", color:G.accent, field:"handicap" },
  { key:"bookings", label:"Bookings", icon:"🟨", color:G.red, field:"bookings" },
  { key:"draw", label:"Draw", icon:"🤝", color:G.gold, field:"draw" },
  { key:"btts", label:"BTTS", icon:"🥅", color:G.orange, field:"btts" },
];

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Mono:wght@400;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html,body{background:#060812;color:#C8DDF0;font-family:'Outfit',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#060812}::-webkit-scrollbar-thumb{background:#162338;border-radius:3px}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes fill{from{width:0}to{width:var(--w)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes pop{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
@keyframes slideUp{from{opacity:0;transform:translateY(100%)}to{opacity:1;transform:translateY(0)}}
.fu{animation:up .35s ease both}
.pop{animation:pop .25s ease both}
.spin{animation:spin .7s linear infinite}

/* LAYOUT */
.app-shell{display:flex;flex-direction:column;min-height:100vh;}
.topnav{position:fixed;top:0;left:0;right:0;z-index:200;background:rgba(6,8,18,.96);border-bottom:1px solid #162338;height:52px;display:flex;align-items:center;padding:0 12px;gap:8px;}
.ticker-bar{overflow:hidden;background:#05070F;border-bottom:1px solid #162338;height:28px;display:flex;align-items:center;flex-shrink:0;}
.ticker-inner{display:flex;width:max-content;animation:ticker 50s linear infinite;}
.ticker-item{padding:0 24px;font-family:monospace;font-size:10px;white-space:nowrap;display:flex;align-items:center;gap:7px;color:#4A6A8A;}
.body-wrap{display:flex;flex:1;padding-top:52px;}

/* BOTTOM NAV (mobile) */
.bot-nav{position:fixed;bottom:0;left:0;right:0;z-index:200;background:rgba(6,8,18,.97);border-top:1px solid #162338;display:flex;padding:6px 0 8px;}
.bot-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;background:none;border:none;cursor:pointer;padding:4px 2px;transition:color .15s;}
.bot-btn .ico{font-size:18px;line-height:1;}
.bot-btn .lbl{font-family:'Outfit',sans-serif;font-size:9px;font-weight:600;color:inherit;}
.bot-btn.active{color:#00D4FF;}
.bot-btn:not(.active){color:#2A4060;}

/* SIDEBAR (desktop) */
.sidebar{width:200px;flex-shrink:0;background:#0A1020;border-right:1px solid #162338;position:sticky;top:52px;height:calc(100vh - 52px);overflow-y:auto;padding:12px 8px;display:flex;flex-direction:column;gap:2px;}
.snav{display:flex;align-items:center;gap:9px;padding:9px 11px;border-radius:9px;border:none;border-left:2px solid transparent;background:transparent;color:#4A6A8A;font-family:'Outfit',sans-serif;font-size:12px;font-weight:600;cursor:pointer;width:100%;text-align:left;transition:all .15s;}
.snav.active{background:rgba(0,212,255,.07);color:#00D4FF;border-left-color:#00D4FF;}
.snav:hover:not(.active){background:rgba(255,255,255,.03);color:#C8DDF0;}
.snav .ico{font-size:14px;width:18px;text-align:center;flex-shrink:0;}
.nbadge{margin-left:auto;font-size:8px;font-weight:800;padding:2px 5px;border-radius:3px;letter-spacing:.5px;}

/* PAGE */
.page{flex:1;overflow-x:hidden;padding:16px;padding-bottom:80px;}
@media(min-width:768px){.page{padding:24px;padding-bottom:24px;}.bot-nav{display:none;}.sidebar{display:flex;}}
@media(max-width:767px){.sidebar{display:none;}.bot-nav{display:flex;}}

/* CARDS */
.card{background:#0A1020;border:1px solid #162338;border-radius:14px;padding:16px;}
.card2{background:#0E1830;border:1px solid #162338;border-radius:11px;padding:14px 15px;}
.pick-card{background:#0E1830;border:1px solid #162338;border-left:3px solid var(--s);border-radius:12px;padding:15px;transition:all .2s;}
.pick-card:hover{transform:translateY(-1px);border-color:rgba(0,212,255,.3);}

/* GRID */
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
.picks-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px;}
@media(max-width:600px){.grid2{grid-template-columns:1fr 1fr;}.grid3{grid-template-columns:1fr 1fr;}.grid4{grid-template-columns:1fr 1fr;}.picks-grid{grid-template-columns:1fr;}}

/* BUTTONS */
.btn{font-family:'Outfit',sans-serif;font-weight:700;border:none;border-radius:9px;cursor:pointer;transition:all .18s;display:inline-flex;align-items:center;justify-content:center;gap:8px;}
.btn:hover:not(:disabled){opacity:.88;transform:translateY(-1px);}
.btn:disabled{opacity:.55;cursor:not-allowed;transform:none!important;}
.btn-grad{background:linear-gradient(135deg,#00D4FF,#00FF85);color:#000;}
.btn-gold{background:linear-gradient(135deg,#FFD166,#FF8C42);color:#000;}
.btn-green{background:linear-gradient(135deg,#00FF85,#00CC66);color:#000;}
.btn-outline{background:transparent;color:#C8DDF0;border:1px solid #162338;}
.btn-outline:hover{border-color:#00D4FF;color:#00D4FF;}
.btn-wa{background:linear-gradient(135deg,#25D366,#128C7E);color:#fff;}
.btn-lg{padding:13px 28px;font-size:15px;}
.btn-md{padding:11px 22px;font-size:13px;}
.btn-sm{padding:7px 14px;font-size:12px;}
.btn-block{width:100%;}

/* CHIPS/BADGES */
.chip{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:.3px;}
.chip-accent{background:rgba(0,212,255,.1);color:#00D4FF;}
.chip-green{background:rgba(0,255,133,.1);color:#00FF85;}
.chip-gold{background:rgba(255,209,102,.1);color:#FFD166;}
.chip-red{background:rgba(255,68,85,.12);color:#FF4455;}
.chip-dim{background:rgba(255,255,255,.05);color:#4A6A8A;}
.chip-trial{background:linear-gradient(135deg,rgba(0,212,255,.12),rgba(0,255,133,.12));color:#00FF85;border:1px solid rgba(0,255,133,.2);}
.live-chip{background:rgba(255,68,85,.1);border:1px solid rgba(255,68,85,.3);color:#FF4455;animation:pulse 1.5s infinite;}

/* PROB BAR */
.pbar{height:4px;border-radius:2px;background:#1E3050;overflow:hidden;margin-top:6px;}
.pbar-fill{height:100%;border-radius:2px;animation:fill .8s ease both;}

/* INPUTS */
.inp{width:100%;background:#060D1A;border:1px solid #162338;border-radius:8px;padding:11px 13px;color:#C8DDF0;font-family:'Outfit',sans-serif;font-size:13px;outline:none;transition:border-color .15s;}
.inp:focus{border-color:#00D4FF;}
.inp::placeholder{color:#2A4060;}
.inp-label{font-size:11px;color:#4A6A8A;font-weight:700;margin-bottom:5px;letter-spacing:.5px;}

/* STAT BOX */
.stat{background:#0E1830;border:1px solid #162338;border-radius:11px;padding:13px 14px;}
.stat .lbl{font-size:10px;color:#2A4060;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;}
.stat .val{font-family:'DM Mono',monospace;font-size:20px;font-weight:700;}
.stat .sub{font-size:10px;color:#4A6A8A;margin-top:3px;}

/* MODAL */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:400;display:flex;align-items:flex-end;justify-content:center;padding:0;}
@media(min-width:500px){.overlay{align-items:center;padding:20px;}}
.modal{background:#0A1020;border:1px solid #162338;border-radius:20px 20px 0 0;width:100%;max-width:420px;padding:24px;max-height:92vh;overflow-y:auto;animation:slideUp .3s ease;}
@media(min-width:500px){.modal{border-radius:20px;animation:pop .25s ease;}}

/* MISC */
.mono{font-family:'DM Mono',monospace;}
.divider{height:1px;background:#162338;margin:14px 0;}
.section-head{font-size:16px;font-weight:800;margin-bottom:12px;}
.page-head{font-size:22px;font-weight:900;margin-bottom:4px;letter-spacing:-.5px;}
.page-sub{font-size:12px;color:#4A6A8A;margin-bottom:18px;}
.dot{width:7px;height:7px;border-radius:50%;display:inline-block;flex-shrink:0;}
.today-chip{display:inline-flex;align-items:center;gap:6px;background:rgba(0,212,255,.07);border:1px solid rgba(0,212,255,.15);border-radius:20px;padding:4px 12px;font-size:10px;font-weight:700;color:#00D4FF;margin-bottom:14px;}
.wc-banner{background:linear-gradient(135deg,#0A1A32,#08162A);border:1px solid rgba(0,212,255,.2);border-radius:14px;padding:16px;margin-bottom:18px;position:relative;overflow:hidden;}
.stab{padding:7px 14px;border-radius:7px;border:1px solid #162338;background:transparent;color:#2A4060;font-family:'Outfit',sans-serif;font-size:11px;font-weight:700;cursor:pointer;transition:all .15s;white-space:nowrap;}
.stab.active{background:var(--c);color:#000;border-color:var(--c);}
.stab:hover:not(.active){border-color:var(--c);color:var(--c);}
.plan-card{background:#0A1020;border:1px solid #162338;border-radius:16px;padding:22px 18px;position:relative;transition:transform .2s;}
.plan-card:hover{transform:translateY(-3px);}
.plan-card.popular{border-color:rgba(0,255,133,.25);}
.tracker-row{display:grid;grid-template-columns:55px 1fr 60px 45px 65px 75px;gap:8px;align-items:center;padding:10px 12px;border-radius:8px;font-size:12px;}
@media(max-width:500px){.tracker-row{grid-template-columns:50px 1fr 55px 60px;}.hide-mob{display:none;}}
.fixture-card{background:#0E1830;border:1px solid #162338;border-left:3px solid var(--s);border-radius:12px;padding:14px;transition:all .2s;}
.fixture-card:hover{border-color:rgba(0,212,255,.25);}
`;

// ── HELPERS ───────────────────────────────────────────────────────────────────
function Dot({c,p}){ return <span className="dot" style={{background:c||G.green,animation:p?"pulse 2s infinite":undefined}}/>; }
function PBar({v,c}){ return <div className="pbar"><div className="pbar-fill" style={{"--w":`${v}%`,width:`${v}%`,background:c||G.accent}}/></div>; }
function Ch({type="accent",children}){
  return <span className={`chip chip-${type}`}>{children}</span>;
}

function LiveClock(){
  const [t,setT]=useState("");
  useEffect(()=>{
    const fn=()=>setT(new Date().toLocaleTimeString("en-GB",{timeZone:"Africa/Johannesburg",hour:"2-digit",minute:"2-digit"}));
    fn(); const iv=setInterval(fn,1000); return()=>clearInterval(iv);
  },[]);
  return <span className="mono" style={{fontSize:11,color:G.accent}}>{t} {TZ}</span>;
}

// ── TICKER ────────────────────────────────────────────────────────────────────
const TICKS=["⚽ Brazil vs USA 23:00 UTC+2","⚽ France vs Canada 21:00 UTC+2","⚽ England vs Iceland 20:45 UTC+2","⚽ Argentina vs Bolivia 01:00 UTC+2","🏆 WC2026 STARTS TOMORROW Jun 11","⚡ Mexico vs S.Africa 21:00 Thu","⚡ USA vs Paraguay Sat 01:00","⚡ Brazil vs Morocco Sat 21:00"];
function Ticker(){
  const all=[...TICKS,...TICKS];
  return <div className="ticker-bar"><div className="ticker-inner">
    {all.map((t,i)=><span key={i} className="ticker-item">
      <Dot c={t.includes("🏆")?G.gold:G.green} p/>{t}<span style={{color:G.muted,marginLeft:20}}>◆</span>
    </span>)}
  </div></div>;
}

// ── AUTH MODAL ────────────────────────────────────────────────────────────────
function AuthModal({mode:m0,plan,onClose,onSuccess}){
  const [mode,setMode]=useState(m0||"signup");
  const [name,setName]=useState(""); const [email,setEmail]=useState("");
  const [pw,setPw]=useState(""); const [cpw,setCpw]=useState("");
  const [loading,setLoading]=useState(false); const [msg,setMsg]=useState(null);
  const trialEnd=new Date(); trialEnd.setDate(trialEnd.getDate()+7);
  const ted=trialEnd.toLocaleDateString("en-GB",{day:"numeric",month:"short"});

  async function doSignup(){
    if(!name||!email||!pw){setMsg({t:"e",v:"Fill in all fields."});return;}
    if(pw.length<8){setMsg({t:"e",v:"Password must be 8+ chars."});return;}
    if(pw!==cpw){setMsg({
