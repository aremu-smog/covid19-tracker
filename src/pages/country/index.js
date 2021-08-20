import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CountryChart from "./chart"
import CountrySummary from "./summary"
import ctl from "@netlify/classnames-template-literals"

const CountryPage = () => {
  const [noOfDays, setNoOfDays] = useState(7)

  const [loading, setLoading] = useState(true)
  let { slug, name } = useParams()

  const [countryData, setCountrydata] = useState([])
  const [countryDataInRange, setCountrydataInRange] = useState([])

  const getDataForDays = (data, noOfDays) => {
    return data.filter((_, index) => index >= data.length - noOfDays)
  }

  const getDataForMonths = noOfMonths => {}

  useEffect(async () => {
    await fetch(`https://api.covid19api.com/dayone/country/${slug}`)
      .then(res => res.json())
      .then(async data => {
        setCountrydata(countryData => [...countryData, ...data])

        setCountrydataInRange(getDataForDays(data, noOfDays))

        setLoading(false)
      })
  }, [])

  const changeDay = e => {
    setNoOfDays(e.target.value)
    setCountrydataInRange(getDataForDays(countryData, e.target.value))
  }
  console.log("Country data", countryDataInRange)

  const selectStyle = ctl(` bg-primary text-white px-4 mx-4`)

  return (
    <>
      <p>
        <b>{name}</b> data for {noOfDays} days
        <select className={selectStyle} onChange={changeDay} value={noOfDays}>
          <option>3</option>
          <option>7</option>
          <option>15</option>
          <option>30</option>
        </select>
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CountrySummary data={countryDataInRange} />
          <CountryChart data={countryDataInRange} />
        </>
      )}
    </>
  )
}

export default CountryPage
