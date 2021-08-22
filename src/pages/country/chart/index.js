import React, { useEffect, useRef, useState } from "react"
import {
  select,
  selectAll,
  axisLeft,
  axisBottom,
  timeFormat,
  timeMonth,
  timeDay,
  scaleOrdinal
} from "d3"

import {
  lineGenerator,
  getGroupedData,
  flattenData,
  margin,
  innerHeight,
  innerWidth,
  getXScale,
  getYScale,
  xAxisLabel,
  yAxisLabel,
  colors,
  xValue,
  yValue
} from "./helpers"

const CountryChart = ({ data, sortByDay }) => {
  const chartRef = useRef()
  const [flattenedData, setFlattenedData] = useState([])

  const dataByStatus = getGroupedData(flattenedData)
  const svg = select(chartRef.current)

  useEffect(() => {
    const theFlattenedData = flattenData(data)
    setFlattenedData(theFlattenedData)

    // removes all generated paths after each re-render
    selectAll("g").remove()
    selectAll(".tick").remove()
    selectAll("path").remove()
  }, [data])

  // x-axis line of the graph
  svg
    .append("g")
    .append("line")
    .attr("x1", margin.left)
    .attr("y1", innerHeight)
    .attr("x2", innerWidth)
    .attr("y2", innerHeight)
    .attr("stroke", "white")

  // y-axis line of the graph
  svg
    .append("g")
    .append("line")
    .attr("x1", margin.left)
    .attr("y1", margin.top)
    .attr("x2", margin.left)
    .attr("y2", innerHeight)
    .attr("stroke", "white")

  const g = svg.append("g")

  const xAxis = axisBottom(getXScale(flattenedData)).tickFormat(
    timeFormat(sortByDay ? "%d %b" : "%b %y")
  )

  const xAxisG = g
    .append("g")
    .call(xAxis.ticks(sortByDay ? timeDay : timeMonth))
    .attr("transform", `translate(0,${innerHeight})`)
  xAxisG.selectAll(".domain").remove()

  // x axis label
  xAxisG
    .append("text")
    .attr("class", "axis-label")
    .attr("y", margin.top)
    .attr("x", innerWidth / 2)
    .attr("fill", "white")
    .text(xAxisLabel)

  const yAxis = axisLeft(getYScale(flattenedData))

  const yAxisG = g.append("g").call(yAxis).attr("transform", `translate(${margin.left},0)`)
  yAxisG.selectAll(".domain").remove()

  yAxisG
    .append("text")
    .attr("class", "axis-label")
    .attr("y", -60)
    .attr("x", -innerHeight / 2)
    .attr("fill", "white")
    .attr("transform", `rotate(-90)`)
    .attr("text-anchor", "middle")
    .text(yAxisLabel)

  // data plot

  const lines = lineGenerator(flattenedData)

  // list all statuses (in alphabetical order)
  const statuses = dataByStatus.map(d => d.key).sort()

  const generateColors = scaleOrdinal().domain(statuses).range(colors)

  // Plot lines
  svg
    .selectAll("path")
    .data(dataByStatus)
    .enter()
    .append("path")
    .attr("d", d => lines(d.values))
    .attr("fill", "none")
    .attr("stroke", d => generateColors(d.key))

  // set xScale and yScale
  const xScale = getXScale(flattenedData)
  const yScale = getYScale(flattenedData)

  svg
    .append("g")
    .attr("width", innerWidth)
    .attr("height", innerHeight)
    .selectAll("circle")
    .data(flattenedData)
    .enter()
    .append("circle")
    .attr("fill", d => generateColors(d.status))
    .attr("r", 5)
    .attr("cx", d => xScale(xValue(d)))
    .attr("cy", d => yScale(yValue(d)))
    .attr("style", "opacity:0")
    .on("mouseover", e => {
      e.target.style.opacity = 1
    })
    .on("mouseout", e => {
      e.target.style.opacity = 0
    })

  return <svg ref={chartRef} width='960' height='500'></svg>
}

export default CountryChart
