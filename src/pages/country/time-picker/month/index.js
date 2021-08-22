import React, { useState, useEffect } from "react"
import { groupDataIntoMonths, getMonthlySummaries } from "./helpers"
import FromMonth from "./from"
import ToMonth from "./to"

const MonthPicker = ({ data, updateCountryDataRange }) => {
  const [availableMonths, setAvailableMonths] = useState([])
  const [startingMonthIndex, setStartingMonthIndex] = useState("")

  useEffect(() => {
    const dataByMonth = groupDataIntoMonths(data)
    setAvailableMonths(dataByMonth)
  }, [data])

  // update the index the starting month
  const changeStartingIndex = e => {
    setStartingMonthIndex(parseInt(e.target.value))
  }

  // Filter data that will determine the range in which the country data will be displayed
  const filterData = e => {
    // Get the index of the toMonth
    const endingIndex = parseInt(e.target.value)

    // Extract the data range
    const dataToShow = availableMonths.slice(
      startingMonthIndex,
      startingMonthIndex + endingIndex + 2
    )

    // summarize the data
    const monthlySummaries = getMonthlySummaries(dataToShow)

    //update the country data range
    updateCountryDataRange(monthlySummaries)
  }

  return (
    <>
      <FromMonth availableMonths={availableMonths} changeStartingIndex={changeStartingIndex} />
      {startingMonthIndex !== "" ? (
        <ToMonth
          availableMonths={availableMonths}
          startingMonthIndex={startingMonthIndex}
          filterData={filterData}
        />
      ) : null}
    </>
  )
}

export default MonthPicker
