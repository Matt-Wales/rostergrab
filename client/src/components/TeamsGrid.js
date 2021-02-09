import React from 'react'

import TeamItem from '../components/TeamItem'

const TeamsGrid = ({ teams }) => {
    return <section className='cards'>
        {teams.map(team => (
            <TeamItem key={team.id} team={team}></TeamItem>
        ))}
    </section>
}

export default TeamsGrid
