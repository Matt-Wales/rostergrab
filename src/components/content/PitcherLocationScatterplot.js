import React, { useContext } from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'

import { tooltipContext } from './UseTooltip.js'


const Circle = styled.circle`
    fill-opacity: 0.85;
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
    <TooltipBox x={(info.pfx_x > 0) ? (x + 10) : (x - 95)} 
    y={(info.plate_z < 0.5 || info.pfx_z < -0.8) ? (y - 60) : (y + 10)} width={85} height={50}>
        <div className='tooltip-text-location'>
            <strong>{info.pitch_name}</strong>
        </div>
    </TooltipBox>
);

const VerticalLine = ({ x, y }) => (
    <StrikeZoneLine x={x} y={y} width={3} height={248}>

    </StrikeZoneLine>
)

const HorizontalLine = ({ x, y }) => (
    <StrikeZoneLine x={x} y={y} width={200} height={3}>

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
        .domain([-1.5, 1.5])
        .range([padding, width - padding]);
    const yScale = d3
        .scaleLinear()
        .domain([-4, -1])
        .range([padding, height - padding]);

    return (
        <g width={width} height={height} transform={`translate(${x}, ${y})`}>
            <VerticalLine
                x={xScale(-0.83)}
                y={yScale(-3.52)}
            />
            <VerticalLine
                x={xScale(0.83)}
                y={yScale(-3.52)}
            />
            <HorizontalLine
                x={xScale(-0.83)}
                y={yScale(-3.52)}
            />
            <HorizontalLine
                x={xScale(-0.83)}
                y={yScale(-1.48)}
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