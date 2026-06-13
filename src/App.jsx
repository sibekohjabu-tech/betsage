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
.ticker-inner{display:flex;width:max-content;animation:ticker 55s linear infinite;}
.ticker-item{padding:0 24px;font-family:monospace;font-size:10px;white-space:nowrap;display:flex;align-items:center;gap:7px;color:#4A6A8A;}
.plan-card{background:#0A1020;border:1px solid #162338;border-radius:16px;padding:20px 18px;position:relative;transition:transform .2s;}
.plan-card:hover{transform:translateY(-3px);}
.plan-card.popular{border-color:rgba(0,255,133,.25);}
.tracker-row{display:grid;grid-template-columns:55px 1fr 58px 44px 60px 72px;gap:7px;align-items:center;padding:10px 12px;border-radius:8px;font-size:12px;}
@media(max-width:480px){.tracker-row{grid-template-columns:48px 1fr 52px 55px;}.hide-mob{display:none;}}
.section-head{font-size:18px;font-weight:800;margin-bottom:4px;}
.section-sub{font-size:12px;color:#4A6A8A;margin-bottom:18px;}
`;

// ── HELPERS ───────────────────────────────────────────────────────────────────
const mono = {fontFamily:"'DM Mono',monospace"};
function Dot({c,p}){return <span style={{width:7,height:7,borderRadius:"50%",background:c||G.green,display:"inline-block",flexShrink:0,animation:p?"pulse 2s infinite":undefined}}/>;}
function PBar({v,c}){return <div className="pbar"><div className="pbar-fill" style={{width:`${v}%`,background:c||G.accent}}/></div>;}
function Ch({color,bg,children}){return <span className="chip" style={{color:color||G.accent,background:bg||"rgba(0,212,255,.1)"}}>{children}</span>;}

function StatusBadge({status,score}){
  if(status==="live") return <Ch color={G.red} bg="rgba(255,68,85,.12)">🔴 LIVE</Ch>;
  if(status==="finished") return <Ch color={G.dim} bg="rgba(255,255,255,.04)">FT {score}</Ch>;
  return <Ch color={G.gold} bg="rgba(255,209,102,.08)">⏰ Upcoming</Ch>;
}

function LiveClock(){
  const [t,setT]=useState("");
  useEffect(()=>{
    const fn=()=>setT(new Date().toLocaleTimeString("en-GB",{timeZone:"Africa/Johannesburg",hour:"2-digit",minute:"2-digit"}));
    fn(); const iv=setInterval(fn,1000); return()=>clearInterval(iv);
  },[]);
  return <span style={{...mono,fontSize:11,color:G.accent}}>{t} {TZ}</span>;
}

// ── TICKER ────────────────────────────────────────────────────────────────────
const TICKS = [
  "✅ Mexico 2-0 South Africa · Mexico -0.5 AH WON",
  "✅ South Korea 2-1 Czechia · Over 2.5 Goals WON",
  "⏰ Canada vs Bosnia · TODAY 20:00 UTC+2",
  "⏰ USA vs Paraguay · TONIGHT 02:00 UTC+2",
  "🏆 WC LIVE · Day 2 · Group Stage Matchday 1",
  "⚽ Brazil vs Morocco · Sat 23:00 UTC+2",
  "⚽ Germany vs Curaçao · Sun 18:00 UTC+2",
  "⚽ Spain vs Cabo Verde · Mon 17:00 UTC+2",
];
function Ticker(){
  const all=[...TICKS,...TICKS];
  return <div className="ticker-bar"><div className="ticker-inner">
    {all.map((t,i)=><span key={i} className="ticker-item">
      <Dot c={t.includes("✅")?G.green:t.includes("🔴")?G.red:t.includes("🏆")?G.gold:G.accent} p={t.includes("LIVE")}/>
      {t}<span style={{color:G.muted,marginLeft:16}}>◆</span>
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
    onSuccess(u);
  }
  async function doSignin(){
    if(!email||!pw){setMsg({t:"e",v:"Enter email and password."});return;}
    setLoading(true);setMsg(null);
    await new Promise(r=>setTimeout(r,1200));
    const saved=localStorage.getItem("bs_user");
    if(saved){onSuccess(JSON.parse(saved));}
    else{setMsg({t:"e",v:"No account found. Please sign up."});setLoading(false);}
  }
  const inp={width:"100%",background:"#060D1A",border:`1px solid ${G.border}`,borderRadius:8,padding:"10px 12px",color:G.text,fontFamily:"inherit",fontSize:13,outline:"none",marginBottom:10};
  return <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div className="modal">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:26,height:26,background:G.grad,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#000",fontSize:13}}>⚡</div>
          <span style={{fontWeight:900,fontSize:15}}>BetSage<span style={{color:G.accent}}>AI</span></span>
        </div>
        <button onClick={onClose} style={{background:"none",border:"none",color:G.dim,cursor:"pointer",fontSize:20}}>✕</button>
      </div>
      {msg&&<div style={{padding:"9px 12px",background:msg.t==="s"?"rgba(0,255,133,.08)":"rgba(255,68,85,.1)",border:`1px solid ${msg.t==="s"?"rgba(0,255,133,.2)":"rgba(255,68,85,.2)"}`,borderRadius:8,fontSize:12,color:msg.t==="s"?G.green:G.red,marginBottom:12}}>{msg.v}</div>}
      {mode==="signup"&&<>
        {plan&&<div style={{background:"rgba(0,255,133,.05)",border:"1px solid rgba(0,255,133,.15)",borderRadius:10,padding:"10px 13px",marginBottom:14}}>
          <div style={{fontWeight:800,color:G.green,fontSize:13}}>🎁 7-Day Free Trial — {plan.name} ${plan.price}/mo</div>
          <div style={{fontSize:11,color:G.dim,marginTop:2}}>No charge until {ted} · Cancel anytime</div>
        </div>}
        <div style={{fontSize:18,fontWeight:900,marginBottom:14}}>Create Account</div>
        <div className="inp-label">FULL NAME</div><input style={inp} placeholder="John Sharp" value={name} onChange={e=>setName(e.target.value)}/>
        <div className="inp-label">EMAIL</div><input style={inp} type="email" placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)}/>
        <div className="inp-label">PASSWORD</div><input style={inp} type="password" placeholder="8+ characters" value={pw} onChange={e=>setPw(e.target.value)}/>
        <div className="inp-label">CONFIRM PASSWORD</div><input style={inp} type="password" placeholder="Repeat password" value={cpw} onChange={e=>setCpw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSignup()}/>
        <div style={{fontSize:11,color:G.dim,marginBottom:14}}>18+ only. By signing up you agree to our Terms.</div>
        <button onClick={doSignup} disabled={loading} className="btn btn-green btn-lg btn-block">{loading?"Creating account...":"Start 7-Day Free Trial 🚀"}</button>
        <div style={{textAlign:"center",marginTop:10,fontSize:12,color:G.dim}}>No charge today · Cancel before {ted}</div>
        <div style={{textAlign:"center",marginTop:12,fontSize:12,color:G.dim}}>Already have an account? <span style={{color:G.accent,cursor:"pointer"}} onClick={()=>{setMode("signin");setMsg(null);}}>Sign in</span></div>
      </>}
      {mode==="signin"&&<>
        <div style={{fontSize:18,fontWeight:900,marginBottom:14}}>Welcome Back</div>
        <div className="inp-label">EMAIL</div><input style={inp} type="email" placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)}/>
        <div className="inp-label">PASSWORD</div><input style={inp} type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSignin()}/>
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
  const fc=v=>v.replace(/\D/g,"").replace(/(.{4})/g,"$1 ").trim().slice(0,19);
  const fe=v=>v.replace(/\D/g,"").replace(/^(\d{2})(\d)/,"$1/$2").slice(0,5);
  async function pay(){
    if(card.replace(/\s/g,"").length<16){setErr("Enter a valid 16-digit card number.");return;}
    if(exp.length<5){setErr("Enter expiry MM/YY.");return;}
    if(cvc.length<3){setErr("Enter your 3-digit CVC.");return;}
    setErr(""); setLoading(true);
    await new Promise(r=>setTimeout(r,2200));
    setLoading(false); setDone(true);
    await new Promise(r=>setTimeout(r,1800));
    const u={...user,plan,trial:true,subscribed:true};
    localStorage.setItem("bs_user",JSON.stringify(u));
    onSuccess(u);
  }
  const inp={width:"100%",background:"#060D1A",border:`1px solid ${G.border}`,borderRadius:8,padding:"10px 12px",color:G.text,fontFamily:"monospace",fontSize:13,outline:"none"};
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
        <div style={{background:"rgba(0,255,133,.05)",border:"1px solid rgba(0,255,133,.15)",borderRadius:11,padding:"12px 14px",marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div><div style={{fontWeight:800,color:G.green,fontSize:13}}>🎁 7-Day Free Trial</div><div style={{fontSize:11,color:G.dim,marginTop:2}}>{plan.name} · No charge until {ted}</div></div>
            <div style={{...mono,fontSize:20,fontWeight:700,color:G.green}}>FREE</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,textAlign:"center"}}>
            {[["Today","FREE",G.green],["Day 7",ted.split(" ").slice(0,2).join(" "),G.gold],["Day 8+",`$${plan.price}/mo`,G.text]].map(([d,v,c])=>(
              <div key={d}><div style={{...mono,fontWeight:700,fontSize:13,color:c}}>{v}</div><div style={{fontSize:10,color:G.dim,marginTop:2}}>{d}</div></div>
            ))}
          </div>
        </div>
        <div style={{background:"#060D1A",border:`1px solid ${G.border}`,borderRadius:10,padding:"13px 14px",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <span style={{fontSize:14}}>💳</span><span style={{fontWeight:700,fontSize:13}}>Card Details</span>
            <span style={{marginLeft:"auto",fontSize:11,color:G.dim}}>🔒 Stripe SSL</span>
          </div>
          <div style={{marginBottom:10}}><div className="inp-label">CARD NUMBER</div><input style={inp} placeholder="1234 5678 9012 3456" value={card} onChange={e=>setCard(fc(e.target.value))} maxLength={19}/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div><div className="inp-label">EXPIRY</div><input style={inp} placeholder="MM/YY" value={exp} onChange={e=>setExp(fe(e.target.value))} maxLength={5}/></div>
            <div><div className="inp-label">CVC</div><input style={inp} placeholder="123" value={cvc} onChange={e=>setCvc(e.target.value.replace(/\D/g,"").slice(0,4))} maxLength={4}/></div>
          </div>
        </div>
        {err&&<div style={{padding:"9px 12px",background:"rgba(255,68,85,.1)",border:"1px solid rgba(255,68,85,.2)",borderRadius:8,fontSize:12,color:G.red,marginBottom:12}}>⚠️ {err}</div>}
        <button onClick={pay} disabled={loading} className="btn btn-green btn-lg btn-block">
          {loading?<><span className="spin">⟳</span> Processing...</>:"Start Free Trial — No Charge Today 🚀"}
        </button>
        <div style={{textAlign:"center",marginTop:10,fontSize:11,color:G.dim}}>Renews ${plan.price}/mo after trial · Cancel anytime</div>
      </>}
    </div>
  </div>;
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function DashPage({user,setPage,startTrial}){
  const won=TRACKER.filter(b=>b.result==="won").length;
  const settled=TRACKER.filter(b=>b.result!=="pending").length;
  const pnl=TRACKER.reduce((a,b)=>a+(b.pnl||0),0);

  return <div className="page">
    {user?.trial&&<div style={{background:"rgba(0,255,133,.05)",border:"1px solid rgba(0,255,133,.18)",borderRadius:11,padding:"11px 14px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
      <div><div style={{fontWeight:800,color:G.green,fontSize:13}}>🎁 Free Trial Active!</div><div style={{fontSize:11,color:G.dim}}>Full {user.plan?.name||"Pro"} access · 7 days free</div></div>
      <Ch color={G.green} bg="rgba(0,255,133,.1)">✓ TRIAL</Ch>
    </div>}

    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4,flexWrap:"wrap",gap:8}}>
      <div className="today-chip"><Dot p/>{TODAY} · {TZ}</div>
      <LiveClock/>
    </div>

    <div style={{marginBottom:16}}>
      <div style={{fontSize:22,fontWeight:900,marginBottom:4}}>
        Welcome{user?.name?`, ${user.name.split(" ")[0]}`:""} ⚡
      </div>
      <div style={{fontSize:12,color:G.dim}}>
        🏆 World Cup <strong style={{color:G.accent}}>Day 2 LIVE</strong> · {won}/{settled} picks won this week
      </div>
    </div>

    {/* WC Live Banner */}
    <div className="wc-banner" style={{marginBottom:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:10,fontWeight:700,color:G.accent,letterSpacing:1,marginBottom:6}}>FIFA WORLD CUP 2026 · DAY 2 · GROUP STAGE</div>
          <div style={{fontSize:18,fontWeight:900,marginBottom:8}}>🏆 WC Results Today</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <Ch color={G.green} bg="rgba(0,255,133,.1)">✅ FT</Ch>
              <span style={{fontSize:13,fontWeight:700}}>Mexico 2-0 South Africa</span>
              <span style={{fontSize:11,color:G.dim}}>Group A</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <Ch color={G.green} bg="rgba(0,255,133,.1)">✅ FT</Ch>
              <span style={{fontSize:13,fontWeight:700}}>South Korea 2-1 Czechia</span>
              <span style={{fontSize:11,color:G.dim}}>Group A</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <Ch color={G.gold} bg="rgba(255,209,102,.08)">⏰ 20:00</Ch>
              <span style={{fontSize:13,fontWeight:700}}>Canada vs Bosnia & Herz.</span>
              <span style={{fontSize:11,color:G.dim}}>Group B · TODAY</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <Ch color={G.gold} bg="rgba(255,209,102,.08)">⏰ 02:00</Ch>
              <span style={{fontSize:13,fontWeight:700}}>USA vs Paraguay</span>
              <span style={{fontSize:11,color:G.dim}}>Group D · Tonight</span>
            </div>
          </div>
        </div>
        <div style={{textAlign:"center",flexShrink:0}}>
          <div style={{...mono,fontSize:36,fontWeight:900,color:G.green,lineHeight:1}}>LIVE</div>
          <div style={{fontSize:10,color:G.dim,fontWeight:700,marginTop:4}}>WC DAY 2</div>
        </div>
      </div>
    </div>

    {/* Stats */}
    <div className="grid4" style={{marginBottom:16}}>
      <div className="stat"><div className="lbl">P&L</div><div className="val" style={{color:G.green}}>+{pnl.toFixed(1)}u</div></div>
      <div className="stat"><div className="lbl">Win Rate</div><div className="val" style={{color:G.accent}}>{Math.round((won/settled)*100)}%</div></div>
      <div className="stat"><div className="lbl">Today</div><div className="val" style={{color:G.gold}}>2</div><div className="sub">WC picks left</div></div>
      <div className="stat"><div className="lbl">WC Day</div><div className="val" style={{color:G.purple}}>2</div><div className="sub">Group stage</div></div>
    </div>

    {/* Today's picks */}
    <div style={{fontWeight:800,fontSize:16,marginBottom:12}}>⭐ Today's WC Picks</div>
    <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
      {TODAYS_PICKS.slice(0,4).map((f,i)=>(
        <div key={i} className="card2" style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",borderLeft:`3px solid ${f.status==="finished"?(f.result==="won"?G.green:G.red):G.gold}`}} onClick={()=>setPage("soccer")}>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",gap:6,marginBottom:3,flexWrap:"wrap",alignItems:"center"}}>
              <StatusBadge status={f.status} score={f.score}/>
              <span style={{fontSize:10,color:G.dim}}>{f.league}</span>
              <span style={{fontSize:10,color:G.muted,background:G.muted,padding:"1px 6px",borderRadius:3,fontWeight:700}}>{f.time} {TZ}</span>
            </div>
            <div style={{fontWeight:700,fontSize:13,marginBottom:2}}>{f.home} vs {f.away}</div>
            <div style={{fontSize:11,color:G.dim,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{f.pick}</div>
          </div>
          <div style={{textAlign:"right",marginLeft:12,flexShrink:0}}>
            <div style={{...mono,fontSize:18,fontWeight:700,color:f.status==="finished"?(f.result==="won"?G.green:G.red):G.gold}}>{f.pickOdds}</div>
            <div style={{fontSize:11,color:f.prob>=80?G.green:G.accent,fontWeight:700}}>{f.prob}%</div>
          </div>
        </div>
      ))}
    </div>

    {/* Recent P&L */}
    <div style={{fontWeight:800,fontSize:16,marginBottom:12}}>📈 Recent P&L</div>
    <div className="card" style={{padding:0,overflow:"hidden",marginBottom:16}}>
      {TRACKER.slice(0,6).map((b,i)=>(
        <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",borderBottom:i<5?`1px solid ${G.border}`:"none"}}>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{b.pick}</div>
            <div style={{fontSize:10,color:G.dim}}>{b.date} · {b.odds} odds</div>
          </div>
          <div style={{textAlign:"right",flexShrink:0,marginLeft:10}}>
            <div style={{...mono,fontWeight:700,color:b.pnl===null?G.dim:b.pnl>=0?G.green:G.red,fontSize:14}}>
              {b.pnl===null?"⏳":`${b.pnl>=0?"+":""}${b.pnl?.toFixed(2)}u`}
            </div>
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

// ── SOCCER / PICKS ────────────────────────────────────────────────────────────
function SoccerPage(){
  const [sub,setSub]=useState("over25");
  const active=SUBTABS.find(t=>t.key===sub);
  const field=active.field;
  const picks=TODAYS_PICKS.filter(p=>p[field]);

  return <div className="page">
    <div className="today-chip"><Dot p/>⚽ SOCCER PICKS · {TODAY} · {TZ}</div>
    <div className="section-head">Soccer Betting Hub</div>
    <div className="section-sub">Real WC fixtures + results · All times {TZ}</div>

    {/* Today's fixtures */}
    <div className="card" style={{marginBottom:16,padding:14}}>
      <div style={{fontSize:11,fontWeight:700,color:G.dim,marginBottom:10,letterSpacing:1}}>TODAY'S WC FIXTURES · {TODAY_SHORT}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {TODAYS_PICKS.map((f,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 12px",background:G.bg,borderRadius:8,border:`1px solid ${G.border}`,borderLeft:`3px solid ${f.status==="finished"?(f.result==="won"?G.green:G.red):G.gold}`}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",gap:6,marginBottom:2,flexWrap:"wrap",alignItems:"center"}}>
                <StatusBadge status={f.status} score={f.score}/>
                <span style={{fontSize:10,color:G.dim}}>{f.league}</span>
              </div>
              <div style={{fontWeight:700,fontSize:13}}>{f.home} vs {f.away}</div>
            </div>
            <div style={{...mono,color:G.gold,fontWeight:700,flexShrink:0,marginLeft:8,fontSize:13}}>
              {f.status==="finished"?f.score:f.time+" "+TZ}
            </div>
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

    <div style={{background:`${active.color}07`,border:`1px solid ${active.color}18`,borderRadius:9,padding:"9px 14px",marginBottom:14,display:"flex",gap:12,alignItems:"center"}}>
      <span style={{fontSize:18}}>{active.icon}</span>
      <div><div style={{fontWeight:800,color:active.color,fontSize:13}}>{active.label} Picks</div>
        <div style={{fontSize:11,color:G.dim}}>{picks.length} fixtures · All times {TZ}</div>
      </div>
      {sub==="over25"&&<div style={{marginLeft:"auto",fontSize:10,color:G.green,fontWeight:700}}>✓ Always in every acca</div>}
    </div>

    <div className="picks-grid">
      {picks.map((f,i)=>{
        const val=f[field]||f.pick;
        const stripe=f.status==="finished"?(f.result==="won"?G.green:G.red):active.color;
        return <div key={f.id} className="pick-card fu" style={{"--s":stripe,animationDelay:`${i*.06}s`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:11}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:6,alignItems:"center"}}>
                <Ch color={f.tag==="SHARP"?G.green:G.accent} bg={f.tag==="SHARP"?"rgba(0,255,133,.1)":"rgba(0,212,255,.1)"}>{f.tag}</Ch>
                <StatusBadge status={f.status} score={f.score}/>
                <span style={{fontSize:10,color:G.dim}}>{f.league}</span>
                <span style={{fontSize:10,color:G.muted,background:G.muted,padding:"1px 5px",borderRadius:3,fontWeight:700}}>{f.time} {TZ}</span>
              </div>
              <div style={{fontWeight:800,fontSize:15}}>{f.home} <span style={{color:G.dim,fontWeight:400,fontSize:12}}>vs</span> {f.away}</div>
              <div style={{fontSize:10,color:G.dim,marginTop:2}}>📍 {f.venue}</div>
            </div>
            <div style={{textAlign:"right",marginLeft:12,flexShrink:0}}>
              <div style={{...mono,fontSize:20,fontWeight:700,color:stripe}}>{f.pickOdds}</div>
              <div style={{fontSize:10,color:G.dim}}>{f.units}u</div>
            </div>
          </div>
          <div style={{background:G.bg,borderRadius:8,padding:"9px 11px",marginBottom:10,border:`1px solid ${G.border}`}}>
            <div style={{fontSize:9,color:G.muted,fontWeight:700,marginBottom:3}}>PICK</div>
            <div style={{...mono,fontWeight:700,color:stripe,fontSize:13}}>{val}</div>
          </div>
          {f.analysis&&<div style={{fontSize:11,color:G.dim,lineHeight:1.65,marginBottom:10,paddingLeft:8,borderLeft:`2px solid ${stripe}40`}}>{f.analysis}</div>}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
            <span style={{fontSize:10,color:G.dim}}>AI Probability</span>
            <div style={{display:"flex",gap:6}}>
              <span style={{...mono,fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:4,background:"rgba(0,255,133,.1)",color:G.green}}>EV+</span>
              <span style={{...mono,fontWeight:700,color:f.prob>=80?G.green:G.accent}}>{f.prob}%</span>
            </div>
          </div>
          <PBar v={f.prob} c={stripe}/>
          <div style={{display:"flex",gap:5,marginTop:11}}>
            {[["1",f.h],["X",f.d],["2",f.a]].map(([l,o])=>(
              <div key={l} style={{flex:1,background:G.bg,border:`1px solid ${G.border}`,borderRadius:6,padding:"5px 0",textAlign:"center"}}>
                <div style={{fontSize:9,color:G.dim,fontWeight:700}}>{l}</div>
                <div style={{...mono,fontWeight:700,fontSize:12,color:G.gold}}>{o}</div>
              </div>
            ))}
          </div>
        </div>;
      })}
    </div>
  </div>;
}

// ── WORLD CUP ─────────────────────────────────────────────────────────────────
function WCPage({startTrial}){
  const [tab,setTab]=useState("fixtures");
  const [gf,setGf]=useState("ALL");
  const filtered=gf==="ALL"?WC_FIXTURES:WC_FIXTURES.filter(f=>f.group===gf);

  return <div className="page">
    <div className="wc-banner" style={{marginBottom:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{fontSize:10,fontWeight:700,color:G.accent,letterSpacing:1,marginBottom:6}}>FIFA WORLD CUP 2026 · GROUP STAGE · DAY 2</div>
          <div style={{fontSize:20,fontWeight:900,marginBottom:4}}>🏆 World Cup 2026 Live</div>
          <div style={{color:G.dim,fontSize:11,marginBottom:10}}>48 teams · 104 matches · North America · All times {TZ}</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            <Ch color={G.green} bg="rgba(0,255,133,.1)">✅ Mexico 2-0 S.Africa</Ch>
            <Ch color={G.green} bg="rgba(0,255,133,.1)">✅ S.Korea 2-1 Czechia</Ch>
            <Ch color={G.gold} bg="rgba(255,209,102,.08)">⏰ Canada vs Bosnia 20:00</Ch>
          </div>
        </div>
        <div style={{textAlign:"center",flexShrink:0,marginLeft:12}}>
          <div style={{...mono,fontSize:36,fontWeight:900,color:G.green,lineHeight:1}}>LIVE</div>
          <div style={{fontSize:9,color:G.dim,fontWeight:700,marginTop:4}}>DAY 2</div>
        </div>
      </div>
    </div>

    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
      {[["fixtures","⚽ Fixtures"],["results","📊 Results"],["groups","🗂️ Groups"],["outrights","🏆 Outrights"]].map(([k,l])=>(
        <button key={k} className={`stab ${tab===k?"active":""}`} style={{"--c":G.accent}} onClick={()=>setTab(k)}>{l}</button>
      ))}
    </div>

    {/* FIXTURES */}
    {tab==="fixtures"&&<>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
        {["ALL","A","B","C","D","E","F","G","H"].map(g=>(
          <button key={g} className={`stab ${gf===g?"active":""}`} style={{"--c":G.gold,padding:"5px 10px",fontSize:10}} onClick={()=>setGf(g)}>
            {g==="ALL"?"All":g}
          </button>
        ))}
      </div>
      <div className="picks-grid">
        {filtered.map((f,i)=>{
          const gc=WC_GROUPS.find(g=>g.group===f.group)?.color||G.accent;
          const stripe=f.status==="finished"?(f.result==="won"?G.green:f.result==="lost"?G.red:G.dim):G.gold;
          return <div key={f.id} className="fixture-card fu" style={{"--s":stripe,animationDelay:`${i*.04}s`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:11}}>
              <div>
                <div style={{display:"flex",gap:5,alignItems:"center",marginBottom:6,flexWrap:"wrap"}}>
                  <span style={{width:20,height:20,borderRadius:5,background:`${gc}18`,color:gc,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,...mono}}>{f.group}</span>
                  <StatusBadge status={f.status} score={f.score}/>
                  <span style={{fontSize:10,color:G.dim}}>{f.date} · {f.time} {TZ}</span>
                </div>
                <div style={{fontWeight:800,fontSize:15}}>{f.home} <span style={{color:G.dim,fontWeight:400,fontSize:12}}>vs</span> {f.away}</div>
                <div style={{fontSize:10,color:G.dim,marginTop:2}}>📍 {f.venue}</div>
              </div>
              <div style={{background:G.bg,borderRadius:7,padding:"6px 8px",marginLeft:10,flexShrink:0,textAlign:"center"}}>
                <div style={{fontSize:9,color:G.muted,marginBottom:3,...mono}}>1·X·2</div>
                <div style={{display:"flex",gap:5}}>{[f.h,f.d,f.a].map((o,j)=><span key={j} style={{fontWeight:700,fontSize:12,color:G.gold,...mono}}>{o}</span>)}</div>
              </div>
            </div>
            <div style={{background:G.bg,borderRadius:7,padding:"8px 10px",marginBottom:9,border:`1px solid ${G.border}`}}>
              <div style={{fontSize:9,color:G.muted,fontWeight:700,marginBottom:3}}>⚡ AI PICK</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{...mono,fontWeight:700,color:stripe,fontSize:12}}>{f.pick}</div>
                <div style={{display:"flex",gap:5,alignItems:"center"}}>
                  <Ch color={f.tag==="SHARP"?G.green:G.accent} bg={f.tag==="SHARP"?"rgba(0,255,133,.1)":"rgba(0,212,255,.1)"}>{f.tag}</Ch>
                  <span style={{...mono,fontWeight:700,color:G.gold,fontSize:13}}>{f.pickOdds}</span>
                </div>
              </div>
            </div>
            {f.note&&<div style={{fontSize:11,color:f.status==="finished"?(f.result==="won"?G.green:G.red):G.dim,marginBottom:9,paddingLeft:8,borderLeft:`2px solid ${stripe}40`,lineHeight:1.6}}>{f.note}</div>}
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontSize:10,color:G.dim}}>AI Probability</span>
              <span style={{...mono,fontWeight:700,color:f.prob>=80?G.green:G.accent}}>{f.prob}%</span>
            </div>
            <PBar v={f.prob} c={f.prob>=80?G.green:G.accent}/>
          </div>;
        })}
      </div>
    </>}

    {/* RESULTS */}
    {tab==="results"&&<>
      <div style={{fontWeight:800,fontSize:15,marginBottom:14}}>Yesterday & Today's Results</div>
      {WC_FIXTURES.filter(f=>f.status==="finished").map((f,i)=>(
        <div key={i} className="card2 fu" style={{marginBottom:10,borderLeft:`3px solid ${f.result==="won"?G.green:G.red}`,animationDelay:`${i*.06}s`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:6}}>
                <Ch color={G.dim} bg="rgba(255,255,255,.04)">FT</Ch>
                <span style={{fontSize:10,color:G.dim}}>Group {f.group} · {f.date}</span>
              </div>
              <div style={{fontWeight:800,fontSize:16}}>{f.home} <span style={{...mono,color:G.accent}}>{f.score}</span> {f.away}</div>
              <div style={{fontSize:11,color:G.dim,marginTop:4}}>📍 {f.venue}</div>
            </div>
            <div style={{textAlign:"right",flexShrink:0,marginLeft:10}}>
              <div style={{fontSize:12,fontWeight:700,color:f.result==="won"?G.green:G.red}}>{f.result==="won"?"✓ WON":"✗ LOST"}</div>
              <div style={{fontSize:11,color:G.dim,marginTop:2}}>Pick: {f.pick}</div>
              <div style={{...mono,fontSize:13,color:G.gold}}>{f.pickOdds}</div>
            </div>
          </div>
          {f.note&&<div style={{fontSize:11,color:G.dim,marginTop:8,paddingTop:8,borderTop:`1px solid ${G.border}`}}>{f.note}</div>}
        </div>
      ))}
    </>}

    {/* GROUPS */}
    {tab==="groups"&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:12}}>
      {WC_GROUPS.map((g,i)=>(
        <div key={i} className="card2" style={{borderColor:`${g.color}20`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <div style={{width:28,height:28,borderRadius:7,background:`${g.color}18`,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontWeight:800,color:g.color,fontSize:13,...mono}}>{g.group}</span>
            </div>
            <div style={{fontWeight:800,fontSize:14}}>Group {g.group}</div>
          </div>
          <div style={{fontSize:10,color:G.dim,fontWeight:700,marginBottom:6,display:"grid",gridTemplateColumns:"1fr auto auto",gap:"0 10px",paddingBottom:4,borderBottom:`1px solid ${G.border}`}}>
            <span>Team</span><span>Pts</span><span>GD</span>
          </div>
          {g.standings.map((t,j)=>(
            <div key={j} style={{display:"grid",gridTemplateColumns:"1fr auto auto",gap:"0 10px",padding:"6px 0",borderBottom:j<3?`1px solid ${G.border}40`:"none",alignItems:"center"}}>
              <span style={{fontSize:12,fontWeight:j===0&&g.standings[0].p>0?700:400,color:j===0&&g.standings[0].p>0?G.text:G.dim}}>{t.t}</span>
              <span style={{...mono,fontSize:12,fontWeight:700,color:t.p>0?G.green:G.dim}}>{t.p}</span>
              <span style={{...mono,fontSize:11,color:G.dim}}>{t.gd}</span>
            </div>
          ))}
        </div>
      ))}
    </div>}

    {/* OUTRIGHTS */}
    {tab==="outrights"&&<div className="picks-grid">
      {[
        {team:"Argentina 🇦🇷",odds:4.50,prob:22,tag:"SHARP",note:"Defending champions · Messi leads · Scaloni's best squad"},
        {team:"France 🇫🇷",odds:5.00,prob:20,tag:"VALUE",note:"Mbappé + depth · Strong group draw"},
        {team:"Brazil 🇧🇷",odds:6.00,prob:17,tag:"VALUE",note:"Host continent · Vinicius Jr · Carlo Ancelotti"},
        {team:"England 🏴󠁧󠁢󠁥󠁮󠁧󠁿",odds:7.00,prob:14,tag:"VALUE",note:"Kane + Bellingham · Favourable draw"},
        {team:"Spain 🇪🇸",odds:8.00,prob:13,tag:"LONG",note:"Yamal & Pedri · Highest FIFA ranked"},
        {team:"Germany 🇩🇪",odds:10.0,prob:10,tag:"LONG",note:"New era post-2022 · Strong squad"},
        {team:"Portugal 🇵🇹",odds:12.0,prob:8,tag:"LONG",note:"Ronaldo's final WC · Strong supporting cast"},
        {team:"Netherlands 🇳🇱",odds:14.0,prob:7,tag:"LONG",note:"Van Dijk leads · Reijnders in midfield"},
      ].map((o,i)=>(
        <div key={i} className="card2 fu" style={{animationDelay:`${i*.05}s`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:11}}>
            <div><div style={{fontWeight:900,fontSize:18,marginBottom:3}}>{o.team}</div><div style={{fontSize:11,color:G.dim}}>{o.note}</div></div>
            <div style={{textAlign:"right",flexShrink:0,marginLeft:10}}>
              <div style={{...mono,fontSize:22,fontWeight:700,color:G.gold}}>{o.odds}</div>
              <Ch color={o.tag==="SHARP"?G.green:o.tag==="VALUE"?G.accent:G.orange} bg={o.tag==="SHARP"?"rgba(0,255,133,.1)":o.tag==="VALUE"?"rgba(0,212,255,.1)":"rgba(255,140,66,.1)"}>{o.tag}</Ch>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
            <span style={{fontSize:10,color:G.dim}}>AI Win Probability</span>
            <span style={{...mono,fontWeight:700,color:G.green}}>{o.prob}%</span>
          </div>
          <PBar v={o.prob} c={G.gradGold}/>
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
    const available=TODAYS_PICKS.filter(p=>p.status==="upcoming");
    const picks=available.map(p=>`${p.league}: ${p.home} vs ${p.away} ${p.time} UTC+2 | Pick: ${p.pick} @ ${p.pickOdds} (${p.prob}%)`).join("\n");
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:900,messages:[{role:"user",content:`You are BetSageAI. Today is ${TODAY} (UTC+2). World Cup 2026 is LIVE - Day 2!\n\nAvailable upcoming picks today:\n${picks}\n\nBuild a ${legs}-leg accumulator. RULES:\n1. MUST include Over 2.5 Goals pick\n2. MUST include a Corners or BTTS market\n3. Only 78%+ probability picks\n4. Target 5x-15x combined odds\n5. All times shown in UTC+2\n\nRespond ONLY valid JSON no extra text:\n{"title":"${legs}-Leg WC Power Acca","combined_odds":0.00,"ai_probability":0,"stake":"1-2 units","legs":[{"league":"","match":"","time":"00:00 UTC+2","pick":"","odds":0.00,"prob":0,"market":"","reason":""}],"analysis":"2 sentences","warning":"1 sentence risk note"}`}]})});
      const d=await res.json();
      const raw=d.content?.map(c=>c.text||"").join("")||"";
      setAcca(JSON.parse(raw.replace(/```json|```/g,"").trim()));
    }catch{setAcca({error:"⚠️ Add your Anthropic API key to generate live AI accumulators."});}
    setLoading(false);
  }

  return <div className="page">
    <div className="today-chip"><Dot c={G.gold} p/>🎰 AI ACCUMULATOR · {TODAY}</div>
    <div className="section-head">AI Accumulator Builder</div>
    <div className="section-sub">AI selects from today's real WC games · O2.5 + Corners + BTTS always · {TZ}</div>
    <div className="card" style={{marginBottom:16}}>
      <div style={{marginBottom:12}}>
        <div style={{fontSize:11,color:G.dim,fontWeight:700,marginBottom:8}}>NUMBER OF LEGS</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{[3,4,5,6].map(n=><button key={n} className={`stab ${legs===n?"active":""}`} style={{"--c":G.accent}} onClick={()=>setLegs(n)}>{n} Legs</button>)}</div>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
        {[["⚽","O2.5 Goals",G.green],["📐","Corners",G.purple],["🥅","BTTS",G.orange],["🎯","80%+ prob",G.accent]].map(([ico,txt,c])=>(
          <span key={txt} style={{background:`${c}08`,border:`1px solid ${c}20`,borderRadius:7,padding:"5px 10px",fontSize:11,color:c,fontWeight:600,display:"flex",gap:4,alignItems:"center"}}>{ico} {txt}</span>
        ))}
      </div>
      <button onClick={gen} disabled={loading} className="btn btn-gold btn-md btn-block">
        {loading?<><span className="spin">⟳</span> Building...</>:"🎰 Generate Acca"}
      </button>
    </div>

    {loading&&<div style={{background:"linear-gradient(135deg,#0C1826,#0E1E38)",border:"1px solid rgba(0,212,255,.15)",borderRadius:16,padding:"36px 20px",textAlign:"center"}}>
      <div style={{fontSize:36,marginBottom:10}}>🎰</div>
      <div style={{fontWeight:800,marginBottom:5}}>Building your {legs}-leg WC acca...</div>
      <div style={{color:G.dim,fontSize:12}}>Selecting from today's real World Cup games</div>
    </div>}

    {acca?.error&&<div className="card"><div style={{...mono,color:G.gold,fontSize:13}}>{acca.error}</div></div>}

    {acca&&!acca.error&&<div style={{background:"linear-gradient(135deg,#0C1826,#0E1E38)",border:"1px solid rgba(0,212,255,.18)",borderRadius:16,padding:20}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
        <div><Ch color={G.green} bg="rgba(0,255,133,.1)">AI GENERATED · {TODAY}</Ch>
          <div style={{fontSize:18,fontWeight:900,marginTop:9}}>{acca.title}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{...mono,fontSize:32,fontWeight:700,color:G.gold,lineHeight:1}}>{typeof acca.combined_odds==="number"?acca.combined_odds.toFixed(2):acca.combined_odds}x</div>
          <div style={{fontSize:12,color:G.green,fontWeight:700,marginTop:4}}>{acca.ai_probability}% prob</div>
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,color:G.dim}}>Win Probability</span><span style={{...mono,fontWeight:700,color:acca.ai_probability>=80?G.green:G.gold}}>{acca.ai_probability}%</span></div>
      <PBar v={acca.ai_probability} c={acca.ai_probability>=80?G.green:G.gold}/>
      <div style={{marginTop:16,marginBottom:8,fontSize:11,fontWeight:700,color:G.dim,letterSpacing:1}}>LEGS</div>
      {acca.legs?.map((leg,i)=>(
        <div key={i} style={{background:"rgba(0,212,255,.04)",border:"1px solid rgba(0,212,255,.1)",borderRadius:9,padding:"12px 14px",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:5,marginBottom:4,flexWrap:"wrap",alignItems:"center"}}>
                <span style={{fontSize:10,color:G.dim}}>{leg.league}</span>
                {leg.time&&<span style={{...mono,fontSize:10,color:G.muted,background:G.muted,padding:"1px 6px",borderRadius:3,fontWeight:700}}>{leg.time}</span>}
                {leg.market&&<Ch color={G.purple} bg="rgba(180,127,255,.1)">{leg.market}</Ch>}
              </div>
              <div style={{fontWeight:700,fontSize:13,marginBottom:3}}>{leg.match}</div>
              <div style={{...mono,fontWeight:700,color:G.accent,fontSize:12,marginBottom:3}}>{leg.pick}</div>
              <div style={{fontSize:11,color:G.dim}}>{leg.reason}</div>
            </div>
            <div style={{textAlign:"right",marginLeft:14,flexShrink:0}}>
              <div style={{...mono,fontSize:18,fontWeight:700,color:G.gold}}>{typeof leg.odds==="number"?leg.odds.toFixed(2):leg.odds}</div>
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
        <div style={{flex:1,background:G.card2,borderRadius:8,padding:"10px 12px"}}><div style={{fontSize:10,color:G.dim,marginBottom:3}}>STAKE</div><div style={{...mono,fontWeight:700}}>{acca.stake}</div></div>
        <button onClick={gen} className="btn btn-gold btn-md" style={{flex:1}}>🔄 Regenerate</button>
      </div>
    </div>}

    {!acca&&!loading&&<div style={{background:"linear-gradient(135deg,#0C1826,#0E1E38)",border:"1px solid rgba(0,212,255,.1)",borderRadius:16,padding:"40px 20px",textAlign:"center"}}>
      <div style={{fontSize:48,marginBottom:12}}>🎰</div>
      <div style={{fontWeight:800,fontSize:17,marginBottom:7}}>Build Your WC Accumulator</div>
      <div style={{color:G.dim,fontSize:12,marginBottom:20}}>AI picks from today's real World Cup games · Always O2.5 + Corners + BTTS</div>
      <button onClick={gen} className="btn btn-gold btn-lg btn-block">🎰 Generate My Accumulator</button>
    </div>}
  </div>;
}

// ── BET TRACKER ───────────────────────────────────────────────────────────────
function TrackerPage(){
  const [bets,setBets]=useState(TRACKER);
  const [adding,setAdding]=useState(false);
  const [f,setF]=useState({league:"",pick:"",odds:"",units:"",result:"pending"});
  const settled=bets.filter(b=>b.result!=="pending");
  const wins=settled.filter(b=>b.result==="won").length;
  const pnl=bets.reduce((a,b)=>a+(b.pnl||0),0);
  const roi=settled.length>0?((pnl/settled.reduce((a,b)=>a+b.units,0))*100).toFixed(1):0;
  function addBet(){
    if(!f.pick||!f.odds||!f.units) return;
    const p=parseFloat(f.odds),u=parseFloat(f.units);
    const nl=f.result==="won"?(p-1)*u:f.result==="lost"?-u:null;
    setBets(prev=>[{id:Date.now(),date:TODAY_SHORT,league:f.league||"Custom",pick:f.pick,odds:p,units:u,result:f.result,pnl:nl},...prev]);
    setF({league:"",pick:"",odds:"",units:"",result:"pending"});setAdding(false);
  }
  const inp2={background:G.card2,border:`1px solid ${G.border}`,borderRadius:7,padding:"8px 10px",color:G.text,fontFamily:"inherit",fontSize:12,outline:"none",width:"100%"};
  return <div className="page">
    <div className="today-chip"><Dot c={G.gold} p/>💰 BET TRACKER · {TODAY}</div>
    <div className="section-head">Money Tracker</div>
    <div className="section-sub">Full P&L · ROI · Win rate — BetWatch style</div>
    <div className="grid4" style={{marginBottom:16}}>
      {[{l:"P&L",v:`${pnl>=0?"+":""}${pnl.toFixed(1)}u`,c:pnl>=0?G.green:G.red},{l:"ROI",v:`${roi>=0?"+":""}${roi}%`,c:roi>=0?G.green:G.red},{l:"W/L",v:`${wins}-${settled.length-wins}`,c:G.accent},{l:"Pending",v:bets.filter(b=>b.result==="pending").length,c:G.gold}].map((s,i)=>(
        <div key={i} className="stat"><div className="lbl">{s.l}</div><div className="val" style={{color:s.c}}>{s.v}</div></div>
      ))}
    </div>
    <div style={{display:"flex",justifyContent:"flex-end",marginBottom:12}}>
      <button onClick={()=>setAdding(a=>!a)} className={`btn btn-sm ${adding?"btn-outline":"btn-grad"}`}>
        {adding?"✕ Cancel":"+ Add Bet"}
      </button>
    </div>
    {adding&&<div className="card" style={{marginBottom:14}}>
      <div style={{fontWeight:700,marginBottom:12}}>Log a New Bet</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:9}}>
        {[["League","league","e.g. WC Group B"],["Pick","pick","e.g. Canada Win"],["Odds","odds","e.g. 1.85"],["Units","units","e.g. 2"]].map(([l,k,ph])=>(
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
        <div key={b.id||i} className={`tracker-row fu`} style={{animationDelay:`${i*.04}s`,background:i%2===0?"#07101A":"transparent"}}>
          <div style={{...mono,fontSize:10,color:G.dim}}>{b.date}</div>
          <div style={{fontSize:12,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.pick}</div>
          <div className="hide-mob" style={{...mono,color:G.gold,fontSize:12,fontWeight:700}}>{b.odds}</div>
          <div className="hide-mob" style={{...mono,color:G.dim,fontSize:11}}>{b.units}u</div>
          <Ch color={b.result==="won"?G.green:b.result==="lost"?G.red:G.gold} bg={b.result==="won"?"rgba(0,255,133,.1)":b.result==="lost"?"rgba(255,68,85,.1)":"rgba(255,209,102,.1)"}>
            {b.result==="won"?"✓ W":b.result==="lost"?"✗ L":"⏳"}
          </Ch>
          <div style={{...mono,fontWeight:700,color:b.pnl===null?G.dim:b.pnl>=0?G.green:G.red,fontSize:12}}>
            {b.pnl===null?"–":`${b.pnl>=0?"+":""}${b.pnl?.toFixed(2)}u`}
          </div>
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
    <div className="section-head">Simple Pricing</div>
    <div className="section-sub">Start free for 7 days. No charge until trial ends. Cancel anytime.</div>
    <div style={{background:"rgba(0,255,133,.05)",border:"1px solid rgba(0,255,133,.18)",borderRadius:12,padding:"13px 15px",marginBottom:20}}>
      <div style={{fontWeight:800,color:G.green,fontSize:13,marginBottom:3}}>🎁 7 Days Free — No Charge Today</div>
      <div style={{fontSize:11,color:G.dim}}>Enter your card to reserve your spot. Cancel before {ted} and pay nothing.</div>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:22}}>
      {PLANS.map((plan,i)=>(
        <div key={i} className={`plan-card ${plan.badge==="MOST POPULAR"?"popular":""}`}>
          {plan.badge&&<div style={{position:"absolute",top:-12,left:18,background:plan.badge==="MOST POPULAR"?G.grad:G.gradGold,color:"#000",fontWeight:800,fontSize:10,padding:"3px 12px",borderRadius:20,whiteSpace:"nowrap"}}>{plan.badge}</div>}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
            <div>
              <div style={{color:G.dim,fontSize:10,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>{plan.name}</div>
              <div><span style={{...mono,fontSize:34,fontWeight:700,color:plan.badge==="MOST POPULAR"?G.green:G.text}}>${plan.price}</span><span style={{color:G.dim,fontSize:12}}>/mo</span></div>
              <div style={{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(0,255,133,.07)",border:"1px solid rgba(0,255,133,.15)",borderRadius:20,padding:"3px 10px",fontSize:10,fontWeight:700,color:G.green,marginTop:6}}>🎁 7 days FREE</div>
            </div>
            <button onClick={()=>startTrial(plan)} className={`btn btn-sm ${plan.badge==="MOST POPULAR"?"btn-green":"btn-outline"}`} style={{flexShrink:0,marginLeft:12}}>
              Start Free →
            </button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
            {plan.features.map((ft,j)=>(
              <div key={j} style={{display:"flex",gap:5,alignItems:"flex-start",fontSize:11,color:j<2?G.text:G.dim}}>
                <span style={{color:G.green,fontWeight:700,flexShrink:0}}>✓</span>{ft}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="card" style={{textAlign:"center"}}>
      <div style={{fontSize:18,fontWeight:900,marginBottom:4}}>Path to $5K/Month MRR</div>
      <div style={{color:G.dim,fontSize:11,marginBottom:14}}>Subscriptions + 20% affiliate commissions</div>
      <div className="grid3">
        {[{n:51,plan:"Pro $99",mrr:"$5,049"},{n:173,plan:"Starter $29",mrr:"$5,017"},{n:25,plan:"Elite $199",mrr:"$4,975"}].map((r,i)=>(
          <div key={i} style={{background:G.bg,borderRadius:10,padding:14}}>
            <div style={{...mono,fontSize:24,fontWeight:700,color:G.green}}>{r.n}</div>
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
  const mrr=AFFILIATES.filter(r=>r.status==="active").reduce((a,r)=>a+r.earned,0);
  function copy(){navigator.clipboard.writeText(link).catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),2000);}
  return <div className="page">
    <div className="today-chip"><Dot c={G.green} p/>🤝 AFFILIATE PROGRAM</div>
    <div className="section-head">Earn While They Win</div>
    <div className="section-sub">20% recurring commission every month, for life</div>
    <div className="grid2" style={{marginBottom:14}}>
      {[{l:"Monthly MRR",v:`$${mrr.toFixed(2)}`,c:G.green},{l:"Active Refs",v:AFFILIATES.filter(r=>r.status==="active").length,c:G.accent},{l:"All Time",v:"$426",c:G.gold},{l:"Next Pay",v:"1 Jul",c:G.text}].map((s,i)=>(
        <div key={i} className="stat"><div className="lbl">{s.l}</div><div className="val" style={{color:s.c}}>{s.v}</div></div>
      ))}
    </div>
    <div className="card" style={{marginBottom:14}}>
      <div style={{fontWeight:700,marginBottom:10}}>Your Referral Link</div>
      <div onClick={copy} style={{background:"#060D1A",border:`1px solid ${G.border}`,borderRadius:8,padding:"11px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",marginBottom:10}}>
        <span style={{...mono,fontSize:11,color:G.accent,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{link}</span>
        <span style={{fontSize:11,fontWeight:700,color:copied?G.green:G.dim,flexShrink:0,marginLeft:8}}>{copied?"✓ COPIED!":"COPY"}</span>
      </div>
      <div style={{display:"flex",gap:8}}>
        <a href={`https://wa.me/?text=Try BetSageAI — World Cup 2026 AI picks! ${link}`} target="_blank" rel="noreferrer" style={{flex:1,textDecoration:"none",background:G.wa,color:"#fff",fontFamily:"inherit",fontWeight:700,fontSize:12,padding:"10px 14px",borderRadius:8,textAlign:"center"}}>💬 WhatsApp</a>
        <a href={`https://twitter.com/intent/tweet?text=BetSageAI — AI picks for WC2026! ${link}`} target="_blank" rel="noreferrer" style={{flex:1,textDecoration:"none",background:"linear-gradient(135deg,#1DA1F2,#0d8ecf)",color:"#fff",fontFamily:"inherit",fontWeight:700,fontSize:12,padding:"10px 14px",borderRadius:8,textAlign:"center"}}>🐦 Twitter</a>
      </div>
    </div>
    <div className="card">
      <div style={{fontWeight:700,marginBottom:12}}>Commission Structure</div>
      {[{plan:"Starter $29",comm:"$5.80/mo"},{plan:"Pro $99",comm:"$19.80/mo",hot:true},{plan:"Elite $199",comm:"$39.80/mo"}].map((t,i)=>(
        <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"11px 0",borderBottom:i<2?`1px solid ${G.border}`:"none"}}>
          <span style={{fontSize:13,fontWeight:600}}>{t.plan}</span>
          <span style={{...mono,fontWeight:700,color:t.hot?G.green:G.accent}}>{t.comm}</span>
        </div>
      ))}
      <div style={{marginTop:12,background:"rgba(0,255,133,.05)",border:"1px solid rgba(0,255,133,.15)",borderRadius:9,padding:12,fontSize:12,color:G.dim}}>
        💡 50 Pro referrals = <strong style={{color:G.green}}>$990/month</strong> passive income
      </div>
      <div style={{marginTop:14,fontWeight:700,marginBottom:10}}>Your Referrals</div>
      {AFFILIATES.map((r,i)=>(
        <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:i<AFFILIATES.length-1?`1px solid ${G.border}`:"none"}}>
          <div><div style={{fontWeight:600,fontSize:13}}>{r.name}</div><div style={{fontSize:11,color:G.dim}}>{r.plan}</div></div>
          <Ch color={r.status==="active"?G.green:G.red} bg={r.status==="active"?"rgba(0,255,133,.1)":"rgba(255,68,85,.1)"}>{r.status==="active"?`+$${r.earned}/mo`:"Churned"}</Ch>
        </div>
      ))}
    </div>
  </div>;
}

// ── WHATSAPP ──────────────────────────────────────────────────────────────────
function WAPage(){
  const groups=[{n:"BetSageAI · Starter",m:312,t:"Starter",open:true},{n:"BetSageAI · Pro VIP",m:187,t:"Pro",open:true,pop:true},{n:"BetSageAI · Elite WC",m:43,t:"Elite",open:false}];
  return <div className="page">
    <div className="today-chip"><Dot c="#25D366" p/>💬 WHATSAPP GROUPS · LIVE</div>
    <div className="section-head">VIP WhatsApp Groups</div>
    <div className="section-sub">WC picks delivered to your WhatsApp the moment AI finds value</div>
    <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
      {groups.map((g,i)=>(
        <div key={i} className="card" style={{borderColor:g.pop?"rgba(37,211,102,.2)":G.border}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <span style={{fontSize:26}}>💬</span>
              <div><div style={{fontWeight:800,fontSize:14}}>{g.n}</div><div style={{fontSize:11,color:G.dim}}>{g.t} subscribers only</div></div>
            </div>
            <Ch color={g.open?"#25D366":G.red} bg={g.open?"rgba(37,211,102,.1)":"rgba(255,68,85,.1)"}>{g.open?"🟢 Open":"🔴 Invite"}</Ch>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div><div style={{...mono,fontSize:22,fontWeight:700,color:"#25D366"}}>{g.m}</div><div style={{fontSize:10,color:G.dim}}>members</div></div>
            <div style={{fontSize:11,color:G.dim}}>🏆 WC picks daily</div>
          </div>
          <button style={{width:"100%",background:"linear-gradient(135deg,#25D366,#128C7E)",color:"#fff",fontFamily:"inherit",fontWeight:700,fontSize:13,padding:"11px",borderRadius:8,border:"none",cursor:"pointer"}}>💬 Join Group</button>
        </div>
      ))}
    </div>
    <div className="card">
      <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>How WC Picks Are Delivered</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {[["01","AI Detects Value","Scans WC odds 24/7 for EV+ picks"],["02","Instant Alert","Pick + odds + analysis sent in seconds"],["03","Line Update","Alert if the line moves before kickoff"],["04","Result Posted","Win/loss + unit P&L after the game"]].map(([s,t,d])=>(
          <div key={s}>
            <div style={{...mono,fontWeight:700,fontSize:12,color:"#25D366",marginBottom:5}}>{s}</div>
            <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>{t}</div>
            <div style={{fontSize:12,color:G.dim,lineHeight:1.6}}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  </div>;
}

// ── NAV CONFIG ────────────────────────────────────────────────────────────────
const PAGES=[
  {key:"dashboard",ico:"⚡",label:"Dashboard"},
  {key:"worldcup",ico:"🏆",label:"World Cup",badge:"LIVE",bc:G.red},
  {key:"soccer",ico:"⚽",label:"Soccer Hub",badge:"WC",bc:G.green},
  {key:"accumulator",ico:"🎰",label:"AI Acca"},
  {key:"tracker",ico:"💰",label:"Tracker"},
  {key:"affiliate",ico:"🤝",label:"Affiliate"},
  {key:"whatsapp",ico:"💬",label:"WhatsApp"},
  {key:"pricing",ico:"💳",label:"Pricing"},
];
const BOT_NAV=[
  {key:"dashboard",ico:"⚡",label:"Home"},
  {key:"soccer",ico:"⚽",label:"Picks"},
  {key:"worldcup",ico:"🏆",label:"WC Live"},
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

    <div className="shell">
      {/* TOP NAV */}
      <div className="topnav">
        <div style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer",flexShrink:0}} onClick={()=>setPage("dashboard")}>
          <div style={{width:26,height:26,background:G.grad,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:13,color:"#000"}}>⚡</div>
          <span style={{fontWeight:900,fontSize:15,letterSpacing:"-.5px"}}>BetSage<span style={{color:G.accent}}>AI</span></span>
          {user?.trial&&<Ch color={G.green} bg="rgba(0,255,133,.08)" style={{fontSize:9}}>🎁 TRIAL</Ch>}
        </div>
        <div style={{flex:1,display:"flex",justifyContent:"center"}}>
          <LiveClock/>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
          <div style={{background:"rgba(255,68,85,.08)",border:"1px solid rgba(255,68,85,.25)",borderRadius:20,padding:"3px 10px",fontSize:10,color:G.red,fontWeight:700,whiteSpace:"nowrap"}}>
            <span style={{animation:"pulse 1.5s infinite",display:"inline-block",width:5,height:5,borderRadius:"50%",background:G.red,marginRight:4}}/>WC LIVE
          </div>
          {!user
            ?<button onClick={()=>setAuthModal({mode:"signup",plan:PLANS[1]})} className="btn btn-green btn-sm">Free Trial</button>
            :<button onClick={signOut} style={{background:"transparent",border:`1px solid ${G.border}`,color:G.dim,fontFamily:"inherit",padding:"5px 11px",borderRadius:7,cursor:"pointer",fontSize:11}}>Sign Out</button>
          }
        </div>
      </div>

      <Ticker/>

      <div className="body-wrap">
        {/* SIDEBAR */}
        <div className="sidebar">
          {PAGES.map(p=>(
            <button key={p.key} onClick={()=>setPage(p.key)} className={`snav ${page===p.key?"active":""}`}>
              <span className="ico">{p.ico}</span>{p.label}
              {p.badge&&<span className="nbadge" style={{background:`${p.bc||G.accent}18`,color:p.bc||G.accent}}>{p.badge}</span>}
            </button>
          ))}
          <div style={{marginTop:"auto",paddingTop:14,display:"flex",flexDirection:"column",gap:8}}>
            {!user
              ?<button onClick={()=>startTrial(PLANS[1])} className="btn btn-green btn-sm btn-block">🎁 Free Trial</button>
              :<div style={{background:"rgba(0,255,133,.05)",border:"1px solid rgba(0,255,133,.14)",borderRadius:8,padding:"9px 11px"}}>
                <div style={{fontSize:9,color:G.green,fontWeight:700,marginBottom:2}}>TRIAL ACTIVE</div>
                <div style={{fontSize:10,color:G.dim}}>{user.plan?.name||"Pro"} plan · 7 days free</div>
              </div>
            }
            <div style={{background:"rgba(255,209,102,.04)",border:"1px solid rgba(255,209,102,.12)",borderRadius:8,padding:"8px 10px"}}>
              <div style={{fontSize:9,color:G.gold,fontWeight:700,marginBottom:2}}>⚠️ 18+ ONLY</div>
              <div style={{fontSize:9,color:G.dim}}>Entertainment only · Bet responsibly</div>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="page" style={{padding:0}}>
          {page==="dashboard"&&<DashPage user={user} setPage={setPage} startTrial={startTrial}/>}
          {page==="worldcup"&&<WCPage startTrial={startTrial}/>}
          {page==="soccer"&&<SoccerPage/>}
          {page==="accumulator"&&<AccaPage/>}
          {page==="tracker"&&<TrackerPage/>}
          {page==="affiliate"&&<AffiliatePage/>}
          {page==="whatsapp"&&<WAPage/>}
          {page==="pricing"&&<PricingPage startTrial={startTrial}/>}
        </div>
      </div>

      {/* BOTTOM NAV */}
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
