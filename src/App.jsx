import { useState, useEffect, useRef } from "react";

// ─── CURRENT DATE: Friday 12 June 2026 · UTC+2 ────────────────────────────────
const TODAY       = "Fri 12 Jun 2026";
const TODAY_SHORT = "Fri 12 Jun";
const TZ          = "UTC+2";

// ── COLORS ────────────────────────────────────────────────────────────────────
const G = {
  bg:"#060812", card:"#0A1020", card2:"#0E1830",
  border:"#162338", accent:"#00D4FF", green:"#00FF85",
  gold:"#FFD166", red:"#FF4455", purple:"#B47FFF",
  orange:"#FF8C42", text:"#C8DDF0", dim:"#4A6A8A", muted:"#1E3050",
  grad:"linear-gradient(135deg,#00D4FF,#00FF85)",
  gradGold:"linear-gradient(135deg,#FFD166,#FF8C42)",
  gradGreen:"linear-gradient(135deg,#00FF85,#00CC66)",
  gradRed:"linear-gradient(135deg,#FF4455,#FF6B35)",
  wa:"linear-gradient(135deg,#25D366,#128C7E)",
};

// ── PLANS ─────────────────────────────────────────────────────────────────────
const PLANS = [
  { id:"starter", name:"Starter", price:29, priceId:"price_starter", color:G.accent, badge:null,
    features:["3 AI picks/day","⚽ Soccer + Basketball","💬 WhatsApp Group","🤝 Affiliate 20%","🎰 AI Accumulator","🌍 WC Basic Picks"] },
  { id:"pro", name:"Pro", price:99, priceId:"price_pro", color:G.green, badge:"MOST POPULAR",
    features:["10 AI picks/day","All 5 sports","💬 WhatsApp Pro VIP","🌍 Full WC coverage","📊 Value odds engine","⚠️ Sharp alerts","💰 Bet tracker + P&L"] },
  { id:"elite", name:"Elite", price:199, priceId:"price_elite", color:G.gold, badge:"BEST ROI",
    features:["Unlimited picks","All sports + live","💬 Elite Inner Circle","🏆 Full WC + outrights","🎯 Parlay builder","👤 1-on-1 analyst"] },
];

// ── WORLD CUP FIXTURES (Real · All times UTC+2) ───────────────────────────────
const WC_FIXTURES = [
  // ── MATCHDAY 1 — PLAYED ──────────────────────────────────────────────────
  { id:"wc1", date:"Thu 11 Jun", time:"21:00", home:"Mexico", away:"South Africa",
    group:"A", venue:"Estadio Azteca, Mexico City",
    h:2.10, d:3.20, a:3.60,
    status:"finished", score:"2-0",
    pick:"Over 2.5 Goals", pickOdds:1.75, prob:81, tag:"VALUE",
    result:"lost", // O2.5 not reached — only 2 goals
    note:"Mexico won 2-0. Only 2 goals — Over 2.5 did NOT land ✗" },

  { id:"wc2", date:"Thu 11 Jun", time:"23:00", home:"South Korea", away:"Czechia",
    group:"A", venue:"Estadio Akron, Guadalajara",
    h:2.40, d:3.10, a:3.00,
    status:"finished", score:"2-1",
    pick:"Over 2.5 Goals", pickOdds:1.80, prob:79, tag:"VALUE",
    result:"won", // 3 goals total — O2.5 landed
    note:"South Korea 2-1 Czechia. 3 goals — Over 2.5 LANDED ✓" },

  // ── MATCHDAY 1 — TODAY Fri 12 Jun ────────────────────────────────────────
  { id:"wc3", date:"Fri 12 Jun", time:"20:00", home:"Canada", away:"Bosnia & Herz.",
    group:"B", venue:"BMO Field, Toronto",
    h:1.95, d:3.30, a:4.20,
    status:"upcoming", score:null,
    pick:"Canada Win & Over 2.5", pickOdds:2.10, prob:78, tag:"VALUE",
    note:"Canada host opener. Strong home support. Bosnia physical but limited away." },

  { id:"wc4", date:"Sat 13 Jun", time:"02:00", home:"USA", away:"Paraguay",
    group:"D", venue:"SoFi Stadium, Los Angeles",
    h:1.75, d:3.40, a:5.00,
    status:"upcoming", score:null,
    pick:"USA Win & Over 2.5", pickOdds:2.05, prob:79, tag:"SHARP",
    note:"USA at SoFi — massive home crowd. Paraguay defensive but USA's pace will break them open." },

  // ── MATCHDAY 1 — SAT 13 Jun ───────────────────────────────────────────────
  { id:"wc5", date:"Sat 13 Jun", time:"20:00", home:"Qatar", away:"Switzerland",
    group:"B", venue:"Levi's Stadium, Santa Clara",
    h:4.50, d:3.40, a:1.80,
    status:"upcoming", score:null,
    pick:"Switzerland Win", pickOdds:1.80, prob:76, tag:"VALUE",
    note:"Qatar weakest team in tournament. Switzerland well-organised and clinical. Comfortable win." },

  { id:"wc6", date:"Sat 13 Jun", time:"23:00", home:"Brazil", away:"Morocco",
    group:"C", venue:"MetLife Stadium, New Jersey",
    h:1.65, d:3.50, a:6.00,
    status:"upcoming", score:null,
    pick:"Brazil Win & Over 2.5", pickOdds:1.90, prob:80, tag:"SHARP",
    note:"Brazil's first WC game since 2022 disappointment. Vinicius Jr leads attack. Morocco tough but outgunned." },

  // ── MATCHDAY 1 — SUN 14 Jun ───────────────────────────────────────────────
  { id:"wc7", date:"Sun 14 Jun", time:"02:00", home:"Haiti", away:"Scotland",
    group:"C", venue:"AT&T Stadium, Arlington",
    h:4.00, d:3.20, a:1.95,
    status:"upcoming", score:null,
    pick:"Scotland Win & Over 2.5", pickOdds:1.85, prob:77, tag:"VALUE",
    note:"Scotland strongest team in this pairing. Haiti lack WC experience. Comfortable Scottish win expected." },

  { id:"wc8", date:"Sun 14 Jun", time:"18:00", home:"Germany", away:"Curaçao",
    group:"E", venue:"NRG Stadium, Houston",
    h:1.15, d:8.00, a:22.0,
    status:"upcoming", score:null,
    pick:"Germany Win & Over 3.5", pickOdds:1.72, prob:86, tag:"SHARP",
    note:"Germany vs weakest team in tournament. Expect ruthless hammering. Over 3.5 goals at 1.72 outstanding value." },

  { id:"wc9", date:"Sun 14 Jun", time:"21:00", home:"Netherlands", away:"Japan",
    group:"F", venue:"MetLife Stadium, New Jersey",
    h:1.75, d:3.40, a:5.00,
    status:"upcoming", score:null,
    pick:"Netherlands Win & Over 2.5", pickOdds:1.90, prob:78, tag:"VALUE",
    note:"Netherlands strong favourites. Japan will create chances but Dutch quality too great overall." },

  // ── MATCHDAY 1 — MON 15 Jun ───────────────────────────────────────────────
  { id:"wc10", date:"Mon 15 Jun", time:"17:00", home:"Spain", away:"Cabo Verde",
    group:"H", venue:"Lumen Field, Seattle",
    h:1.18, d:7.00, a:18.0,
    status:"upcoming", score:null,
    pick:"Spain Win & Over 3.5", pickOdds:1.80, prob:82, tag:"SHARP",
    note:"Spain obliterate Cabo Verde. Over 3.5 goals at 1.80 is exceptional value. Could be 5 or 6." },

  { id:"wc11", date:"Mon 15 Jun", time:"20:00", home:"Belgium", away:"Egypt",
    group:"G", venue:"Rose Bowl, Pasadena",
    h:1.60, d:3.60, a:6.00,
    status:"upcoming", score:null,
    pick:"Belgium Win & Over 2.5", pickOdds:1.85, prob:79, tag:"VALUE",
    note:"Belgium strong but ageing. Egypt more dangerous than their odds suggest. Both teams to score likely." },

  { id:"wc12", date:"Tue 16 Jun", time:"00:00", home:"Senegal", away:"France",
    group:"F", venue:"Hard Rock Stadium, Miami",
    h:5.00, d:3.80, a:1.65,
    status:"upcoming", score:null,
    pick:"France Win & Over 2.5", pickOdds:1.72, prob:83, tag:"SHARP",
    note:"France vs Senegal — Mbappé against his African roots. France too strong. Emotional but one-sided." },
];

// ── TODAY'S PICKS (Fri 12 Jun 2026) ──────────────────────────────────────────
const TODAYS_PICKS = [
  { id:"p1", league:"🏆 WC Group B", home:"Canada", away:"Bosnia & Herz.",
    time:"20:00", date:"Fri 12 Jun", tz:"UTC+2",
    venue:"BMO Field, Toronto",
    status:"upcoming", score:null,
    pick:"Over 2.5 Goals", pickOdds:1.85, prob:82, tag:"VALUE", units:2,
    corners:"Over 9.5 Corners", handicap:"Canada -0.5 AH", bookings:"Over 3.5 Cards",
    btts:"Both Teams Score", draw:"Canada DNB @ 1.55",
    analysis:"Canada at home in their first ever WC opener on home soil. Raucous BMO crowd. Bosnia defensive but Canada's speed will produce goals and corners." },

  { id:"p2", league:"🏆 WC Group D", home:"USA", away:"Paraguay",
    time:"02:00", date:"Sat 13 Jun", tz:"UTC+2",
    venue:"SoFi Stadium, Los Angeles",
    status:"upcoming", score:null,
    pick:"Over 2.5 Goals", pickOdds:1.90, prob:80, tag:"SHARP", units:2,
    corners:"Over 10.5 Corners", handicap:"USA -0.5 AH", bookings:"Over 3.5 Cards",
    btts:"Both Teams Score", draw:"USA DNB @ 1.48",
    analysis:"USA vs Paraguay at packed SoFi. Paraguay's last two WC games both saw 3+ goals. USA pressing game generates corners. Over 2.5 at 1.90 is the play." },

  { id:"p3", league:"🌍 WC Result", home:"South Korea", away:"Czechia",
    time:"23:00", date:"Thu 11 Jun", tz:"UTC+2",
    venue:"Estadio Akron, Guadalajara",
    status:"finished", score:"2-1",
    pick:"Over 2.5 Goals", pickOdds:1.80, prob:79, tag:"VALUE", units:2,
    corners:"Over 9.5 Corners", handicap:"Czechia +0.5 AH", bookings:"Over 3.5 Cards",
    btts:"Both Teams Score", draw:"Draw @ 3.10",
    analysis:"✅ WON — South Korea 2-1 Czechia. 3 total goals. Over 2.5 Goals LANDED." },

  { id:"p4", league:"🌍 WC Result", home:"Mexico", away:"South Africa",
    time:"21:00", date:"Thu 11 Jun", tz:"UTC+2",
    venue:"Estadio Azteca, Mexico City",
    status:"finished", score:"2-0",
    pick:"Over 2.5 Goals", pickOdds:1.75, prob:81, tag:"VALUE", units:2,
    corners:"Over 9.5 Corners", handicap:"Mexico -0.5 AH", bookings:"Over 3.5 Cards",
    btts:"Both Teams Score", draw:"Mexico DNB @ 1.55",
    analysis:"✗ LOST — Mexico 2-0 South Africa. Only 2 goals. Mexico -0.5 AH WON ✓ but Over 2.5 didn't land." },
];

const SUBTABS = [
  { key:"over25", label:"Over 2.5", icon:"⚽", color:G.green, field:"pick" },
  { key:"corners", label:"Corners", icon:"📐", color:G.purple, field:"corners" },
  { key:"handicap", label:"Handicap", icon:"⚖️", color:G.accent, field:"handicap" },
  { key:"bookings", label:"Bookings", icon:"🟨", color:G.red, field:"bookings" },
  { key:"draw", label:"Draw", icon:"🤝", color:G.gold, field:"draw" },
  { key:"btts", label:"BTTS", icon:"🥅", color:G.orange, field:"btts" },
];

const TRACKER = [
  { date:"12 Jun", pick:"S. Korea Over 2.5 ✅", odds:1.80, units:2, result:"won", pnl:+1.60 },
  { date:"12 Jun", pick:"Mexico Over 2.5 ✗", odds:1.75, units:2, result:"lost", pnl:-2.00 },
  { date:"12 Jun", pick:"Mexico -0.5 AH ✅", odds:1.72, units:2, result:"won", pnl:+1.44 },
  { date:"11 Jun", pick:"Brazil vs Panama O2.5", odds:1.68, units:2, result:"won", pnl:+1.36 },
  { date:"11 Jun", pick:"Argentina O3.5 Goals", odds:1.65, units:2, result:"won", pnl:+1.30 },
  { date:"10 Jun", pick:"England Win & O2.5", odds:1.68, units:2, result:"won", pnl:+1.36 },
  { date:"10 Jun", pick:"France vs Canada O2.5", odds:1.75, units:2, result:"won", pnl:+1.50 },
  { date:"9 Jun", pick:"Spain O2.5 Goals", odds:1.72, units:2, result:"won", pnl:+1.44 },
  { date:"9 Jun", pick:"Germany O2.5 Goals", odds:1.70, units:2, result:"lost", pnl:-2.00 },
  { date:"8 Jun", pick:"Palmeiras Win & O2.5", odds:1.85, units:2, result:"won", pnl:+1.70 },
];

const AFFILIATES = [
  { name:"Mike T.", plan:"Pro", earned:19.80, status:"active" },
  { name:"Sarah K.", plan:"Elite", earned:39.80, status:"active" },
  { name:"James R.", plan:"Starter", earned:5.80, status:"active" },
  { name:"Priya M.", plan:"Pro", earned:19.80, status:"active" },
  { name:"Carlos D.", plan:"Pro", earned:19.80, status:"churned" },
];

const WC_GROUPS = [
  { group:"A", teams:["Mexico","South Korea","South Africa","Czechia"], color:G.gold,
    standings:[{t:"Mexico",p:3,gd:"+2"},{t:"South Korea",p:3,gd:"+1"},{t:"Czechia",p:0,gd:"-1"},{t:"South Africa",p:0,gd:"-2"}] },
  { group:"B", teams:["Canada","Switzerland","Bosnia & Herz.","Qatar"], color:G.accent,
    standings:[{t:"Canada",p:0,gd:"0"},{t:"Switzerland",p:0,gd:"0"},{t:"Bosnia & Herz.",p:0,gd:"0"},{t:"Qatar",p:0,gd:"0"}] },
  { group:"C", teams:["Brazil","Morocco","Scotland","Haiti"], color:G.green,
    standings:[{t:"Brazil",p:0,gd:"0"},{t:"Morocco",p:0,gd:"0"},{t:"Scotland",p:0,gd:"0"},{t:"Haiti",p:0,gd:"0"}] },
  { group:"D", teams:["USA","Paraguay","Australia","Türkiye"], color:G.purple,
    standings:[{t:"USA",p:0,gd:"0"},{t:"Paraguay",p:0,gd:"0"},{t:"Australia",p:0,gd:"0"},{t:"Türkiye",p:0,gd:"0"}] },
  { group:"E", teams:["Germany","Curaçao","Côte d'Ivoire","Ecuador"], color:G.orange,
    standings:[{t:"Germany",p:0,gd:"0"},{t:"Côte d'Ivoire",p:0,gd:"0"},{t:"Ecuador",p:0,gd:"0"},{t:"Curaçao",p:0,gd:"0"}] },
  { group:"F", teams:["France","Senegal","Netherlands","Japan"], color:G.red,
    standings:[{t:"France",p:0,gd:"0"},{t:"Netherlands",p:0,gd:"0"},{t:"Senegal",p:0,gd:"0"},{t:"Japan",p:0,gd:"0"}] },
  { group:"G", teams:["Belgium","Spain","Egypt","Cabo Verde"], color:G.gold,
    standings:[{t:"Belgium",p:0,gd:"0"},{t:"Spain",p:0,gd:"0"},{t:"Egypt",p:0,gd:"0"},{t:"Cabo Verde",p:0,gd:"0"}] },
  { group:"H", teams:["Argentina","Norway","Algeria","Saudi Arabia"], color:G.accent,
    standings:[{t:"Argentina",p:0,gd:"0"},{t:"Norway",p:0,gd:"0"},{t:"Algeria",p:0,gd:"0"},{t:"Saudi Arabia",p:0,gd:"0"}] },
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
@keyframes pop{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
@keyframes slideUp{from{opacity:0;transform:translateY(100%)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
.fu{animation:up .35s ease both}
.pop{animation:pop .25s ease both}
.spin{animation:spin .7s linear infinite}

/* LAYOUT */
.shell{display:flex;flex-direction:column;min-height:100vh;}
.topnav{position:fixed;top:0;left:0;right:0;z-index:200;background:rgba(6,8,18,.96);border-bottom:1px solid #162338;height:52px;display:flex;align-items:center;padding:0 12px;gap:8px;}
.body-wrap{display:flex;flex:1;padding-top:80px;}
.sidebar{width:200px;flex-shrink:0;background:#0A1020;border-right:1px solid #162338;position:fixed;top:80px;left:0;bottom:0;overflow-y:auto;padding:12px 8px;display:flex;flex-direction:column;gap:2px;}
.page{flex:1;padding:16px;padding-bottom:80px;max-width:100%;}
@media(min-width:768px){.page{margin-left:200px;padding:22px;padding-bottom:22px;}.bot-nav{display:none!important;}.sidebar{display:flex!important;}}
@media(max-width:767px){.sidebar{display:none!important;}.page{margin-left:0;}}

/* BOTTOM NAV */
.bot-nav{position:fixed;bottom:0;left:0;right:0;z-index:200;background:rgba(6,8,18,.97);border-top:1px solid #162338;display:flex;padding:6px 0 max(8px,env(safe-area-inset-bottom));}
.bot-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;background:none;border:none;cursor:pointer;padding:4px 2px;}
.bot-btn .ico{font-size:19px;line-height:1;}
.bot-btn .lbl{font-family:'Outfit',sans-serif;font-size:9px;font-weight:600;}
.bot-btn.active .lbl,.bot-btn.active .ico{color:#00D4FF;}
.bot-btn:not(.active) .lbl,.bot-btn:not(.active) .ico{color:#1E3050;}

/* SIDEBAR NAV */
.snav{display:flex;align-items:center;gap:9px;padding:9px 11px;border-radius:9px;border:none;border-left:2px solid transparent;background:transparent;color:#4A6A8A;font-family:'Outfit',sans-serif;font-size:12px;font-weight:600;cursor:pointer;width:100%;text-align:left;transition:all .15s;}
.snav.active{background:rgba(0,212,255,.07);color:#00D4FF;border-left-color:#00D4FF;}
.snav:hover:not(.active){color:#C8DDF0;background:rgba(255,255,255,.03);}
.snav .ico{font-size:14px;width:18px;text-align:center;flex-shrink:0;}
.nbadge{margin-left:auto;font-size:8px;font-weight:800;padding:2px 5px;border-radius:3px;letter-spacing:.4px;}

/* CARDS */
.card{background:#0A1020;border:1px solid #162338;border-radius:14px;padding:16px;}
.card2{background:#0E1830;border:1px solid #162338;border-radius:11px;padding:14px 15px;}
.stat{background:#0E1830;border:1px solid #162338;border-radius:11px;padding:13px 14px;}
.stat .lbl{font-size:9px;color:#1E3050;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;}
.stat .val{font-family:'DM Mono',monospace;font-size:20px;font-weight:700;}
.stat .sub{font-size:10px;color:#4A6A8A;margin-top:3px;}
.pick-card{background:#0E1830;border:1px solid #162338;border-left:3px solid var(--s);border-radius:12px;padding:15px;transition:border-color .2s;}
.fixture-card{background:#0E1830;border:1px solid #162338;border-left:3px solid var(--s);border-radius:12px;padding:14px;}

/* BUTTONS */
.btn{font-family:'Outfit',sans-serif;font-weight:700;border:none;border-radius:8px;cursor:pointer;transition:all .18s;display:inline-flex;align-items:center;justify-content:center;gap:6px;}
.btn:hover:not(:disabled){opacity:.88;transform:translateY(-1px);}
.btn:disabled{opacity:.55;cursor:not-allowed;transform:none!important;}
.btn-grad{background:linear-gradient(135deg,#00D4FF,#00FF85);color:#000;}
.btn-gold{background:linear-gradient(135deg,#FFD166,#FF8C42);color:#000;}
.btn-green{background:linear-gradient(135deg,#00FF85,#00CC66);color:#000;}
.btn-red{background:linear-gradient(135deg,#FF4455,#FF6B35);color:#fff;}
.btn-outline{background:transparent;color:#C8DDF0;border:1px solid #162338;}
.btn-outline:hover{border-color:#00D4FF;color:#00D4FF;}
.btn-lg{padding:13px 26px;font-size:15px;}
.btn-md{padding:10px 20px;font-size:13px;}
.btn-sm{padding:7px 13px;font-size:12px;}
.btn-block{width:100%;}

/* CHIPS */
.chip{display:inline-flex;align-items:center;gap:3px;padding:3px 8px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:.3px;}

/* INPUTS */
.inp{width:100%;background:#060D1A;border:1px solid #162338;border-radius:8px;padding:10px 12px;color:#C8DDF0;font-family:'Outfit',sans-serif;font-size:13px;outline:none;transition:border-color .15s;}
.inp:focus{border-color:#00D4FF;}
.inp::placeholder{color:#1E3050;}
.inp-label{font-size:10px;color:#4A6A8A;font-weight:700;margin-bottom:5px;letter-spacing:.5px;}

/* GRIDS */
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
.picks-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px;}
@media(max-width:600px){.grid4{grid-template-columns:1fr 1fr;}.grid3{grid-template-columns:1fr 1fr;}.picks-grid{grid-template-columns:1fr;}}

/* PROB BAR */
.pbar{height:4px;border-radius:2px;background:#1E3050;overflow:hidden;margin-top:5px;}
.pbar-fill{height:100%;border-radius:2px;transition:width .9s ease;}

/* MODAL */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:400;display:flex;align-items:flex-end;justify-content:center;}
@media(min-width:500px){.overlay{align-items:center;padding:20px;}}
.modal{background:#0A1020;border:1px solid #162338;border-radius:20px 20px 0 0;width:100%;max-width:420px;padding:24px;max-height:92vh;overflow-y:auto;animation:slideUp .3s ease;}
@media(min-width:500px){.modal{border-radius:20px;animation:pop .25s ease;}}

/* TABS */
.stab{padding:7px 13px;border-radius:7px;border:1px solid #162338;background:transparent;color:#2A4060;font-family:'Outfit',sans-serif;font-size:11px;font-weight:700;cursor:pointer;transition:all .15s;white-space:nowrap;}
.stab.active{background:var(--c,#00D4FF);color:#000;border-color:var(--c,#00D4FF);}
.stab:hover:not(.active){border-color:var(--c,#00D4FF);color:var(--c,#00D4FF);}

/* WC BANNER */
.wc-banner{background:linear-gradient(135deg,#0A1A32,#081428);border:1px solid rgba(0,212,255,.2);border-radius:14px;padding:16px;position:relative;overflow:hidden;}

/* MISC */
.mono{font-family:'DM Mono',monospace;}
.divider{height:1px;background:#162338;margin:14px 0;}
.today-chip{display:inline-flex;align-items:center;gap:6px;background:rgba(0,212,255,.07);border:1px solid rgba(0,212,255,.15);border-radius:20px;padding:4px 12px;font-size:10px;font-weight:700;color:#00D4FF;margin-bottom:14px;}
.ticker-bar{overflow:hidden;background:#05070F;border-bottom:1px solid #162338;height:28px;display:flex;align-items:center;position:fixed;top:52px;left:0;right:0;z-index:190;}
.ticker-inner{display:flex;w
