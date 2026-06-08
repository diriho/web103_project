import './style.css';
import PlayerCard from './component/playerCard.js';

const container = document.getElementById('players');

//import trophyImg from './assets/ballon-dor.png';

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

      <img src="/assets/ballon-dor.png" alt="Ballon d'Or Trophy" class="hero-image">
    </div>
  </section>

  <section class="filters">

    <input
      type="text"
      id="club"
      placeholder="Club"
    />

    <input
      type="text"
      id="nationality"
      placeholder="Nationality"
    />

    <input
      type="number"
      id="year1"
      placeholder="Start Year"
    />

    <input
      type="number"
      id="year2"
      placeholder="End Year"
    />

    <button id="filter-btn">
      Apply Filters
    </button>

    <button id="reset-btn">
      Reset
    </button>

  </section>

  <div id="status"></div>

  <section id="players" class="players-grid"></section>

</div>
`;

//const playersContainer = document.getElementById('players');
const statusElement = document.getElementById('status');

function showLoading() {
  statusElement.innerHTML = `
    <div class="loading">
      Loading winners...
    </div>
  `;
}

function showError(message) {
  statusElement.innerHTML = `
    <div class="error">
      ${message}
    </div>
  `;
}

function clearStatus() {
  statusElement.innerHTML = '';
}


function renderPlayers(players) {

  if (!players.length) {
    playersContainer.innerHTML = '';

    showError(`
      ⚽ No winners match the selected criteria.
      Try changing your filters.
    `);

    return;
  }

  clearStatus();

  playersContainer.innerHTML = players
    .map(PlayerCard)
    .join('');
}

async function fetchAllPlayers() {

  try {

    showLoading();

    const response = await fetch(
      `${API_BASE}/winners`
    );

    const data = await response.json();

    renderPlayers(data);

  } catch {

    showError(
      'Unable to load Ballon d’Or data. Please try again later.'
    );

  }
}

// container.innerHTML = players
//     .map(player => PlayerCard(player))
//     .join('');
    

async function applyFilters() {

  const club =
    document.getElementById('club').value.trim();

  const nationality =
    document.getElementById('nationality').value.trim();

  const year1 =
    document.getElementById('year1').value;

  const year2 =
    document.getElementById('year2').value;

  try {

    showLoading();

    let endpoint = '/winners';

    if (
      club &&
      nationality &&
      year1 &&
      year2
    ) {

      endpoint =
        `/winners/filter/${year1}-${year2}/${club}/${nationality}`;

    } else if (club) {

      endpoint =
        `/winners/club/${club}`;

    } else if (nationality) {

      endpoint =
        `/winners/nationality/${nationality}`;

    } else if (year1 && year2) {

      endpoint =
        `/winners/range/${year1}-${year2}`;
    }

    const response = await fetch(
      `${API_BASE}${endpoint}`
    );

    const data = await response.json();

    renderPlayers(data);

  } catch {

    showError(
      'Unable to load filtered results.'
    );

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