import React, { useCallback, useEffect, useRef } from "react"

const DayPicker = ({ data, updateCountryDataRange }) => {
  const daysSelector = useRef()

  const filterData = useCallback(() => {
    const noOfDays = daysSelector.current.value
    const dataToShow = data.filter((_, index) => index >= data.length - noOfDays)
    updateCountryDataRange(dataToShow)
  }, [updateCountryDataRange, data])

  // Filter the data once the page loads
  useEffect(() => {
    filterData()
  }, [filterData])

  const days = [3, 7, 15, 30]

  return (
    <select ref={daysSelector} onChange={filterData}>
      {days.map((day, index) => (
        <option key={index}>{day}</option>
      ))}
    </select>
  )
}

DayPicker.propTypes = {}

export default DayPicker
