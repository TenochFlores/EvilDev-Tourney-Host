import axios from "axios";

export async function loader() {
  try {
    const response = await axios
      .get('http://localhost:5000/api/tourney/');
    const tourneys = await response.data;

    return {tourneys}
  } catch {
    const tourneys = [];
    return {tourneys}
  }
}
