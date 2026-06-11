import { useState, useEffect, useRef } from "react";

// ── DATE ──────────────────────────────────────────────────────────────────────
 import React, { useState } from 'react';

function DatePicker() {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
      <label>Select Date: </label>
      <input 
        type="date" 
        value={selectedDate} 
        onChange={handleDateChange} 
        style={{ marginLeft: '10px', padding: '5px' }}
      />
      <p>Selected Date: {selectedDate}</p>
    </div>
  );
}

export default DatePicker;
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
    if(pw!==cpw){setMsg({t:"e",v:"Passwords don't match."});return;}
    setLoading(true);setMsg(null);
    await new Promise(r=>setTimeout(r,1500));
    const u={id:"u_"+Date.now(),name,email,plan,trial:true,trialStart:new Date().toISOString()};
    localStorage.setItem("bs_user",JSON.stringify(u));
    setMsg({t:"s",v:"Account created!"});
    await new Promise(r=>setTimeout(r,700));
    onSuccess(u);
  }
  async function doSignin(){
    if(!email||!pw){setMsg({t:"e",v:"Enter email and password."});return;}
    setLoading(true);setMsg(null);
    await new Promise(r=>setTimeout(r,1200));
    const saved=localStorage.getItem("bs_user");
    if(saved){onSuccess(JSON.parse(saved));}
    else{setMsg({t:"e",v:"No account found. Sign up first."});}
    setLoading(false);
  }

  return <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div className="modal">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:28,height:28,background:G.grad,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#000",fontSize:14}}>⚡</div>
          <span style={{fontWeight:900,fontSize:16}}>BetSage<span style={{color:G.accent}}>AI</span></span>
        </div>
        <button onClick={onClose} style={{background:"none",border:"none",color:G.dim,cursor:"pointer",fontSize:20,lineHeight:1}}>✕</button>
      </div>

      {msg&&<div style={{padding:"9px 13px",background:msg.t==="s"?"rgba(0,255,133,.08)":"rgba(255,68,85,.1)",border:`1px solid ${msg.t==="s"?"rgba(0,255,133,.2)":"rgba(255,68,85,.2)"}`,borderRadius:8,fontSize:12,color:msg.t==="s"?G.green:G.red,marginBottom:12}}>{msg.v}</div>}

      {mode==="signup"&&<>
        {plan&&<div style={{background:"rgba(0,255,133,.05)",border:"1px solid rgba(0,255,133,.15)",borderRadius:10,padding:"10px 14px",marginBottom:16}}>
          <div style={{fontWeight:800,color:G.green,fontSize:13}}>🎁 7-Day Free Trial — {plan.name} ${plan.price}/mo</div>
          <div style={{fontSize:11,color:G.dim,marginTop:2}}>No charge until {ted} · Cancel anytime</div>
        </div>}
        <div style={{fontSize:19,fontWeight:900,marginBottom:14}}>Create Account</div>
        {[["Full Name","text",name,setName,"John Sharp"],["Email","email",email,setEmail,"you@email.com"],["Password","password",pw,setPw,"8+ characters"],["Confirm Password","password",cpw,setCpw,"Repeat password"]].map(([l,t,v,s,ph])=>(
          <div key={l} style={{marginBottom:11}}>
            <div className="inp-label">{l.toUpperCase()}</div>
            <input className="inp" type={t} placeholder={ph} value={v} onChange={e=>s(e.target.value)}/>
          </div>
        ))}
        <div style={{fontSize:11,color:G.dim,marginBottom:14}}>By signing up you agree to our Terms. 18+ only.</div>
        <button onClick={doSignup} disabled={loading} className="btn btn-green btn-lg btn-block">{loading?"Creating account...":"Start 7-Day Free Trial 🚀"}</button>
        <div style={{textAlign:"center",marginTop:10,fontSize:12,color:G.dim}}>No charge today · Cancel before {ted}</div>
        <div style={{textAlign:"center",marginTop:12,fontSize:12,color:G.dim}}>Already have an account? <span style={{color:G.accent,cursor:"pointer"}} onClick={()=>{setMode("signin");setMsg(null);}}>Sign in</span></div>
      </>}

      {mode==="signin"&&<>
        <div style={{fontSize:19,fontWeight:900,marginBottom:14}}>Welcome Back</div>
        {[["Email","email",email,setEmail,"you@email.com"],["Password","password",pw,setPw,"Password"]].map(([l,t,v,s,ph])=>(
          <div key={l} style={{marginBottom:11}}>
            <div className="inp-label">{l.toUpperCase()}</div>
            <input className="inp" type={t} placeholder={ph} value={v} onChange={e=>s(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSignin()}/>
          </div>
        ))}
        <button onClick={doSignin} disabled={loading} className="btn btn-grad btn-lg btn-block">{loading?"Signing in...":"Sign In →"}</button>
        <div style={{textAlign:"center",marginTop:12,fontSize:12,color:G.dim}}>No account? <span style={{color:G.accent,cursor:"pointer"}} onClick={()=>{setMode("signup");setMsg(null);}}>Start free trial</span></div>
      </>}
    </div>
  </div>;
}

// ── CHECKOUT MODAL ────────────────────────────────────────────────────────────
function CheckoutModal({plan,user,onClose,onSuccess}){
  const [card,setCard]=useState(""); const [exp,setExp]=useState(""); const [cvc,setCvc]=useState("");
  const [loading,setLoading]=useState(false); const [done,setDone]=useState(false); const [err,setErr]=useState("");
  const trialEnd=new Date(); trialEnd.setDate(trialEnd.getDate()+7);
  const ted=trialEnd.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
  function fc(v){return v.replace(/\D/g,"").replace(/(.{4})/g,"$1 ").trim().slice(0,19);}
  function fe(v){return v.replace(/\D/g,"").replace(/^(\d{2})(\d)/,"$1/$2").slice(0,5);}
  async function pay(){
    if(card.replace(/\s/g,"").length<16){setErr("Enter a valid 16-digit card number.");return;}
    if(exp.length<5){setErr("Enter expiry MM/YY.");return;}
    if(cvc.length<3){setErr("Enter your 3-digit CVC.");return;}
    setErr(""); setLoading(true);
    // ── In production replace with real Stripe.js call ──
    // const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PK);
    // const res = await fetch('/api/create-checkout', { method:'POST', body: JSON.stringify({priceId:plan.priceId, email:user.email, trialDays:7}) });
    // const { url } = await res.json();
    // window.location.href = url;
    await new Promise(r=>setTimeout(r,2200));
    setLoading(false); setDone(true);
    await new Promise(r=>setTimeout(r,1800));
    const u={...user,plan,trial:true,subscribed:true,trialEnd:ted};
    localStorage.setItem("bs_user",JSON.stringify(u));
    onSuccess(u);
  }

  return <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div className="modal">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div style={{fontWeight:900,fontSize:16}}>Complete Subscription</div>
        <button onClick={onClose} style={{background:"none",border:"none",color:G.dim,cursor:"pointer",fontSize:20}}>✕</button>
      </div>

      {done?<div style={{textAlign:"center",padding:"28px 0"}}>
        <div style={{fontSize:52,marginBottom:14}}>🎉</div>
        <div style={{fontSize:22,fontWeight:900,color:G.green,marginBottom:8}}>Trial Activated!</div>
        <div style={{color:G.dim,fontSize:13}}>Welcome to BetSageAI! No charge until {ted}.</div>
      </div>:<>
        <div style={{background:"rgba(0,255,133,.05)",border:"1px solid rgba(0,255,133,.15)",borderRadius:11,padding:"12px 15px",marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontWeight:800,color:G.green,fontSize:14}}>🎁 7-Day Free Trial</div>
              <div style={{fontSize:11,color:G.dim,marginTop:2}}>{plan.name} plan · No charge until {ted}</div>
            </div>
            <div className="mono" style={{fontSize:22,fontWeight:700,color:G.green}}>FREE</div>
          </div>
          <div className="divider" style={{margin:"10px 0"}}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,textAlign:"center"}}>
            {[["Today","FREE",G.green],["Day 7",ted.split(" ").slice(0,2).join(" "),G.gold],["Day 8+",`$${plan.price}/mo`,G.text]].map(([d,v,c])=>(
              <div key={d}><div className="mono" style={{fontWeight:700,fontSize:13,color:c}}>{v}</div><div style={{fontSize:10,color:G.dim,marginTop:2}}>{d}</div></div>
            ))}
          </div>
        </div>

        {/* Stripe card fields */}
        <div style={{background:"#060D1A",border:`1px solid ${G.border}`,borderRadius:11,padding:"14px 15px",marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <span style={{fontSize:14}}>💳</span>
            <span style={{fontWeight:700,fontSize:13}}>Card Details</span>
            <span style={{marginLeft:"auto",fontSize:11,color:G.dim}}>🔒 Stripe · SSL</span>
          </div>
          <div style={{marginBottom:10}}>
            <div className="inp-label">CARD NUMBER</div>
            <input className="inp" placeholder="1234 5678 9012 3456" value={card} onChange={e=>setCard(fc(e.target.value))} maxLength={19}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div>
              <div className="inp-label">EXPIRY</div>
              <input className="inp mono" placeholder="MM/YY" value={exp} onChange={e=>setExp(fe(e.target.value))} maxLength={5}/>
            </div>
            <div>
              <div className="inp-label">CVC</div>
              <input className="inp mono" placeholder="123" value={cvc} onChange={e=>setCvc(e.target.value.replace(/\D/g,"").slice(0,4))} maxLength={4}/>
            </div>
          </div>
        </div>

        {err&&<div style={{padding:"9px 12px",background:"rgba(255,68,85,.1)",border:"1px solid rgba(255,68,85,.2)",borderRadius:8,fontSize:12,color:G.red,marginBottom:12}}>⚠️ {err}</div>}

        <button onClick={pay} disabled={loading} className="btn btn-green btn-lg btn-block">
          {loading?<><span className="spin">⟳</span> Processing...</>:"Start Free Trial — No Charge Today 🚀"}
        </button>
        <div style={{textAlign:"center",marginTop:10,fontSize:11,color:G.dim}}>
          Renews ${plan.price}/mo after trial · Cancel anytime
        </div>

        {/* Stripe setup info */}
        <div style={{marginTop:16,background:"rgba(0,212,255,.04)",border:"1px solid rgba(0,212,255,.1)",borderRadius:9,padding:"11px 13px"}}>
          <div style={{fontSize:11,color:G.accent,fontWeight:700,marginBottom:6}}>🔧 STRIPE SETUP (for you, J)</div>
          <div style={{fontSize:11,color:G.dim,lineHeight:1.7}}>
            To process real payments:<br/>
            1. Add <span style={{color:G.text,fontFamily:"monospace"}}>STRIPE_SECRET_KEY</span> to Vercel env vars<br/>
            2. Create <span style={{color:G.text,fontFamily:"monospace"}}>/api/create-checkout.js</span> in your repo<br/>
            3. Replace the simulate code above with real Stripe call<br/>
            <span style={{color:G.gold}}>→ Paste the Edge Function code below into your /api folder</span>
          </div>
        </div>
      </>}
    </div>
  </div>;
}

// ── PICK CARD ─────────────────────────────────────────────────────────────────
function PickCard({f,field}){
  const val=f[field]||f.pick;
  const sub=SUBTABS.find(t=>t.field===field);
  const stripe=sub?.color||G.accent;
  return <div className="pick-card fu" style={{"--s":stripe}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:11}}>
      <div style={{flex:1}}>
        <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:6,alignItems:"center"}}>
          <span className={`chip chip-${f.tag==="SHARP"?"green":"accent"}`}>{f.tag}</span>
          <span style={{fontSize:10,color:G.dim}}>{f.league}</span>
          <span style={{fontSize:10,color:G.dim,background:G.muted,padding:"1px 6px",borderRadius:3,fontWeight:700}}>{f.time} {TZ}</span>
        </div>
        <div style={{fontWeight:800,fontSize:15,lineHeight:1.2}}>{f.home} <span style={{color:G.dim,fontWeight:400,fontSize:12}}>vs</span> {f.away}</div>
        <div style={{fontSize:10,color:G.dim,marginTop:2}}>📍 {f.venue}</div>
      </div>
      <div style={{textAlign:"right",marginLeft:12,flexShrink:0}}>
        <div className="mono" style={{fontSize:22,fontWeight:700,color:stripe}}>{f.pickOdds}</div>
        <div style={{fontSize:10,color:G.dim}}>2u stake</div>
      </div>
    </div>
    <div style={{background:G.bg,borderRadius:8,padding:"9px 11px",marginBottom:10,border:`1px solid ${G.border}`}}>
      <div style={{fontSize:9,color:G.muted,fontWeight:700,marginBottom:3}}>PICK</div>
      <div className="mono" style={{fontWeight:700,color:stripe,fontSize:13}}>{val}</div>
    </div>
    {f.analysis&&<div style={{fontSize:11,color:G.dim,lineHeight:1.6,marginBottom:10,paddingLeft:8,borderLeft:`2px solid ${stripe}40`}}>{f.analysis}</div>}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
      <span style={{fontSize:10,color:G.dim}}>AI Probability</span>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        <span style={{fontSize:10,fontFamily:"monospace",fontWeight:700,padding:"2px 7px",borderRadius:4,background:"rgba(0,255,133,.1)",color:G.green}}>EV+</span>
        <span className="mono" style={{fontWeight:700,color:f.prob>=80?G.green:G.accent}}>{f.prob}%</span>
      </div>
    </div>
    <PBar v={f.prob} c={stripe}/>
    {/* 1X2 odds */}
    <div style={{display:"flex",gap:6,marginTop:11}}>
      {[["1",f.h],["X",f.d],["2",f.a]].map(([l,o])=>(
        <div key={l} style={{flex:1,background:G.bg,border:`1px solid ${G.border}`,borderRadius:6,padding:"5px 0",textAlign:"center"}}>
          <div style={{fontSize:9,color:G.dim,fontWeight:700}}>{l}</div>
          <div className="mono" style={{fontWeight:700,fontSize:13,color:G.gold}}>{o}</div>
        </div>
      ))}
    </div>
  </div>;
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function DashPage({user,setPage,startTrial}){
  const won=TRACKER.filter(b=>b.result==="won").length;
  const pnl=TRACKER.reduce((a,b)=>a+(b.pnl||0),0);
  return <div className="page">
    {user?.trial&&<div style={{background:"rgba(0,255,133,.05)",border:"1px solid rgba(0,255,133,.18)",borderRadius:11,padding:"11px 14px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
      <div><div style={{fontWeight:800,color:G.green,fontSize:13}}>🎁 Free Trial Active!</div><div style={{fontSize:11,color:G.dim}}>Full {user.plan?.name} access · 7 days free</div></div>
      <Ch type="green">✓ TRIAL</Ch>
    </div>}

    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4,flexWrap:"wrap",gap:8}}>
      <div className="today-chip"><Dot p/>{TODAY} · {TZ}</div>
      <LiveClock/>
    </div>

    <div style={{marginBottom:16}}>
      <div className="page-head">Welcome{user?.name?`, ${user.name.split(" ")[0]}`:""} ⚡</div>
      <div className="page-sub">🏆 World Cup starts <strong style={{color:G.accent}}>TOMORROW Jun 11</strong> · {won}/{TRACKER.filter(b=>b.result!=="pending").length} picks won this week</div>
    </div>

    {/* WC countdown */}
    <div className="wc-banner">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:10,fontWeight:700,color:G.accent,letterSpacing:1,marginBottom:6}}>FIFA WORLD CUP 2026 · NORTH AMERICA</div>
          <div style={{fontSize:18,fontWeight:900,marginBottom:4}}>🏆 WC Kicks Off Tomorrow!</div>
          <div style={{fontSize:11,color:G.dim}}>Mexico vs South Africa · Thu 11 Jun 21:00 UTC+2</div>
        </div>
        <div style={{textAlign:"center",flexShrink:0,marginLeft:12}}>
          <div className="mono" style={{fontSize:44,fontWeight:900,color:G.accent,lineHeight:1}}>{WC_DAYS}</div>
          <div style={{fontSize:10,color:G.dim,fontWeight:700}}>DAYS</div>
        </div>
      </div>
    </div>

    {/* Stats */}
    <div className="grid4" style={{marginBottom:16}}>
      <div className="stat"><div className="lbl">P&L</div><div className="val" style={{color:G.green}}>+{pnl.toFixed(1)}u</div></div>
      <div className="stat"><div className="lbl">Win Rate</div><div className="val" style={{color:G.accent}}>{Math.round(won/TRACKER.filter(b=>b.result!=="pending").length*100)}%</div></div>
      <div className="stat"><div className="lbl">Today</div><div className="val" style={{color:G.gold}}>{FIXTURES.length}</div><div className="sub">fixtures</div></div>
      <div className="stat"><div className="lbl">WC In</div><div className="val" style={{color:G.purple}}>{WC_DAYS}d</div></div>
    </div>

    {/* Today's top picks */}
    <div className="section-head">⭐ Today's Top Picks</div>
    <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
      {FIXTURES.slice(0,4).map((f,i)=>(
        <div key={i} className="card2" style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}} onClick={()=>setPage("soccer")}>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,color:G.dim,marginBottom:3}}>{f.league} · {f.time} {TZ}</div>
            <div style={{fontWeight:700,fontSize:13,marginBottom:2}}>{f.pick}</div>
            <div style={{fontSize:11,color:G.dim,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{f.home} vs {f.away}</div>
          </div>
          <div style={{textAlign:"right",marginLeft:12,flexShrink:0}}>
            <div className="mono" style={{fontSize:18,fontWeight:700,color:G.gold}}>{f.pickOdds}</div>
            <div style={{fontSize:11,color:f.prob>=80?G.green:G.accent,fontWeight:700}}>{f.prob}%</div>
          </div>
        </div>
      ))}
    </div>

    {/* Recent P&L */}
    <div className="section-head">📈 Recent Bets</div>
    <div className="card" style={{padding:0,overflow:"hidden",marginBottom:16}}>
      {TRACKER.slice(0,5).map((b,i)=>(
        <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",borderBottom:i<4?`1px solid ${G.border}`:"none"}}>
          <div><div style={{fontSize:13,fontWeight:600}}>{b.pick}</div><div style={{fontSize:10,color:G.dim}}>{b.date}</div></div>
          <div style={{textAlign:"right"}}>
            <div className="mono" style={{fontWeight:700,color:b.pnl===null?G.dim:b.pnl>=0?G.green:G.red,fontSize:14}}>
              {b.pnl===null?"⏳":`${b.pnl>=0?"+":""}${b.pnl?.toFixed(2)}u`}
            </div>
            <div className="mono" style={{fontSize:10,color:G.dim}}>{b.odds}</div>
          </div>
        </div>
      ))}
    </div>

    {!user&&<div style={{background:"linear-gradient(135deg,#0A1A32,#08162A)",border:"1px solid rgba(0,212,255,.2)",borderRadius:14,padding:20,textAlign:"center"}}>
      <div style={{fontSize:18,fontWeight:900,marginBottom:8}}>🚀 Start Your Free Trial</div>
      <div style={{color:G.dim,fontSize:13,marginBottom:16}}>7 days free · No charge today · Cancel anytime</div>
      <button onClick={()=>startTrial(PLANS[1])} className="btn btn-green btn-lg btn-block">Start Free Trial →</button>
    </div>}
  </div>;
}

// ── SOCCER PAGE ───────────────────────────────────────────────────────────────
function SoccerPage(){
  const [sub,setSub]=useState("over25");
  const active=SUBTABS.find(t=>t.key===sub);
  return <div className="page">
    <div className="today-chip"><Dot p/>WC WARM-UP DAY · {TODAY} · {TZ}</div>
    <div className="page-head">⚽ Soccer Betting Hub</div>
    <div className="page-sub">Real fixtures · WC warm-ups · All times {TZ}</div>

    {/* Today's fixture list */}
    <div className="card" style={{marginBottom:16,padding:14}}>
      <div style={{fontSize:11,fontWeight:700,color:G.dim,marginBottom:10,letterSpacing:1}}>TODAY'S FIXTURES</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {FIXTURES.map((f,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 12px",background:G.bg,borderRadius:8,border:`1px solid ${G.border}`}}>
            <div><div style={{fontSize:10,color:G.dim,marginBottom:2}}>{f.league}</div><div style={{fontWeight:700,fontSize:13}}>{f.home} vs {f.away}</div></div>
            <div className="mono" style={{color:G.gold,fontWeight:700,flexShrink:0,marginLeft:8}}>{f.time}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Subtabs */}
    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12,overflowX:"auto",paddingBottom:4}}>
      {SUBTABS.map(t=>(
        <button key={t.key} className={`stab ${sub===t.key?"active":""}`} style={{"--c":t.color}} onClick={()=>setSub(t.key)}>
          {t.icon} {t.label}
        </button>
      ))}
    </div>

    {/* Summary */}
    <div style={{background:`${active.color}07`,border:`1px solid ${active.color}18`,borderRadius:9,padding:"9px 14px",marginBottom:14,display:"flex",gap:12,alignItems:"center"}}>
      <span style={{fontSize:18}}>{active.icon}</span>
      <div>
        <div style={{fontWeight:800,color:active.color,fontSize:13}}>{active.label} Picks</div>
        <div style={{fontSize:11,color:G.dim}}>{FIXTURES.length} fixtures · {TZ}</div>
      </div>
      {sub==="over25"&&<div style={{marginLeft:"auto",fontSize:10,color:G.green,fontWeight:700}}>✓ In every acca</div>}
    </div>

    <div className="picks-grid">
      {FIXTURES.map((f,i)=><PickCard key={f.id} f={f} field={active.field}/>)}
    </div>
  </div>;
}

// ── WORLD CUP PAGE ────────────────────────────────────────────────────────────
function WCPage({startTrial}){
  const [tab,setTab]=useState("fixtures");
  const [gf,setGf]=useState("ALL");
  const filtered=gf==="ALL"?WC_FIXTURES:WC_FIXTURES.filter(f=>f.group===gf);
  return <div className="page">
    <div className="wc-banner">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:10,fontWeight:700,color:G.accent,letterSpacing:1,marginBottom:8}}>FIFA WORLD CUP 2026 · NORTH AMERICA</div>
          <div style={{fontSize:20,fontWeight:900,marginBottom:4}}>🏆 World Cup 2026</div>
          <div style={{color:G.dim,fontSize:11}}>48 teams · 104 matches · Jun 11–Jul 19</div>
        </div>
        <div style={{textAlign:"center",flexShrink:0,marginLeft:12}}>
          <div className="mono" style={{fontSize:44,fontWeight:900,color:G.accent,lineHeight:1}}>{WC_DAYS}</div>
          <div style={{fontSize:9,color:G.dim,fontWeight:700}}>DAYS</div>
        </div>
      </div>
    </div>

    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
      {[["fixtures","⚽ Fixtures"],["groups","🗂️ Groups"],["outrights","🏆 Outrights"],["tips","💡 Tips"]].map(([k,l])=>(
        <button key={k} className={`stab ${tab===k?"active":""}`} style={{"--c":G.accent}} onClick={()=>setTab(k)}>{l}</button>
      ))}
    </div>

    {tab==="fixtures"&&<>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
        {["ALL","A","B","C","D","E","F","G","H"].map(g=>(
          <button key={g} className={`stab ${gf===g?"active":""}`} style={{"--c":G.gold,padding:"5px 10px",fontSize:10}} onClick={()=>setGf(g)}>{g==="ALL"?"All":g}</button>
        ))}
      </div>
      <div className="picks-grid">
        {filtered.map((f,i)=>{
          const gc=WC_GROUPS.find(g=>g.group===f.group)?.color||G.accent;
          return <div key={i} className="fixture-card fu" style={{"--s":gc,animationDelay:`${i*.05}s`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:11}}>
              <div>
                <div style={{display:"flex",gap:5,alignItems:"center",marginBottom:6}}>
                  <span style={{width:20,height:20,borderRadius:5,background:`${gc}18`,color:gc,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,fontFamily:"monospace"}}>{f.group}</span>
                  <span style={{fontSize:10,color:G.dim}}>{f.date} · {f.time} {TZ}</span>
                </div>
                <div style={{fontWeight:800,fontSize:15}}>{f.home} <span style={{color:G.dim,fontWeight:400,fontSize:12}}>vs</span> {f.away}</div>
                <div style={{fontSize:10,color:G.dim,marginTop:2}}>📍 {f.venue}</div>
              </div>
              <div style={{background:G.bg,borderRadius:7,padding:"6px 8px",marginLeft:10,flexShrink:0,textAlign:"center"}}>
                <div style={{fontSize:9,color:G.muted,marginBottom:3,fontFamily:"monospace"}}>1·X·2</div>
                <div style={{display:"flex",gap:5}}>{[f.h,f.d,f.a].map((o,j)=><span key={j} className="mono" style={{fontWeight:700,fontSize:12,color:G.gold}}>{o}</span>)}</div>
              </div>
            </div>
            <div style={{background:G.bg,borderRadius:7,padding:"8px 10px",marginBottom:9,border:`1px solid ${G.border}`}}>
              <div style={{fontSize:9,color:G.muted,fontWeight:700,marginBottom:3}}>⚡ AI PICK</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div className="mono" style={{fontWeight:700,color:G.accent,fontSize:12}}>{f.pick}</div>
                <div style={{display:"flex",gap:5,alignItems:"center"}}>
                  <Ch type={f.tag==="SHARP"?"green":"accent"}>{f.tag}</Ch>
                  <span className="mono" style={{fontWeight:700,color:G.gold,fontSize:13}}>{f.pickOdds}</span>
                </div>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontSize:10,color:G.dim}}>AI Probability</span>
              <span className="mono" style={{fontWeight:700,color:f.prob>=80?G.green:G.accent}}>{f.prob}%</span>
            </div>
            <PBar v={f.prob} c={f.prob>=80?G.green:G.accent}/>
          </div>;
        })}
      </div>
    </>}

    {tab==="groups"&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12}}>
      {WC_GROUPS.map((g,i)=>(
        <div key={i} className="card2" style={{borderColor:`${g.color}20`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <div style={{width:28,height:28,borderRadius:7,background:`${g.color}18`,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span className="mono" style={{fontWeight:800,color:g.color,fontSize:13}}>{g.group}</span>
            </div>
            <div style={{fontWeight:800,fontSize:14}}>Group {g.group}</div>
          </div>
          {g.teams.map((t,j)=>(
            <div key={j} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:j<3?`1px solid ${G.border}`:"none"}}>
              <span style={{fontSize:12,fontWeight:j===0?700:400,color:j===0?G.text:G.dim}}>{t}</span>
              {j===0&&<span style={{fontSize:9,color:g.color,fontWeight:700,background:`${g.color}15`,padding:"2px 6px",borderRadius:3}}>FAVE</span>}
            </div>
          ))}
        </div>
      ))}
    </div>}

    {tab==="outrights"&&<div className="picks-grid">
      {[
        {team:"Argentina 🇦🇷",odds:4.50,prob:22,tag:"SHARP",note:"Defending champions"},
        {team:"France 🇫🇷",odds:5.00,prob:20,tag:"VALUE",note:"Mbappé & depth"},
        {team:"Brazil 🇧🇷",odds:6.00,prob:17,tag:"VALUE",note:"Host continent edge"},
        {team:"England 🏴󠁧󠁢󠁥󠁮󠁧󠁿",odds:7.00,prob:14,tag:"VALUE",note:"Kane & Bellingham"},
        {team:"Spain 🇪🇸",odds:8.00,prob:13,tag:"LONG",note:"Highest FIFA rank"},
        {team:"Germany 🇩🇪",odds:10.0,prob:10,tag:"LONG",note:"Resurgent form"},
      ].map((o,i)=>(
        <div key={i} className="card2 fu" style={{animationDelay:`${i*.06}s`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:11}}>
            <div><div style={{fontWeight:900,fontSize:18,marginBottom:3}}>{o.team}</div><div style={{fontSize:12,color:G.dim}}>{o.note}</div></div>
            <div style={{textAlign:"right",flexShrink:0,marginLeft:10}}>
              <div className="mono" style={{fontSize:24,fontWeight:700,color:G.gold}}>{o.odds}</div>
              <Ch type={o.tag==="SHARP"?"green":o.tag==="VALUE"?"accent":"dim"}>{o.tag}</Ch>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
            <span style={{fontSize:10,color:G.dim}}>AI Win Probability</span>
            <span className="mono" style={{fontWeight:700,color:G.green}}>{o.prob}%</span>
          </div>
          <PBar v={o.prob} c={G.gradGold}/>
        </div>
      ))}
    </div>}

    {tab==="tips"&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>
      {[
        {icon:"⚽",c:G.green,t:"Over 2.5 Goals",d:"WC group stage averages 2.8 goals/match. Teams attack-minded fighting for 3 points. #1 WC market."},
        {icon:"📐",c:G.purple,t:"Corners — Big Teams",d:"Top teams generate 6+ corners vs defensive underdogs. Always include O9.5 in WC accas."},
        {icon:"🟨",c:G.red,t:"Bookings — Pressure",d:"WC group stage avg 3.8 cards. High pressure, mixed refs, players on yellow card warnings."},
        {icon:"⚖️",c:G.accent,t:"Handicap Value",d:"Asian handicap -1.5 when top teams face rank 30+ opponents. Spain, France, Brazil -1.5."},
        {icon:"🤝",c:G.gold,t:"Draw — Final Group",d:"Draws common when one team is already qualified. 35%+ probability in those games."},
        {icon:"🎰",c:G.orange,t:"WC Accumulators",d:"4-leg WC accas = 8x–14x combined odds with 70%+ AI probability. Use our builder."},
      ].map((t,i)=>(
        <div key={i} className="card" style={{borderColor:`${t.c}18`}}>
          <div style={{fontSize:26,marginBottom:8}}>{t.icon}</div>
          <div style={{fontWeight:800,fontSize:13,color:t.c,marginBottom:7}}>{t.t}</div>
          <div style={{fontSize:12,color:G.dim,lineHeight:1.7}}>{t.d}</div>
        </div>
      ))}
    </div>}

    <div style={{marginTop:20,background:"linear-gradient(135deg,#0A1A32,#08162A)",border:"1px solid rgba(0,212,255,.2)",borderRadius:14,padding:20,textAlign:"center"}}>
      <div style={{fontSize:18,fontWeight:900,marginBottom:8}}>🏆 Get All 104 WC AI Picks</div>
      <div style={{color:G.dim,fontSize:12,marginBottom:16}}>Pro & Elite: full WC coverage, every game, WhatsApp alerts</div>
      <button onClick={()=>startTrial(PLANS[1])} className="btn btn-gold btn-md btn-block">Start 7-Day Free Trial 🚀</button>
    </div>
  </div>;
}

// ── AI ACCUMULATOR ────────────────────────────────────────────────────────────
function AccaPage(){
  const [legs,setLegs]=useState(4); const [loading,setLoading]=useState(false); const [acca,setAcca]=useState(null);
  async function gen(){
    setLoading(true);setAcca(null);
    const picks=FIXTURES.map(f=>`${f.league}: ${f.home} vs ${f.away} ${f.time} UTC+2 | Pick: ${f.pick} @ ${f.pickOdds} (${f.prob}%)`).join("\n");
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:900,messages:[{role:"user",content:`You are BetSageAI. Today is ${TODAY} (UTC+2). Tomorrow is World Cup 2026!\n\nPicks:\n${picks}\n\nBuild ${legs}-leg acca. RULES:\n1. MUST have Over 2.5 Goals pick\n2. MUST have Corners or BTTS market\n3. Only 78%+ probability picks\n4. Target 5x-15x combined odds\n\nJSON only, no extra text:\n{"title":"${legs}-Leg Power Acca","combined_odds":0.00,"ai_probability":0,"stake":"1-2 units","legs":[{"league":"","match":"","time":"","pick":"","odds":0.00,"prob":0,"reason":""}],"analysis":"","warning":""}`}]})});
      const d=await res.json();
      const raw=d.content?.map(c=>c.text||"").join("")||"";
      setAcca(JSON.parse(raw.replace(/```json|```/g,"").trim()));
    }catch{setAcca({error:"⚠️ Add your Anthropic API key to generate live AI accumulators."});}
    setLoading(false);
  }
  return <div className="page">
    <div className="today-chip"><Dot c={G.gold} p/>🎰 AI ACCUMULATOR · {TODAY}</div>
    <div className="page-head">AI Accumulator Builder</div>
    <div className="page-sub">AI picks from today's real games · Always O2.5 + Corners + BTTS · {TZ}</div>
    <div className="card" style={{marginBottom:16}}>
      <div style={{marginBottom:12}}>
        <div style={{fontSize:11,color:G.dim,fontWeight:700,marginBottom:8}}>NUMBER OF LEGS</div>
        <div style={{display:"flex",gap:6}}>{[3,4,5,6].map(n=><button key={n} className={`stab ${legs===n?"active":""}`} style={{"--c":G.accent}} onClick={()=>setLegs(n)}>{n} Legs</button>)}</div>
      </div>
      <button onClick={gen} disabled={loading} className="btn btn-gold btn-md btn-block">
        {loading?<><span className="spin">⟳</span> Building...</>:"🎰 Generate Acca"}
      </button>
    </div>

    {loading&&<div style={{background:"linear-gradient(135deg,#0C1826,#0E1E38)",border:"1px solid rgba(0,212,255,.15)",borderRadius:16,padding:"36px 20px",textAlign:"center"}}>
      <div style={{fontSize:36,marginBottom:10}}>🎰</div>
      <div style={{fontWeight:800,marginBottom:5}}>Building your {legs}-leg acca...</div>
      <div style={{color:G.dim,fontSize:12}}>Selecting from today's real games</div>
    </div>}

    {acca?.error&&<div className="card"><div className="mono" style={{color:G.gold,fontSize:13}}>{acca.error}</div></div>}

    {acca&&!acca.error&&<div style={{background:"linear-gradient(135deg,#0C1826,#0E1E38)",border:"1px solid rgba(0,212,255,.18)",borderRadius:16,padding:20}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
        <div><Ch type="green">AI GENERATED</Ch><div style={{fontSize:18,fontWeight:900,marginTop:8}}>{acca.title}</div></div>
        <div style={{textAlign:"right"}}>
          <div className="mono" style={{fontSize:32,fontWeight:700,color:G.gold,lineHeight:1}}>{typeof acca.combined_odds==="number"?acca.combined_odds.toFixed(2):acca.combined_odds}x</div>
          <div style={{fontSize:12,color:G.green,fontWeight:700}}>{acca.ai_probability}% prob</div>
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,color:G.dim}}>Win Probability</span><span className="mono" style={{fontWeight:700,color:acca.ai_probability>=80?G.green:G.gold}}>{acca.ai_probability}%</span></div>
      <PBar v={acca.ai_probability} c={acca.ai_probability>=80?G.green:G.gold}/>
      <div style={{marginTop:16,marginBottom:8,fontSize:11,fontWeight:700,color:G.dim,letterSpacing:1}}>LEGS</div>
      {acca.legs?.map((leg,i)=>(
        <div key={i} style={{background:"rgba(0,212,255,.04)",border:"1px solid rgba(0,212,255,.1)",borderRadius:9,padding:"12px 14px",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{flex:1}}>
              <div style={{fontSize:10,color:G.dim,marginBottom:3}}>{leg.league} · {leg.time}</div>
              <div style={{fontWeight:700,fontSize:13,marginBottom:3}}>{leg.match}</div>
              <div className="mono" style={{fontWeight:700,color:G.accent,fontSize:12,marginBottom:3}}>{leg.pick}</div>
              <div style={{fontSize:11,color:G.dim}}>{leg.reason}</div>
            </div>
            <div style={{textAlign:"right",marginLeft:12,flexShrink:0}}>
              <div className="mono" style={{fontSize:18,fontWeight:700,color:G.gold}}>{typeof leg.odds==="number"?leg.odds.toFixed(2):leg.odds}</div>
              <div style={{fontSize:11,color:leg.prob>=80?G.green:G.accent}}>{leg.prob}%</div>
            </div>
          </div>
        </div>
      ))}
      {acca.analysis&&<div style={{background:"rgba(0,212,255,.04)",border:"1px solid rgba(0,212,255,.1)",borderRadius:9,padding:12,marginTop:12}}>
        <div style={{fontSize:10,color:G.accent,fontWeight:700,marginBottom:5}}>⚡ ANALYSIS</div>
        <div style={{fontSize:12,color:G.dim,lineHeight:1.7}}>{acca.analysis}</div>
      </div>}
      {acca.warning&&<div style={{background:"rgba(255,209,102,.04)",border:"1px solid rgba(255,209,102,.12)",borderRadius:9,padding:"9px 12px",marginTop:8}}>
        <div style={{fontSize:11,color:G.gold}}>⚠️ {acca.warning}</div>
      </div>}
      <div style={{display:"flex",gap:10,marginTop:14}}>
        <div style={{flex:1,background:G.card2,borderRadius:8,padding:"10px 13px"}}><div style={{fontSize:10,color:G.dim,marginBottom:3}}>STAKE</div><div className="mono" style={{fontWeight:700}}>{acca.stake}</div></div>
        <button onClick={gen} className="btn btn-gold btn-md" style={{flex:1}}>🔄 Regenerate</button>
      </div>
    </div>}

    {!acca&&!loading&&<div style={{background:"linear-gradient(135deg,#0C1826,#0E1E38)",border:"1px solid rgba(0,212,255,.1)",borderRadius:16,padding:"40px 20px",textAlign:"center"}}>
      <div style={{fontSize:48,marginBottom:12}}>🎰</div>
      <div style={{fontWeight:800,fontSize:17,marginBottom:7}}>Ready to Build Your Acca</div>
      <div style={{color:G.dim,fontSize:12,marginBottom:20}}>AI selects today's real games — O2.5 + Corners + BTTS always included</div>
      <button onClick={gen} className="btn btn-gold btn-lg btn-block">🎰 Generate My Accumulator</button>
    </div>}
  </div>;
}

// ── TRACKER ───────────────────────────────────────────────────────────────────
function TrackerPage(){
  const [bets,setBets]=useState(TRACKER); const [adding,setAdding]=useState(false);
  const [f,setF]=useState({league:"",pick:"",odds:"",units:"",result:"pending"});
  const settled=bets.filter(b=>b.result!=="pending");
  const wins=settled.filter(b=>b.result==="won").length;
  const pnl=bets.reduce((a,b)=>a+(b.pnl||0),0);
  const roi=settled.length>0?((pnl/settled.reduce((a,b)=>a+b.units,0))*100).toFixed(1):0;
  function addBet(){
    if(!f.pick||!f.odds||!f.units) return;
    const p=parseFloat(f.odds),u=parseFloat(f.units);
    const nl=f.result==="won"?(p-1)*u:f.result==="lost"?-u:null;
    setBets(prev=>[{id:Date.now(),date:"9 Jun",league:f.league||"Custom",pick:f.pick,odds:p,units:u,result:f.result,pnl:nl},...prev]);
    setF({league:"",pick:"",odds:"",units:"",result:"pending"});setAdding(false);
  }
  return <div className="page">
    <div className="today-chip"><Dot c={G.gold} p/>💰 BET TRACKER · {TODAY}</div>
    <div className="page-head">Money Tracker</div>
    <div className="page-sub">Full P&L · ROI · Win rate</div>
    <div className="grid4" style={{marginBottom:16}}>
      <div className="stat"><div className="lbl">P&L</div><div className="val" style={{color:pnl>=0?G.green:G.red}}>{pnl>=0?"+":""}{pnl.toFixed(1)}u</div></div>
      <div className="stat"><div className="lbl">ROI</div><div className="val" style={{color:roi>=0?G.green:G.red}}>{roi>=0?"+":""}{roi}%</div></div>
      <div className="stat"><div className="lbl">W/L</div><div className="val" style={{color:G.accent}}>{wins}-{settled.length-wins}</div></div>
      <div className="stat"><div className="lbl">Pending</div><div className="val" style={{color:G.gold}}>{bets.filter(b=>b.result==="pending").length}</div></div>
    </div>
    <div style={{display:"flex",justifyContent:"flex-end",marginBottom:12}}>
      <button onClick={()=>setAdding(a=>!a)} className={`btn btn-sm ${adding?"btn-outline":"btn-grad"}`}>
        {adding?"✕ Cancel":"+ Add Bet"}
      </button>
    </div>
    {adding&&<div className="card" style={{marginBottom:14}}>
      <div style={{fontWeight:700,marginBottom:12}}>Log a New Bet</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:9}}>
        {[["League","league","EPL"],["Pick","pick","Over 2.5"],["Odds","odds","1.85"],["Units","units","2"]].map(([l,k,ph])=>(
          <div key={k}><div className="inp-label">{l.toUpperCase()}</div><input className="inp" value={f[k]} onChange={e=>setF(p=>({...p,[k]:e.target.value}))} placeholder={ph}/></div>
        ))}
      </div>
      <div style={{marginBottom:10}}><div className="inp-label">RESULT</div>
        <select className="inp" value={f.result} onChange={e=>setF(p=>({...p,result:e.target.value}))}>
          <option value="pending">Pending</option><option value="won">Won</option><option value="lost">Lost</option>
        </select>
      </div>
      <button onClick={addBet} className="btn btn-grad btn-sm btn-block">Add Bet</button>
    </div>}
    <div className="card" style={{padding:0,overflow:"hidden"}}>
      <div style={{padding:"12px 14px",borderBottom:`1px solid ${G.border}`,fontWeight:700,fontSize:13}}>Bet History</div>
      {bets.map((b,i)=>(
        <div key={b.id||i} className="tracker-row fu" style={{animationDelay:`${i*.04}s`,background:i%2===0?"#07101A":"transparent"}}>
          <div className="mono" style={{fontSize:10,color:G.dim}}>{b.date}</div>
          <div style={{fontSize:12,fontWeight:600}}>{b.pick}</div>
          <div className="mono" style={{color:G.gold,fontSize:12,fontWeight:700}}>{b.odds}</div>
          <div className="mono" style={{color:G.dim,fontSize:11}} >{b.units}u</div>
          <span className={`chip chip-${b.result==="won"?"green":b.result==="lost"?"red":"gold"}`}>{b.result==="won"?"✓":b.result==="lost"?"✗":"⏳"}</span>
          <div className="mono" style={{fontWeight:700,color:b.pnl===null?G.dim:b.pnl>=0?G.green:G.red,fontSize:12}}>{b.pnl===null?"–":`${b.pnl>=0?"+":""}${b.pnl?.toFixed(2)}u`}</div>
        </div>
      ))}
    </div>
  </div>;
}

// ── PRICING ───────────────────────────────────────────────────────────────────
function PricingPage({startTrial}){
  const trialEnd=new Date(); trialEnd.setDate(trialEnd.getDate()+7);
  const ted=trialEnd.toLocaleDateString("en-GB",{day:"numeric",month:"short"});
  return <div className="page">
    <div className="today-chip"><Dot p/>7-DAY FREE TRIAL · ALL PLANS</div>
    <div className="page-head">Simple Pricing</div>
    <div className="page-sub">Start free for 7 days. No charge until trial ends.</div>
    <div style={{background:"rgba(0,255,133,.05)",border:"1px solid rgba(0,255,133,.18)",borderRadius:12,padding:"14px 16px",marginBottom:20}}>
      <div style={{fontWeight:800,color:G.green,fontSize:14,marginBottom:4}}>🎁 7 Days Free — No Charge Today</div>
      <div style={{fontSize:12,color:G.dim}}>Enter your card to reserve your spot. Cancel before {ted} and pay nothing.</div>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:24}}>
      {PLANS.map((plan,i)=>(
        <div key={i} className={`plan-card ${plan.badge==="MOST POPULAR"?"popular":""}`}>
          {plan.badge&&<div style={{position:"absolute",top:-12,left:20,background:plan.badge==="MOST POPULAR"?G.grad:G.gradGold,color:"#000",fontWeight:800,fontSize:10,padding:"3px 12px",borderRadius:20,whiteSpace:"nowrap"}}>{plan.badge}</div>}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
            <div>
              <div style={{color:G.dim,fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>{plan.name}</div>
              <div><span className="mono" style={{fontSize:36,fontWeight:700,color:plan.badge==="MOST POPULAR"?G.green:G.text}}>${plan.price}</span><span style={{color:G.dim,fontSize:12}}>/mo</span></div>
              <div style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(0,255,133,.08)",border:"1px solid rgba(0,255,133,.15)",borderRadius:20,padding:"3px 10px",fontSize:10,fontWeight:700,color:G.green,marginTop:6}}>🎁 7 days FREE</div>
            </div>
            <button onClick={()=>startTrial(plan)} className={`btn btn-sm ${plan.badge==="MOST POPULAR"?"btn-green":"btn-outline"}`} style={{flexShrink:0,marginLeft:12}}>
              Start Free →
            </button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
            {plan.features.map((ft,j)=>(
              <div key={j} style={{display:"flex",gap:6,alignItems:"flex-start",fontSize:11,color:j<2?G.text:G.dim}}>
                <span style={{color:G.green,fontWeight:700,flexShrink:0}}>✓</span>{ft}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="card" style={{textAlign:"center"}}>
      <div style={{fontSize:18,fontWeight:900,marginBottom:4}}>Path to $5K/Month MRR</div>
      <div style={{color:G.dim,fontSize:11,marginBottom:16}}>Subscriptions + 20% affiliate commissions</div>
      <div className="grid3">
        {[{n:51,plan:"Pro $99",mrr:"$5,049"},{n:173,plan:"Starter $29",mrr:"$5,017"},{n:25,plan:"Elite $199",mrr:"$4,975"}].map((r,i)=>(
          <div key={i} style={{background:G.bg,borderRadius:10,padding:14}}>
            <div className="mono" style={{fontSize:24,fontWeight:700,color:G.green}}>{r.n}</div>
            <div style={{fontSize:10,color:G.dim,margin:"3px 0 6px"}}>{r.plan} subs</div>
            <div style={{fontWeight:800,fontSize:14}}>{r.mrr}</div>
          </div>
        ))}
      </div>
    </div>
  </div>;
}

// ── AFFILIATE ─────────────────────────────────────────────────────────────────
function AffiliatePage(){
  const [copied,setCopied]=useState(false);
  const link="https://betsageai.vercel.app/ref/SAGE2026";
  return <div className="page">
    <div className="today-chip"><Dot c={G.green} p/>🤝 AFFILIATE</div>
    <div className="page-head">Earn While They Win</div>
    <div className="page-sub">20% recurring commission every month, for life</div>
    <div className="grid2" style={{marginBottom:14}}>
      {[{l:"Monthly",v:"$85.20",c:G.green},{l:"Referrals",v:"4",c:G.accent},{l:"All Time",v:"$426",c:G.gold},{l:"Next Pay",v:"Jun 1",c:G.text}].map((s,i)=>(
        <div key={i} className="stat"><div className="lbl">{s.l}</div><div className="val" style={{color:s.c}}>{s.v}</div></div>
      ))}
    </div>
    <div className="card" style={{marginBottom:14}}>
      <div style={{fontWeight:700,marginBottom:10}}>Your Referral Link</div>
      <div onClick={()=>{navigator.clipboard.writeText(link).catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),2000);}} style={{background:"#060D1A",border:`1px solid ${G.border}`,borderRadius:8,padding:"11px 13px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",marginBottom:10}}>
        <span className="mono" style={{fontSize:11,color:G.accent,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{link}</span>
        <span style={{fontSize:11,fontWeight:700,color:copied?G.green:G.dim,flexShrink:0,marginLeft:8}}>{copied?"✓ COPIED!":"COPY"}</span>
      </div>
      <div style={{display:"flex",gap:8}}>
        <a href={`https://wa.me/?text=Try BetSageAI — 68% win rate: ${link}`} target="_blank" rel="noreferrer" style={{flex:1,textDecoration:"none",background:G.wa,color:"#fff",fontFamily:"inherit",fontWeight:700,fontSize:12,padding:"10px 14px",borderRadius:8,textAlign:"center"}}>💬 WhatsApp</a>
        <a href={`https://twitter.com/intent/tweet?text=BetSageAI AI picks 68% win rate: ${link}`} target="_blank" rel="noreferrer" style={{flex:1,textDecoration:"none",background:"linear-gradient(135deg,#1DA1F2,#0d8ecf)",color:"#fff",fontFamily:"inherit",fontWeight:700,fontSize:12,padding:"10px 14px",borderRadius:8,textAlign:"center"}}>🐦 Twitter</a>
      </div>
    </div>
    <div className="card">
      <div style={{fontWeight:700,marginBottom:12}}>Commission Structure</div>
      {[{plan:"Starter $29",comm:"$5.80/mo"},{plan:"Pro $99",comm:"$19.80/mo",hot:true},{plan:"Elite $199",comm:"$39.80/mo"}].map((t,i)=>(
        <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"11px 0",borderBottom:i<2?`1px solid ${G.border}`:"none"}}>
          <span style={{fontSize:13,fontWeight:600}}>{t.plan}</span>
          <span className="mono" style={{fontWeight:700,color:t.hot?G.green:G.accent}}>{t.comm}</span>
        </div>
      ))}
      <div style={{marginTop:12,background:"rgba(0,255,133,.05)",border:"1px solid rgba(0,255,133,.15)",borderRadius:9,padding:12,fontSize:12,color:G.dim}}>
        💡 50 Pro referrals = <strong style={{color:G.green}}>$990/month</strong> passive income
      </div>
    </div>
  </div>;
}

// ── WHATSAPP ──────────────────────────────────────────────────────────────────
function WAPage(){
  return <div className="page">
    <div className="today-chip"><Dot c="#25D366" p/>💬 WHATSAPP GROUPS</div>
    <div className="page-head">VIP WhatsApp Groups</div>
    <div className="page-sub">Picks delivered to your WhatsApp instantly</div>
    <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
      {[{n:"BetSageAI · Starter",m:312,t:"Starter",o:true},{n:"BetSageAI · Pro VIP",m:187,t:"Pro",o:true,pop:true},{n:"BetSageAI · Elite",m:43,t:"Elite",o:false}].map((g,i)=>(
        <div key={i} className="card" style={{borderColor:g.pop?"rgba(37,211,102,.2)":G.border}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <span style={{fontSize:28}}>💬</span>
              <div><div style={{fontWeight:800,fontSize:14}}>{g.n}</div><div style={{fontSize:11,color:G.dim}}>{g.t} subscribers only</div></div>
            </div>
            <span className={`chip ${g.o?"chip-green":"chip-red"}`}>{g.o?"🟢 Open":"🔴 Invite Only"}</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div><div className="mono" style={{fontSize:22,fontWeight:700,color:"#25D366"}}>{g.m}</div><div style={{fontSize:10,color:G.dim}}>members</div></div>
          </div>
          <button style={{width:"100%",background:G.wa,color:"#fff",fontFamily:"inherit",fontWeight:700,fontSize:13,padding:"11px",borderRadius:8,border:"none",cursor:"pointer"}}>💬 Join Group</button>
        </div>
      ))}
    </div>
  </div>;
}

// ── STRIPE SETUP PAGE ─────────────────────────────────────────────────────────
function StripePage(){
  const [step,setStep]=useState(0);
  const steps=[
    { title:"1. Get Stripe Keys", icon:"💳", time:"5 mins",
      instructions:["Go to dashboard.stripe.com → Register","Developers → API Keys","Copy Publishable key (pk_live_...)","Copy Secret key (sk_live_...) — keep secret!","Go to Products → Add 3 subscription products","Add 7-day free trial to each price"],
      code:`// Stripe Products to create:
// Products → Add Product

Product 1: "BetSageAI Starter"
  Price: $29/month recurring
  Free trial: 7 days
  → Copy Price ID → price_starter_xxx

Product 2: "BetSageAI Pro"
  Price: $99/month recurring  
  Free trial: 7 days
  → Copy Price ID → price_pro_xxx

Product 3: "BetSageAI Elite"
  Price: $199/month recurring
  Free trial: 7 days
  → Copy Price ID → price_elite_xxx` },
    { title:"2. Add to Vercel Env Vars", icon:"🔧", time:"3 mins",
      instructions:["Go to your Vercel dashboard","Select your BetSage project","Settings → Environment Variables","Add these 3 variables:","STRIPE_SECRET_KEY=sk_live_...","STRIPE_WEBHOOK_SECRET=whsec_...","Redeploy after adding"],
      code:`// vercel.json - add to root of repo
{
  "functions": {
    "api/*.js": {
      "memory": 128,
      "maxDuration": 10
    }
  }
}

// .env.local (for local testing only - never commit!)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PK=pk_test_...` },
    { title:"3. Create /api/create-checkout.js", icon:"⚡", time:"5 mins",
      instructions:["In your GitHub repo","Create folder: api/","Create file: create-checkout.js","Paste the code on the right","Commit and push to GitHub","Vercel auto-deploys"],
      code:`// api/create-checkout.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { priceId, email, name, trialDays = 7 } = req.body;

  try {
    // Find or create Stripe customer
    const customers = await stripe.customers.list({ email, limit: 1 });
    const customer = customers.data[0] || 
      await stripe.customers.create({ email, name });

    // Create checkout session with 7-day trial
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      subscription_data: {
        trial_period_days: trialDays,
      },
      success_url: \`\${req.headers.origin}?success=true&plan=\${priceId}\`,
      cancel_url: \`\${req.headers.origin}?canceled=true\`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}` },
    { title:"4. Create /api/stripe-webhook.js", icon:"🔔", time:"5 mins",
      instructions:["Create file: api/stripe-webhook.js","Paste the webhook code","In Stripe Dashboard → Webhooks","Add endpoint: yourapp.vercel.app/api/stripe-webhook","Select events: subscription.created, subscription.deleted, invoice.payment_failed","Copy Signing Secret → add to Vercel env vars"],
      code:`// api/stripe-webhook.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(\`Webhook Error: \${err.message}\`);
  }

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      const sub = event.data.object;
      // Update your database: user is now subscribed
      // sub.customer = Stripe customer ID
      // sub.status = 'trialing' or 'active'
      // sub.trial_end = timestamp
      console.log('Subscription active:', sub.customer);
      break;

    case 'customer.subscription.deleted':
      // User cancelled — revoke access
      console.log('Subscription cancelled');
      break;

    case 'invoice.payment_failed':
      // Payment failed — notify user
      console.log('Payment failed');
      break;
  }

  res.json({ received: true });
}

// IMPORTANT: Add to vercel.json to disable body parsing:
// "api/stripe-webhook.js": { "bodyParser": false }` },
    { title:"5. Connect Frontend to API", icon:"🚀", time:"5 mins",
      instructions:["In your App.jsx CheckoutModal","Replace the simulate code","With real Stripe redirect","Test with Stripe test cards","4242 4242 4242 4242 (success)","4000 0000 0000 0002 (decline)","Deploy → You're taking real payments!"],
      code:`// In CheckoutModal, replace the simulate code with:
async function pay() {
  if (validation errors) { setErr("..."); return; }
  setLoading(true);

  try {
    // Call your Vercel API function
    const res = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId: plan.priceId,  // e.g. "price_pro_xxx"
        email: user.email,
        name: user.name,
        trialDays: 7,
      }),
    });

    const { url, error } = await res.json();
    
    if (error) throw new Error(error);
    
    // Redirect to Stripe hosted checkout page
    window.location.href = url;
    
  } catch (err) {
    setErr(err.message);
    setLoading(false);
  }
}

// Also handle success return in App:
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('success')) {
    // User completed checkout!
    setPage('dashboard');
    // Fetch user subscription status from your DB
  }
}, []);` },
  ];
  const active=steps[step];
  return <div className="page">
    <div className="today-chip"><Dot c={G.gold} p/>💳 STRIPE SETUP GUIDE</div>
    <div className="page-head">Go Live & Take Real Payments</div>
    <div className="page-sub">5 steps · ~25 minutes · Then you're live</div>

    {/* Step pills */}
    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
      {steps.map((s,i)=>(
        <button key={i} onClick={()=>setStep(i)} style={{padding:"6px 12px",borderRadius:7,border:`1px solid ${i===step?G.gold:G.border}`,background:i===step?`${G.gold}15`:"transparent",color:i===step?G.gold:G.dim,fontFamily:"inherit",fontSize:11,fontWeight:700,cursor:"pointer"}}>
          {s.icon} Step {i+1} · {s.time}
        </button>
      ))}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      {/* Instructions */}
      <div className="card" style={{borderColor:`${G.gold}22`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <span style={{fontSize:24}}>{active.icon}</span>
          <div><div style={{fontWeight:900,fontSize:15}}>{active.title}</div><div style={{fontSize:11,color:G.dim}}>Est. {active.time}</div></div>
        </div>
        <div className="divider"/>
        {active.instructions.map((inst,i)=>(
          <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10}}>
            <span style={{width:20,height:20,borderRadius:5,background:`${G.gold}15`,color:G.gold,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,flexShrink:0,fontFamily:"monospace"}}>{i+1}</span>
            <div style={{fontSize:12,color:G.dim,lineHeight:1.6}}>{inst}</div>
          </div>
        ))}
        <div style={{display:"flex",gap:8,marginTop:16}}>
          {step>0&&<button onClick={()=>setStep(step-1)} className="btn btn-outline btn-sm" style={{flex:1}}>← Prev</button>}
          {step<steps.length-1&&<button onClick={()=>setStep(step+1)} className="btn btn-grad btn-sm" style={{flex:1}}>Next →</button>}
          {step===steps.length-1&&<button className="btn btn-green btn-sm" style={{flex:1}}>🚀 Done!</button>}
        </div>
      </div>

      {/* Code */}
      <div style={{background:"#030609",border:`1px solid ${G.border}`,borderRadius:14,padding:16,overflow:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <span style={{fontSize:11,color:G.dim,fontWeight:700}}>CODE</span>
          <span style={{fontSize:9,color:G.gold,fontWeight:700,background:`${G.gold}15`,padding:"2px 7px",borderRadius:3}}>Step {step+1}</span>
        </div>
        <pre style={{fontFamily:"monospace",fontSize:10,color:"#8AB4D4",lineHeight:1.7,whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{active.code}</pre>
      </div>
    </div>

    {/* Checklist */}
    <div className="card" style={{marginTop:14}}>
      <div style={{fontWeight:800,fontSize:14,marginBottom:14}}>📋 Launch Checklist</div>
      <div className="grid2">
        {[
          {done:true,text:"Platform built ✓"},{done:true,text:"Mobile layout fixed ✓"},
          {done:true,text:"Auth UI built ✓"},{done:true,text:"Checkout modal ✓"},
          {done:true,text:"7-day trial logic ✓"},{done:true,text:"Real fixtures today ✓"},
          {done:false,text:"Stripe account created"},{done:false,text:"Products + prices created"},
          {done:false,text:"/api/create-checkout.js added"},{done:false,text:"Webhook connected"},
          {done:false,text:"Env vars in Vercel"},{done:false,text:"🚀 Taking real money!"},
        ].map((item,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:7,padding:"7px 10px",background:item.done?"rgba(0,255,133,.05)":G.card2,border:`1px solid ${item.done?"rgba(0,255,133,.15)":G.border}`,borderRadius:7}}>
            <span style={{color:item.done?G.green:G.dim,fontWeight:700}}>{item.done?"✓":"○"}</span>
            <span style={{fontSize:11,color:item.done?G.green:G.dim}}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  </div>;
}

// ── NAV CONFIG ────────────────────────────────────────────────────────────────
const PAGES=[
  {key:"dashboard",ico:"⚡",label:"Dashboard"},
  {key:"worldcup",ico:"🏆",label:"World Cup",badge:"2D",bc:G.gold},
  {key:"soccer",ico:"⚽",label:"Soccer Hub",badge:"WC",bc:G.green},
  {key:"accumulator",ico:"🎰",label:"AI Acca"},
  {key:"tracker",ico:"💰",label:"Tracker"},
  {key:"affiliate",ico:"🤝",label:"Affiliate"},
  {key:"whatsapp",ico:"💬",label:"WhatsApp"},
  {key:"pricing",ico:"💳",label:"Pricing"},
  {key:"stripe",ico:"🔧",label:"Stripe Setup",badge:"NEW",bc:G.gold},
];

// Bottom nav items (mobile — max 5)
const BOT_NAV=[
  {key:"dashboard",ico:"⚡",label:"Home"},
  {key:"soccer",ico:"⚽",label:"Picks"},
  {key:"worldcup",ico:"🏆",label:"WC 2026"},
  {key:"accumulator",ico:"🎰",label:"Acca"},
  {key:"pricing",ico:"💳",label:"Plans"},
];

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App(){
  const [page,setPage]=useState("dashboard");
  const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem("bs_user"));}catch{return null;}});
  const [authModal,setAuthModal]=useState(null);
  const [checkout,setCheckout]=useState(null);

  function afterAuth(u){setUser(u);setAuthModal(null);if(!u.subscribed)setCheckout(PLANS[1]);}
  function afterCheckout(u){setUser(u);setCheckout(null);setPage("dashboard");}
  function signOut(){localStorage.removeItem("bs_user");setUser(null);setPage("pricing");}
  function startTrial(plan){if(!user){setAuthModal({mode:"signup",plan});}else{setCheckout(plan);}}

  return <>
    <style>{CSS}</style>
    {authModal&&<AuthModal mode={authModal.mode} plan={authModal.plan} onClose={()=>setAuthModal(null)} onSuccess={afterAuth}/>}
    {checkout&&user&&<CheckoutModal plan={checkout} user={user} onClose={()=>setCheckout(null)} onSuccess={afterCheckout}/>}

    <div className="app-shell">
      {/* TOP NAV */}
      <div className="topnav">
        <div style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer",flexShrink:0}} onClick={()=>setPage("dashboard")}>
          <div style={{width:26,height:26,background:G.grad,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:13,color:"#000"}}>⚡</div>
          <span style={{fontWeight:900,fontSize:15,letterSpacing:"-.5px"}}>BetSage<span style={{color:G.accent}}>AI</span></span>
        </div>
        <div style={{flex:1,display:"flex",justifyContent:"center"}}>
          <LiveClock/>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
          <div style={{background:"rgba(255,209,102,.08)",border:"1px solid rgba(255,209,102,.18)",borderRadius:20,padding:"3px 10px",fontSize:10,color:G.gold,fontWeight:700,whiteSpace:"nowrap"}}>🏆 WC {WC_DAYS}d</div>
          {!user
            ?<button onClick={()=>setAuthModal({mode:"signup",plan:PLANS[1]})} className="btn btn-green btn-sm">Free Trial</button>
            :<button onClick={signOut} style={{background:"transparent",border:`1px solid ${G.border}`,color:G.dim,fontFamily:"inherit",padding:"5px 12px",borderRadius:7,cursor:"pointer",fontSize:11}}>Sign Out</button>
          }
        </div>
      </div>

      <Ticker/>

      <div className="body-wrap">
        {/* SIDEBAR — desktop only */}
        <div className="sidebar">
          {PAGES.map(p=>(
            <button key={p.key} onClick={()=>setPage(p.key)} className={`snav ${page===p.key?"active":""}`}>
              <span className="ico">{p.ico}</span>
              {p.label}
              {p.badge&&<span className="nbadge" style={{background:`${p.bc||G.accent}18`,color:p.bc||G.accent}}>{p.badge}</span>}
            </button>
          ))}
          <div style={{marginTop:"auto",paddingTop:14,display:"flex",flexDirection:"column",gap:8}}>
            {!user
              ?<button onClick={()=>startTrial(PLANS[1])} className="btn btn-green btn-sm btn-block">🎁 Free Trial</button>
              :<div style={{background:"rgba(0,255,133,.05)",border:"1px solid rgba(0,255,133,.14)",borderRadius:8,padding:"9px 11px"}}><div style={{fontSize:9,color:G.green,fontWeight:700,marginBottom:2}}>TRIAL ACTIVE</div><div style={{fontSize:10,color:G.dim}}>{user.plan?.name} plan</div></div>
            }
            <div style={{background:"rgba(255,209,102,.04)",border:"1px solid rgba(255,209,102,.12)",borderRadius:8,padding:"8px 11px"}}>
              <div style={{fontSize:9,color:G.gold,fontWeight:700,marginBottom:2}}>⚠️ 18+ ONLY</div>
              <div style={{fontSize:9,color:G.dim}}>Entertainment only · Bet responsibly</div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        {page==="dashboard"&&<DashPage user={user} setPage={setPage} startTrial={startTrial}/>}
        {page==="worldcup"&&<WCPage startTrial={startTrial}/>}
        {page==="soccer"&&<SoccerPage/>}
        {page==="accumulator"&&<AccaPage/>}
        {page==="tracker"&&<TrackerPage/>}
        {page==="affiliate"&&<AffiliatePage/>}
        {page==="whatsapp"&&<WAPage/>}
        {page==="pricing"&&<PricingPage startTrial={startTrial}/>}
        {page==="stripe"&&<StripePage/>}
      </div>

      {/* BOTTOM NAV — mobile only */}
      <div className="bot-nav">
        {BOT_NAV.map(p=>(
          <button key={p.key} className={`bot-btn ${page===p.key?"active":""}`} onClick={()=>setPage(p.key)}>
            <span className="ico">{p.ico}</span>
            <span className="lbl">{p.label}</span>
          </button>
        ))}
      </div>
    </div>
  </>;
}
