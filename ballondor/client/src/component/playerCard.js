function PlayerCard(player) {
    return `
        <div class="player-card">
            <img src="/ballor.jpg" alt="Ballon d'Or Winners" />
            <h2>${player.player}</h2>
            <p>Nationality: ${player.nationality}</p>
            <p>Club: ${player.club}</p>
            <p>Year: ${player.year}</p>
        </div>
    `;
}

export default PlayerCard;