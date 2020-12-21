import React from 'react'
import { Link } from "react-router-dom";

const PlayerItem = ({ player }) => {
    return (
        <Link to={`/player/${player.person.id}`} key={player.person.id} style={{ textDecoration: 'none' }}>
            <div className={(player.person.batSide == null) ? 'card' : (player.person.batSide.code === 'L') ? 'card-lefty' : (player.person.batSide.code === 'S') ? 'card-switch' : 'card'}>
                <div className='card-image-container'>
                    <img src={'https://img.mlbstatic.com/mlb-photos/image/upload/w_300,q_100/v1/people/' + player.person.id + '/headshot/67/current'} alt={player.person.nameFirstLast + ' image'} onError={(e) => { e.target.src = 'http://www.milb.com/images/silhouette/180x270.jpg'}}/>
                </div>
                <div className='card-name-container'>
                    {player.person.nameFirstLast}
                </div>
                <div className='card-info-container'>
                    <strong>Position:</strong> {player.position.abbreviation}<br></br>
                    <strong>B/T:</strong> {(player.person.batSide && player.person.pitchHand !== null) ? (player.person.batSide.description + '/' + player.person.pitchHand.description) : 'null'}<br></br>
                    <strong>Age:</strong> {player.person.currentAge}<br></br>
                    <strong>H/W:</strong> {player.person.height} {player.person.weight} lbs
                </div>
            </div>
        </Link>
    )
}

export default PlayerItem
