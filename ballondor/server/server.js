import express from 'express';
import ballonDorWinners from './data/data.js';
import { filterByNationality, filterByClub, filterByYearRange, filterByMultipleCriteria } from './data/filter.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



console.log(ballonDorWinners);

// initialize express app
const app = express();
app.use(express.static(path.join(__dirname, '../client')));


// the home route port
app.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../client/index.html')
  );
});

// route for getting the list of winners
app.get('/winners', (req, res) => {
  res.status(200).json(ballonDorWinners);
})

// route for getting a winners by year-range
app.get('/winners/range/:year1-:year2', (req, res) => {
  const { year1, year2 } = req.params;
  const winners = filterByYearRange(parseInt(year1), parseInt(year2));
  res.status(200).json(winners);
})

// route for getting winners by club
app.get('/winners/club/:club', (req, res) => {
  const { club } = req.params;
  const winners = filterByClub(club);
  res.status(200).json(winners);
})

// route for getting winners by nationality
app.get('/winners/nationality/:nationality', (req, res) => {
  const { nationality } = req.params;
  const winners = filterByNationality(nationality);
  res.status(200).json(winners);
})

// routte for multiple filters
app.get('/winners/filter/:year1-:year2/:club/:nationality', (req, res) => {
  const { year1, year2, club, nationality } = req.params;
  const winners = filterByMultipleCriteria([
    { type: 'year', value: [parseInt(year1), parseInt(year2)] },
    { type: 'club', value: club },
    { type: 'nationality', value: nationality }
  ]);
  res.status(200).json(winners);
})

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});