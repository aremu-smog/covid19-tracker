import React, { useEffect, useRef } from "react"

const DayPicker = ({ data, updateCountryDataRange }) => {
  const daysSelector = useRef()

  const filterData = select => {
    const noOfDays = daysSelector.current.value
    const dataToShow = data.filter((_, index) => index >= data.length - noOfDays)
    updateCountryDataRange(dataToShow)
  }

  useEffect(() => {
    filterData()
  }, [])

  return (
    <select ref={daysSelector} onChange={filterData}>
      <option>3</option>
      <option>7</option>
      <option>15</option>
      <option>30</option>
    </select>
  )
}

DayPicker.propTypes = {}

export default DayPicker
