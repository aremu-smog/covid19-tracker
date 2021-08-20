import React from "react"

const DayPicker = ({ data, updateCountryDataRange }) => {
  const filterData = e => {
    const noOfDays = e.target.value

    const dataToShow = data.filter((_, index) => index >= data.length - noOfDays)
    updateCountryDataRange(dataToShow)
  }

  return (
    <select onChange={filterData}>
      <option>3</option>
      <option>7</option>
      <option>15</option>
      <option>30</option>
    </select>
  )
}

DayPicker.propTypes = {}

export default DayPicker
