import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';

import PitcherMovement from '../content/PitcherMovement'

const PitcherDetailBody = ({ isEmpty, vsALL, vsLHH, vsRHH, pitchTypes }) => {
    return isEmpty
        ? <h1>Player has no MLB stats from the 2020 season.</h1>
        : (
            <div id='player-detail-body'>
                <section className='cards-2'>
                    <div className='card-2'>
                        <div className='player-splits-heading-container'>
                            2020 Stats
                        </div>
                        <div className='player-splits-table-container'>
                            <table className='player-splits-table'>
                                <tbody>
                                    <tr>
                                        <Tooltip className='player-splits-table-metric' title={<span style={{ fontSize: '1rem' }}>Batting Average Against</span>} placement='top'>
                                            <td>AVG</td>
                                        </Tooltip>
                                        <td className='player-splits-table-value'>{vsALL.avg}</td>
                                    </tr>
                                    <tr>
                                        <Tooltip className='player-splits-table-metric' title={<span style={{ fontSize: '1rem' }}>Strikeouts Per 9 Innings Pitched</span>} placement='top'>
                                            <td>K/9</td>
                                        </Tooltip>
                                        <td className='player-splits-table-value'>{vsALL.strikeoutsPer9Inn}</td>
                                    </tr>
                                    <tr>
                                        <Tooltip className='player-splits-table-metric' title={<span style={{ fontSize: '1rem' }}>Walks Per 9 Innings Pitched</span>} placement='top'>
                                            <td>BB/9</td>
                                        </Tooltip>
                                        <td className='player-splits-table-value'>{vsALL.walksPer9Inn}</td>
                                    </tr>
                                    <tr>
                                        <Tooltip className='player-splits-table-metric' title={<span style={{ fontSize: '1rem' }}>Hits Per 9 Innings Pitched</span>} placement='top'>
                                            <td>H/9</td>
                                        </Tooltip>
                                        <td className='player-splits-table-value'>{vsALL.hitsPer9Inn}</td>
                                    </tr>
                                    <tr>
                                        <Tooltip className='player-splits-table-metric' title={<span style={{ fontSize: '1rem' }}>Home Runs Per 9 Innings Pitched</span>} placement='top'>
                                            <td>HR/9</td>
                                        </Tooltip>
                                        <td className='player-splits-table-value'>{vsALL.homeRunsPer9}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='card-2'>
                        <div className='player-splits-heading-container'>
                            2020 Stats vs LHH
                        </div>
                        <div className='player-splits-table-container'>
                            <table className='player-splits-table'>
                                <tbody>
                                    <tr>
                                        <Tooltip className='player-splits-table-metric' title={<span style={{ fontSize: '1rem' }}>Batting Average Against</span>} placement='top'>
                                            <td>AVG</td>
                                        </Tooltip>
                                        <td className='player-splits-table-value'>{vsLHH.avg}</td>
                                    </tr>
                                    <tr>
                                        <Tooltip className='player-splits-table-metric' title={<span style={{ fontSize: '1rem' }}>Strikeouts Per 9 Innings Pitched</span>} placement='top'>
                                            <td>K/9</td>
                                        </Tooltip>
                                        <td className='player-splits-table-value'>{vsLHH.strikeoutsPer9Inn}</td>
                                    </tr>
                                    <tr>
                                        <Tooltip className='player-splits-table-metric' title={<span style={{ fontSize: '1rem' }}>Walks Per 9 Innings Pitched</span>} placement='top'>
                                            <td>BB/9</td>
                                        </Tooltip>
                                        <td className='player-splits-table-value'>{vsLHH.walksPer9Inn}</td>
                                    </tr>
                                    <tr>
                                        <Tooltip className='player-splits-table-metric' title={<span style={{ fontSize: '1rem' }}>Hits Per 9 Innings Pitched</span>} placement='top'>
                                            <td>H/9</td>
                                        </Tooltip>
                                        <td className='player-splits-table-value'>{vsLHH.hitsPer9Inn}</td>
                                    </tr>
                                    <tr>
                                        <Tooltip className='player-splits-table-metric' title={<span style={{ fontSize: '1rem' }}>Home Runs Per 9 Innings Pitched</span>} placement='top'>
                                            <td>HR/9</td>
                                        </Tooltip>
                                        <td className='player-splits-table-value'>{vsLHH.homeRunsPer9}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='card-2'>
                        <div className='player-splits-heading-container'>
                            2020 Stats vs RHH
                        </div>
                        <div className='player-splits-table-container'>
                            <table className='player-splits-table'>
                                <tbody>
                                    <tr>
                                        <Tooltip className='player-splits-table-metric' title={<span style={{ fontSize: '1rem' }}>Batting Average Against</span>} placement='top'>
                                            <td>AVG</td>
                                        </Tooltip>
                                        <td className='player-splits-table-value'>{vsRHH.avg}</td>
                                    </tr>
                                    <tr>
                                        <Tooltip className='player-splits-table-metric' title={<span style={{ fontSize: '1rem' }}>Strikeouts Per 9 Innings Pitched</span>} placement='top'>
                                            <td>K/9</td>
                                        </Tooltip>
                                        <td className='player-splits-table-value'>{vsRHH.strikeoutsPer9Inn}</td>
                                    </tr>
                                    <tr>
                                        <Tooltip className='player-splits-table-metric' title={<span style={{ fontSize: '1rem' }}>Walks Per 9 Innings Pitched</span>} placement='top'>
                                            <td>BB/9</td>
                                        </Tooltip>
                                        <td className='player-splits-table-value'>{vsRHH.walksPer9Inn}</td>
                                    </tr>
                                    <tr>
                                        <Tooltip className='player-splits-table-metric' title={<span style={{ fontSize: '1rem' }}>Hits Per 9 Innings Pitched</span>} placement='top'>
                                            <td>H/9</td>
                                        </Tooltip>
                                        <td className='player-splits-table-value'>{vsRHH.hitsPer9Inn}</td>
                                    </tr>
                                    <tr>
                                        <Tooltip className='player-splits-table-metric' title={<span style={{ fontSize: '1rem' }}>Home Runs Per 9 Innings Pitched</span>} placement='top'>
                                            <td>HR/9</td>
                                        </Tooltip>
                                        <td className='player-splits-table-value'>{vsRHH.homeRunsPer9}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                <section className='cards-4'>
                    <div className='card-4'>
                        <div className='player-splits-heading-container'>
                            2020 Pitch Type Breakdown
                        </div>
                        <div className='player-pitch-types-table-container'>
                            <table className='player-pitch-types-table'>
                                <tbody>
                                    <tr>
                                        <td className='player-pitch-types-table-pitch-type'><strong>Pitch Type</strong></td>
                                        <td><strong>% Usage</strong></td>
                                        <Tooltip title={<span style={{ fontSize: '1rem' }}>Average Velocity in MPH</span>} placement='top'>
                                            <td><strong>Velocity</strong></td>
                                        </Tooltip>
                                        <Tooltip title={<span style={{ fontSize: '1rem' }}>Average Spin Rate in RPM</span>} placement='top'>
                                            <td><strong>Spin Rate</strong></td>
                                        </Tooltip>
                                        <Tooltip title={<span style={{ fontSize: '1rem' }}>(Whiffs / Pitches) * 100</span>} placement='top'>
                                            <td><strong>Whiff %</strong></td>
                                        </Tooltip>
                                        <Tooltip title={<span style={{ fontSize: '1rem' }}>Expected Weighted On-Base Average Against</span>} placement='top'>
                                            <td><strong>xWOBA</strong></td>
                                        </Tooltip>
                                    </tr>
                                    {pitchTypes.map(pitchType => (
                                        <tr key={pitchType.pitch_type}>
                                            <td className='player-pitch-types-table-pitch-type'>{pitchType.pitch_name}</td>
                                            <td>{Math.round(pitchType.pitch_percent)}%</td>
                                            <td>{pitchType.velocity}</td>
                                            <td>{pitchType.spin_rate}</td>
                                            <td>{Math.round((pitchType.whiffs / pitchType.pitches) * 100)}%</td>
                                            <td>{(pitchType.xwoba !== null) ? pitchType.xwoba.replace('0.', '.') : '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                <section className='cards-5'>
                    <div className='card-5'>
                        <div className='player-splits-heading-container'>
                            2020 Average Pitch Movement and Average Location
                        </div>
                        <div className='graph-subheading'>
                            Both graphs are from the pitcher's perspective. Hover on a pitch for details (tap if you're on a phone or tablet).
                        </div>
                    </div>
                </section>
                <PitcherMovement pitchTypes={pitchTypes} />
            </div>
        )
}

export default PitcherDetailBody
