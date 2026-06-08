export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }

  try {
    const body = await req.json();
    const { sport, betType } = body;

    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric", year: "numeric"
    });

    const sportContexts = {
      "Football": "South Africa Premiership, Morocco Botola Pro, Nigeria NPFL, Egypt Premier League, Ghana Premier League, EPL, La Liga, Bundesliga, Serie A, Ligue 1, MLS, Brasileirao, Argentina Primera Division, Copa Libertadores, UEFA Nations League, International Friendlies",
      "Tennis": "ATP/WTA current tournaments - Roland Garros, Wimbledon, Queens Club, Halle, ATP 250/500 events",
      "Basketball": "NBA Finals/Playoffs, EuroLeague, FIBA events",
      "Baseball": "MLB regular season - all 30 teams active daily",
      "Rugby": "NRL, Super Rugby Pacific, United Rugby Championship, Premiership Rugby",
      "Cricket": "IPL, international Test matches, ODI series, T20 internationals",
      "Hockey": "NHL Stanley Cup Playoffs, international hockey",
      "Darts": "PDC Premier League Darts, PDC European Tour, major PDC events",
      "MMA": "UFC events, Bellator, PFL fight cards",
    };

    const context = sportContexts[sport] || sport;
    const betFocus = betType === "all" ? "Match Winner, Over/Under, Handicap, Both Teams Score, 1st Half" : betType;

    const prompt = `Today is ${today}. Generate exactly 10 betting picks for ${sport}.
Active leagues: ${context}
Bet type focus: ${betFocus}

Return ONLY a JSON array. No text before or after. Start with [ end with ].

Each object:
{"id":"p1","sport":"${sport}","league":"League Name","home":"Home Team","away":"Away Team","kickoff":"Today 20:00","bet":"Over 2.5 Goals","betType":"Over/Under","odds":"1.85","confidence":76,"edge":7,"isValue":false,"reasoning":"Sharp 2-3 sentence analysis with specific stats.","keyStats":["Stat 1 with numbers","Stat 2 with numbers","Stat 3 with numbers"],"h2h":"W3-D1-L1 last 5","form":"WWDLW","prediction":"2-1"}

Rules:
- REAL current teams/players active in ${sport} right now
- confidence 62-89 range
- odds decimal 1.15-4.50
- isValue true only if edge >= 6
- keyStats must have actual numbers
- For Football: include at least 3 African league games
- Mix bet types: winners, overs, handicaps, value bets`;

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 4000,
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: "You are Sage, elite sports betting AI. Return ONLY valid JSON arrays. No markdown, no explanation, no text outside the JSON array. Start response with [ and end with ]."
          },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await groqRes.json();
    const rawText = data.choices?.[0]?.message?.content || "[]";

    let picks = [];
    const cleaned = rawText.replace(/```json/g,"").replace(/```javascript/g,"").replace(/```/g,"").trim();

    try { picks = JSON.parse(cleaned); } catch(e1) {}

    if (!Array.isArray(picks) || picks.length === 0) {
      try {
        const s = cleaned.indexOf("[");
        const e = cleaned.lastIndexOf("]");
        if (s !== -1 && e > s) picks = JSON.parse(cleaned.substring(s, e + 1));
      } catch(e2) {}
    }

    return new Response(JSON.stringify({ picks, ok: true }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }
    });

  } catch(err) {
    return new Response(JSON.stringify({ picks: [], ok: false, error: err.message }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}
