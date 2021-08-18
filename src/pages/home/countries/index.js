import React from "react";
import { Button } from "../../../components";
import ctl from "@netlify/classnames-template-literals";
import { Link } from "react-router-dom";

const Countries = ({ list }) => {
  const countriesStyle = ctl(`mt-8`);
  return (
    <div className={countriesStyle}>
      {list.map((country, index) => (
        <Link to={`/country/${country.Slug}/${country.Country}`} key={index}>
          <Button text={country.Country} />
        </Link>
      ))}
    </div>
  );
};

export default Countries;
