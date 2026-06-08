import ballonDorWinners from "./data.js";

function filterByNationality(nationality) {
  return ballonDorWinners.filter((winner) => winner.nationality === nationality);
}

function filterByClub(club) {
    return ballonDorWinners.filter((winner) => winner.club === club);
}

function filterByYearRange(year1, year2) {
    return ballonDorWinners.filter((winner) => winner.year >= year1 && winner.year <= year2);
}

function filterByMultipleCriteria(criterias) {
  return ballonDorWinners.filter((winner) => {
    return criterias.some((criteria) => {
      if (criteria.type === 'nationality') {
        return winner.nationality === criteria.value;
      }
      if (criteria.type === 'club') {
        return winner.club === criteria.value;
      }
      if (criteria.type === 'year') {
        return winner.year >= criteria.value[0] && winner.year <= criteria.value[1];
      }
      return false;
    });
  });
}

export { filterByNationality, filterByClub, filterByYearRange, filterByMultipleCriteria };