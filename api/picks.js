export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { sport = 'football' } = await req.json().catch(() => ({}));

  const prompt = `You are BetSage, an expert sports betting analyst. Generate 5 high-confidence betting picks for today's ${sport} matches (${new Date().toDateString()}).

For each pick return JSON array with this exact shape:
[{
  "match": "Team A vs Team B",
  "league": "League Name",
  "pick": "Match Winner / Over 2.5 / BTTS etc",
  "selection": "Team A / Over / Yes",
  "odds": 1.85,
  "confidence": 78,
  "edge": "+4.2%",
  "reasoning": "2 sentence explanation"
}]

Return ONLY the JSON array. No markdown, no explanation.`;

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
      temperature: 0.7
    })
  });

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || '[]';
  
  let picks = [];
  try {
    picks = JSON.parse(text.replace(/```json|```/g, '').trim());
  } catch {
    picks = [];
  }

  return new Response(JSON.stringify({ picks }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}
