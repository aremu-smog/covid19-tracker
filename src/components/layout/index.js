import React from "react"
import ctl from "@netlify/classnames-template-literals"
import MainHeader from "./header"

const Layout = ({ children }) => {
  const layoutStyle = ctl(
    `bg-primary  max-w-screen-lg w-full p-12 rounded-lg mx-auto text-white text-center`
  )
  return (
    <section className={layoutStyle}>
      <MainHeader />
      {children}
    </section>
  )
}

export default Layout
