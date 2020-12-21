import React from 'react'

const PitcherDetailHeader = ({ details, stats, throws }) => {
    return (
        <div className={(throws.code === 'L') ? 'player-header-lefty' : 'player-header'}>
            <div className='player-header-image-container'>
                <img src={'https://img.mlbstatic.com/mlb-photos/image/upload/w_300,q_100/v1/people/' + details.id + '/headshot/67/current'} alt={details.nameFirstLast + ' image'} onError={(e) => { e.target.src = 'http://www.milb.com/images/silhouette/180x270.jpg' }} />
            </div>
            <div className='player-header-info-container'>
                <div className='player-header-name-container'>
                    {details.nameFirstLast}
                </div>
                <div className='player-header-bats-container'>
                    {throws.code}HP
                </div>
                <div className='player-header-height-weight-container'>
                    {details.height} {details.weight} lbs
                </div>
                <div className='player-header-age-container'>
                    {details.currentAge} years old
                </div>
            </div>
        </div>
    )
}

export default PitcherDetailHeader