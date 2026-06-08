
const PlayerCard = ({ player }) => {
    return (
        <div className="player-card">
            <img src={web103_project/ballondor/client/src/assets/ballor.jpg} alt={player.name} />
            <h2>{player.name}</h2>
            <p>Nationality: {player.nationality}</p>
            <p>Club: {player.club}</p>
            <p>Year: {player.year}</p>
        </div>
    );
};

export default PlayerCard;