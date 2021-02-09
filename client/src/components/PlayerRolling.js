import React, { useEffect } from 'react'
import * as d3 from 'd3'

const PlayerRolling = ({ rolling }) => {
    const baData = new Array(rolling.length).fill(Math.random())
    const dateData = new Array(rolling.length).fill(Math.random())

    useEffect(() => {
        for (var i = 0; i < rolling.length; i++) {
            baData[i] = rolling[i].ba_roll;
            dateData[i] = rolling[i].game_date;
        }
    }, [rolling, baData, dateData])

    useEffect(() => {
        d3.selectAll('#rolling > svg').remove();

        const width = 550;
        const height = 350;
        const marginLeft = 30;
        const marginRight = 30;

        const svg = d3
            .select('#rolling')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('role', 'img')
            .attr("viewBox", '0 0 550 350')
            .attr('style', 'pointer-events: all; width: 100%; height: 100%;')

        const xScale = d3.scaleLinear()
            .domain([0, (baData.length - 1)])
            .range([marginLeft, width - marginRight]);

        const yScale = d3.scaleLinear()
            .domain([(Math.min(...baData) - 0.075), (Math.max(...baData) + 0.075)])
            .range([(height - 25), 0]);

        const xAxis = g => g
            .attr("transform", `translate(0,${height - 25})`)
            .attr("class", "x-axis")
            .call(d3.axisBottom(xScale).ticks(10).tickSizeOuter(0)
                .tickFormat(function (index) { return (dateData[index][5] === '1') ? dateData[index].substring(5) : dateData[index].substring(6) }))

        function make_x_gridlines() {
            return d3.axisBottom(xScale)
                .ticks(10)
        }

        const yAxis1 = g => g
            .attr("transform", `translate(${-1 + marginLeft},0)`)
            .attr("class", "y-axis1")
            .call(d3.axisLeft(yScale).ticks(3).tickSizeOuter(0)
                .tickFormat(function (value) { return value.toFixed(3).toString().substring(1) }))

        const yAxis2 = g => g
            .attr("transform", `translate(${width - marginRight + 1},0)`)
            .attr("class", "y-axis1")
            .call(d3.axisRight(yScale).ticks(3).tickSizeOuter(0)
                .tickFormat(function (value) { return value.toFixed(3).toString().substring(1) }))

        svg
            .selectAll('.domain')
            .attr('stroke', 'purple')
            .attr('stroke-width', '2px');

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .attr("class", "grid")
            .attr("transform", "translate(0," + (height - 25) + ")")
            .call(make_x_gridlines()
                .tickSize(-height + 25)
                .tickFormat("")
            )

        svg.append("g")
            .call(yAxis1);

        svg.append("g")
            .call(yAxis2);

        const rollingLine = d3
            .line()
            .x((value, index) => xScale(index))
            .y(yScale)
            .curve(d3.curveCardinal);

        svg
            .selectAll('.line')
            .data([baData])
            .join('path')
            .attr('class', 'line')
            .attr('d', rollingLine)
            .attr('fill', 'none')
            .attr('stroke', 'purple')
            .attr('stroke-width', '4px')

        svg.append('text')
            .join('text')
            .attr('fill', '#fff')
            .attr('transform', `translate(${width * 0.5} , ${height + 8})`)
            .attr('text-anchor', 'middle')
            .attr('font-family', 'Arial', 'sans-serif')
            .attr('font-size', '0.8rem')
            .text('Date')

    }, [baData, dateData])

    return (
        (rolling.length) ?
            <div id='rolling' style={{
                height: '100%', width: '100%', pointerEvents: 'none',
                touchAction: 'none', position: 'relative', display: 'inline'
            }} />
            : <div>Not enough plate appearances in 2020 to display graph.</div>
    )
}

export default PlayerRolling