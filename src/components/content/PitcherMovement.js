import React from 'react'

import PitcherMovementScatterplot from '../content/PitcherMovementScatterplot'
import PitcherLocationScatterplot from '../content/PitcherLocationScatterplot'
import { useTooltip, tooltipContext } from './UseTooltip'

const PitcherMovement = ({ pitchTypes }) => {
    const state = useTooltip();

    return (
        <div>
            <tooltipContext.Provider value={state}>
                <div className='cards-6'>
                    <div className='card-6'>
                        <svg width='320' height='400'>
                            <text x='164' y='10' fill='white' fontSize='11px'>Carry</text>
                            <text x='164' y='397' fill='white' fontSize='11px'>Break</text>
                            <text x='1' y='214' fill='white' fontSize='11px'>LHP</text>
                            <text x='1' y='230' fill='white' fontSize='11px'>Run</text>
                            <text x='297' y='214' fill='white' fontSize='11px'>RHP</text>
                            <text x='298' y='230' fill='white' fontSize='11px'>Run</text>
                            <PitcherMovementScatterplot
                                x={0}
                                y={0}
                                width={320}
                                height={400}
                                data={pitchTypes}
                                xDimension={d => (-d.pfx_x * 12)}
                                yDimension={d => (-d.pfx_z * 12)}
                            />
                        </svg>
                    </div>
                    <div className='card-6'>
                        <svg width='360' height='360'>
                            <text x='152' y='56' fill='white' fontSize='11px'>Strike Zone</text>
                            <PitcherLocationScatterplot
                                x={0}
                                y={0}
                                width={360}
                                height={360}
                                data={pitchTypes}
                                xDimension={d => -d.plate_x}
                                yDimension={d => -d.plate_z}
                            />
                        </svg>
                    </div>
                </div>
            </tooltipContext.Provider>
        </div>
    )
}

export default PitcherMovement
