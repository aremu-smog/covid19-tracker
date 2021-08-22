import React from "react"
import { timeFormat } from "d3"

const MonthOption = ({ month, value }) => {
  const monthYearFormat = timeFormat("%b %Y")
  const showMonthYear = monthYearFormat(new Date(month.values[0].Date))
  return <option value={value}>{showMonthYear}</option>
}

export default MonthOption
