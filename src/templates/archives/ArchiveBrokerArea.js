import React, { useEffect, useState } from 'react'
import $ from "jquery"
import "jquery-match-height"
import { graphql, Link, useStaticQuery } from "gatsby"
import Layout from "../../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"
import SideBarRight from '../../components/SideBarRight'


export const query = graphql`
    query($id: ID!) {
        wpgraphql {
            topBrokerArea(id: $id){
                name
                uri
                id
                topBrokers123 {
                    nodes {
                        title
                        uri
                        id
                        excerpt
                        date
                        author {
                            node {
                                name
                            }
                        }
                        featuredImage {
                            node {
                                mediaItemUrl
                            }
                        }
                    }
                }
            }
        }
    }
`

export default function ArchiveBrokerArea({ data }) {

    const { topBrokerArea } = data.wpgraphql
    console.log(topBrokerArea)
    return (
        <Layout>
            <div class="row">
                <div class="large-12 columns">
                    <h2 class="archive-title">Archives for: {topBrokerArea.name}</h2>
                </div>
                <div class="large-8 medium-8 small-12 columns">
                    {topBrokerArea.topBrokers123.nodes.map(brok => (
                        <article id={`post-${brok.id}`} >
                            <h3><Link to={brok.uri} rel="bookmark">{brok.title}</Link></h3>
                            <h6>{brok.author.node.name} {brok.date.split('T')[0]}</h6>
                            {brok.featuredImage ? <Link to={brok.uri} ><img src={brok.featuredImage.node.mediaItemUrl} /></Link> : null}
                            {Parser(brok.excerpt)}
                        </article>
                    ))}
                </div>
                <div class="large-4 medium-4 small-12 columns sidebar">
                    <SideBarRight />
                </div>
            </div>
        </Layout>
    )
}
