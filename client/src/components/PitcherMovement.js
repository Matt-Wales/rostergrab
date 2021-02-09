import React from 'react'

import PitcherMovementScatterplot from '../components/PitcherMovementScatterplot'
import PitcherLocationScatterplot from '../components/PitcherLocationScatterplot'
import { useTooltip, tooltipContext } from './UseTooltip'

const PitcherMovement = ({ pitchTypes }) => {
    const state = useTooltip();

    return (
        <div>
            <tooltipContext.Provider value={state}>
                <div className='cards-6'>
                    <div id='card-6'>
                        <div className='graph-holder-movement'>
                            <PitcherMovementScatterplot
                                pitchTypes={pitchTypes}
                            />
                        </div>
                    </div>
                    <div id='card-7'>
                        <div className='graph-holder-location'>
                            <PitcherLocationScatterplot
                                pitchTypes={pitchTypes}
                            />
                        </div>
                    </div>
                </div>
            </tooltipContext.Provider>
        </div>
    )
}

export default PitcherMovement
