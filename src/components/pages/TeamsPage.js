import React from 'react'

import TeamsGrid from '../content/TeamsGrid'

const TeamsPage = () => {
    const teams = [
        {name: 'Arizona Diamondbacks',
        id: 109},
        {name: 'Atlanta Braves',
        id: 144},
        {name: 'Baltimore Orioles',
        id: 110},
        {name: 'Boston Red Sox',
        id: 111},
        {name: 'Chicago Cubs',
        id: 112},
        {name: 'Chicago White Sox',
        id: 145},
        {name: 'Cincinnati Reds',
        id: 113},
        {name: 'Cleveland Indians',
        id: 114},
        {name: 'Colorado Rockies',
        id: 115},
        {name: 'Detroit Tigers',
        id: 116},
        {name: 'Houston Astros',
        id: 117},
        {name: 'Kansas City Royals',
        id: 118},
        {name: 'Los Angeles Angels',
        id: 108},
        {name: 'Los Angeles Dodgers',
        id: 119},
        {name: 'Miami Marlins',
        id: 146},
        {name: 'Milwaukee Brewers',
        id: 158},
        {name: 'Minnesota Twins',
        id: 142},
        {name: 'New York Mets',
        id: 121},
        {name: 'New York Yankees',
        id: 147},
        {name: 'Oakland Athletics',
        id: 133},
        {name: 'Philadelphia Phillies',
        id: 143},
        {name: 'Pittsburgh Pirates',
        id: 134},
        {name: 'San Diego Padres',
        id: 135},
        {name: 'San Francisco Giants',
        id: 137},
        {name: 'Seattle Mariners',
        id: 136},
        {name: 'St. Louis Cardinals',
        id: 138},
        {name: 'Tampa Bay Rays',
        id: 139},
        {name: 'Texas Rangers',
        id: 140},
        {name: 'Toronto Blue Jays',
        id: 141},
        {name: 'Washington Nationals',
        id: 120},]

    return (<div className="container">
        <div className='teams-header'>Choose a Team</div>
        <TeamsGrid teams={teams} />
    </div>
    );
}

export default TeamsPage
