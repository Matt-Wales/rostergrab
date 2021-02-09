import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Switch } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import PlayerGrid from '../components/PlayerGrid'

const RosterPage = ({ match }) => {
    const history = useHistory();

    const goBack = () => {
        history.goBack()
    };

    const {
        params: { id },
    } = match;

    const [players, setPlayers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [positionPlayersOnly, setPositionPlayersOnly] = useState(true)

    const handleChange = () => {
        setPositionPlayersOnly((prev) => !prev)
    };

    useEffect(() => {
       const trueOrFalse = localStorage.getItem('position-players-only');
       if (trueOrFalse) {
           setPositionPlayersOnly(JSON.parse(trueOrFalse));
       } 
    }, [])

    useEffect(() => {
        localStorage.setItem('position-players-only', JSON.stringify(positionPlayersOnly))
    })

    useEffect(() => {
        const fetchPlayers = async () => {
            const result = await axios.get(`https://statsapi.mlb.com/api/v1/teams/${id}/roster?hydrate=person&language=en&season=2021`)

            setPlayers(result.data.roster)

            setIsLoading(false)
        }

        fetchPlayers()
    }, [id])

    return (<div className="container-roster-page">
        <button className='btn' onClick={goBack}>Go Back</button><br></br>
        <div className="filter-button"><span>Pitchers<Switch checked={positionPlayersOnly} onChange={handleChange} color="primary" />Position Players</span></div>
        <PlayerGrid isLoading={isLoading} players={players} positionPlayersOnly={positionPlayersOnly} />
    </div>
    );
}

export default RosterPage