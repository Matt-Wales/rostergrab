import React from 'react'

import PlayerGridContent from './PlayerGridContent'

const PlayerGrid = ({ players, isLoading, positionPlayersOnly }) => {
    const pitchers = players.filter(player => player.position.abbreviation === 'P')
    const positionPlayers = players.filter(player => player.position.abbreviation !== 'P')
    
    return isLoading 
    ? (<h1>Loading...</h1>) 
    : <PlayerGridContent pitchers={pitchers} positionPlayers={positionPlayers} positionPlayersOnly={positionPlayersOnly} />
}

export default PlayerGrid
