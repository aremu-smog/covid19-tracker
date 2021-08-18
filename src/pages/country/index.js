import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CountrySummary from "./summary";

const CountryPage = () => {
  const [summary, setSummary] = useState({
    active: 0,
    confirmed: 0,
    deaths: 0,
    recovered: 0,
  });
  const [loading, setLoading] = useState(true);
  let { slug, name } = useParams();

  useEffect(async () => {
    await fetch(`https://api.covid19api.com/dayone/country/${slug}`)
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);

        const CASES_SUMMARY = await data.reduce(
          (total, country) => {
            total.active = total.active + country.Active;
            total.deaths = total.deaths + country.Deaths;
            total.recovered = total.deaths + country.Recovered;
            total.confirmed = total.deaths + country.Confirmed;

            return total;
          },
          {
            active: 0,
            confirmed: 0,
            deaths: 0,
            recovered: 0,
          }
        );

        await setSummary(CASES_SUMMARY);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <p>
        Selected country <b>{name}</b>
      </p>
      {loading ? <p>Loading...</p> : <CountrySummary summary={summary} />}
    </>
  );
};

export default CountryPage;
