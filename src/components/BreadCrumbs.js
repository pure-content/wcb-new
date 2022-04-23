import React from "react"
import { Link } from "gatsby"

export default function BreadCrumbs() {
  const separator = "->"
  return (
    <div className="crumbs">
      <Link to="/">Home page</Link> {separator} <span>UK forex brokers </span>
    </div>
  )
}
