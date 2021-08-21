import { line, scaleLinear, scaleTime, extent } from "d3"
import { nest } from "d3-collection"

export const margin = { top: 40, right: 80, bottom: 60, left: 80 }

export const innerWidth = 960 - margin.left - margin.right
export const innerHeight = 500 - margin.top - margin.bottom

export const xValue = d => new Date(d.Date)
export const yValue = d => +d.numbers

export const xAxisLabel = "Date"
export const yAxisLabel = "No. of cases"

export const getXScale = (flattenedData = []) => {
  const xScale = scaleTime()
    .domain(extent(flattenedData, xValue))
    .range([margin.left, innerWidth])
    .nice(flattenedData.length)

  return xScale
}

export const getYScale = flattenedData => {
  const yScale = scaleLinear()
    .domain(extent(flattenedData, yValue))
    .range([innerHeight, margin.top])
    .nice(flattenedData.length)

  return yScale
}

export const flattenData = data => {
  const flattenedData = []

  data.forEach(point => {
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

  return flattenedData
}

export const getGroupedData = flattenedData => {
  const dataGroup = nest()
    .key(d => d.status)
    .entries(flattenedData)

  return dataGroup
}

export const lineGenerator = flattenedData => {
  const xScale = getXScale(flattenedData)
  const yScale = getYScale(flattenedData)

  return line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)))
}

export const colors = ["#ffffff", "yellow", "red", "green"]
