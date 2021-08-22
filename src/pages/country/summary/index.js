import React, { useEffect, useState } from "react"
import ctl from "@netlify/classnames-template-literals"
import SummaryItem from "./item"

const CountrySummary = ({ data }) => {
  const [summary, setSummary] = useState({
    active: 0,
    confirmed: 0,
    deaths: 0,
    recovered: 0
  })
  useEffect(() => {
    const countrySummary = data.reduce(
      (total, country) => {
        total.active = total.active + country.Active
        total.confirmed = total.confirmed + country.Confirmed
        total.deaths = total.deaths + country.Deaths
        total.recovered = total.recovered + country.Recovered

        return total
      },
      {
        active: 0,
        confirmed: 0,
        deaths: 0,
        recovered: 0
      }
    )

    setSummary(countrySummary)
  }, [data])

  const summaryStyle = ctl(`grid grid-cols-4`)

  return (
    <div className={summaryStyle}>
      <SummaryItem title='Active' value={summary.active} />
      <SummaryItem title='Confirmed' value={summary.confirmed} />
      <SummaryItem title='Deaths' value={summary.deaths} />
      <SummaryItem title='Recovered' value={summary.recovered} />
    </div>
  )
}

export default CountrySummary
