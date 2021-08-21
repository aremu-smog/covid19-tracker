import React from "react"
import DayPicker from "./day"
import MonthPicker from "./month"

const TimePicker = ({ data, updateCountryDataRange, setSortByDay, sortByDay }) => {
  const selectSortingCriteria = e => {
    if (e.target.value === "days") {
      setSortByDay(true)
    } else {
      setSortByDay(false)
    }
  }

  return (
    <p>
      Showing data for
      <select onChange={selectSortingCriteria}>
        <option value='days'>Days</option>
        <option value='months'>Months</option>
      </select>
      {sortByDay ? (
        <DayPicker data={data} updateCountryDataRange={updateCountryDataRange} />
      ) : (
        <MonthPicker data={data} updateCountryDataRange={updateCountryDataRange} />
      )}
    </p>
  )
}

TimePicker.propTypes = {}

export default TimePicker
