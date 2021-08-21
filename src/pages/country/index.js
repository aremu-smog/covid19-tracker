import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CountryChart from "./chart"
import CountrySummary from "./summary"
import TimePicker from "./time-picker"

const CountryPage = () => {
  const [countryData, setCountrydata] = useState([])
  const [countryDataInRange, setCountrydataInRange] = useState([])

  const [loading, setLoading] = useState(true)
  const [sortByDay, setSortByDay] = useState(true)
  let { slug, name } = useParams()

  useEffect(() => {
    try {
      fetch(`https://api.covid19api.com/dayone/country/${slug}`)
        .then(res => res.json())
        .then(async data => {
          data = await data.map(country => {
            return {
              Date: country.Date,
              Active: country.Active,
              Recovered: country.Recovered,
              Deaths: country.Deaths,
              Confirmed: country.Confirmed
            }
          })

          setCountrydata(countryData => [...countryData, ...data])
          setLoading(false)
        })
        .catch(error => {
          alert(error.message)
        })
    } catch (error) {
      alert("Kindly refresh this page")
    }
  }, [])

  console.log(countryData)
  return (
    <>
      <p>
        Showing data for <b>{name}</b>
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <TimePicker
            data={countryData}
            updateCountryDataRange={setCountrydataInRange}
            setSortByDay={setSortByDay}
            sortByDay={sortByDay}
          />
          <CountrySummary data={countryDataInRange} />
          <CountryChart data={countryDataInRange} sortByDay={sortByDay} />
        </>
      )}
    </>
  )
}

export default CountryPage
