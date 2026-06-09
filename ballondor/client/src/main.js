import './style.css';
import PlayerCard from './component/playerCard.js';

import trophyImg from './assets/balllo_logo.png';

const API_BASE = '';

document.querySelector('#app').innerHTML = `
<div class="page">

  <section class="hero">
    <div class="hero-content">
      <div>
        <h1>Ballon d'Or Winners Catalogue</h1>

        <p class="hero-description">
          The Ballon d'Or is football's most prestigious individual award,
          presented annually to the world's best player.
          Explore every winner in history and filter by club,
          nationality, or year range.
        </p>
      </div>

      <img src="${trophyImg}" alt="Ballon d'Or Trophy" class="hero-image">
    </div>
  </section>

  <section class="filters">
    <input type="text" id="club" placeholder="Club" />
    <input type="text" id="nationality" placeholder="Nationality" />
    <input type="number" id="year1" placeholder="Start Year" />
    <input type="number" id="year2" placeholder="End Year" />
    <button id="filter-btn">Apply Filters</button>
    <button id="reset-btn">Reset</button>
  </section>

  <div id="status"></div>

  <section id="players" class="players-grid"></section>

</div>
`;

// Grab references AFTER the markup is injected.
const playersContainer = document.getElementById('players');
const statusElement = document.getElementById('status');

function showLoading() {
  statusElement.innerHTML = `<div class="loading">Loading winners...</div>`;
}

function showError(message) {
  statusElement.innerHTML = `<div class="error">${message}</div>`;
}

function clearStatus() {
  statusElement.innerHTML = '';
}

function renderPlayers(players) {
  // Guard against non-array responses (e.g. an error object from the server).
  if (!Array.isArray(players) || !players.length) {
    playersContainer.innerHTML = '';
    showError('⚽ No winners match the selected criteria. Try changing your filters.');
    return;
  }

  clearStatus();
  playersContainer.innerHTML = players.map(PlayerCard).join('');
}

async function fetchAllPlayers() {
  try {
    showLoading();

    // since in my proxy fetch config I set '/winners' to proxy to 'http://localhost:3000/winners', 
    // I can just fetch('/winners') without the full URL
    const response = await fetch(`/winners`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    renderPlayers(data);
  } catch {
    showError('Unable to load Ballon d’Or data. Please try again later.');
  }
}

// apply the filters
async function applyFilters() {
  const club = document.getElementById('club').value.trim();
  const nationality = document.getElementById('nationality').value.trim();
  const year1 = document.getElementById('year1').value;
  const year2 = document.getElementById('year2').value;

  try {
    showLoading();

    const params = new URLSearchParams();

    if (club) params.set('club', club);
    if (nationality) params.set('nationality', nationality);
    if (year1) params.set('year1', year1);
    if (year2) params.set('year2', year2);

    const endpoint = params.toString()
      ? `/winners/search?${params.toString()}`
      : '/winners';

    const response = await fetch(`${API_BASE}${endpoint}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    renderPlayers(data);
  } catch {
    showError('Unable to load filtered results.');
  }
}

document
  .getElementById('filter-btn')
  .addEventListener('click', applyFilters);

document
  .getElementById('reset-btn')
  .addEventListener('click', () => {
    document.getElementById('club').value = '';
    document.getElementById('nationality').value = '';
    document.getElementById('year1').value = '';
    document.getElementById('year2').value = '';
    fetchAllPlayers();
  });

fetchAllPlayers();
