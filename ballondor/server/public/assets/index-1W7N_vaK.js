(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){return`
        <div class="player-card">
            <img src="/ballor.jpg" alt="Ballon d'Or Winners" />
            <h2>${e.player}</h2>
            <p>Nationality: ${e.nationality}</p>
            <p>Club: ${e.club}</p>
            <p>Year: ${e.year}</p>
        </div>
    `}var t=`/assets/balllo_logo-XmE_hLGo.png`,n=``;document.querySelector(`#app`).innerHTML=`
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

      <img src="${t}" alt="Ballon d'Or Trophy" class="hero-image">
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
`;var r=document.getElementById(`players`),i=document.getElementById(`status`);function a(){i.innerHTML=`<div class="loading">Loading winners...</div>`}function o(e){i.innerHTML=`<div class="error">${e}</div>`}function s(){i.innerHTML=``}function c(t){if(!Array.isArray(t)||!t.length){r.innerHTML=``,o(`⚽ No winners match the selected criteria. Try changing your filters.`);return}s(),r.innerHTML=t.map(e).join(``)}async function l(){try{a();let e=await fetch(`/winners`);if(!e.ok)throw Error(`HTTP ${e.status}`);c(await e.json())}catch{o(`Unable to load Ballon d’Or data. Please try again later.`)}}async function u(){let e=document.getElementById(`club`).value.trim(),t=document.getElementById(`nationality`).value.trim(),r=document.getElementById(`year1`).value,i=document.getElementById(`year2`).value;try{a();let o=new URLSearchParams;e&&o.set(`club`,e),t&&o.set(`nationality`,t),r&&o.set(`year1`,r),i&&o.set(`year2`,i);let s=o.toString()?`/winners/search?${o.toString()}`:`/winners`,l=await fetch(`${n}${s}`);if(!l.ok)throw Error(`HTTP ${l.status}`);c(await l.json())}catch{o(`Unable to load filtered results.`)}}document.getElementById(`filter-btn`).addEventListener(`click`,u),document.getElementById(`reset-btn`).addEventListener(`click`,()=>{document.getElementById(`club`).value=``,document.getElementById(`nationality`).value=``,document.getElementById(`year1`).value=``,document.getElementById(`year2`).value=``,l()}),l();