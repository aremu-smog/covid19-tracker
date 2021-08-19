import React, { useEffect, useRef } from "react"
import {
  select,
  scaleLinear,
  scaleTime,
  axisLeft,
  axisBottom,
  line,
  curveBasis,
  curveCardinal,
  max,
  min,
  timeMonth,
  timeDay
} from "d3"

const CountryChart = ({ data }) => {
  // {data, type} =
  const chartRef = useRef()

  useEffect(() => {
    const svg = select(chartRef.current)

    const xValue = d => {
      const theDate = new Date(d.Date)
      return theDate
    }

    const xAxisLabel = "Time"
    const yValue = d => d.Active
    const yAxisLabel = "Temperature"

    const margin = { top: 60, right: 40, bottom: 88, left: 105 }

    const innerWidth = 960 - margin.left - margin.right
    const innerHeight = 500 - margin.top - margin.bottom

    const startDate = min(data, d => xValue(d)) // this can be day or month
    const endDate = max(data, d => xValue(d)) // this can be day or month

    const xScale = scaleTime().domain([startDate, endDate]).range([0, innerWidth])

    const startValue = min(data, d => yValue(d)) // starting value to begin calculation from
    const endValue = max(data, d => yValue(d)) // starting value for stats

    const yScale = scaleLinear().domain([startValue, endValue]).range([innerHeight, 0])

    // const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    const xAxis = axisBottom(xScale).tickSize(-innerHeight).tickPadding(15)

    // svg.append("g").attr("transform", "translate(0,50)").call(xAxis.ticks(timeDay))

    // const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(10);

    const activeLine = line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))
    // .curve(curveCardinal)

    // const yAxisG = g.append("g").call(yAxis);
    // yAxisG.selectAll(".domain").remove();

    // yAxisG
    //   .append("text")
    //   .attr("class", "axis-label")
    //   .attr("y", -60)
    //   .attr("x", -innerHeight / 2)
    //   .attr("fill", "black")
    //   .attr("transform", `rotate(-90)`)
    //   .attr("text-anchor", "middle")
    //   .text(yAxisLabel);

    const xAxisG = g
      .append("g")
      .call(xAxis.ticks(timeDay))
      .attr("transform", `translate(0,${innerHeight})`)

    xAxisG.select(".domain").remove()

    xAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", 80)
      .attr("x", innerWidth / 2)
      .attr("fill", "white")
      .text(xAxisLabel)

    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", value => activeLine(value))
      .attr("fill", "none")
      .attr("stroke", "white")
  }, [data])

  return <svg ref={chartRef} width='960' height='500'></svg>
}

export default CountryChart
