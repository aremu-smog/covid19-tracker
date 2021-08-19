import React, { useEffect, useRef } from "react";
import {
  select,
  scaleLinear,
  scaleTime,
  extent,
  axisLeft,
  axisBottom,
  line,
  curveBasis,
  curveCardinal,
  timeParse,
  utcParse,
  max,
  min,
  timeYears,
  timeMonth,
  timeYear,
} from "d3";

const CountryChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const svg = select(chartRef.current);

    const parser = timeParse("%Y-%m-%dT%H:%M:%S%Z");
    const xValue = (d) => {
      const theDate = new Date(d.Date);
      //   const theDate = parser(d.Date);
      //   return d.Date;
      console.log(theDate);
      return theDate;
    };
    const xAxisLabel = "Time";
    const yValue = (d) => d.Active;
    const yAxisLabel = "Temperature";

    const margin = { top: 60, right: 40, bottom: 88, left: 105 };
    const innerWidth = 960;
    const innerHeight = 500;

    const xScale = scaleTime()
      .domain([min(data, (d) => xValue(d)), max(data, (d) => xValue(d))])
      .range([0, innerWidth]);

    const yScale = scaleLinear()
      .domain([min(data, (d) => yValue(d)), max(data, (d) => yValue(d))])
      .range([innerHeight, 0]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xAxis = axisBottom(xScale);

    // svg
    //   .append("g")
    //   .attr("transform", "translate(0,50)")
    //   .call(xAxis.ticks(timeYear));

    // const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(10);

    const activeLine = line()
      .x((d) => xScale(xValue(d)))
      .y((d) => yScale(yValue(d)))
      .curve(curveCardinal);

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

    // const xAxisG = g
    //   .append("g")
    //   .call(xAxis)
    //   .attr("transform", `translate(0,${innerHeight})`);

    // xAxisG.select(".domain").remove();

    // xAxisG
    //   .append("text")
    //   .attr("class", "axis-label")
    //   .attr("y", 80)
    //   .attr("x", innerWidth / 2)
    //   .attr("fill", "black")
    //   .text(xAxisLabel);

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
