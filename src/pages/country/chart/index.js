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
  sortData
} from "./helpers"

const CountryChart = ({ data, sortByDay }) => {
  const chartRef = useRef()
  const [flattenedData, setFlattenedData] = useState([])

  const svg = select(chartRef.current)

  useEffect(() => {
    const theFlattenedData = flattenData(data)
    setFlattenedData(theFlattenedData)

    selectAll("g").remove()
    selectAll(".tick").remove()
    selectAll("path").remove()
  }, [data])

  const dataByStatus = getGroupedData(flattenedData)
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

  const xAxis = axisBottom(getXScale(flattenedData)).tickFormat(
    timeFormat(sortByDay ? "%d %b" : "%b %y")
  )

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

  var statuses = dataByStatus
    .map(function (d) {
      return d.key
    })
    .sort() // list of group names
  var generateColors = scaleOrdinal().domain(statuses).range(colors)

  svg
    .selectAll("path")
    .data(dataByStatus.sort(sortData))
    .enter()
    .append("path")
    .attr("d", d => lines(d.values))
    .attr("fill", "none")
    .attr("stroke", d => generateColors(d.key))

  return <svg ref={chartRef} width='960' height='500'></svg>
}

export default CountryChart
