import React, { useContext } from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { tooltipContext } from './UseTooltip.js'

const Circle = styled.circle`
    fill-opacity: 0.95;
    stroke: white;
    stroke-width: 1px;
    cursor: pointer;
    &:hover {
        fill: #f4ff7d;
    }
`;

const TooltipBox = styled.foreignObject`
    background-color: #1f1f1f;
    border: solid #fff;
    font-size: 0.9rem;
    text-align: center;
`;

const StrikeZoneLine = styled.foreignObject`
    background-color: #fff;
`;

const Tooltip = ({ x, y, info }) => (
    <TooltipBox x={(info.pfx_x > 0) ? (x + 10) : (x - 140)} y={y + 10} width={130} height={80}>
        <div className='tooltip-text-movement'>
            <strong>{info.pitch_name}
            <br />{(-info.pfx_x * 12).toFixed(1)} inches <FontAwesomeIcon icon="arrows-alt-h" />
            <br />{(info.pfx_z * 12).toFixed(1)} inches <FontAwesomeIcon icon="arrows-alt-v" />
            </strong>
        </div>
    </TooltipBox>
);

const VerticalLine = ({ x, y }) => (
    <StrikeZoneLine x={x} y={y} width={2} height={400}>
        Test
    </StrikeZoneLine>
)

const HorizontalLine = ({ x, y }) => (
    <StrikeZoneLine x={x} y={y} width={320} height={3}>

    </StrikeZoneLine>
)

// eslint-disable-next-line import/no-anonymous-default-export
export default ({
    x,
    y,
    width,
    height,
    data,
    xDimension,
    yDimension,
    padding = 0
}) => {

    const { tooltip, setTooltip } = useContext(tooltipContext);

    const xScale = d3
        .scaleLinear()
        .domain([-20, 20])
        .range([padding, width - padding]);
    const yScale = d3
        .scaleLinear()
        .domain([-26, 22])
        .range([padding, height - padding]);

    return (
        <g transform={`translate(${x}, ${y})`}>
            <VerticalLine
                x={xScale(0)}
                y={yScale(-26)}
            />
            <HorizontalLine
                x={xScale(-20)}
                y={yScale(0)}
            />
            {data.map(d => (
                <Circle
                    key={d.pitch_type}
                    cx={xScale(xDimension(d))}
                    cy={yScale(yDimension(d))}
                    r={11}
                    onMouseOver={() => setTooltip(d)}
                    onMouseOut={() => setTooltip(false)}
                    fill={(d.pitch_type === 'FF') ? '#ff0000' :
                        (d.pitch_type === 'SI') ? '#410063' :
                            (d.pitch_type === 'FC') ? '#ffff00' :
                                (d.pitch_type === 'SL') ? 'green' :
                                    (d.pitch_type === 'CU') ? '#1231ff' :
                                        (d.pitch_type === 'KC') ? '#ff6f00' :
                                            (d.pitch_type === 'CH') ? '#ff00cc' :
                                                (d.pitch_type === 'FS') ? 'cyan' : 'grey'}
                />
            ))}
            {tooltip && (
                <Tooltip
                    x={xScale(xDimension(tooltip))}
                    y={yScale(yDimension(tooltip))}
                    info={tooltip}
                />
            )}
        </g>
    );
};