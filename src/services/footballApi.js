const API_KEY = import.meta.env.VITE_API_FOOTBALL_KEY;

export async function getFixtures(date) {
  const response = await fetch(
    `https://v3.football.api-sports.io/fixtures?date=${date}`,
    {
      headers: {
        "x-apisports-key": API_KEY,
      },
    }
  );

  const [fixtures, setFixtures] = useState([]);

useEffect(() => {
  getFixtures("2026-06-10")
    .then(setFixtures)
    .catch(console.error);
}, []);
