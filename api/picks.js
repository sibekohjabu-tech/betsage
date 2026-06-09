const footballRes = await fetch(
  "https://api.football-data.org/v4/matches",
  {
    headers: {
      "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY
    }
  }
);

const footballData = await footballRes.json();

const fixtures = footballData.matches?.slice(0, 10).map(match => ({
  home: match.homeTeam.name,
  away: match.awayTeam.name,
  competition: match.competition.name,
  kickoff: match.utcDate
})) || [];const prompt = `
You are BetSage.

Analyze ONLY these real fixtures:

${JSON.stringify(fixtures, null, 2)}

For each fixture provide:

- best bet
- estimated odds
- confidence
- reasoning

Return JSON only
{
  "id": "1",
  "home": "Arsenal",
  "away": "Chelsea",
  "league": "Premier League",
  "bet": "Over 2.5 Goals",
  "odds": "1.82",
  "confidence": 78,
  "reasoning": "..."
}
