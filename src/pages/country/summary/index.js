import React from "react";
import ctl from "@netlify/classnames-template-literals";
import SummaryItem from "./item";

const CountrySummary = ({ summary }) => {
  const summaryStyle = ctl(`grid grid-cols-4`);
  return (
    <div className={summaryStyle}>
      <SummaryItem title="Total cases confirmed 😪" value={summary.confirmed} />
      <SummaryItem title="Total deaths 😢" value={summary.deaths} />
      <SummaryItem title="Total cases recovered 😍" value={summary.recovered} />
      <SummaryItem title="Total cases active 😞" value={summary.active} />
    </div>
  );
};

export default CountrySummary;
