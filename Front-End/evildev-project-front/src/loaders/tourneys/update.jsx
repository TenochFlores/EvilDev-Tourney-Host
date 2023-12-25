import axios from "axios";

const emptyTourney = {
  tourneyId: 0,
  tourneyName: '',
  tourneyRules: '',
  tourneyConsole: '',
  tourneyGameName: ''
};

export async function loader({params}) {
  const tourneyId = params.tourneyId;
  try {
    if (tourneyId !== undefined) {
      const response = await axios
        .get(`http://localhost:5000/api/tourney/${tourneyId}`);

      const tourney = await response.data;
      return {tourney};
    }
    return {emptyTourney};
  } catch {
    return {emptyTourney};
  }
}
