function PlayerCard(player) {
    return `
        <div class="player-card">
            <img src="./assets/ballor.jpg" alt="${player.name}" />
            <h2>${player.name}</h2>
            <p>Nationality: ${player.nationality}</p>
            <p>Club: ${player.club}</p>
            <p>Year: ${player.year}</p>
        </div>
    `;
}

export default PlayerCard;