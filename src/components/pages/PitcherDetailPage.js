import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import PitcherDetailHeader from '../content/PitcherDetailHeader'
import PitcherDetailBody from '../content/PitcherDetailBody'

const PitcherDetailPage = ({ match }) => {
    const history = useHistory();

    const goBack = () => {
        history.goBack({  })
    };

    const {
        params: {id},
    } = match;

    
    const [details, setDetails] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)
    const [throws, setThrows] = useState([])
    const [vsALL, setvsALL] = useState([])
    const [vsLHH, setvsLHH] = useState([])
    const [vsRHH, setvsRHH] = useState([])
    const [pitchTypes, setPitchTypes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(`https://statsapi.mlb.com/api/v1/people/${id}`)
            .then(res => {
                setDetails(res.data.people[0])
                setThrows(res.data.people[0].pitchHand)
            })
    }, [id])

    useEffect(() => {
        axios.get(`https://statsapi.mlb.com/api/v1/people/${id}/stats?stats=statSplits,statsSingleSeason&group=pitching&gameType=R&sitCodes=vl,vr&season=2020&language=en`)
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
                    setvsLHH(res.data.stats[0].splits[0].stat);
                    setvsRHH(res.data.stats[0].splits[1].stat);
                }
            })
    }, [id])

    useEffect(() => {
        axios.get(`https://rostergrab.netlify.app/https://baseballsavant.mlb.com/player/pitch_types?player_id=${id}&player_type=pitcher&season=2020`)
            .then(res => {
                setPitchTypes(res.data)
            })
            .then(setIsLoading(false))
    }, [id])
    
    return isLoading 
    ? <h1>Loading...</h1>
    : (<div className="container-detail-page">
            <button className='btn' onClick={goBack}>Go Back</button><br></br>
            <PitcherDetailHeader details={details} throws={throws}/>
            <PitcherDetailBody isEmpty={isEmpty} vsALL={vsALL} vsLHH={vsLHH} vsRHH={vsRHH} pitchTypes={pitchTypes} />
        </div>);
}

export default PitcherDetailPage