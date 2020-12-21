import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import PlayerDetailHeader from '../content/PlayerDetailHeader'
import PlayerDetailBody from '../content/PlayerDetailBody'

const PlayerDetailPage = ({ match }) => {
    const history = useHistory();

    const goBack = () => {
        history.goBack()
    };

    const {
        params: { id },
    } = match;


    const [details, setDetails] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)
    const [position, setPosition] = useState([])
    const [bats, setBats] = useState([])
    const [vsALL, setvsALL] = useState([])
    const [vsLHP, setvsLHP] = useState([])
    const [vsRHP, setvsRHP] = useState([])
    const [pitchTypes, setPitchTypes] = useState([])
    const [rolling, setRolling] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(`https://statsapi.mlb.com/api/v1/people/${id}`)
            .then(res => {
                setDetails(res.data.people[0])
                setPosition(res.data.people[0].primaryPosition)
                setBats(res.data.people[0].batSide)
            })
    }, [id])

    useEffect(() => {
        axios.get(`https://statsapi.mlb.com/api/v1/people/${id}/stats?stats=statSplits,statsSingleSeason&group=hitting&gameType=R&sitCodes=vl,vr&season=2020&language=en`)
            .then(res => {
                if (res.data.stats.length === 1) {
                    setIsEmpty(true);
                    console.log('Player has no 2020 data from MLB.com API.');
                }
                else if (res.data.stats[0].splits.length <= 1) {
                    setIsEmpty(true);
                    console.log('Player has no 2020 data from MLB.com API.');
                }
                else {
                    setvsALL(res.data.stats[1].splits[0].stat);
                    setvsLHP(res.data.stats[0].splits[0].stat);
                    setvsRHP(res.data.stats[0].splits[1].stat);
                }
            })
    }, [id])

    useEffect(() => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://baseballsavant.mlb.com/player-services/roll?playerId=${id}&count=50&type=xwoba_roll&year=2020`)
            .then(res => {
                if (res.data == null) {
                    setRolling([]);
                    console.log('Player has too few plate appearances.');
                }
                else {
                    setRolling(res.data);
                }
            })
    }, [id])

    useEffect(() => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://baseballsavant.mlb.com/player/pitch_types?player_id=${id}&season=2020`)
            .then(res => {
                setPitchTypes(res.data)
            })
            .then(setIsLoading(false))
    }, [id])

    return isLoading
        ? <h1>Loading...</h1>
        : (<div className="container-detail-page">
            <button className='btn' onClick={goBack}>Go Back</button><br></br>
            <PlayerDetailHeader details={details} position={position} bats={bats} />
            <PlayerDetailBody isEmpty={isEmpty} vsALL={vsALL} vsLHP={vsLHP} vsRHP={vsRHP} pitchTypes={pitchTypes} rolling={rolling} />
        </div>);
}

export default PlayerDetailPage