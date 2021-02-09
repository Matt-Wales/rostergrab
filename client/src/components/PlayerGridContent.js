import React from 'react'

import PlayerItem from './PlayerItem'
import PitcherItem from './PitcherItem'

const PlayerGridContent = ({ pitchers, positionPlayers, positionPlayersOnly }) => {
    return positionPlayersOnly 
    ? <section className='cards'>
    {positionPlayers.map(player => (
        <PlayerItem key={player.person.id} player={player}></PlayerItem>
    ))}
    </section>
    : <section className='cards'>
    {pitchers.map(player => (
        <PitcherItem key={player.person.id} player={player}></PitcherItem>
    ))}
    </section>
}

export default PlayerGridContent
