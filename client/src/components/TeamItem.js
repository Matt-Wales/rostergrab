import React from 'react'
import { Link } from 'react-router-dom';

const TeamItem = ({ team }) => {
    return (
        <Link to={`/team/${team.id}`} key={team.id} style={{ textDecoration: 'none' }}>
            <div className='team-card'>
                <div className='team-card-image-container'>
                    <img src={'https://www.mlbstatic.com/team-logos/team-cap-on-dark/' + team.id + '.svg'} alt={team.name + ' logo'} />
                </div>
                <div className='team-card-name-container'>
                    {team.name}
                </div>
            </div>
        </Link>
    )
}

export default TeamItem
