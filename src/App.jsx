import { useState } from 'react';

// ── DATE CONSTANTS ───────────────────────────────────────────────────
const TODAY = new Date().toLocaleDateString('en-GB', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});
const WC_START_DATE = new Date('2026-06-11'); // World Cup start date
const WC_DAYS = Math.ceil((WC_START_DATE - new Date()) / (1000 * 60 * 60 * 24));
const TZ = 'UTC+2';

// ── TOKENS ────────────────────────────────────────────────────────────
const G = {
  bg: "#05080F",
  card: "#0B1422",
  card2: "#0F1B2E",
  border: "#182840",
  accent: "#00E5FF",
  green: "#00FF88",
  gold: "#FFD166",
  red: "#FF4560",
  purple: "#C084FC",
  orange: "#FB923C",
  muted: "#2A4060",
  text: "#D8E8F8",
  dim: "#5A7A9A",
  grad: "linear-gradient(135deg,#00E5FF,#00FF88)",
  gradGold: "linear-gradient(135deg,#FFD166,#FB923C)",
  gradGreen: "linear-gradient(135deg,#00FF88,#00CC6A)",
  wa: "linear-gradient(135deg,#25D366,#128C7E)",
};

// ── COMPONENT: DATE STRIP ────────────────────────────────────────────
function DateStrip() {
  // You can add state for selected date, etc.
  return (
    <div style={{ padding: '16px', background: G.card, color: G.text }}>
      <div style={{ fontSize: '14px', color: G.dim }}>
        {TODAY} · {TZ} · {WC_DAYS} Days to WC
      </div>
      {/* Calendar strip or date navigation here */}
      {/* Example: Add date buttons or a scrollable date list */}
    </div>
  );
}

// ── COMPONENTS FOR OTHER PAGES ──────────────────────────────────────
// Your other components like DashPage, SoccerPage, etc., would follow here.

export default function App() {
  const [page, setPage] = useState('dashboard');
  // ... (rest of your app logic)

  return (
    <>
      <DateStrip />
      {/* The rest of your layout, navbar, and page components */}
    </>
  );
}
// ── TOKENS ────────────────────────────────────────────────────────────────────
const G = {
  bg:"#05080F", card:"#0B1422", card2:"#0F1B2E", border:"#182840",
  accent:"#00E5FF", green:"#00FF88", gold:"#FFD166", red:"#FF4560",
  purple:"#C084FC", orange:"#FB923C", muted:"#2A4060", text:"#D8E8F8", dim:"#5A7A9A",
  grad:"linear-gradient(135deg,#00E5FF,#00FF88)",
  gradGold:"linear-gradient(135deg,#FFD166,#FB923C)",
  gradGreen:"linear-gradient(135deg,#00FF88,#00CC6A)",
  wa:"linear-gradient(135deg,#25D366,#128C7E)",
};

// ── DATA ──────────────────────────────────────────────────────────────────────
const PLANS = [
  { id:"starter", name:"Starter", price:29, priceId:"price_starter", color:G.accent, badge:null,
    features:["3 AI picks/day","⚽ Soccer + 🏀 Basketball","💬 WhatsApp Starter","🤝 Affiliate 20%","🎰 AI Accumulator"] },
  { id:"pro", name:"Pro", price:99, priceId:"price_pro", color:G.green, badge:"MOST POPULAR",
    features:["10 AI picks/day","⚽🏀🎾⚾🏟️ All 5 sports","💬 WhatsApp Pro VIP","🌍 World Cup full picks","📊 Value odds engine","⚠️ Sharp money alerts","💰 Bet tracker + P&L"] },
  { id:"elite", name:"Elite", price:199, priceId:"price_elite", color:G.gold, badge:"BEST ROI",
    features:["Unlimited AI picks","All sports + live bets","💬 Elite Inner Circle","🏆 Complete WC coverage","🎯 Parlay + acca builder","👤 1-on-1 analyst access","💰 Advanced analytics"] },
];

const WC_FIXTURES = [
  { date:"Thu 11 Jun", time:"21:00", home:"Mexico", away:"South Africa", group:"A", venue:"Estadio Azteca, Mexico City", h:2.10, d:3.20, a:3.60, pick:"Over 2.5 Goals", pickOdds:1.75, prob:81, tag:"VALUE" },
  { date:"Thu 11 Jun", time:"04:00", home:"South Korea", away:"Czechia", group:"A", venue:"Estadio Akron, Guadalajara", h:2.40, d:3.10, a:3.00, pick:"Over 2.5 Goals", pickOdds:1.80, prob:79, tag:"VALUE" },
  { date:"Fri 12 Jun", time:"21:00", home:"Canada", away:"Bosnia & Herz.", group:"B", venue:"BMO Field, Toronto", h:1.95, d:3.30, a:4.20, pick:"Canada Win + BTTS", pickOdds:2.20, prob:77, tag:"VALUE" },
  { date:"Fri 12 Jun", time:"03:00", home:"USA", away:"Paraguay", group:"D", venue:"SoFi Stadium, Los Angeles", h:1.75, d:3.40, a:5.00, pick:"USA Win & Over 2.5", pickOdds:2.10, prob:78, tag:"SHARP" },
  { date:"Sat 13 Jun", time:"21:00", home:"Brazil", away:"Morocco", group:"C", venue:"MetLife Stadium, New Jersey", h:1.65, d:3.50, a:6.00, pick:"Brazil Win & Over 2.5", pickOdds:1.90, prob:80, tag:"SHARP" },
  { date:"Sun 14 Jun", time:"03:00", home:"Argentina", away:"Nigeria", group:"E", venue:"Hard Rock Stadium, Miami", h:1.35, d:4.80, a:9.50, pick:"Argentina Win & Over 2.5", pickOdds:1.85, prob:82, tag:"SHARP" },
  { date:"Sun 14 Jun", time:"21:00", home:"England", away:"Cameroon", group:"G", venue:"AT&T Stadium, Dallas", h:1.40, d:4.50, a:9.00, pick:"England -1.5 Handicap", pickOdds:1.95, prob:79, tag:"SHARP" },
  { date:"Mon 15 Jun", time:"03:00", home:"France", away:"Peru", group:"F", venue:"Rose Bowl, Los Angeles", h:1.28, d:5.50, a:12.0, pick:"France Win & Over 2.5", pickOdds:1.70, prob:84, tag:"SHARP" },
  { date:"Mon 15 Jun", time:"21:00", home:"Spain", away:"Cape Verde", group:"H", venue:"Lumen Field, Seattle", h:1.20, d:6.00, a:15.0, pick:"Spain -2.5 & Over 3.5", pickOdds:2.30, prob:75, tag:"VALUE" },
  { date:"Tue 16 Jun", time:"21:00", home:"Germany", away:"Costa Rica", group:"C", venue:"Rose Bowl, Los Angeles", h:1.30, d:5.20, a:11.0, pick:"Germany Win & Over 2.5", pickOdds:1.75, prob:83, tag:"SHARP" },
];

const WC_GROUPS = [
  { group:"A", teams:["Mexico","South Africa","Czechia","South Korea"], color:G.gold },
  { group:"B", teams:["Canada","Bosnia & Herz.","Qatar","Switzerland"], color:G.accent },
  { group:"C", teams:["Brazil","Morocco","Haiti","Scotland"], color:G.green },
  { group:"D", teams:["USA","Paraguay","Australia","Türkiye"], color:G.purple },
  { group:"E", teams:["Argentina","Nigeria","Poland","Senegal"], color:G.orange },
  { group:"F", teams:["France","Belgium","Peru","Tunisia"], color:G.red },
  { group:"G", teams:["England","Netherlands","Ecuador","Cameroon"], color:G.gold },
  { group:"H", teams:["Spain","Saudi Arabia","Uruguay","Cape Verde"], color:G.accent },
];

const WC_OUTRIGHTS = [
  { team:"Argentina 🇦🇷", odds:4.50, prob:22, tag:"SHARP", note:"Defending champions · Messi leading the line" },
  { team:"France 🇫🇷", odds:5.00, prob:20, tag:"VALUE", note:"Strong depth · Mbappé in peak form" },
  { team:"Brazil 🇧🇷", odds:6.00, prob:17, tag:"VALUE", note:"Host-continent advantage · Vinicius Jr key" },
  { team:"England 🏴󠁧󠁢󠁥󠁮󠁧󠁿", odds:7.00, prob:14, tag:"VALUE", note:"Favourable group draw · Kane & Bellingham" },
  { team:"Spain 🇪🇸", odds:8.00, prob:13, tag:"LONG", note:"Highest FIFA ranked team in tournament" },
  { team:"Germany 🇩🇪", odds:10.0, prob:10, tag:"LONG", note:"Resurgent form after Euro 2024 redemption" },
];

const SOCCER_PICKS = [
  { id:1, league:"🌍 WC Friendly", home:"Brazil", away:"Mexico", time:"20:00", pick:"Over 2.5 Goals", odds:1.72, prob:83, ev:"+8.4%", units:2, tag:"SHARP", status:"pending", corners:"Over 10.5 Corners", btts:"Both Teams Score", handicap:"Brazil -0.5", bookings:"Over 3.5 Cards", draw:"HT Draw @ 2.80" },
  { id:2, league:"🏆 Copa Sudamericana", home:"Fluminense", away:"Colo-Colo", time:"01:30", pick:"Over 2.5 Goals", odds:1.80, prob:81, ev:"+7.8%", units:2, tag:"VALUE", status:"pending", corners:"Over 9.5 Corners", btts:"Both Teams Score", handicap:"Fluminense -0.5", bookings:"Over 3.5 Cards", draw:"Draw @ 3.20" },
  { id:3, league:"🇧🇷 Brasileirao", home:"Palmeiras", away:"Atletico MG", time:"18:00", pick:"Over 2.5 Goals", odds:1.78, prob:82, ev:"+9.0%", units:2, tag:"VALUE", status:"pending", corners:"Over 9.5 Corners", btts:"Palmeiras Score +1.5", handicap:"Palmeiras -0.5", bookings:"Over 4.5 Cards", draw:"Draw @ 3.10" },
  { id:4, league:"🌍 WC Friendly", home:"Argentina", away:"Ecuador", time:"02:00", pick:"Over 2.5 Goals", odds:1.65, prob:86, ev:"+11.4%", units:2.5, tag:"SHARP", status:"pending", corners:"Over 9.5 Corners", btts:"Both Teams Score", handicap:"Argentina -1.5", bookings:"Over 3.5 Cards", draw:"Argentina Win @ 1.50" },
  { id:5, league:"🇩🇪 Bundesliga PO", home:"Hamburger SV", away:"Magdeburg", time:"15:30", pick:"Over 2.5 Goals", odds:1.90, prob:79, ev:"+6.2%", units:1.5, tag:"VALUE", status:"won", corners:"Over 10.5 Corners", btts:"Both Teams Score", handicap:"HSV -0.5", bookings:"Over 4.5 Cards", draw:"Draw @ 3.40" },
  { id:6, league:"🇳🇱 Eredivisie PO", home:"Groningen", away:"NAC Breda", time:"19:00", pick:"Over 2.5 Goals", odds:1.85, prob:80, ev:"+8.0%", units:2, tag:"VALUE", status:"pending", corners:"Over 9.5 Corners", btts:"Both Teams Score", handicap:"Groningen -0.5", bookings:"Over 3.5 Cards", draw:"Draw @ 3.20" },
];

const SUBTABS = [
  { key:"over25", label:"Over 2.5 Goals", icon:"⚽", color:G.green },
  { key:"corners", label:"Corners", icon:"📐", color:G.purple },
  { key:"handicap", label:"Handicap", icon:"⚖️", color:G.accent },
  { key:"bookings", label:"Bookings", icon:"🟨", color:G.red },
  { key:"draw", label:"Draw Bets", icon:"🤝", color:G.gold },
  { key:"btts", label:"BTTS / +1.5", icon:"🥅", color:G.orange },
];

const TRACKER_DATA = [
  { date:"31 May", pick:"Fluminense Over 2.5", odds:1.80, units:2, result:"pending", pnl:null },
  { date:"30 May", pick:"Brazil vs Mexico BTTS", odds:1.78, units:2, result:"won", pnl:+1.56 },
  { date:"29 May", pick:"Egypt Over 2.5", odds:1.85, units:1.5, result:"won", pnl:+1.28 },
  { date:"29 May", pick:"Santos BTTS", odds:1.78, units:2, result:"won", pnl:+1.56 },
  { date:"28 May", pick:"Partick O3.5 Cards", odds:1.75, units:2, result:"won", pnl:+1.50 },
  { date:"27 May", pick:"Bayern Over 2.5", odds:1.55, units:3, result:"won", pnl:+1.65 },
  { date:"27 May", pick:"Dodgers ML", odds:1.95, units:2, result:"won", pnl:+1.90 },
  { date:"26 May", pick:"Miami Over 2.5", odds:1.75, units:2, result:"lost", pnl:-2.00 },
  { date:"25 May", pick:"Swiatek -3.5 Games", odds:1.80, units:2, result:"won", pnl:+1.60 },
  { date:"24 May", pick:"Warriors Over 219.5", odds:1.87, units:1.5, result:"won", pnl:+1.31 },
];

const AFFILIATES = [
  { name:"Mike T.", plan:"Pro", earned:19.80, status:"active" },
  { name:"Sarah K.", plan:"Elite", earned:39.80, status:"active" },
  { name:"James R.", plan:"Starter", earned:5.80, status:"active" },
  { name:"Priya M.", plan:"Pro", earned:19.80, status:"active" },
  { name:"Carlos D.", plan:"Pro", earned:19.80, status:"churned" },
];

// ── SHARED UI ─────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=DM+Mono:wght@400;500;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#05080F;color:#D8E8F8;font-family:'Outfit',sans-serif;}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#05080F}::-webkit-scrollbar-thumb{background:#182840;border-radius:4px}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
@keyframes tick{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes barFill{from{width:0}to{width:var(--w)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes popIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
.fu{animation:fadeUp .4s ease both}
.spin{animation:spin .7s linear infinite}
.pop{animation:popIn .3s ease both}
`;

function Dot({c,p}){ return <span style={{width:7,height:7,borderRadius:"50%",background:c||G.green,display:"inline-block",flexShrink:0,animation:p?"pulse 2s infinite":undefined}}/>; }
function PBar({v,c}){ return <div style={{height:5,borderRadius:3,background:G.border,overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,width:`${v}%`,background:c||G.accent,transition:"width .9s ease"}}/></div>; }
function Chip({children,color,bg}){ return <span style={{display:"inline-flex",alignItems:"center",padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:.4,color:color||G.accent,background:bg||"rgba(0,229,255,.1)"}}>{children}</span>; }
function SBtn({active,col,onClick,children,sm}){
  return <button onClick={onClick} style={{padding:sm?"6px 14px":"8px 18px",borderRadius:8,border:`1px solid ${active?(col||G.accent):G.border}`,background:active?(col||G.accent):"transparent",color:active?"#000":G.dim,fontFamily:"inherit",fontSize:sm?12:13,fontWeight:700,cursor:"pointer",transition:"all .15s"}}>{children}</button>;
}
function Card({children,style}){ return <div style={{background:G.card,border:`1px solid ${G.border}`,borderRadius:16,padding:22,...style}}>{children}</div>; }
function Card2({children,style}){ return <div style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:12,padding:"16px 18px",...style}}>{children}</div>; }
function StatBox({label,value,color,sub}){
  return <div style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:12,padding:"16px 18px"}}>
    <div style={{fontSize:11,color:G.muted,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>{label}</div>
    <div style={{fontSize:24,fontWeight:700,color:color||G.accent,fontFamily:"'DM Mono',monospace"}}>{value}</div>
    {sub&&<div style={{fontSize:11,color:G.dim,marginTop:4}}>{sub}</div>}
  </div>;
}

// ── TICKER ────────────────────────────────────────────────────────────────────
const TICKS = ["Brazil vs Mexico O2.5 ✓ WON","Palmeiras BTTS ✓ WON","Argentina Over 2.5 82%","🏆 WC2026 in 11 DAYS","Mexico vs S.Africa Jun 11","Brazil vs Morocco Jun 13","USA vs Paraguay Jun 12","France vs Peru Jun 15","Argentina vs Nigeria Jun 14"];
function Ticker(){
  const all=[...TICKS,...TICKS];
  return <div style={{overflow:"hidden",background:"#070E1A",borderBottom:`1px solid ${G.border}`,height:32,display:"flex",alignItems:"center"}}>
    <div style={{display:"flex",width:"max-content",animation:"tick 50s linear infinite"}}>
      {all.map((t,i)=><span key={i} style={{padding:"0 32px",fontFamily:"monospace",fontSize:11,whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:8,color:G.dim}}>
        <Dot c={t.includes("WON")?G.green:t.includes("🏆")?G.gold:G.accent} p/>
        {t}<span style={{color:G.muted,marginLeft:20}}>◆</span>
      </span>)}
    </div>
  </div>;
}

// ── AUTH MODAL ────────────────────────────────────────────────────────────────
function AuthModal({mode:m0="signup",plan,onClose,onSuccess}){
  const [mode,setMode]=useState(m0);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [pw,setPw]=useState("");
  const [cpw,setCpw]=useState("");
  const [loading,setLoading]=useState(false);
  const [msg,setMsg]=useState(null);
  const inp={width:"100%",background:"#070E1A",border:`1px solid ${G.border}`,borderRadius:9,padding:"12px 14px",color:G.text,fontFamily:"inherit",fontSize:14,outline:"none",marginBottom:12};
  const trialEnd=new Date(); trialEnd.setDate(trialEnd.getDate()+7);
  const ted=trialEnd.toLocaleDateString("en-GB",{day:"numeric",month:"long"});

  async function doSignup(){
    if(!name||!email||!pw){setMsg({t:"e",v:"Fill in all fields."});return;}
    if(pw.length<8){setMsg({t:"e",v:"Password must be 8+ characters."});return;}
    if(pw!==cpw){setMsg({t:"e",v:"Passwords don't match."});return;}
    setLoading(true);setMsg(null);
    await new Promise(r=>setTimeout(r,1600));
    const u={id:"u_"+Date.now(),name,email,plan,trial:true,trialStart:new Date().toISOString()};
    localStorage.setItem("ea_user",JSON.stringify(u));
    setMsg({t:"s",v:"Account created! Loading checkout..."});
    await new Promise(r=>setTimeout(r,900));
    onSuccess(u);
  }
  async function doSignin(){
    if(!email||!pw){setMsg({t:"e",v:"Enter email and password."});return;}
    setLoading(true);setMsg(null);
    await new Promise(r=>setTimeout(r,1400));
    const saved=localStorage.getItem("ea_user");
    if(saved){const u=JSON.parse(saved);setMsg({t:"s",v:"Welcome back!"});await new Promise(r=>setTimeout(r,700));onSuccess(u);}
    else{setMsg({t:"e",v:"No account found. Please sign up."});}
    setLoading(false);
  }
  async function doReset(){
    if(!email){setMsg({t:"e",v:"Enter your email."});return;}
    setLoading(true);await new Promise(r=>setTimeout(r,1200));setLoading(false);
    setMsg({t:"s",v:`Reset link sent to ${email}`});
  }

  return <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.82)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
    <div className="pop" style={{background:G.card,border:`1px solid ${G.border}`,borderRadius:20,width:"100%",maxWidth:420,padding:32,position:"relative",maxHeight:"90vh",overflowY:"auto"}}>
      <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:G.dim,cursor:"pointer",fontSize:18}}>✕</button>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:22}}>
        <div style={{width:30,height:30,background:G.grad,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#000",fontSize:16}}>⚡</div>
        <span style={{fontWeight:900,fontSize:17}}>EDGE<span style={{color:G.accent}}>AI</span></span>
      </div>

      {msg&&<div style={{padding:"10px 14px",background:msg.t==="s"?"rgba(0,255,136,.08)":"rgba(255,69,96,.1)",border:`1px solid ${msg.t==="s"?"rgba(0,255,136,.2)":"rgba(255,69,96,.2)"}`,borderRadius:8,fontSize:13,color:msg.t==="s"?G.green:G.red,marginBottom:14}}>{msg.v}</div>}

      {mode==="forgot"&&<>
        <div style={{fontSize:22,fontWeight:900,marginBottom:6}}>Reset Password</div>
        <div style={{color:G.dim,fontSize:13,marginBottom:18}}>We'll email you a reset link.</div>
        <input style={inp} type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)}/>
        <button onClick={doReset} disabled={loading} style={{width:"100%",padding:14,background:G.grad,color:"#000",fontFamily:"inherit",fontWeight:700,borderRadius:9,border:"none",cursor:"pointer",fontSize:14}}>{loading?"Sending...":"Send Reset Link"}</button>
        <div style={{textAlign:"center",marginTop:14,fontSize:13,color:G.dim}}><span style={{color:G.accent,cursor:"pointer"}} onClick={()=>{setMode("signin");setMsg(null);}}>← Back to Sign In</span></div>
      </>}

      {mode==="signin"&&<>
        <div style={{fontSize:22,fontWeight:900,marginBottom:6}}>Welcome Back</div>
        <div style={{color:G.dim,fontSize:13,marginBottom:18}}>Sign in to your EdgeAI account.</div>
        <input style={inp} type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input style={inp} type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSignin()}/>
        <div style={{textAlign:"right",marginTop:-8,marginBottom:14}}><span style={{fontSize:12,color:G.accent,cursor:"pointer"}} onClick={()=>{setMode("forgot");setMsg(null);}}>Forgot password?</span></div>
        <button onClick={doSignin} disabled={loading} style={{width:"100%",padding:14,background:G.grad,color:"#000",fontFamily:"inherit",fontWeight:700,borderRadius:9,border:"none",cursor:"pointer",fontSize:14}}>{loading?"Signing in...":"Sign In →"}</button>
        <div style={{textAlign:"center",marginTop:14,fontSize:13,color:G.dim}}>No account? <span style={{color:G.accent,cursor:"pointer"}} onClick={()=>{setMode("signup");setMsg(null);}}>Start free trial</span></div>
      </>}

      {mode==="signup"&&<>
        {plan&&<div style={{background:"rgba(0,255,136,.06)",border:"1px solid rgba(0,255,136,.18)",borderRadius:12,padding:"12px 16px",marginBottom:18}}>
          <div style={{fontWeight:800,color:G.green,fontSize:14}}>🎁 7-Day Free Trial — {plan.name} ${plan.price}/mo</div>
          <div style={{fontSize:12,color:G.dim,marginTop:2}}>No charge until {ted} · Cancel anytime</div>
        </div>}
        <div style={{fontSize:22,fontWeight:900,marginBottom:6}}>Create Account</div>
        <div style={{color:G.dim,fontSize:13,marginBottom:18}}>Start your free 7-day trial. No payment today.</div>
        <input style={inp} placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)}/>
        <input style={inp} type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input style={inp} type="password" placeholder="Password (8+ characters)" value={pw} onChange={e=>setPw(e.target.value)}/>
        <input style={inp} type="password" placeholder="Confirm Password" value={cpw} onChange={e=>setCpw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSignup()}/>
        <div style={{fontSize:12,color:G.dim,marginBottom:14,lineHeight:1.6}}>By signing up you agree to our <span style={{color:G.accent}}>Terms</span> & <span style={{color:G.accent}}>Privacy Policy</span>. 18+ only.</div>
        <button onClick={doSignup} disabled={loading} style={{width:"100%",padding:14,background:G.gradGreen,color:"#000",fontFamily:"inherit",fontWeight:700,borderRadius:9,border:"none",cursor:"pointer",fontSize:14}}>{loading?"Creating account...":"Start 7-Day Free Trial 🚀"}</button>
        <div style={{textAlign:"center",marginTop:10,fontSize:12,color:G.muted}}>No charge today · Cancel anytime before day 8</div>
        <div style={{textAlign:"center",marginTop:14,fontSize:13,color:G.dim}}>Already have an account? <span style={{color:G.accent,cursor:"pointer"}} onClick={()=>{setMode("signin");setMsg(null);}}>Sign in</span></div>
      </>}
    </div>
  </div>;
}

