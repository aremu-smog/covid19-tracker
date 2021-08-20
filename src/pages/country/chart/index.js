import React, { useEffect, useRef } from "react"
import {
  select,
  selectAll,
  scaleLinear,
  scaleTime,
  axisLeft,
  axisBottom,
  line,
  timeFormat,
  timeMonth,
  timeDay,
  extent
} from "d3"

import { nest } from "d3-collection"

const CountryChart = ({ data, sortByDay }) => {
  // {data, type} =

  const chartRef = useRef()

  useEffect(() => {
    const flattenedData = []

    data.map(point => {
      const date = point.Date
      for (let entry in point) {
        if (entry !== "Date") {
          flattenedData.push({
            Date: date,
            status: entry,
            numbers: point[entry]
          })
        }
      }
    })

    console.log(flattenedData)

    const dataGroup = nest()
      .key(d => d.status)
      .entries(flattenedData)

    console.log(dataGroup)
    const svg = select(chartRef.current)

    selectAll(".tick").remove()

    const xValue = d => {
      return new Date(d.Date)
    }
    const yValue = d => +d.numbers

    const xAxisLabel = "Date"
    const yAxisLabel = "No. of cases"

    const margin = { top: 40, right: 80, bottom: 60, left: 50 }

    const innerWidth = 960 - margin.left - margin.right
    const innerHeight = 500 - margin.top - margin.bottom

    const xScale = scaleTime()
      .domain(extent(flattenedData, xValue))
      .range([margin.left, innerWidth])
      .nice()
    const yScale = scaleLinear()
      .domain(extent(flattenedData, yValue))
      .range([innerHeight, margin.top])
      .nice()

    svg
      .append("g")
      .append("line")
      .attr("x1", margin.left)
      .attr("y1", innerHeight)
      .attr("x2", innerWidth)
      .attr("y2", innerHeight)
      .attr("stroke", "white")
    svg
      .append("g")
      .append("line")
      .attr("x1", margin.left)
      .attr("y1", margin.top)
      .attr("x2", margin.left)
      .attr("y2", innerHeight)
      .attr("stroke", "white")

    const g = svg.append("g")

    const xAxis = axisBottom(xScale).tickFormat(timeFormat(sortByDay ? "%d %B" : "%B %Y"))

    const xAxisG = g
      .append("g")
      .call(xAxis.ticks(sortByDay ? timeDay : timeMonth))
      .attr("transform", `translate(0,${innerHeight})`)
    xAxisG.select(".domain").remove()

    // x axis label
    xAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", margin.top)
      .attr("x", innerWidth / 2)
      .attr("fill", "white")
      .text(xAxisLabel)

    const yAxis = axisLeft(yScale)

    const activeLine = line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))

    // const deathLine = line()
    //   .x(d => xScale(xValue(d)))
    //   .y(d => yScale(yValue(d)))
    //   .curve(curveBasis)

    const yAxisG = g.append("g").call(yAxis).attr("transform", `translate(${margin.left},0)`)
    yAxisG.selectAll(".domain").remove()

    yAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", -40)
      .attr("x", -innerHeight / 2)
      .attr("fill", "white")
      .attr("transform", `rotate(-90)`)
      .attr("text-anchor", "middle")
      .text(yAxisLabel)

    // data plot
    svg
      .selectAll("path")
      .data(dataGroup)
      .enter()
      .append("path")
      // .join("path")
      .attr("d", d => activeLine(d.values))
      .attr("fill", "none")
      .attr("stroke", "white")
  }, [data])

  return <svg ref={chartRef} width='960' height='500'></svg>
}

export default CountryChart
