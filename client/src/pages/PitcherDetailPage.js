import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Axios from 'axios'

import BaseURL from '../apis/BaseURL'
import PitcherDetailHeader from '../components/PitcherDetailHeader'
import PitcherDetailBody from '../components/PitcherDetailBody'

const PitcherDetailPage = ({ match }) => {
    const history = useHistory();

    const goBack = () => {
        history.goBack({})
    };

    const {
        params: { id },
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
        const fetchBio = async () => {
            const result = await Axios.get(`/api/bio/${id}`)

            setDetails(result.data.player)
            setThrows(result.data.player.pitchHand)
        }
        fetchBio()
    }, [id])

    useEffect(() => {
        const fetchSplits = async () => {
            const result = await BaseURL.get(`/pitcher/${id}`)

            if (result.data.splits.splits.length < 2) {
                setIsEmpty(true);
                console.log('Player has no 2020 data from MLB.com API.');
            }
            else {
                setvsALL(result.data.overall.splits[result.data.overall.splits.length - 1].stat)
                setvsLHH(result.data.splits.splits.filter(p => p.split.code === 'vl')[result.data.splits.splits.filter(p => p.split.code === 'vl').length - 1].stat)
                setvsRHH(result.data.splits.splits.filter(p => p.split.code === 'vr')[result.data.splits.splits.filter(p => p.split.code === 'vr').length - 1].stat)
            }
        }
        fetchSplits()
    }, [id])

    useEffect(() => {
        const fetchPitches = async () => {
            const result = await BaseURL.get(`/pitch_types/pitcher/${id}`)

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
            <PitcherDetailHeader details={details} throws={throws} />
            <PitcherDetailBody isEmpty={isEmpty} vsALL={vsALL} vsLHH={vsLHH} vsRHH={vsRHH} pitchTypes={pitchTypes} />
        </div>);
}

export default PitcherDetailPage