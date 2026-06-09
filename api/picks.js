export const config = { runtime: "edge" };

export default async function handler(req) {
try {
const footballRes = await fetch(
"https://api.football-data.org/v4/matches",
{
headers: {
"X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY
}
}
);

const footballData = await footballRes.json();

const picks =
  footballData.matches?.slice(0, 10).map((match, index) => ({
    id: String(index + 1),
    home: match.homeTeam?.name || "Home Team",
    away: match.awayTeam?.name || "Away Team",
    league: match.competition?.name || "Football",
    kickoff: match.utcDate,
    bet: "Match Winner",
    odds: "1.80",
    confidence: 75,
    reasoning: "Live fixture imported from Football-Data.org",
    betType: "Match Winner",
    sport: "Football",
    isValue: false
  })) || [];

return new Response(
  JSON.stringify({ picks }),
  {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  }
);

} catch (error) {
return new Response(
JSON.stringify({
picks: [],
error: error.message
}),
{
status: 500,
headers: {
"Content-Type": "application/json"
}
}
);
}
}
