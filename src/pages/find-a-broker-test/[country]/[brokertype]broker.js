import React, { useEffect } from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { brokerRegions } from "../../../data/brokerRegions"
// import { brokerTypes } from "../../../data/brokerTypes"

const brokerTypes = [
  "Forex",
  "ETF",
  "Stocks",
  "CFD",
  "Crypto",
  "Social Trading",
  "Spread Betting",
  "Commodities",
  "Binary Options",
]
export const GET_BROKERS = gql`
  query GET_BROKERS($region: String!, $type: String!) {
    brokers123(first: 10000, where: { region: $region, type: $type }) {
      nodes {
        uri
        title
        id
      }
    }
  }
`

export default function BrokerFound({ location }) {
  let necessaryData = null

  if (!location.state) {
    const dataFromPathname = location.pathname.split("/")
    dataFromPathname[dataFromPathname.length - 1] = dataFromPathname[
      dataFromPathname.length - 1
    ].replace("broker", "")
    const regionsTLC = brokerRegions.map(el => el.toLowerCase())
    const typesTLC = brokerTypes.map(el => el.toLowerCase())
    const region = dataFromPathname.find(el => {
      if (regionsTLC.includes(el)) {
        return el
      }
    })
    const type = dataFromPathname.find(el => {
      if (typesTLC.includes(el)) {
        return el
      }
    })
    necessaryData = Object.assign({}, { region, type })
  } else {
    necessaryData = location.state
  }

  console.log("necessaryData", necessaryData)
  const queryParams = {
    region: necessaryData.region,
    type: necessaryData.type,
  }
  console.log("queryParams", queryParams)
  const { loading, data, error } = useQuery(GET_BROKERS, {
    variables: queryParams,
  })
  useEffect(() => {
    console.log("loading, data, error", loading, data, error)
  }, [loading, data, error])

  return (
    <div>
      BrokerFound {`in ${necessaryData.region} of ${necessaryData.type}`}
      {data && (
        <div>
          {data.brokers123.nodes.map(brok => (
            <h2>{brok.title}</h2>
          ))}
        </div>
      )}
    </div>
  )
}
