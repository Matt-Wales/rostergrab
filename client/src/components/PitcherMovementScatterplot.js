import React, { useContext, useEffect } from 'react'
import * as d3 from 'd3'

import { tooltipContext } from './UseTooltip.js'

const PitcherMovementScatterplot = ({ pitchTypes }) => {

    const { tooltip, setTooltip } = useContext(tooltipContext);

    useEffect(() => {
        d3.selectAll('#movement > svg').remove();

        const svg = d3
            .select('#movement')
            .append('svg')
            .attr('width', 320)
            .attr('height', 400)
            .attr('role', 'img')
            .attr("viewBox", '0 0 320 400')
            .attr('style', 'pointer-events: all; width: 100%; height: 100%;')
            .lower()

        const xScale = d3
            .scaleLinear()
            .domain([-1.8, 1.8])
            .range([0, 320]);

        const yScale = d3
            .scaleLinear()
            .domain([-2.2, 1.8])
            .range([0, 400]);

        const g = svg.append("g");

        const hoverTooltip = d3.select('#movement').append('div')
            .attr('class', 'hidden tooltip');

        g.append('line')
            .join('line')
            .attr('x1', xScale(0))
            .attr('x2', xScale(0))
            .attr('y1', yScale(-2.2))
            .attr('y2', yScale(1.8))
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)

        g.append('line')
            .join('line')
            .attr('x1', xScale(-1.8))
            .attr('x2', xScale(1.8))
            .attr('y1', yScale(0))
            .attr('y2', yScale(0))
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)

        g.selectAll("circle")
            .data(pitchTypes)
            .join("circle")
            .attr('key', d => d.pitch_type)
            .attr("cx", d => xScale(-d.pfx_x))
            .attr("cy", d => yScale(-d.pfx_z))
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
            .attr('x', d => (!d) ? 0 : (tooltip.pfx_x <= 0) ? xScale(-tooltip.pfx_x) - 150 : xScale(-tooltip.pfx_x) + 20)
            .attr('y', d => (!d) ? 0 : (-tooltip.pfx_z >= 0.75) ? yScale(-tooltip.pfx_z) - 103 : yScale(-tooltip.pfx_z) + 33)
            .attr('width', d => (!d) ? 0 : 130)
            .attr('height', d => (!d) ? 0 : 70)
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
            .attr('x', d => (!d) ? 0 : (tooltip.pfx_x <= 0) ? xScale(-tooltip.pfx_x) - 84 : xScale(-tooltip.pfx_x) + 86)
            .attr('y', d => (!d) ? 0 : (-tooltip.pfx_z >= 0.75) ? yScale(-tooltip.pfx_z) - 85 : yScale(-tooltip.pfx_z) + 52)
            .attr('fill', '#fff')
            .attr('text-anchor', 'middle')
            .attr('font-size', '0.9rem')
            .attr('font-weight', 'bold')
            .text(d => !d ? '' : d.pitch_name)

        g.append('text')
            .datum(tooltip)
            .join('text')
            .attr('x', d => (!d) ? 0 : (tooltip.pfx_x <= 0) ? xScale(-tooltip.pfx_x) - 84 : xScale(-tooltip.pfx_x) + 86)
            .attr('y', d => (!d) ? 0 : (-tooltip.pfx_z >= 0.75) ? yScale(-tooltip.pfx_z) - 65 : yScale(-tooltip.pfx_z) + 72)
            .attr('fill', '#fff')
            .attr('text-anchor', 'middle')
            .attr('font-size', '0.9rem')
            .text(d => !d ? '' : (-d.pfx_x * 12).toFixed(1).toString() + ' inches ↔')

        g.append('text')
            .datum(tooltip)
            .join('text')
            .attr('x', d => (!d) ? 0 : (tooltip.pfx_x <= 0) ? xScale(-tooltip.pfx_x) - 84 : xScale(-tooltip.pfx_x) + 86)
            .attr('y', d => (!d) ? 0 : (-tooltip.pfx_z >= 0.75) ? yScale(-tooltip.pfx_z) - 45 : yScale(-tooltip.pfx_z) + 92)
            .attr('fill', '#fff')
            .attr('text-anchor', 'middle')
            .attr('font-size', '0.9rem')
            .text(d => !d ? '' : (d.pfx_z * 12).toFixed(1).toString() + ' inches ↕')

        g.append('circle')
            .datum(tooltip)
            .join("circle")
            .attr('key', d => d.pitch_type)
            .attr("cx", d => xScale(-d.pfx_x))
            .attr("cy", d => yScale(-d.pfx_z))
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
            .attr('x', xScale(0.03))
            .attr('y', yScale(-2.1))
            .attr('fill', '#fff')
            .attr('text-anchor', 'left')
            .attr('font-size', '0.7rem')
            .text('Carry')

        g.append('text')
            .join('text')
            .attr('x', xScale(0.03))
            .attr('y', yScale(1.78))
            .attr('fill', '#fff')
            .attr('text-anchor', 'left')
            .attr('font-size', '0.7rem')
            .text('Break')

        g.append('text')
            .join('text')
            .attr('x', xScale(-1.79))
            .attr('y', yScale(-0.03))
            .attr('fill', '#fff')
            .attr('text-anchor', 'left')
            .attr('font-size', '0.7rem')
            .text('LHP')

        g.append('text')
            .join('text')
            .attr('x', xScale(-1.79))
            .attr('y', yScale(0.1))
            .attr('fill', '#fff')
            .attr('text-anchor', 'left')
            .attr('font-size', '0.7rem')
            .text('Run')

        g.append('text')
            .join('text')
            .attr('x', xScale(1.55))
            .attr('y', yScale(-0.03))
            .attr('fill', '#fff')
            .attr('text-anchor', 'left')
            .attr('font-size', '0.7rem')
            .text('RHP')

        g.append('text')
            .join('text')
            .attr('x', xScale(1.55))
            .attr('y', yScale(0.1))
            .attr('fill', '#fff')
            .attr('text-anchor', 'left')
            .attr('font-size', '0.7rem')
            .text('Run')

    }, [pitchTypes, tooltip, setTooltip])

    return (
        <>
            <div id='movement' style={{ height: '100%', width: '100%', pointerEvents: 'none', touchAction: 'none' }} />
        </>
    );
};

export default PitcherMovementScatterplot