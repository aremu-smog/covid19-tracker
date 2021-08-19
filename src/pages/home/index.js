import React, { useEffect, useState } from "react"
import Countries from "./countries"

const Homepage = () => {
  const [countriesList, setCountriesList] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("Loading...")

  useEffect(async () => {
    await fetch(`https://api.covid19api.com/countries`)
      .then(res => res.json())
      .then(data => {
        setCountriesList(data)
        // console.log(data);
      })
      .catch(error => {
        setMessage(error.message)
      })

    setLoading(false)
  }, [])

  return (
    <section>
      <p>Kindly click a country below to see stats</p>

      {loading ? <p>{message}</p> : <Countries list={countriesList} />}
    </section>
  )
}

export default Homepage
