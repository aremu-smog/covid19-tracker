import React from "react"
import MonthOption from "./option"

const FromMonth = ({ availableMonths, changeStartingIndex }) => {
  return (
    <select onChange={changeStartingIndex}>
      <option value=''>From</option>
      {availableMonths.map((month, index) => {
        return <MonthOption month={month} key={index} value={index} />
      })}
    </select>
  )
}

export default FromMonth
