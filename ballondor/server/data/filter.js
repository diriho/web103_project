import ballonDorWinners from "./data.js";

// normalize the string to the fault tolerant to lowercase or uppercase
function normalize(value) {
  return String(value ?? '').trim().toLowerCase();
}

// filter by nationality
function filterByNationality(nationality) {
  const normalizedNationality = normalize(nationality);
  return ballonDorWinners.filter((winner) =>
    normalize(winner.nationality).includes(normalizedNationality)
  );
}

// filter by club
function filterByClub(club) {
  const normalizedClub = normalize(club);
  return ballonDorWinners.filter((winner) =>
    normalize(winner.club).includes(normalizedClub)
  );
}

// filter by year range
function filterByYearRange(year1, year2) {
  return ballonDorWinners.filter((winner) => winner.year >= year1 && winner.year <= year2);
}

// filter by multiple criteria
function filterByMultipleCriteria(criterias) {
  return ballonDorWinners.filter((winner) => {
    return criterias.every((criteria) => {
      if (criteria.type === 'nationality') {
        return normalize(winner.nationality).includes(normalize(criteria.value));
      }
      if (criteria.type === 'club') {
        return normalize(winner.club).includes(normalize(criteria.value));
      }
      if (criteria.type === 'year') {
        const [year1, year2] = criteria.value;
        return winner.year >= year1 && winner.year <= year2;
      }
      return false;
    });
  });
}

// export line
export { filterByNationality, filterByClub, filterByYearRange, filterByMultipleCriteria };
