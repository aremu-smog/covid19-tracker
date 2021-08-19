import React, { useEffect, useRef } from "react";
import {
  select,
  csv,
  scaleLinear,
  scaleTime,
  extent,
  axisLeft,
  axisBottom,
  line,
  curveBasis,
  curveCardinal,
  max,
  min,
} from "d3";

import * as d3 from "d3";

const CountryChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const svg = select(chartRef.current);

    const xValue = (d) => {
      const theDate = new Date(d.Date);
      //   return d.Date;

      return theDate;
    };
    const xAxisLabel = "Time";
    const yValue = (d) => d.Active;
    const yAxisLabel = "Temperature";

    const margin = { top: 60, right: 40, bottom: 88, left: 105 };
    const innerWidth = 500;
    const innerHeight = 900;

    const xScale = scaleTime()
      .domain([
        min(data, (d) => xValue(d.Date)),
        max(data, (d) => xValue(d.Date)),
      ])
      .range([0, innerWidth]);

    const yScale = scaleLinear()
      .domain([
        min(data, (d) => yValue(d.Active)),
        max(data, (d) => yValue(d.Active)),
      ])
      .range([innerHeight, 0]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xAxis = axisBottom(xScale).tickSize(-innerHeight).tickPadding(15);

    const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(10);

    const activeLine = line()
      .x((d) => xScale(xValue(d)))
      .y((d) => yScale(yValue(d)))
      .curve(curveCardinal);

    const yAxisG = g.append("g").call(yAxis);
    yAxisG.selectAll(".domain").remove();

    yAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", -60)
      .attr("x", -innerHeight / 2)
      .attr("fill", "black")
      .attr("transform", `rotate(-90)`)
      .attr("text-anchor", "middle")
      .text(yAxisLabel);

    const xAxisG = g
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${innerHeight})`);

    xAxisG.select(".domain").remove();

    xAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", 80)
      .attr("x", innerWidth / 2)
      .attr("fill", "black")
      .text(xAxisLabel);

    g.append("path")
      //   .attr("fill", "none")
      .attr("stroke", "white")
      .attr("d", activeLine(data));

    // svg
    //   .selectAll("path")
    //   .data([data])
    //   .join("path")
    //   .attr("d", (value) => activeLine(value))
    //   .attr("fill", "none")
    //   .attr("stroke", "white");
  });

  return <svg ref={chartRef} width="960" height="500"></svg>;
};

export default CountryChart;
