import React from 'react'
import { Link } from "react-router-dom";

const PitcherItem = ({ player }) => {
    return (
        <Link to={`/pitcher/${player.person.id}`} key={player.person.id} style={{ textDecoration: 'none' }}>
            <div className={(player.person.pitchHand.code === 'L') ? 'card-lefty' : 'card'}>
                <div className='card-image-container'>
                    <img src={'https://img.mlbstatic.com/mlb-photos/image/upload/w_300,q_100/v1/people/' + player.person.id + '/headshot/67/current'} alt={player.person.nameFirstLast + ' image'} onError={(e) => { e.target.src = 'http://www.milb.com/images/silhouette/180x270.jpg'}} />
                </div>
                <div className='card-name-container'>
                    {player.person.nameFirstLast}
                </div>
                <div className='card-info-container'>
                    <strong>Position:</strong> {player.person.pitchHand.code}H{player.position.abbreviation}<br></br>
                    <strong>Age:</strong> {player.person.currentAge}<br></br>
                    <strong>H/W:</strong> {player.person.height} {player.person.weight} lbs
                </div>
            </div>
        </Link>

    )
}

export default PitcherItem
