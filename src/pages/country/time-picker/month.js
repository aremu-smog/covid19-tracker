import React, { useState, useEffect } from "react"
import { timeFormat } from "d3"
import { nest } from "d3-collection"

const MonthOption = ({ month, value }) => {
  const monthYearFormat = timeFormat("%B %Y")
  const showMonthYear = monthYearFormat(new Date(month.values[0].Date))
  return <option value={value}>{showMonthYear}</option>
}

const MonthPicker = ({ data, updateCountryDataRange }) => {
  const [availableMonths, setAvailableMonths] = useState([])
  const [startingMonthIndex, setStartingMonthIndex] = useState("")

  const getMonth = d => {
    const date = new Date(d.Date)
    return date.getUTCMonth()
  }
  const groupDataIntoMonths = data => {
    const dataByMonth = nest()
      .key(d => getMonth(d))
      .entries(data)

    setAvailableMonths(dataByMonth)
  }

  const changeStartingIndex = e => {
    setStartingMonthIndex(parseInt(e.target.value))
  }

  useEffect(() => {
    groupDataIntoMonths(data)
  }, [data])

  const filterData = e => {
    const endingIndex = parseInt(e.target.value)

    console.log(startingMonthIndex, endingIndex)
    const dataToShow = availableMonths.slice(
      startingMonthIndex,
      startingMonthIndex + endingIndex + 2
    )

    const monthlySummaries = dataToShow.map(month => {
      const summary = month.values.reduce(
        (sum, day) => {
          return {
            Active: sum.Active + day.Active,
            Confirmed: sum.Confirmed + day.Confirmed,
            Deaths: sum.Deaths + day.Deaths,
            Recovered: sum.Recovered + day.Recovered
          }
        },
        {
          Active: 0,
          Confirmed: 0,
          Deaths: 0,
          Recovered: 0
        }
      )

      return {
        Date: month.values[0].Date,
        ...summary
      }
    })

    // console.log(monthlySummaries)

    updateCountryDataRange(monthlySummaries)
  }

  return (
    <>
      <select onChange={changeStartingIndex}>
        <option value=''>From</option>
        {availableMonths.map((month, index) => (
          <MonthOption month={month} key={index} value={index} />
        ))}
      </select>
      {startingMonthIndex !== "" ? (
        <select onChange={filterData}>
          {availableMonths
            .filter((_, index) => index > startingMonthIndex)
            .map((month, index) => (
              <MonthOption month={month} key={index} value={index} />
            ))}
        </select>
      ) : null}
    </>
  )
}

export default MonthPicker
