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
    console.log(data)
    const countrySummary = data.reduce(
      (total, country) => {
        total.active = total.active + country.Active
        total.deaths = total.deaths + country.Deaths
        total.recovered = total.deaths + country.Recovered
        total.confirmed = total.deaths + country.Confirmed

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
      <SummaryItem title='Total cases confirmed 😪' value={summary.confirmed} />
      <SummaryItem title='Total deaths 😢' value={summary.deaths} />
      <SummaryItem title='Total cases recovered 😍' value={summary.recovered} />
      <SummaryItem title='Total cases active 😞' value={summary.active} />
    </div>
  )
}

export default CountrySummary
