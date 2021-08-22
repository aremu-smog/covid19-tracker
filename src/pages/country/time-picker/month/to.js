import React from "react"
import MonthOption from "./option"

const ToMonth = ({ availableMonths, filterData, startingMonthIndex }) => {
  // Check to ensure that the available months to not starting at the same point from all available months based on the starting month index
  const availableMonthsTo = availableMonths.filter((_, index) => index > startingMonthIndex)

  return (
    <select onChange={filterData}>
      {availableMonthsTo.map((month, index) => (
        <MonthOption month={month} key={index} value={index} />
      ))}
    </select>
  )
}

export default ToMonth
