import React, { useContext, useEffect } from 'react'
import * as d3 from 'd3'

import { tooltipContext } from './UseTooltip.js'

const PitcherLocationScatterplot = ({ pitchTypes }) => {

    const { tooltip, setTooltip } = useContext(tooltipContext);

    useEffect(() => {
        d3.selectAll('#location > svg').remove();

        const svg = d3
            .select('#location')
            .append('svg')
            .attr('width', 400)
            .attr('height', 400)
            .attr('role', 'img')
            .attr("viewBox", '0 0 400 400')
            .attr('style', 'pointer-events: all; width: 100%; height: 100%;')
            .lower()

        const xScale = d3
            .scaleLinear()
            .domain([-1.75, 1.75])
            .range([0, 400]);

        const yScale = d3
            .scaleLinear()
            .domain([-4.2, -0.8])
            .range([0, 400]);

        const g = svg.append("g");

        const hoverTooltip = d3.select('#location').append('div')
            .attr('class', 'hidden tooltip');

        g.append('line')
            .join('line')
            .attr('x1', xScale(-0.83))
            .attr('x2', xScale(0.83))
            .attr('y1', yScale(-1.48))
            .attr('y2', yScale(-1.48))
            .attr('stroke', '#fff')
            .attr('stroke-width', 3)

        g.append('line')
            .join('line')
            .attr('x1', xScale(-0.83))
            .attr('x2', xScale(0.83))
            .attr('y1', yScale(-3.52))
            .attr('y2', yScale(-3.52))
            .attr('stroke', '#fff')
            .attr('stroke-width', 3)

        g.append('line')
            .join('line')
            .attr('x1', xScale(-0.83))
            .attr('x2', xScale(-0.83))
            .attr('y1', yScale(-1.48))
            .attr('y2', yScale(-3.52))
            .attr('stroke', '#fff')
            .attr('stroke-width', 3)

        g.append('line')
            .join('line')
            .attr('x1', xScale(0.83))
            .attr('x2', xScale(0.83))
            .attr('y1', yScale(-1.48))
            .attr('y2', yScale(-3.52))
            .attr('stroke', '#fff')
            .attr('stroke-width', 3)

        g.selectAll("circle")
            .data(pitchTypes)
            .join("circle")
            .attr('key', d => d.pitch_type)
            .attr("cx", d => xScale(-d.plate_x))
            .attr("cy", d => yScale(-d.plate_z))
            .attr("r", 14)
            .attr('cursor', 'pointer')
            .attr('style', 'pointer-events: all;')
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .attr('fill', d => (d.pitch_type === 'FF') ? 'blue'
                : (d.pitch_type === 'SI') ? 'yellow'
                    : (d.pitch_type === 'FC') ? 'green'
                        : (d.pitch_type === 'CH') ? 'red'
                            : (d.pitch_type === 'FS') ? 'cyan'
                                : (d.pitch_type === 'SL') ? '#ff6f08'
                                    : (d.pitch_type === 'CU') ? 'purple'
                                        : (d.pitch_type === 'KC') ? '#ff3bf8' : 'grey')
            .on('mouseover', function (event, d) {
                d3.select(this)
                    .attr('r', 28)
                    .attr('fill', '#fff')
                setTooltip(d)
            })
            .on('mouseout', function (d) {
                d3.select(this)
                    .attr('r', 14)
                    .attr('fill', d => (d.pitch_type === 'FF') ? 'blue'
                        : (d.pitch_type === 'SI') ? 'yellow'
                            : (d.pitch_type === 'FC') ? 'green'
                                : (d.pitch_type === 'CH') ? 'red'
                                    : (d.pitch_type === 'FS') ? 'cyan'
                                        : (d.pitch_type === 'SL') ? '#ff6f08'
                                            : (d.pitch_type === 'CU') ? 'purple'
                                                : (d.pitch_type === 'KC') ? '#ff3bf8' : 'grey')
                hoverTooltip.classed('hidden', true);
                setTooltip(false)
            });

        g.append('rect')
            .datum(tooltip)
            .join('rect')
            .attr('x', d => (!d) ? 0 : (tooltip.plate_x <= 0) ? xScale(-tooltip.plate_x) - 150 : xScale(-tooltip.plate_x) + 20)
            .attr('y', d => (!d) ? 0 : (tooltip.plate_z <= 1.45) ? yScale(-tooltip.plate_z) - 63 : yScale(-tooltip.plate_z) + 33)
            .attr('width', d => (!d) ? 0 : 130)
            .attr('height', d => (!d) ? 0 : 30)
            .attr('fill', '#272727')
            .attr('stroke', d => (d.pitch_type === 'FF') ? 'blue'
                : (d.pitch_type === 'SI') ? 'yellow'
                    : (d.pitch_type === 'FC') ? 'green'
                        : (d.pitch_type === 'CH') ? 'red'
                            : (d.pitch_type === 'FS') ? 'cyan'
                                : (d.pitch_type === 'SL') ? '#ff6f08'
                                    : (d.pitch_type === 'CU') ? 'purple'
                                        : (d.pitch_type === 'KC') ? '#ff3bf8' : 'grey')
            .attr('stroke-width', 2)

        g.append('text')
            .datum(tooltip)
            .join('text')
            .attr('x', d => (!d) ? 0 : (tooltip.plate_x <= 0) ? xScale(-tooltip.plate_x) - 84 : xScale(-tooltip.plate_x) + 86)
            .attr('y', d => (!d) ? 0 : (tooltip.plate_z <= 1.45) ? yScale(-tooltip.plate_z) - 43 : yScale(-tooltip.plate_z) + 52)
            .attr('fill', '#fff')
            .attr('text-anchor', 'middle')
            .attr('font-size', '0.9rem')
            .attr('font-weight', 'bold')
            .text(d => !d ? '' : d.pitch_name)

        g.append('circle')
            .datum(tooltip)
            .join("circle")
            .attr('key', d => d.pitch_type)
            .attr("cx", d => xScale(-d.plate_x))
            .attr("cy", d => yScale(-d.plate_z))
            .attr("r", !tooltip ? 0 : 28)
            .attr('cursor', 'pointer')
            .attr('style', 'pointer-events: all;')
            .attr('stroke', d => (d.pitch_type === 'FF') ? 'blue'
                : (d.pitch_type === 'SI') ? 'yellow'
                    : (d.pitch_type === 'FC') ? 'green'
                        : (d.pitch_type === 'CH') ? 'red'
                            : (d.pitch_type === 'FS') ? 'cyan'
                                : (d.pitch_type === 'SL') ? '#ff6f08'
                                    : (d.pitch_type === 'CU') ? 'purple'
                                        : (d.pitch_type === 'KC') ? '#ff3bf8' : 'grey')
            .attr('stroke-width', 4)
            .attr('fill', '#fff')
            .on('mouseout', function (d) {
                setTooltip(false)
            });

        g.append('text')
            .join('text')
            .attr('x', xScale(0))
            .attr('y', yScale(-3.54))
            .attr('fill', '#fff')
            .attr('text-anchor', 'middle')
            .attr('font-size', '0.8rem')
            .text('Strike Zone')

    }, [pitchTypes, tooltip, setTooltip])

    return (
        <>
            <div id='location' style={{ height: '100%', width: '100%', pointerEvents: 'none', touchAction: 'none' }} />
        </>
    );
};

export default PitcherLocationScatterplot