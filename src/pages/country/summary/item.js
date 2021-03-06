import React from "react"
import ctl from "@netlify/classnames-template-literals"
const SummaryItem = ({ title = "", value }) => {
  const titleStyle = ctl(`text-sm mb-0`)
  const valueStyle = ctl(` text-xl font-bold mt-0 `)

  const legendStyle = ctl(`legend ${title.toLowerCase()}`)
  return (
    <div className=''>
      <p className={titleStyle}>
        {" "}
        <span className={legendStyle}></span> Total {title} cases
      </p>
      <p className={valueStyle}>{value.toLocaleString()}</p>
    </div>
  )
}

export default SummaryItem
