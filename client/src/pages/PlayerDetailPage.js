import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Axios from 'axios'

import PlayerDetailHeader from '../components/PlayerDetailHeader'
import PlayerDetailBody from '../components/PlayerDetailBody'

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
        const fetchPlayers = async () => {
            const result = await Axios.get(`/api/bio/${id}`)

            setDetails(result.data.player)
            setPosition(result.data.player.primaryPosition)
            setBats(result.data.player.batSide)
        }
        fetchPlayers()
    }, [id])

    useEffect(() => {
        const fetchSplits = async () => {
            const result = await Axios.get(`/api/hitter/${id}`)

            if (result.data.splits.splits.length < 2) {
                setIsEmpty(true);
                console.log('Player has no 2020 data from MLB.com API.');
            }
            else {
                setvsALL(result.data.overall.splits[result.data.overall.splits.length - 1].stat)
                setvsLHP(result.data.splits.splits.filter(p => p.split.code === 'vl')[result.data.splits.splits.filter(p => p.split.code === 'vl').length - 1].stat)
                setvsRHP(result.data.splits.splits.filter(p => p.split.code === 'vr')[result.data.splits.splits.filter(p => p.split.code === 'vr').length - 1].stat)
            }
        }
        fetchSplits()
    }, [id])

    useEffect(() => {
        const fetchRolling = async () => {
            const result = await Axios.get(`/api/rolling/${id}`)

            if (result.data.rolling === null) {
                setIsEmpty(true);
                console.log('Player has no 2020 data from MLB.com API.');
            }
            else {
                setRolling(result.data.rolling)
            }
        }
        fetchRolling()
    }, [id])

    useEffect(() => {
        const fetchPitches = async () => {
            const result = await Axios.get(`/api/pitch_types/hitter/${id}`)

            setPitchTypes(result.data.pitches)

            setIsLoading(false)
        }
        fetchPitches()
    }, [id])

    return isLoading
        ? (<div className="container-detail-page">
            <button className='btn' onClick={goBack}>Go Back</button><br></br>
            <h1>Loading...</h1>
        </div>)
        : (<div className="container-detail-page">
            <button className='btn' onClick={goBack}>Go Back</button><br></br>
            <PlayerDetailHeader details={details} position={position} bats={bats} />
            <PlayerDetailBody isEmpty={isEmpty} vsALL={vsALL} vsLHP={vsLHP} vsRHP={vsRHP} pitchTypes={pitchTypes} rolling={rolling} />
        </div>);
}

export default PlayerDetailPage