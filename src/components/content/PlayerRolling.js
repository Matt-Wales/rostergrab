import React, { useRef, useEffect } from 'react'
import { select, line, curveCardinal, axisLeft, axisRight, axisBottom, scaleLinear } from 'd3'

const PlayerRolling = ({ rolling }) => {
    const testData = new Array(rolling.length).fill(Math.random())

    useEffect(() => {
        for (var i = 0; i < rolling.length; i++) {
            testData[i] = rolling[i].xwoba_roll;
        }
    }, [rolling, testData])

    const svgRef = useRef();

    useEffect(() => {
        const width = 400;
        const height = 300;

        const svg = select(svgRef.current);

        const xScale = scaleLinear()
            .domain([0, (testData.length - 1)])
            .range([0, width]);

        const yScale = scaleLinear()
            .domain([(Math.min(...testData) - 0.1), (Math.max(...testData) + 0.1)])
            .range([(height * 0.915), 0]);

        const yAxis1 = axisLeft(yScale)
            .tickFormat(x => `${x.toFixed(3).replace('0.', '.')}`)
            .ticks(5);

        const xAxis = axisBottom(xScale)
            .ticks(0);

        const yAxis2 = axisRight(yScale)
            .tickFormat(x => `${x.toFixed(3).replace('0.', '.')}`)
            .ticks(5);

        svg
            .select('.y-axis1')
            .attr('transform', 'translate(-5,0)')
            .call(yAxis1);

        svg
            .select('.x-axis')
            .attr('transform', 'translate(0,' + (height * 0.915) + ')')
            .call(xAxis);

        svg
            .select('.y-axis2')
            .attr('transform', 'translate(' + (width + 5) + ',0)')
            .call(yAxis2);

        svg
            .selectAll('.domain')
            .attr('stroke', 'purple')
            .attr('stroke-width', '2px');

        const rollingLine = line()
            .x((value, index) => xScale(index))
            .y(yScale)
            .curve(curveCardinal);

        svg
            .selectAll('.line')
            .data([testData])
            .join('path')
            .attr('class', 'line')
            .attr('d', rollingLine)
            .attr('fill', 'none')
            .attr('stroke', 'purple')
            .attr('stroke-width', '4px')

        svg
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', -65)
            .attr('x', 0 - ((height * 0.915) / 2))
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .style('fill', '#ecd1ff')
            .text('xWOBA, past 50 PA\'s');

        svg
            .append('text')
            .attr('y', (height * 0.93))
            .attr('x', (width / 2))
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .style('fill', '#ecd1ff')
            .text('PA\'s over time, starting at the 50th PA of the season');

        svg
            .append('text')
            .attr('transform', 'rotate(90)')
            .attr('y', (-width - 65))
            .attr('x', (height / 2))
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .style('fill', '#ecd1ff')
            .text('xWOBA, past 50 PA\'s');
    }, [testData])

    return (
        (rolling.length) ?
        <div className='graph-container'>
            <svg width={400} height={275} ref={svgRef}>
                <g className='y-axis1' />
                <g className='x-axis' />
                <g className='y-axis2' />
            </svg>
        </div>
        : <div>Not enough plate appearances in 2020 to display graph.</div>
    )
}

export default PlayerRolling
