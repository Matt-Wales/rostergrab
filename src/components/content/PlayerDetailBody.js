import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import PlayerRolling from '../content/PlayerRolling'

const PlayerDetailBody = ({ isEmpty, vsALL, vsLHP, vsRHP, pitchTypes, rolling }) => {
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
                                        <td className='player-splits-table-metric'>AVG</td>
                                        <td className='player-splits-table-value'>{vsALL.avg}</td>
                                    </tr>
                                    <tr>
                                        <td className='player-splits-table-metric'>OBP</td>
                                        <td className='player-splits-table-value'>{vsALL.obp}</td>
                                    </tr>
                                    <tr>
                                        <td className='player-splits-table-metric'>SLG</td>
                                        <td className='player-splits-table-value'>{vsALL.slg}</td>
                                    </tr>
                                    <tr>
                                        <td className='player-splits-table-metric'>BB%</td>
                                        <td className='player-splits-table-value'>{Math.round((vsALL.baseOnBalls / vsALL.plateAppearances) * 100)}%</td>
                                    </tr>
                                    <tr>
                                        <td className='player-splits-table-metric'>K%</td>
                                        <td className='player-splits-table-value'>{Math.round((vsALL.strikeOuts / vsALL.plateAppearances) * 100)}%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='card-2'>
                        <div className='player-splits-heading-container'>
                            2020 Stats vs LHP
                        </div>
                        <div className='player-splits-table-container'>
                            <table className='player-splits-table'>
                                <tbody>
                                    <tr>
                                        <td className='player-splits-table-metric'>AVG</td>
                                        <td className='player-splits-table-value'>{vsLHP.avg}</td>
                                    </tr>
                                    <tr>
                                        <td className='player-splits-table-metric'>OBP</td>
                                        <td className='player-splits-table-value'>{vsLHP.obp}</td>
                                    </tr>
                                    <tr>
                                        <td className='player-splits-table-metric'>SLG</td>
                                        <td className='player-splits-table-value'>{vsLHP.slg}</td>
                                    </tr>
                                    <tr>
                                        <td className='player-splits-table-metric'>BB%</td>
                                        <td className='player-splits-table-value'>{Math.round((vsLHP.baseOnBalls / vsLHP.plateAppearances) * 100)}%</td>
                                    </tr>
                                    <tr>
                                        <td className='player-splits-table-metric'>K%</td>
                                        <td className='player-splits-table-value'>{Math.round((vsLHP.strikeOuts / vsLHP.plateAppearances) * 100)}%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='card-2'>
                        <div className='player-splits-heading-container'>
                            2020 Stats vs RHP
                        </div>
                        <div className='player-splits-table-container'>
                            <table className='player-splits-table'>
                                <tbody>
                                    <tr>
                                        <td className='player-splits-table-metric'>AVG</td>
                                        <td className='player-splits-table-value'>{vsRHP.avg}</td>
                                    </tr>
                                    <tr>
                                        <td className='player-splits-table-metric'>OBP</td>
                                        <td className='player-splits-table-value'>{vsRHP.obp}</td>
                                    </tr>
                                    <tr>
                                        <td className='player-splits-table-metric'>SLG</td>
                                        <td className='player-splits-table-value'>{vsRHP.slg}</td>
                                    </tr>
                                    <tr>
                                        <td className='player-splits-table-metric'>BB%</td>
                                        <td className='player-splits-table-value'>{Math.round((vsRHP.baseOnBalls / vsRHP.plateAppearances) * 100)}%</td>
                                    </tr>
                                    <tr>
                                        <td className='player-splits-table-metric'>K%</td>
                                        <td className='player-splits-table-value'>{Math.round((vsRHP.strikeOuts / vsRHP.plateAppearances) * 100)}%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                <section className='cards-3'>
                    <div className='card-3'>
                        <div className='player-splits-heading-container'>
                            2020 Stats by Pitch Type
                        </div>
                        <div className='player-pitch-types-table-container'>
                            <table className='player-pitch-types-table'>
                                <tbody>
                                    <tr>
                                        <td className='player-pitch-types-table-pitch-type'><strong>Pitch Type</strong></td>
                                        <Tooltip title={<span style={{ fontSize: '1rem' }}>Number of Each Pitch Type Seen</span>} placement='top'>
                                            <td><strong>#</strong></td>
                                        </Tooltip>
                                        <Tooltip title={<span style={{ fontSize: '1rem' }}>Expected Batting Average</span>} placement='top'>
                                            <td><strong>xAVG</strong></td>
                                        </Tooltip>
                                        <Tooltip title={<span style={{ fontSize: '1rem' }}>Expected Slugging Percentage</span>} placement='top'>
                                            <td><strong>xSLG</strong></td>
                                        </Tooltip>
                                    </tr>
                                    {pitchTypes.map(pitchType => (
                                        <tr key={pitchType.pitch_type}>
                                            <td className='player-pitch-types-table-pitch-type'>{pitchType.pitch_name}</td>
                                            <td>{pitchType.pitches}</td>
                                            <td>{(pitchType.xba !== null) ? pitchType.xba.replace('0.', '.') : '-'}</td>
                                            <td>{(pitchType.xslg !== null) ? pitchType.xslg.replace('0.', '.') : '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='card-3'>
                        <div className='player-splits-heading-container'>
                            <Tooltip title={<span style={{ fontSize: '1rem' }}>Line going up = Batter is on a hot streak<br />Line going down = Batter is in a slump<br />Line is flat = Steady performance</span>} placement='top-right'>
                                <div><FontAwesomeIcon icon="question-circle" /> 2020 Slump/Streak Tracker</div>
                            </Tooltip>
                        </div>
                        <PlayerRolling rolling={rolling} />
                    </div>
                </section>
            </div>
        )
}

export default PlayerDetailBody
