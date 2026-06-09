export async function getPicks(sport, betType) {
  const res = await fetch("/api/picks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sport,
      betType
    })
  });

  return res.json();
}
