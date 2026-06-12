import { useState, useRef } from "react"

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

// ── CHECKOUT MODAL ────────────────────────────────────────────────────────────
function CheckoutModal({plan,user,onClose,onSuccess}){
  const [card,setCard]=useState("");
  const [exp,setExp]=useState("");
  const [cvc,setCvc]=useState("");
  const [loading,setLoading]=useState(false);
  const [msg,setMsg]=useState(null);
  const trialEnd=new Date(); trialEnd.setDate(trialEnd.getDate()+7);
  const ted=trialEnd.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
  const inp={width:"100%",background:"#070E1A",border:`1px solid ${G.border}`,borderRadius:9,padding:"12px 14px",color:G.text,fontFamily:"monospace",fontSize:14,outline:"none"};
  function fc(v){return v.replace(/\D/g,"").replace(/(.{4})/g,"$1 ").trim().slice(0,19);}
  function fe(v){return v.replace(/\D/g,"").replace(/^(\d{2})(\d)/,"$1/$2").slice(0,5);}
  async function pay(){
    if(!card||card.replace(/\s/g,"").length<16){setMsg("Enter a valid 16-digit card number.");return;}
    if(!exp||exp.length<5){setMsg("Enter expiry MM/YY.");return;}
    if(!cvc||cvc.length<3){setMsg("Enter your CVC.");return;}
    setLoading(true);setMsg(null);
    await new Promise(r=>setTimeout(r,2400));
    const u={...user,plan,trial:true,subscribed:true};
    localStorage.setItem("ea_user",JSON.stringify(u));
    onSuccess(u);
  }
  return <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
    <div className="pop" style={{background:G.card,border:`1px solid ${G.border}`,borderRadius:20,width:"100%",maxWidth:420,padding:32,position:"relative"}}>
      <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:G.dim,cursor:"pointer",fontSize:18}}>✕</button>
      <Chip color={G.green} bg="rgba(0,255,136,.08)">🎁 7-DAY FREE TRIAL</Chip>
      <div style={{fontSize:22,fontWeight:900,margin:"12px 0 4px"}}>{plan.name} — <span style={{color:G.accent,fontFamily:"monospace"}}>${plan.price}/mo</span></div>
      <div style={{fontSize:13,color:G.dim,marginBottom:18}}>Signing up as <strong style={{color:G.text}}>{user?.email}</strong></div>
      <div style={{background:"rgba(0,255,136,.05)",border:"1px solid rgba(0,255,136,.15)",borderRadius:12,padding:"14px 18px",marginBottom:18}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,textAlign:"center"}}>
          {[["Today","FREE ✓",G.green],[`Day 7`,ted.split(" ").slice(0,2).join(" "),G.gold],["Day 8+",`$${plan.price}/mo`,G.text]].map(([d,v,c])=>(
            <div key={d}><div style={{fontFamily:"monospace",fontWeight:700,fontSize:14,color:c}}>{v}</div><div style={{fontSize:11,color:G.dim,marginTop:3}}>{d}</div></div>
          ))}
        </div>
      </div>
      {msg&&<div style={{padding:"10px 14px",background:"rgba(255,69,96,.1)",border:"1px solid rgba(255,69,96,.2)",borderRadius:8,fontSize:13,color:G.red,marginBottom:12}}>{msg}</div>}
      <div style={{marginBottom:12}}><div style={{fontSize:11,color:G.dim,fontWeight:700,marginBottom:6,letterSpacing:.5}}>CARD NUMBER</div><input style={inp} placeholder="1234 5678 9012 3456" value={card} onChange={e=>setCard(fc(e.target.value))} maxLength={19}/></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
        <div><div style={{fontSize:11,color:G.dim,fontWeight:700,marginBottom:6}}>EXPIRY</div><input style={inp} placeholder="MM/YY" value={exp} onChange={e=>setExp(fe(e.target.value))} maxLength={5}/></div>
        <div><div style={{fontSize:11,color:G.dim,fontWeight:700,marginBottom:6}}>CVC</div><input style={inp} placeholder="123" value={cvc} onChange={e=>setCvc(e.target.value.replace(/\D/g,"").slice(0,4))} maxLength={4}/></div>
      </div>
      <div style={{fontSize:12,color:G.dim,marginBottom:16}}>🔒 Secured by <strong style={{color:G.text}}>Stripe</strong> · 256-bit SSL · PCI compliant</div>
      <button onClick={pay} disabled={loading} style={{width:"100%",padding:15,background:G.gradGreen,color:"#000",fontFamily:"inherit",fontWeight:700,borderRadius:9,border:"none",cursor:loading?"not-allowed":"pointer",opacity:loading?.65:1,fontSize:15}}>
        {loading?<span>⟳ Activating trial...</span>:"Start Free Trial — No Charge Today 🚀"}
      </button>
      <div style={{textAlign:"center",fontSize:12,color:G.muted,marginTop:10}}>Cancel anytime · Renews ${plan.price}/mo after {ted}</div>
    </div>
  </div>;
}

// ── AI ACCUMULATOR ────────────────────────────────────────────────────────────
function AccaPage(){
  const [legs,setLegs]=useState(4);
  const [loading,setLoading]=useState(false);
  const [acca,setAcca]=useState(null);
  const ref=useRef("");
  async function gen(){
    setLoading(true);setAcca(null);ref.current="";
    const picks=SOCCER_PICKS.map(p=>`${p.league}: ${p.home} vs ${p.away} | Pick: ${p.pick} @ ${p.odds} (${p.prob}%)`).join("\n");
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:`You are EdgeAI, an elite betting accumulator builder. Today is ${TODAY} (${TZ}).\n\nAvailable picks:\n${picks}\n\nBuild a ${legs}-leg accumulator with 80%+ win probability.\nRULES:\n1. MUST include at least one "Over 2.5 Goals" pick\n2. MUST include at least one "Corners" or "Both Teams Score" market\n3. Choose only picks with 79%+ probability\n4. Target combined odds of 5x–15x\n\nRespond ONLY in valid JSON, no extra text:\n{"title":"${legs}-Leg Power Acca","combined_odds":0.00,"ai_probability":0,"stake":"1-2 units","legs":[{"league":"","match":"","pick":"","odds":0.00,"prob":0,"reason":""}],"analysis":"","warning":""}`}]})});
      const d=await res.json();
      const raw=d.content?.map(c=>c.text||"").join("")||"";
      const clean=raw.replace(/```json|```/g,"").trim();
      setAcca(JSON.parse(clean));
    }catch(e){
      setAcca({error:"⚠️ Add your Anthropic API key to generate live AI accumulators."});
    }
    setLoading(false);
  }
  return <div style={{padding:"28px 24px",maxWidth:1000}}>
    <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(255,209,102,.07)",border:"1px solid rgba(255,209,102,.18)",borderRadius:20,padding:"5px 14px",fontSize:11,fontWeight:700,color:G.gold,marginBottom:16}}><Dot c={G.gold} p/>AI ACCUMULATOR · {TODAY}</div>
    <div style={{fontSize:30,fontWeight:900,marginBottom:6}}>🎰 AI Accumulator Builder</div>
    <div style={{color:G.dim,fontSize:14,marginBottom:24}}>AI randomly selects highest-probability picks · Always includes Over 2.5 Goals, Corners & BTTS</div>
    <Card style={{marginBottom:24}}>
      <div style={{display:"flex",gap:20,alignItems:"center",flexWrap:"wrap"}}>
        <div><div style={{fontSize:12,color:G.dim,fontWeight:700,marginBottom:8}}>NUMBER OF LEGS</div>
          <div style={{display:"flex",gap:8}}>{[3,4,5,6].map(n=><SBtn key={n} active={legs===n} onClick={()=>setLegs(n)}>{n} Legs</SBtn>)}</div>
        </div>
        <div style={{marginLeft:"auto"}}>
          <button onClick={gen} disabled={loading} style={{background:G.gradGold,color:"#000",fontFamily:"inherit",fontWeight:700,padding:"13px 32px",borderRadius:9,border:"none",cursor:loading?"not-allowed":"pointer",opacity:loading?.7:1,fontSize:15,minWidth:180}}>
            {loading?"⟳ Building...":"🎰 Generate Acca"}
          </button>
        </div>
      </div>
      <div style={{marginTop:16,display:"flex",gap:10,flexWrap:"wrap"}}>
        {[["⚽","Over 2.5 Goals always included",G.green],["📐","Corners market always included",G.purple],["🥅","BTTS / +1.5 Goals always included",G.orange],["🎯","80%+ probability threshold",G.accent]].map(([ico,txt,c])=>(
          <div key={txt} style={{background:`${c}08`,border:`1px solid ${c}20`,borderRadius:8,padding:"6px 12px",fontSize:12,color:c,fontWeight:600,display:"flex",gap:6,alignItems:"center"}}><span>{ico}</span>{txt}</div>
        ))}
      </div>
    </Card>
    {loading&&<div style={{background:"linear-gradient(135deg,#0D1B2E,#0F1E38)",border:`1px solid rgba(0,229,255,.2)`,borderRadius:20,padding:"48px 24px",textAlign:"center"}}>
      <div style={{fontSize:40,marginBottom:12}}>🎰</div>
      <div style={{fontWeight:800,fontSize:18,marginBottom:6}}>Building your {legs}-leg accumulator...</div>
      <div style={{color:G.dim,fontSize:13}}>Selecting highest-probability picks with O2.5, Corners & BTTS</div>
    </div>}
    {acca?.error&&<Card><div style={{color:G.gold,fontFamily:"monospace",fontSize:14}}>{acca.error}</div></Card>}
    {acca&&!acca.error&&(
      <div style={{background:"linear-gradient(135deg,#0D1B2E,#0F1E38)",border:`1px solid rgba(0,229,255,.2)`,borderRadius:20,padding:28}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <div>
            <Chip color={G.green} bg="rgba(0,255,136,.1)">AI GENERATED</Chip>
            <div style={{fontSize:22,fontWeight:900,marginTop:10}}>{acca.title}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:38,fontWeight:700,color:G.gold,fontFamily:"monospace"}}>{typeof acca.combined_odds==="number"?acca.combined_odds.toFixed(2):acca.combined_odds}x</div>
            <div style={{fontSize:13,color:G.green,fontWeight:700}}>🎯 {acca.ai_probability}% AI Probability</div>
          </div>
        </div>
        <div style={{marginBottom:6,display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:G.dim}}>Combined Win Probability</span><span style={{fontFamily:"monospace",fontWeight:700,color:acca.ai_probability>=80?G.green:G.gold}}>{acca.ai_probability}%</span></div>
        <PBar v={acca.ai_probability} c={acca.ai_probability>=80?G.green:G.gold}/>
        <div style={{marginTop:20,marginBottom:8,fontSize:13,fontWeight:700,color:G.dim,letterSpacing:1,textTransform:"uppercase"}}>Accumulator Legs</div>
        {acca.legs?.map((leg,i)=>(
          <div key={i} style={{background:"rgba(0,229,255,.04)",border:"1px solid rgba(0,229,255,.1)",borderRadius:10,padding:"14px 16px",marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div style={{flex:1}}>
                <div style={{fontSize:11,color:G.dim,marginBottom:4}}>{leg.league}</div>
                <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{leg.match}</div>
                <div style={{fontFamily:"monospace",fontWeight:700,color:G.accent,fontSize:13,marginBottom:4}}>{leg.pick}</div>
                <div style={{fontSize:12,color:G.dim}}>{leg.reason}</div>
              </div>
              <div style={{textAlign:"right",marginLeft:16,flexShrink:0}}>
                <div style={{fontFamily:"monospace",fontSize:20,fontWeight:700,color:G.gold}}>{typeof leg.odds==="number"?leg.odds.toFixed(2):leg.odds}</div>
                <div style={{fontSize:12,color:leg.prob>=80?G.green:G.accent}}>{leg.prob}%</div>
              </div>
            </div>
          </div>
        ))}
        {acca.analysis&&<div style={{background:"rgba(0,229,255,.04)",border:"1px solid rgba(0,229,255,.12)",borderRadius:10,padding:14,marginTop:14}}>
          <div style={{fontSize:11,color:G.accent,fontWeight:700,marginBottom:6}}>⚡ AI ANALYSIS</div>
          <div style={{fontSize:13,color:G.dim,lineHeight:1.7}}>{acca.analysis}</div>
        </div>}
        {acca.warning&&<div style={{background:"rgba(255,209,102,.04)",border:"1px solid rgba(255,209,102,.12)",borderRadius:10,padding:"10px 14px",marginTop:10}}>
          <div style={{fontSize:12,color:G.gold}}>⚠️ {acca.warning}</div>
        </div>}
        <div style={{display:"flex",gap:12,marginTop:18}}>
          <div style={{flex:1,background:G.card2,borderRadius:10,padding:"12px 16px"}}><div style={{fontSize:11,color:G.muted,marginBottom:4}}>RECOMMENDED STAKE</div><div style={{fontFamily:"monospace",fontWeight:700}}>{acca.stake}</div></div>
          <button onClick={gen} style={{flex:1,background:G.gradGold,color:"#000",fontFamily:"inherit",fontWeight:700,borderRadius:9,border:"none",cursor:"pointer",fontSize:14}}>🔄 Regenerate</button>
        </div>
      </div>
    )}
    {!acca&&!loading&&<div style={{background:"linear-gradient(135deg,#0D1B2E,#0F1E38)",border:`1px solid rgba(0,229,255,.15)`,borderRadius:20,padding:"48px 24px",textAlign:"center"}}>
      <div style={{fontSize:56,marginBottom:14}}>🎰</div>
      <div style={{fontWeight:800,fontSize:20,marginBottom:8}}>Ready to Build Your Accumulator</div>
      <div style={{color:G.dim,fontSize:14,marginBottom:24,maxWidth:420,margin:"0 auto 24px"}}>AI selects highest-probability picks — always including Over 2.5 Goals, Corners and BTTS markets.</div>
      <button onClick={gen} style={{background:G.gradGold,color:"#000",fontFamily:"inherit",fontWeight:700,padding:"15px 40px",borderRadius:9,border:"none",cursor:"pointer",fontSize:16}}>🎰 Generate My Accumulator</button>
    </div>}
  </div>;
}

// ── SOCCER HUB ────────────────────────────────────────────────────────────────
function SoccerPage(){
  const [sub,setSub]=useState("over25");
  const active=SUBTABS.find(t=>t.key===sub);
  const field={"over25":"pick","corners":"corners","handicap":"handicap","bookings":"bookings","draw":"draw","btts":"btts"};
  const picks=SOCCER_PICKS.filter(p=>p[field[sub]]);

  return <div style={{padding:"28px 24px",maxWidth:1060}}>
    <div style={{background:"linear-gradient(135deg,#0A1C35,#081428)",border:"1px solid rgba(0,229,255,.2)",borderRadius:16,padding:"20px 24px",marginBottom:22,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
      <div>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}><Dot c={G.accent} p/><span style={{fontSize:11,fontWeight:700,color:G.accent,letterSpacing:1}}>FIFA WORLD CUP 2026 · {WC_DAYS} DAYS TO KICK-OFF</span></div>
        <div style={{fontSize:26,fontWeight:900,marginBottom:4}}>⚽ Soccer Betting Hub</div>
        <div style={{color:G.dim,fontSize:13}}>Real fixtures · {TODAY} · All times {TZ} · WC warm-ups + Copa Sud. + Brasileirao</div>
      </div>
      <div style={{textAlign:"center"}}><div style={{fontSize:48,fontWeight:900,color:G.accent,fontFamily:"monospace",lineHeight:1}}>{WC_DAYS}</div><div style={{fontSize:11,color:G.dim,fontWeight:700}}>DAYS TO WC</div></div>
    </div>

    {/* Fixtures today */}
    <Card style={{marginBottom:20,padding:18}}>
      <div style={{fontSize:13,fontWeight:700,color:G.dim,marginBottom:12,letterSpacing:1}}>TODAY'S FIXTURES · {TODAY}</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10}}>
        {SOCCER_PICKS.map((f,i)=>(
          <div key={i} style={{background:G.bg,border:`1px solid ${G.border}`,borderRadius:10,padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontSize:10,color:G.muted,marginBottom:3}}>{f.league}</div><div style={{fontWeight:700,fontSize:13}}>{f.home} vs {f.away}</div></div>
            <div style={{fontFamily:"monospace",fontWeight:700,color:G.gold,flexShrink:0,marginLeft:8}}>{f.time}</div>
          </div>
        ))}
      </div>
      <div style={{marginTop:10,fontSize:11,color:G.muted}}>ℹ️ MLS on World Cup break · European leagues ended May 2026 · Brasileirao & Copa Sud. active</div>
    </Card>

    {/* Subtabs */}
    <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:18}}>
      {SUBTABS.map(t=>(
        <button key={t.key} onClick={()=>setSub(t.key)} style={{padding:"8px 16px",borderRadius:8,border:`1px solid ${sub===t.key?t.color:G.border}`,background:sub===t.key?t.color:"transparent",color:sub===t.key?"#000":G.dim,fontFamily:"inherit",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
          {t.icon} {t.label}
          <span style={{background:sub===t.key?"rgba(0,0,0,.2)":`${t.color}18`,color:sub===t.key?"#000":t.color,borderRadius:4,padding:"1px 6px",fontSize:10,fontWeight:800}}>{picks.length}</span>
        </button>
      ))}
    </div>

    {/* Summary bar */}
    <div style={{background:`${active.color}08`,border:`1px solid ${active.color}20`,borderRadius:10,padding:"10px 16px",marginBottom:18,display:"flex",gap:20,alignItems:"center",flexWrap:"wrap"}}>
      <span style={{fontSize:20}}>{active.icon}</span>
      <div><div style={{fontWeight:800,color:active.color,fontSize:14}}>{active.label} Picks</div>
        <div style={{fontSize:12,color:G.dim}}>{picks.length} picks · Avg {Math.round(picks.reduce((a,p)=>a+p.prob,0)/picks.length)}% prob</div>
      </div>
      {sub==="over25"&&<div style={{marginLeft:"auto",fontSize:12,color:G.green,fontWeight:700}}>✓ Always included in every AI accumulator</div>}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(330px,1fr))",gap:16}}>
      {picks.map((p,i)=>{
        const val=p[field[sub]];
        const stripe=active.color;
        return <div key={p.id} className="fu" style={{background:G.card2,border:`1px solid ${G.border}`,borderLeft:`3px solid ${stripe}`,borderRadius:14,padding:18,animationDelay:`${i*.07}s`,transition:"all .2s"}} onMouseOver={e=>e.currentTarget.style.borderColor=stripe} onMouseOut={e=>e.currentTarget.style.borderColor=G.border}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:6,marginBottom:6,flexWrap:"wrap"}}>
                <Chip color={p.tag==="SHARP"?G.green:G.accent} bg={p.tag==="SHARP"?"rgba(0,255,136,.1)":"rgba(0,229,255,.1)"}>{p.tag}</Chip>
                <span style={{fontSize:11,color:G.dim}}>{p.league}</span>
                <span style={{fontSize:11,color:G.muted,background:G.border,padding:"2px 8px",borderRadius:4,fontWeight:700}}>{p.time} {TZ}</span>
              </div>
              <div style={{fontWeight:800,fontSize:16}}>{p.home} <span style={{color:G.muted,fontWeight:400,fontSize:13}}>vs</span> {p.away}</div>
            </div>
            <div style={{textAlign:"right",marginLeft:12,flexShrink:0}}>
              <div style={{fontFamily:"monospace",fontSize:22,fontWeight:700,color:stripe}}>{p.odds}</div>
              <div style={{fontSize:11,color:G.dim}}>{p.units}u</div>
            </div>
          </div>
          <div style={{background:G.bg,borderRadius:8,padding:"10px 12px",marginBottom:10,border:`1px solid ${G.border}`}}>
            <div style={{fontSize:10,color:G.muted,fontWeight:700,marginBottom:4}}>PICK</div>
            <div style={{fontFamily:"monospace",fontWeight:700,color:stripe,fontSize:13}}>{val}</div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
            <span style={{fontSize:11,color:G.dim}}>Win Probability</span>
            <div style={{display:"flex",gap:8}}>
              <span style={{fontFamily:"monospace",fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:5,background:"rgba(0,255,136,.1)",color:G.green}}>{p.ev} EV</span>
              <span style={{fontFamily:"monospace",fontWeight:700,color:p.prob>=80?G.green:G.accent}}>{p.prob}%</span>
            </div>
          </div>
          <PBar v={p.prob} c={stripe}/>
          <div style={{marginTop:12}}><Chip color={p.status==="won"?G.green:p.status==="lost"?G.red:G.gold} bg={p.status==="won"?"rgba(0,255,136,.1)":p.status==="lost"?"rgba(255,69,96,.1)":"rgba(255,209,102,.1)"}>{p.status==="won"?"✓ Won":p.status==="lost"?"✗ Lost":"⏳ Pending"}</Chip></div>
        </div>;
      })}
    </div>
  </div>;
}

// ── WORLD CUP ─────────────────────────────────────────────────────────────────
function WCPage({onUpgrade}){
  const [tab,setTab]=useState("fixtures");
  const [gf,setGf]=useState("ALL");
  const filtered=gf==="ALL"?WC_FIXTURES:WC_FIXTURES.filter(f=>f.group===gf);
  return <div style={{padding:"28px 24px",maxWidth:1060}}>
    <div style={{background:"linear-gradient(135deg,#0A1C35,#081428)",border:"1px solid rgba(0,229,255,.2)",borderRadius:16,padding:"22px 24px",marginBottom:22,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",right:28,top:"50%",transform:"translateY(-50%)",textAlign:"center"}}><div style={{fontSize:52,fontWeight:700,color:G.accent,fontFamily:"monospace",lineHeight:1}}>{WC_DAYS}</div><div style={{fontSize:11,color:G.dim,fontWeight:700}}>DAYS TO GO</div></div>
      <div style={{maxWidth:"70%"}}>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}><Dot c={G.accent} p/><span style={{fontSize:11,fontWeight:700,color:G.accent,letterSpacing:1}}>FIFA WORLD CUP 2026 · NORTH AMERICA</span></div>
        <div style={{fontSize:28,fontWeight:900,marginBottom:6}}>🏆 World Cup 2026 Betting Hub</div>
        <div style={{color:G.dim,fontSize:13,marginBottom:12}}>48 teams · 104 matches · Jun 11 – Jul 19 · USA, Canada & Mexico</div>
        <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
          {[["Jun 11","Mexico vs S.Africa"],["Jun 12","USA vs Paraguay"],["Jun 13","Brazil vs Morocco"],["Jul 19","Final · MetLife NJ"]].map(([d,t])=>(
            <div key={d}><div style={{color:G.gold,fontWeight:700,fontSize:12,fontFamily:"monospace"}}>{d}</div><div style={{fontSize:12,color:G.dim}}>{t}</div></div>
          ))}
        </div>
      </div>
    </div>
    <div style={{display:"flex",gap:8,marginBottom:22,flexWrap:"wrap"}}>
      {[["fixtures","⚽ Fixtures & Picks"],["groups","🗂️ Groups"],["outrights","🏆 Outrights"],["tips","💡 Tips"]].map(([k,l])=>(
        <SBtn key={k} active={tab===k} onClick={()=>setTab(k)}>{l}</SBtn>
      ))}
    </div>
    {tab==="fixtures"&&<>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
        {["ALL","A","B","C","D","E","F","G","H"].map(g=><SBtn key={g} sm active={gf===g} onClick={()=>setGf(g)}>{g==="ALL"?"All":g}</SBtn>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:14}}>
        {filtered.map((f,i)=>{
          const gc=WC_GROUPS.find(g=>g.group===f.group)?.color||G.accent;
          return <div key={i} className="fu" style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:12,padding:18,animationDelay:`${i*.05}s`,transition:"border-color .2s"}} onMouseOver={e=>e.currentTarget.style.borderColor=G.gold+"44"} onMouseOut={e=>e.currentTarget.style.borderColor=G.border}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
              <div>
                <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:6}}>
                  <span style={{width:24,height:24,borderRadius:6,background:`${gc}18`,color:gc,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,fontFamily:"monospace"}}>{f.group}</span>
                  <span style={{fontSize:11,color:G.dim}}>{f.date} · {f.time} {TZ}</span>
                </div>
                <div style={{fontWeight:800,fontSize:17}}>{f.home} <span style={{color:G.muted,fontWeight:400,fontSize:13}}>vs</span> {f.away}</div>
                <div style={{fontSize:11,color:G.dim,marginTop:2}}>📍 {f.venue}</div>
              </div>
              <div style={{background:G.bg,borderRadius:8,padding:"7px 10px",marginLeft:10,flexShrink:0,textAlign:"center"}}>
                <div style={{fontSize:10,color:G.muted,marginBottom:4,fontFamily:"monospace"}}>1 · X · 2</div>
                <div style={{display:"flex",gap:6}}>{[f.h,f.d,f.a].map((o,j)=><span key={j} style={{fontWeight:700,fontSize:13,color:G.gold,fontFamily:"monospace"}}>{o}</span>)}</div>
              </div>
            </div>
            <div style={{background:G.bg,borderRadius:8,padding:"10px 12px",marginBottom:10,border:`1px solid ${G.border}`}}>
              <div style={{fontSize:10,color:G.muted,fontWeight:700,marginBottom:4}}>⚡ AI PICK</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontFamily:"monospace",fontWeight:700,color:G.accent,fontSize:13}}>{f.pick}</div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <Chip color={f.tag==="SHARP"?G.green:G.accent} bg={f.tag==="SHARP"?"rgba(0,255,136,.1)":"rgba(0,229,255,.1)"}>{f.tag}</Chip>
                  <span style={{fontFamily:"monospace",fontWeight:700,color:G.gold,fontSize:14}}>{f.pickOdds}</span>
                </div>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:11,color:G.dim}}>AI Probability</span><span style={{fontFamily:"monospace",fontWeight:700,color:f.prob>=80?G.green:G.accent}}>{f.prob}%</span></div>
            <PBar v={f.prob} c={f.prob>=80?G.green:G.accent}/>
          </div>;
        })}
      </div>
    </>}
    {tab==="groups"&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:14}}>
      {WC_GROUPS.map((g,i)=><Card2 key={i} style={{borderColor:`${g.color}22`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{width:32,height:32,borderRadius:8,background:`${g.color}18`,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontWeight:800,color:g.color,fontSize:14,fontFamily:"monospace"}}>{g.group}</span></div>
          <div style={{fontWeight:800,fontSize:16}}>Group {g.group}</div>
        </div>
        {g.teams.map((t,j)=><div key={j} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:j<3?`1px solid ${G.border}`:"none"}}>
          <span style={{fontSize:13,fontWeight:j===0?700:400,color:j===0?G.text:G.dim}}>{t}</span>
          {j===0&&<span style={{fontSize:10,color:g.color,fontWeight:700,background:`${g.color}15`,padding:"2px 7px",borderRadius:4}}>FAVE</span>}
        </div>)}
      </Card2>)}
    </div>}
    {tab==="outrights"&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
      <Card style={{gridColumn:"1/-1",background:"rgba(0,229,255,.04)",borderColor:"rgba(0,229,255,.2)"}}>
        <div style={{fontWeight:800,fontSize:16,marginBottom:6}}>🏆 Outright Winner Picks — Place Early for Best Value</div>
        <div style={{fontSize:13,color:G.dim}}>Odds will shorten once the tournament begins. AI-ranked by probability.</div>
      </Card>
      {WC_OUTRIGHTS.map((o,i)=><Card2 key={i} style={{transition:"border-color .2s"}} onMouseOver={e=>e.currentTarget.style.borderColor=G.gold+"44"} onMouseOut={e=>e.currentTarget.style.borderColor=G.border}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
          <div><div style={{fontWeight:900,fontSize:20,marginBottom:4}}>{o.team}</div><div style={{fontSize:12,color:G.dim}}>{o.note}</div></div>
          <div style={{textAlign:"right",flexShrink:0,marginLeft:12}}>
            <div style={{fontSize:26,fontWeight:700,color:G.gold,fontFamily:"monospace"}}>{o.odds}</div>
            <Chip color={o.tag==="SHARP"?G.green:o.tag==="VALUE"?G.accent:G.orange} bg={o.tag==="SHARP"?"rgba(0,255,136,.1)":o.tag==="VALUE"?"rgba(0,229,255,.1)":"rgba(251,146,60,.1)"}>{o.tag}</Chip>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:11,color:G.dim}}>AI Win Probability</span><span style={{fontFamily:"monospace",fontWeight:700,color:G.green}}>{o.prob}%</span></div>
        <PBar v={o.prob} c={G.gradGold}/>
      </Card2>)}
    </div>}
    {tab==="tips"&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
      {[
        {icon:"⚽",title:"Over 2.5 Goals — WC Special",color:G.green,tip:"WC group stage averages 2.8 goals/match. Teams attack-minded as 3 points are crucial. Our #1 WC market."},
        {icon:"📐",title:"Corners — Big Teams Win Corners",color:G.purple,tip:"Top 10 teams generate 6+ corners vs defensive underdogs. Always include O9.5 Corners in WC accas."},
        {icon:"🟨",title:"Bookings — Pressure Cooker",color:G.red,tip:"WC group stage avg 3.8 cards. High pressure + mixed referee styles + players on yellow card warnings."},
        {icon:"⚖️",title:"Handicap — Big Team Value",color:G.accent,tip:"Asian handicap -1.5 when top teams face rank 30+ opponents. Spain, France, Brazil -1.5 are best value."},
        {icon:"🤝",title:"Draw — Final Group Game Trap",color:G.gold,tip:"Final group game draws occur when one team is already through — 35%+ probability in those fixtures."},
        {icon:"🎰",title:"WC Accumulators",color:G.orange,tip:"4-leg WC accas with O2.5 Goals = 8x–14x combined odds with 70%+ AI probability. Use our builder."},
      ].map((t,i)=><Card key={i} style={{borderColor:`${t.color}20`}}>
        <div style={{fontSize:28,marginBottom:10}}>{t.icon}</div>
        <div style={{fontWeight:800,fontSize:14,color:t.color,marginBottom:8}}>{t.title}</div>
        <div style={{fontSize:13,color:G.dim,lineHeight:1.7}}>{t.tip}</div>
      </Card>)}
    </div>}
    <Card style={{marginTop:24,background:"linear-gradient(135deg,#0A1C35,#081428)",borderColor:"rgba(0,229,255,.2)",textAlign:"center",padding:"32px 24px"}}>
      <div style={{fontSize:22,fontWeight:900,marginBottom:8}}>🏆 Get All 104 World Cup AI Picks</div>
      <div style={{color:G.dim,fontSize:14,marginBottom:20}}>Pro & Elite subscribers get full WC coverage — every game, AI picks, accas & WhatsApp alerts.</div>
      <button onClick={onUpgrade} style={{background:G.gradGold,color:"#000",fontFamily:"inherit",fontWeight:700,padding:"14px 40px",borderRadius:9,border:"none",cursor:"pointer",fontSize:15}}>Start 7-Day Free Trial 🚀</button>
      <div style={{fontSize:12,color:G.muted,marginTop:8}}>No charge today · Cancel anytime</div>
    </Card>
  </div>;
}

// ── BET TRACKER ───────────────────────────────────────────────────────────────
function TrackerPage(){
  const [bets,setBets]=useState(TRACKER_DATA);
  const [adding,setAdding]=useState(false);
  const [f,setF]=useState({league:"",pick:"",odds:"",units:"",result:"pending"});
  const settled=bets.filter(b=>b.result!=="pending");
  const wins=settled.filter(b=>b.result==="won").length;
  const pnl=bets.reduce((a,b)=>a+(b.pnl||0),0);
  const roi=settled.length>0?((pnl/settled.reduce((a,b)=>a+b.units,0))*100).toFixed(1):0;
  function addBet(){
    if(!f.pick||!f.odds||!f.units) return;
    const p2=parseFloat(f.odds),u2=parseFloat(f.units);
    const nl=f.result==="won"?(p2-1)*u2:f.result==="lost"?-u2:null;
    setBets(prev=>[{id:Date.now(),date:"31 May",league:f.league||"Custom",pick:f.pick,odds:p2,units:u2,result:f.result,pnl:nl},...prev]);
    setF({league:"",pick:"",odds:"",units:"",result:"pending"});setAdding(false);
  }
  const inp2={background:G.card2,border:`1px solid ${G.border}`,borderRadius:8,padding:"9px 12px",color:G.text,fontFamily:"inherit",fontSize:13,outline:"none",width:"100%"};
  return <div style={{padding:"28px 24px",maxWidth:1000}}>
    <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(255,209,102,.07)",border:"1px solid rgba(255,209,102,.18)",borderRadius:20,padding:"5px 14px",fontSize:11,fontWeight:700,color:G.gold,marginBottom:16}}><Dot c={G.gold} p/>💰 BET TRACKER · {TODAY}</div>
    <div style={{fontSize:30,fontWeight:900,marginBottom:6}}>Money Tracker</div>
    <div style={{color:G.dim,fontSize:14,marginBottom:24}}>Full P&L tracking, ROI, win rate — like BetWatch</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:22}}>
      {[{label:"Total P&L",value:`${pnl>=0?"+":""}${pnl.toFixed(2)}u`,color:pnl>=0?G.green:G.red},{label:"ROI",value:`${roi>=0?"+":""}${roi}%`,color:roi>=0?G.green:G.red},{label:"Win Rate",value:`${settled.length>0?((wins/settled.length)*100).toFixed(1):0}%`,color:G.accent},{label:"Record",value:`${wins}W-${settled.length-wins}L`,color:G.text},{label:"Pending",value:bets.filter(b=>b.result==="pending").length,color:G.gold}].map((s,i)=>(
        <StatBox key={i} label={s.label} value={s.value} color={s.color}/>
      ))}
    </div>
    <div style={{display:"flex",justifyContent:"flex-end",marginBottom:14}}>
      <button onClick={()=>setAdding(a=>!a)} style={{background:adding?"transparent":G.grad,color:adding?G.text:"#000",border:adding?`1px solid ${G.border}`:"none",fontFamily:"inherit",fontWeight:700,padding:"9px 22px",borderRadius:8,cursor:"pointer",fontSize:13}}>
        {adding?"✕ Cancel":"+ Add Bet"}
      </button>
    </div>
    {adding&&<Card style={{marginBottom:18}}>
      <div style={{fontWeight:700,marginBottom:14}}>Log a New Bet</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr auto",gap:10,alignItems:"end"}}>
        {[["League","league","e.g. EPL"],["Pick","pick","e.g. Over 2.5"],["Odds","odds","e.g. 1.85"],["Units","units","e.g. 2"]].map(([l,k,ph])=>(
          <div key={k}><div style={{fontSize:11,color:G.muted,fontWeight:700,marginBottom:5}}>{l.toUpperCase()}</div><input value={f[k]} onChange={e=>setF(p=>({...p,[k]:e.target.value}))} placeholder={ph} style={inp2}/></div>
        ))}
        <div><div style={{fontSize:11,color:G.muted,fontWeight:700,marginBottom:5}}>RESULT</div>
          <select value={f.result} onChange={e=>setF(p=>({...p,result:e.target.value}))} style={{...inp2}}>
            <option value="pending">Pending</option><option value="won">Won</option><option value="lost">Lost</option>
          </select>
        </div>
        <button onClick={addBet} style={{background:G.grad,color:"#000",fontFamily:"inherit",fontWeight:700,padding:"9px 20px",borderRadius:8,border:"none",cursor:"pointer",fontSize:13,whiteSpace:"nowrap"}}>Add</button>
      </div>
    </Card>}
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{padding:"16px 20px",borderBottom:`1px solid ${G.border}`,fontWeight:700,fontSize:15}}>Bet History</div>
      <div style={{padding:"12px 16px"}}>
        <div style={{display:"grid",gridTemplateColumns:"80px 1fr 80px 55px 70px 90px",gap:10,padding:"8px 14px",marginBottom:8}}>
          {["Date","Pick","Odds","Units","Result","P&L"].map(h=><div key={h} style={{fontSize:11,color:G.muted,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>{h}</div>)}
        </div>
        {bets.map((b,i)=>(
          <div key={b.id||i} className="fu" style={{display:"grid",gridTemplateColumns:"80px 1fr 80px 55px 70px 90px",gap:10,alignItems:"center",padding:"12px 14px",borderRadius:10,background:i%2===0?"#07101A":"transparent",marginBottom:4,animationDelay:`${i*.04}s`}}>
            <div style={{fontSize:11,color:G.muted,fontFamily:"monospace"}}>{b.date}</div>
            <div style={{fontSize:13,fontWeight:600}}>{b.pick}</div>
            <div style={{fontFamily:"monospace",color:G.gold,fontWeight:700}}>{b.odds}</div>
            <div style={{fontFamily:"monospace",color:G.dim}}>{b.units}u</div>
            <Chip color={b.result==="won"?G.green:b.result==="lost"?G.red:G.gold} bg={b.result==="won"?"rgba(0,255,136,.1)":b.result==="lost"?"rgba(255,69,96,.1)":"rgba(255,209,102,.1)"}>{b.result==="won"?"✓ Won":b.result==="lost"?"✗ Lost":"⏳"}</Chip>
            <div style={{fontFamily:"monospace",fontWeight:700,color:b.pnl===null?G.dim:b.pnl>=0?G.green:G.red}}>{b.pnl===null?"–":`${b.pnl>=0?"+":""}${b.pnl?.toFixed(2)}u`}</div>
          </div>
        ))}
      </div>
    </Card>
  </div>;
}

// ── AFFILIATE ─────────────────────────────────────────────────────────────────
function AffiliatePage(){
  const [copied,setCopied]=useState(false);
  const link="https://edgeai.bet/ref/SHARP2026";
  const mrr=AFFILIATES.filter(r=>r.status==="active").reduce((a,r)=>a+r.earned,0);
  function copy(){navigator.clipboard.writeText(link).catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),2000);}
  return <div style={{padding:"28px 24px",maxWidth:960}}>
    <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(0,255,136,.07)",border:"1px solid rgba(0,255,136,.18)",borderRadius:20,padding:"5px 14px",fontSize:11,fontWeight:700,color:G.green,marginBottom:16}}><Dot c={G.green} p/>🤝 AFFILIATE PROGRAM</div>
    <div style={{fontSize:30,fontWeight:900,marginBottom:6}}>Earn While They Win</div>
    <div style={{color:G.dim,fontSize:14,marginBottom:24}}>20% recurring commission — every month, for life</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
      <div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:18}}>
          {[{label:"Monthly Recurring",value:`$${mrr.toFixed(2)}`,color:G.green},{label:"Active Referrals",value:AFFILIATES.filter(r=>r.status==="active").length,color:G.accent},{label:"All Time Earned",value:"$426",color:G.gold},{label:"Next Payout",value:"Jun 1",color:G.text}].map((s,i)=><StatBox key={i} label={s.label} value={s.value} color={s.color}/>)}
        </div>
        <Card>
          <div style={{fontWeight:700,fontSize:15,marginBottom:12}}>Your Referral Link</div>
          <div onClick={copy} style={{background:"#070E1A",border:`1px solid ${G.border}`,borderRadius:8,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",marginBottom:12}}>
            <span style={{fontFamily:"monospace",fontSize:13,color:G.accent}}>{link}</span>
            <span style={{fontSize:12,fontWeight:700,color:copied?G.green:G.muted}}>{copied?"✓ COPIED!":"COPY"}</span>
          </div>
          <div style={{display:"flex",gap:8}}>
            <a href={`https://wa.me/?text=I've been using EdgeAI — 68% win rate AI picks. Try it: ${link}`} target="_blank" rel="noreferrer" style={{flex:1,textDecoration:"none",background:G.wa,color:"#fff",fontFamily:"inherit",fontWeight:700,fontSize:13,padding:"10px 16px",borderRadius:8,textAlign:"center"}}>💬 WhatsApp</a>
            <a href={`https://twitter.com/intent/tweet?text=EdgeAI: 68% win rate AI picks. Try it: ${link}`} target="_blank" rel="noreferrer" style={{flex:1,textDecoration:"none",background:"linear-gradient(135deg,#1DA1F2,#0d8ecf)",color:"#fff",fontFamily:"inherit",fontWeight:700,fontSize:13,padding:"10px 16px",borderRadius:8,textAlign:"center"}}>🐦 X / Twitter</a>
          </div>
        </Card>
      </div>
      <Card>
        <div style={{fontWeight:700,fontSize:15,marginBottom:16}}>Commission Structure</div>
        {[{plan:"Starter $29",comm:"$5.80/mo"},{plan:"Pro $99",comm:"$19.80/mo",hot:true},{plan:"Elite $199",comm:"$39.80/mo"}].map((t,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0",borderBottom:i<2?`1px solid ${G.border}`:"none"}}>
            <span style={{fontWeight:600}}>{t.plan}</span>
            <span style={{fontFamily:"monospace",fontWeight:700,color:t.hot?G.green:G.accent}}>{t.comm}</span>
          </div>
        ))}
        <div style={{marginTop:14,background:"rgba(0,255,136,.05)",border:"1px solid rgba(0,255,136,.15)",borderRadius:10,padding:14,fontSize:13,color:G.dim}}>
          💡 50 Pro referrals = <strong style={{color:G.green}}>$990/month</strong> passive income
        </div>
        <div style={{marginTop:16,fontWeight:700,fontSize:15,marginBottom:12}}>Your Referrals</div>
        {AFFILIATES.map((r,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<AFFILIATES.length-1?`1px solid ${G.border}`:"none"}}>
            <div><div style={{fontWeight:600,fontSize:14}}>{r.name}</div><div style={{fontSize:12,color:G.dim}}>{r.plan}</div></div>
            <Chip color={r.status==="active"?G.green:G.red} bg={r.status==="active"?"rgba(0,255,136,.1)":"rgba(255,69,96,.1)"}>{r.status==="active"?`+$${r.earned}/mo`:"Churned"}</Chip>
          </div>
        ))}
      </Card>
    </div>
  </div>;
}

// ── WHATSAPP ──────────────────────────────────────────────────────────────────
function WAPage(){
  const groups=[{name:"EdgeAI · Starter Picks",members:312,tier:"Starter",open:true},{name:"EdgeAI · Pro VIP",members:187,tier:"Pro",open:true},{name:"EdgeAI · Elite Inner Circle",members:43,tier:"Elite",open:false}];
  return <div style={{padding:"28px 24px",maxWidth:900}}>
    <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(37,211,102,.07)",border:"1px solid rgba(37,211,102,.18)",borderRadius:20,padding:"5px 14px",fontSize:11,fontWeight:700,color:"#25D366",marginBottom:16}}><Dot c="#25D366" p/>💬 WHATSAPP VIP GROUPS · LIVE</div>
    <div style={{fontSize:30,fontWeight:900,marginBottom:6}}>WhatsApp VIP Groups</div>
    <div style={{color:G.dim,fontSize:14,marginBottom:24}}>Picks delivered instantly to your WhatsApp — the moment AI finds value</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18,marginBottom:28}}>
      {groups.map((g,i)=>(
        <Card key={i} style={{borderColor:i===1?"rgba(37,211,102,.2)":G.border}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
            <span style={{fontSize:32}}>💬</span>
            <Chip color={g.open?"#25D366":G.red} bg={g.open?"rgba(37,211,102,.1)":"rgba(255,69,96,.1)"}>{g.open?"🟢 Open":"🔴 Invite Only"}</Chip>
          </div>
          <div style={{fontWeight:800,fontSize:15,marginBottom:4}}>{g.name}</div>
          <div style={{fontSize:13,color:G.dim,marginBottom:14}}>{g.tier} subscribers only</div>
          <div style={{fontFamily:"monospace",fontSize:26,fontWeight:700,color:"#25D366"}}>{g.members}</div>
          <div style={{fontSize:11,color:G.dim,marginBottom:16}}>members</div>
          <button style={{width:"100%",background:G.wa,color:"#fff",fontFamily:"inherit",fontWeight:700,fontSize:14,padding:"12px",borderRadius:8,border:"none",cursor:"pointer"}}>💬 Join Group</button>
        </Card>
      ))}
    </div>
    <Card>
      <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>How Picks Are Delivered</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
        {[["01","AI Detects Value","Scans odds 24/7 for EV+ picks the moment they appear"],["02","Instant WA Alert","Pick, odds, units & analysis sent to your group in seconds"],["03","Line Watch","Follow-up alert if the line moves significantly"],["04","Result Update","Win/loss + unit P&L posted automatically after the game"]].map(([s,t,d])=>(
          <div key={s} style={{textAlign:"center"}}>
            <div style={{fontFamily:"monospace",fontWeight:700,fontSize:13,color:"#25D366",marginBottom:8}}>{s}</div>
            <div style={{fontWeight:700,fontSize:14,marginBottom:6}}>{t}</div>
            <div style={{fontSize:13,color:G.dim,lineHeight:1.6}}>{d}</div>
          </div>
        ))}
      </div>
    </Card>
  </div>;
}

// ── PRICING ───────────────────────────────────────────────────────────────────
function PricingPage({onSelect}){
  const trialEnd=new Date(); trialEnd.setDate(trialEnd.getDate()+7);
  const ted=trialEnd.toLocaleDateString("en-GB",{day:"numeric",month:"long"});
  return <div style={{padding:"28px 24px",maxWidth:980}}>
    <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(0,229,255,.07)",border:"1px solid rgba(0,229,255,.18)",borderRadius:20,padding:"5px 14px",fontSize:11,fontWeight:700,color:G.accent,marginBottom:16}}><Dot c={G.green} p/>7-DAY FREE TRIAL · ALL PLANS</div>
    <div style={{fontSize:36,fontWeight:900,letterSpacing:"-1px",marginBottom:8}}>Simple, <span style={{color:G.accent}}>Transparent</span> Pricing</div>
    <div style={{color:G.dim,fontSize:15,marginBottom:28}}>Start free for 7 days. No charge until trial ends. Cancel anytime.</div>
    <div style={{background:"rgba(0,255,136,.06)",border:"1px solid rgba(0,255,136,.2)",borderRadius:14,padding:"18px 22px",marginBottom:32,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
      <div><div style={{fontWeight:800,fontSize:17,color:G.green,marginBottom:4}}>🎁 7 Days Free — No Card Charged Today</div><div style={{fontSize:13,color:G.dim}}>Enter your card to reserve your spot. Cancel before {ted} and pay nothing.</div></div>
      <div style={{display:"flex",gap:24}}>{[["Day 1–7","FREE"],["Day 8+","Billed monthly"]].map(([d,v])=><div key={d} style={{textAlign:"center"}}><div style={{fontFamily:"monospace",fontWeight:700,fontSize:16,color:G.green}}>{v}</div><div style={{fontSize:11,color:G.dim}}>{d}</div></div>)}</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,marginBottom:32}}>
      {PLANS.map((plan,i)=>(
        <div key={i} style={{background:G.card,border:`1px solid ${plan.badge==="MOST POPULAR"?G.green+"33":G.border}`,borderRadius:20,padding:"32px 28px",position:"relative",transition:"transform .2s"}} onMouseOver={e=>e.currentTarget.style.transform="translateY(-4px)"} onMouseOut={e=>e.currentTarget.style.transform="none"}>
          {plan.badge&&<div style={{position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",background:plan.badge==="MOST POPULAR"?G.grad:G.gradGold,color:"#000",fontWeight:800,fontSize:10,padding:"4px 16px",borderRadius:20,whiteSpace:"nowrap"}}>{plan.badge}</div>}
          <div style={{color:G.dim,fontSize:12,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>{plan.name}</div>
          <div style={{marginBottom:10}}><span style={{fontSize:46,fontWeight:700,color:plan.badge==="MOST POPULAR"?G.green:G.text,fontFamily:"monospace"}}>${plan.price}</span><span style={{color:G.dim,fontSize:14}}>/mo</span></div>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(0,255,136,.08)",border:"1px solid rgba(0,255,136,.18)",borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:700,color:G.green,marginBottom:20}}>🎁 7 days FREE</div>
          <div style={{marginBottom:24}}>{plan.features.map((f,j)=><div key={j} style={{display:"flex",gap:8,marginBottom:9}}><span style={{color:G.green,fontWeight:700,flexShrink:0}}>✓</span><span style={{fontSize:13,color:j<2?G.text:G.dim,lineHeight:1.4}}>{f}</span></div>)}</div>
          <button onClick={()=>onSelect(plan)} style={{width:"100%",padding:14,background:plan.badge==="MOST POPULAR"?G.gradGreen:"transparent",color:plan.badge==="MOST POPULAR"?"#000":G.text,border:`1px solid ${plan.badge?"transparent":G.border}`,borderRadius:9,fontFamily:"inherit",fontWeight:700,fontSize:14,cursor:"pointer"}}>Start Free Trial →</button>
          <div style={{textAlign:"center",fontSize:11,color:G.muted,marginTop:8}}>No charge for 7 days</div>
        </div>
      ))}
    </div>
    <Card style={{textAlign:"center"}}>
      <div style={{fontSize:22,fontWeight:900,marginBottom:4}}>Path to $5K/Month MRR</div>
      <div style={{color:G.dim,fontSize:13,marginBottom:20}}>Subscriptions + 20% affiliate commissions = compounding growth</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
        {[{n:51,plan:"Pro $99",mrr:"$5,049"},{n:173,plan:"Starter $29",mrr:"$5,017"},{n:25,plan:"Elite $199",mrr:"$4,975"}].map((r,i)=>(
          <div key={i} style={{background:G.bg,borderRadius:12,padding:20}}><div style={{fontFamily:"monospace",fontSize:30,fontWeight:700,color:G.green}}>{r.n}</div><div style={{fontSize:12,color:G.dim,margin:"4px 0 8px"}}>{r.plan} subs</div><div style={{fontWeight:800,fontSize:18}}>{r.mrr} MRR</div></div>
        ))}
      </div>
    </Card>
  </div>;
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function DashPage({user,onUpgrade}){
  const won=TRACKER_DATA.filter(b=>b.result==="won").length;
  const pnl=TRACKER_DATA.reduce((a,b)=>a+(b.pnl||0),0);
  return <div style={{padding:"28px 24px",maxWidth:1060}}>
    {user?.trial&&<div style={{background:"rgba(0,255,136,.06)",border:"1px solid rgba(0,255,136,.2)",borderRadius:14,padding:"14px 20px",marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
      <div><div style={{fontWeight:800,color:G.green,marginBottom:4}}>🎁 Your 7-Day Free Trial is Active!</div><div style={{fontSize:13,color:G.dim}}>Full {user.plan?.name} access · No charge for 7 days · Cancel anytime</div></div>
      <Chip color={G.green} bg="rgba(0,255,136,.1)">✓ TRIAL ACTIVE</Chip>
    </div>}
    <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(0,229,255,.07)",border:"1px solid rgba(0,229,255,.18)",borderRadius:20,padding:"5px 14px",fontSize:11,fontWeight:700,color:G.accent,marginBottom:16}}><Dot c={G.green} p/>{TODAY} · {TZ}</div>
    <div style={{fontSize:28,fontWeight:900,marginBottom:6}}>Welcome{user?.name?`, ${user.name}`:""} <span style={{color:G.accent}}>⚡</span></div>
    <div style={{color:G.dim,fontSize:14,marginBottom:24}}>🏆 World Cup in <strong style={{color:G.accent}}>{WC_DAYS} days</strong> · {won}/{TRACKER_DATA.filter(b=>b.result!=="pending").length} picks won this week</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:26}}>
      <StatBox label="Total P&L" value={`+${pnl.toFixed(2)}u`} color={G.green} sub="This week"/>
      <StatBox label="Win Rate" value={`${Math.round(won/TRACKER_DATA.filter(b=>b.result!=="pending").length*100)}%`} color={G.accent} sub={`${won}/${TRACKER_DATA.filter(b=>b.result!=="pending").length} settled`}/>
      <StatBox label="Active Picks" value="6" color={G.gold} sub="Today · 5 markets"/>
      <StatBox label="WC Countdown" value={`${WC_DAYS}d 🏆`} color={G.purple} sub="Kicks off Jun 11"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:24}}>
      <div>
        <div style={{fontWeight:800,fontSize:17,marginBottom:14}}>⭐ Today's Top Picks</div>
        {SOCCER_PICKS.slice(0,4).map((p,i)=>(
          <div key={i} style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:12,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div><div style={{fontSize:11,color:G.dim,marginBottom:3}}>{p.league}</div><div style={{fontWeight:700,fontSize:14}}>{p.pick}</div><div style={{fontSize:11,color:G.dim,marginTop:2}}>{p.home} vs {p.away} · {p.time}</div></div>
            <div style={{textAlign:"right",flexShrink:0,marginLeft:12}}>
              <div style={{fontFamily:"monospace",fontSize:20,fontWeight:700,color:G.gold}}>{p.odds}</div>
              <div style={{fontSize:12,color:p.prob>=80?G.green:G.accent,fontWeight:700}}>{p.prob}%</div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div style={{fontWeight:800,fontSize:17,marginBottom:14}}>📈 Recent P&L</div>
        <Card>
          {TRACKER_DATA.slice(0,6).map((b,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<5?`1px solid ${G.border}`:"none"}}>
              <div><div style={{fontSize:13,fontWeight:600}}>{b.pick}</div><div style={{fontSize:11,color:G.dim}}>{b.date}</div></div>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"monospace",fontWeight:700,color:b.pnl===null?G.dim:b.pnl>=0?G.green:G.red,fontSize:14}}>{b.pnl===null?"⏳":`${b.pnl>=0?"+":""}${b.pnl?.toFixed(2)}u`}</div>
                <div style={{fontFamily:"monospace",fontSize:12,color:G.muted}}>{b.odds}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12}}>
      {[{sport:"⚽",label:"Soccer Hub",picks:6,prob:"82%"},{sport:"🏀",label:"Basketball",picks:2,prob:"79%"},{sport:"🎾",label:"Tennis",picks:2,prob:"78%"},{sport:"⚾",label:"MLB",picks:2,prob:"77%"},{sport:"🏆",label:"World Cup",picks:10,prob:"80%"}].map((s,i)=>(
        <Card2 key={i} style={{textAlign:"center",cursor:"pointer"}} onMouseOver={e=>e.currentTarget.style.borderColor=G.accent+"44"} onMouseOut={e=>e.currentTarget.style.borderColor=G.border}>
          <div style={{fontSize:24,marginBottom:6}}>{s.sport}</div>
          <div style={{fontWeight:700,fontSize:12,marginBottom:4}}>{s.label}</div>
          <div style={{fontFamily:"monospace",color:G.green,fontWeight:700,fontSize:18}}>{s.picks}</div>
          <div style={{fontSize:11,color:G.dim}}>picks · {s.prob}</div>
        </Card2>
      ))}
    </div>
  </div>;
}

// ── NAV PAGES ─────────────────────────────────────────────────────────────────
const PAGES=[
  {key:"dashboard",ico:"⚡",label:"Dashboard"},
  {key:"worldcup",ico:"🏆",label:"World Cup 2026",badge:"HOT",bc:G.gold},
  {key:"soccer",ico:"⚽",label:"Soccer Hub",badge:"FOCUS",bc:G.green},
  {key:"accumulator",ico:"🎰",label:"AI Accumulator"},
  {key:"tracker",ico:"💰",label:"Bet Tracker"},
  {key:"affiliate",ico:"🤝",label:"Affiliate"},
  {key:"whatsapp",ico:"💬",label:"WhatsApp"},
  {key:"pricing",ico:"💳",label:"Pricing"},
];

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App(){
  const [page,setPage]=useState("dashboard");
  const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem("ea_user"));}catch{return null;}});
  const [authModal,setAuthModal]=useState(null);
  const [checkout,setCheckout]=useState(null);

  function afterAuth(u){
    setUser(u);setAuthModal(null);
    if(!u.subscribed) setCheckout(PLANS[1]);
  }
  function afterCheckout(u){
    setUser(u);setCheckout(null);setPage("dashboard");
  }
  function signOut(){localStorage.removeItem("ea_user");setUser(null);setPage("pricing");}
  function startTrial(plan){if(!user){setAuthModal({mode:"signup",plan});}else{setCheckout(plan);}}

  return <>
    <style>{css}</style>
    {authModal&&<AuthModal mode={authModal.mode} plan={authModal.plan} onClose={()=>setAuthModal(null)} onSuccess={afterAuth}/>}
    {checkout&&user&&<CheckoutModal plan={checkout} user={user} onClose={()=>setCheckout(null)} onSuccess={afterCheckout}/>}

    {/* NAV */}
    <div style={{position:"fixed",top:0,left:0,right:0,zIndex:300,backdropFilter:"blur(20px)",background:"rgba(5,8,15,.92)",borderBottom:`1px solid ${G.border}`,height:58,display:"flex",alignItems:"center"}}>
      <div style={{maxWidth:1320,margin:"0 auto",padding:"0 20px",width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>setPage("dashboard")}>
          <div style={{width:30,height:30,background:G.grad,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:16,color:"#000"}}>⚡</div>
          <span style={{fontWeight:900,fontSize:20,letterSpacing:"-.5px"}}>EDGE<span style={{color:G.accent}}>AI</span></span>
          {user?.trial&&<Chip color={G.green} bg="rgba(0,255,136,.08)">🎁 TRIAL</Chip>}
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(0,229,255,.07)",border:"1px solid rgba(0,229,255,.18)",borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:700,color:G.accent}}><Dot c={G.green} p/>{TODAY}</div>
          <div style={{background:"rgba(255,209,102,.08)",border:"1px solid rgba(255,209,102,.2)",borderRadius:20,padding:"4px 12px",fontSize:11,color:G.gold,fontWeight:700}}>🏆 WC2026 · {WC_DAYS}d</div>
          {!user
            ?<><button onClick={()=>setAuthModal({mode:"signin"})} style={{background:"transparent",border:`1px solid ${G.border}`,color:G.text,fontFamily:"inherit",fontWeight:600,padding:"8px 18px",borderRadius:8,cursor:"pointer",fontSize:13}}>Sign In</button>
               <button onClick={()=>setAuthModal({mode:"signup",plan:PLANS[1]})} style={{background:G.grad,color:"#000",fontFamily:"inherit",fontWeight:700,padding:"9px 20px",borderRadius:8,border:"none",cursor:"pointer",fontSize:13}}>Start Free Trial</button></>
            :<><span style={{fontSize:13,color:G.dim}}>👋 {user.name||user.email?.split("@")[0]}</span>
               <button onClick={signOut} style={{background:"transparent",border:`1px solid ${G.border}`,color:G.dim,fontFamily:"inherit",padding:"7px 16px",borderRadius:8,cursor:"pointer",fontSize:12}}>Sign Out</button></>
          }
        </div>
      </div>
    </div>

    <div style={{paddingTop:58}}><Ticker/></div>

    <div style={{display:"grid",gridTemplateColumns:"210px 1fr",minHeight:"calc(100vh - 90px)"}}>
      {/* SIDEBAR */}
      <div style={{background:G.card,borderRight:`1px solid ${G.border}`,padding:"14px 10px",display:"flex",flexDirection:"column",gap:3,position:"sticky",top:90,height:"calc(100vh - 90px)",overflowY:"auto"}}>
        {PAGES.map(p=>(
          <button key={p.key} onClick={()=>setPage(p.key)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,borderLeft:page===p.key?`2px solid ${G.accent}`:"2px solid transparent",background:page===p.key?"rgba(0,229,255,.07)":"transparent",color:page===p.key?G.accent:G.dim,fontFamily:"inherit",fontSize:13,fontWeight:600,cursor:"pointer",width:"100%",textAlign:"left",border:"none",outline:"none"}}>
            <span style={{fontSize:15,width:22,textAlign:"center",flexShrink:0}}>{p.ico}</span>
            {p.label}
            {p.badge&&<span style={{marginLeft:"auto",background:`${p.bc||G.accent}18`,color:p.bc||G.accent,fontSize:9,fontWeight:800,padding:"2px 6px",borderRadius:4,letterSpacing:.5}}>{p.badge}</span>}
          </button>
        ))}
        <div style={{marginTop:"auto",paddingTop:16,display:"flex",flexDirection:"column",gap:10}}>
          {!user
            ?<button onClick={()=>setAuthModal({mode:"signup",plan:PLANS[1]})} style={{width:"100%",padding:11,background:G.gradGreen,color:"#000",fontFamily:"inherit",fontWeight:700,borderRadius:9,border:"none",cursor:"pointer",fontSize:13}}>🎁 Start Free Trial</button>
            :<div style={{background:"rgba(0,255,136,.06)",border:"1px solid rgba(0,255,136,.15)",borderRadius:10,padding:"10px 12px"}}><div style={{fontSize:10,color:G.green,fontWeight:700,marginBottom:4}}>TRIAL ACTIVE</div><div style={{fontSize:11,color:G.dim}}>7 days free · {user.plan?.name} plan</div></div>
          }
          <div style={{background:"rgba(255,209,102,.05)",border:"1px solid rgba(255,209,102,.15)",borderRadius:10,padding:"10px 12px"}}>
            <div style={{fontSize:10,color:G.gold,fontWeight:700,marginBottom:3}}>⚠️ DISCLAIMER</div>
            <div style={{fontSize:10,color:G.dim}}>18+ · Entertainment only · Bet responsibly</div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{overflowX:"hidden"}}>
        {page==="dashboard"&&<DashPage user={user} onUpgrade={()=>setPage("pricing")}/>}
        {page==="worldcup"&&<WCPage onUpgrade={()=>startTrial(PLANS[1])}/>}
        {page==="soccer"&&<SoccerPage/>}
        {page==="accumulator"&&<AccaPage/>}
        {page==="tracker"&&<TrackerPage/>}
        {page==="affiliate"&&<AffiliatePage/>}
        {page==="whatsapp"&&<WAPage/>}
        {page==="pricing"&&<PricingPage onSelect={startTrial}/>}
      </div>
    </div>
  </>;
}
