import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"
import withLocation from "../hoc/withLocation"
const shortid = require("shortid")

export const query = graphql`
  query ($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
        id
        uri
      }
    }
  }
`

function BrokerFinderResult({ data }) {
  const page = data.wpgraphql.page
  return (
    <Layout>
      <h1>{page.title}</h1>
    </Layout>
  )
}
export default withLocation(BrokerFinderResult)
