import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import ballonDorWinners from '../data/data.js';
import { filterByNationality, filterByClub, filterByYearRange, filterByMultipleCriteria } from '../data/filter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// home route
router.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../../client/index.html')
  );
});

// route for getting the list of winners
router.get('/winners', (req, res) => {
  res.status(200).json(ballonDorWinners);
});

// route for filtering winners by any combination of query params
router.get('/winners/search', (req, res) => {
  const { club, nationality, year1, year2 } = req.query;
  const criterias = [];

  if (year1 || year2) {
    criterias.push({
      type: 'year',
      value: [
        year1 ? parseInt(year1, 10) : 1956,
        year2 ? parseInt(year2, 10) : new Date().getFullYear()
      ]
    });
  }

  if (club) {
    criterias.push({ type: 'club', value: club });
  }

  if (nationality) {
    criterias.push({ type: 'nationality', value: nationality });
  }

  const winners = criterias.length
    ? filterByMultipleCriteria(criterias)
    : ballonDorWinners;

  res.status(200).json(winners);
});

// route for getting winners by year range
router.get('/winners/range/:year1-:year2', (req, res) => {
  const { year1, year2 } = req.params;
  const winners = filterByYearRange(parseInt(year1), parseInt(year2));
  res.status(200).json(winners);
});

// route for getting winners by club
router.get('/winners/club/:club', (req, res) => {
  const { club } = req.params;
  const winners = filterByClub(club);
  res.status(200).json(winners);
});

// route for getting winners by nationality
router.get('/winners/nationality/:nationality', (req, res) => {
  const { nationality } = req.params;
  const winners = filterByNationality(nationality);
  res.status(200).json(winners);
});

// route for multiple filters
router.get('/winners/filter/:year1-:year2/:club/:nationality', (req, res) => {
  const { year1, year2, club, nationality } = req.params;
  const winners = filterByMultipleCriteria([
    { type: 'year', value: [parseInt(year1), parseInt(year2)] },
    { type: 'club', value: club },
    { type: 'nationality', value: nationality }
  ]);

  res.status(200).json(winners);
});

export default router;
