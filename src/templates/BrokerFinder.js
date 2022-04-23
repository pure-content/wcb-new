import React, { useEffect, useState } from "react"
import $ from "jquery"
import "jquery-match-height"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"
import CompareFrom from "../components/CompareFrom"
import RecommendedBroker from "../components/RecommendedBroker"
import { brokerRegions } from "../data/brokerRegions"
import { brokerTypes } from "../data/brokerTypes"
import withLocation from "../hoc/withLocation"
import PageTopContent from "../components/PageTopContent"
import Pagination from "../components/Pagination"
import BrokerTableSingleItemNewView from "../components/BrokerTableSingleItemNewView"
import CallBackFormPopUp from "../components/CallBackFormPopUp"
import starImg from "../assets/images/star.svg"
import starGreyImg from "../assets/images/star-grey.svg"
import prosImg from "../assets/images/props.svg"
import consImg from "../assets/images/cons.svg"
import BreadCrumbs from "../components/BreadCrumbs"
import { avarageRatingCounter } from "../functions/avarageRatingCounter"
const shortid = require("shortid")

export const query = graphql`
  query ($id: ID!) {
    wpgraphql {
      brokers123(
        first: 10000
        where: { health: "good", orderby: { field: MENU_ORDER, order: DESC } }
      ) {
        nodes {
          uri
          title
          id
          databaseId
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          cptBrokers {
            brokerType
            ratingCommFees
            ratingCustResearch
            ratingCustServ
            ratingEase
            ratingMobTrad
            ratingPlatfTools
            likesList
            tabButtonAlternativeText
            brokerRegion
            specialOffer
            affiliateLink
            minDeposit
            platformsList
            accountsList
            spreadsList
            methodsList
            takeMeToBrokerButtonNoteText
            ourScore
            allSpreadsPoints
            tableInfo
            platformRelation {
              ... on WPGraphQL_Platform123 {
                id
                title
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
      page(id: $id) {
        title
        content
        id
        uri
        isFrontPage
        allPagesFields {
          alternativeTitle
          pageIcon {
            mediaItemUrl
          }
          videoPage
        }
        tmplBrokerFinder {
          pageTitle
          pageText
          recommendedBrokers {
            ... on WPGraphQL_Broker123 {
              id
              title
              uri
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
              cptBrokers {
                affiliateLink
                ratingCommFees
                ratingCustResearch
                ratingCustServ
                ratingEase
                ratingMobTrad
                ratingPlatfTools
                ratingMarkets
                likesList
                dislikesList
                brokerWarningMessage
              }
            }
          }
        }
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        contentType {
          node {
            name
          }
        }
        seo {
          metaDesc
          title
          opengraphType
        }
      }
    }
  }
`

function BrokerFinderTemplate({ data, search }) {
  const page = data.wpgraphql.page
  const brokers = data.wpgraphql.brokers123.nodes
  const pageTemplate = data.wpgraphql.page.tmplBrokerFinder
  const { recommendedBrokers } = pageTemplate
  console.log(pageTemplate)
  console.log(brokers)

  const pageInfo = {
    isFrontPage: page.isFrontPage,
    contentType: page.contentType,
    title: page.title,
    uri: page.uri,
  }
  const { seo } = page

  return (
    <Layout pageInfo={pageInfo}>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.metaDesc} />
        <meta name="og:type" content={seo.opengraphType} />
        <meta name="og:title" content={seo.title} />
        <meta name="og:description" content={seo.metaDesc} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org/",
            "@type": "WebPage",
            headline: page.title,
            url: `https://www.wecomparebrokers.com${page.uri}`,
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org/",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@id": "https://www.wecomparebrokers.com/",
                  url: "https://www.wecomparebrokers.com",
                  name: "Home Page",
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@id": `https://www.wecomparebrokers.com${page.uri}`,
                  name: page.title,
                },
              },
            ],
          })}
        </script>
      </Helmet>
      <div className="compare-main">
        <div className="row">
          <BreadCrumbs />
          <h1>{pageTemplate.pageTitle || page.title}</h1>

          {pageTemplate.pageText &&
            Parser(pageTemplate.pageText ? pageTemplate.pageText : "")}

          <div className="filter-wrap">
            <h3>Quick Broker Finder</h3>
            <form action="">
              <div className="region">
                <select name="" id="e1">
                  <option value="USA">USA</option>
                  <option value="EU">EU</option>
                  <option value="APAC">APAC</option>
                  <option value="ASIA">ASIA</option>
                  <option value="AFRICA">AFRICA</option>
                </select>
              </div>
              <div className="type">
                <select name="" id="e2">
                  <option value="">FOREX</option>
                  <option value="">ETF</option>
                  <option value="">Stocks</option>
                </select>
              </div>
              <button id="form-submit" className="btn green" type="submit">
                Find Me a Broker
              </button>
            </form>
          </div>

          <div className="broker-holder">
            <h3>Recommended broker</h3>
            <div className="broker-main-holder">
              {recommendedBrokers.length > 0 &&
                recommendedBrokers.map(brok => (
                  <div className="broker">
                    <div className="up-part">
                      <div className="image-holder">
                        <img
                          src={brok.featuredImage?.node?.mediaItemUrl}
                          alt={brok.title}
                        />
                      </div>
                      <div className="rating">
                        <span>{avarageRatingCounter(brok.cptBrokers)}</span>
                        <div className="rat-wrap">
                          <span className="rating">
                            <img alt="Rating" src={starImg} />
                            <span
                              class="rat-color"
                              style={{
                                width: `${
                                  avarageRatingCounter(brok.cptBrokers) * 20
                                }%`,
                              }}
                            ></span>
                          </span>
                        </div>
                      </div>
                      <div className="more-rating">
                        <div className="rating-item">
                          <div className="title">Fees</div>
                          <div className="rat-wrap">
                            <span className="rating">
                              <img alt="Rating" src={starGreyImg} />
                              <span
                                class="rat-color"
                                style={{
                                  width: `${
                                    brok.cptBrokers.ratingCommFees * 20
                                  }%`,
                                }}
                              ></span>
                            </span>
                          </div>
                        </div>
                        <div className="rating-item">
                          <div className="title">Platforms</div>
                          <div className="rat-wrap">
                            <span className="rating">
                              <img alt="Rating" src={starGreyImg} />
                              <span
                                class="rat-color"
                                style={{
                                  width: `${
                                    brok.cptBrokers.ratingPlatfTools * 20
                                  }%`,
                                }}
                              ></span>
                            </span>
                          </div>
                        </div>
                        <div className="rating-item">
                          <div className="title">Markets & Products</div>
                          <div className="rat-wrap">
                            <span className="rating">
                              <img alt="Rating" src={starGreyImg} />
                              <span
                                class="rat-color"
                                style={{
                                  width: `${
                                    brok.cptBrokers.ratingMarkets * 20
                                  }%`,
                                }}
                              ></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bottom-part">
                      <div className="props-cons">
                        <div className="props">
                          <div className="title">
                            <img src={prosImg} alt="" />
                            Pros
                          </div>
                          {Parser(
                            brok.cptBrokers.likesList
                              ? brok.cptBrokers.likesList
                              : ""
                          )}
                        </div>
                        <div className="cons">
                          <div className="title">
                            <img src={consImg} alt="" />
                            Cons
                          </div>
                          {Parser(
                            brok.cptBrokers.dislikesList
                              ? brok.cptBrokers.dislikesList
                              : ""
                          )}
                        </div>
                      </div>

                      <div className="butto-more-info">
                        <a href={brok.affiliateLink} className="green">
                          Open Demo Account
                        </a>
                        <Link to={brok.uri}>Read Review</Link>
                        <p>{brok.cptBrokers.brokerWarningMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="see-more">See broker reviews</div>
          </div>
          <div className="company-holder">
            <div className="item">
              <img src="./src/assets/images/company-broker-1.png" alt="" />
            </div>
            <div className="item">
              <img src="./src/assets/images/company-broker-2.png" alt="" />
            </div>
            <div className="item">
              <img src="./src/assets/images/company-broker-3.png" alt="" />
            </div>
            <div className="item">
              <img src="./src/assets/images/company-broker-4.png" alt="" />
            </div>
            <div className="item">
              <img src="./src/assets/images/company-broker-5.png" alt="" />
            </div>
            <div className="item">
              <img src="./src/assets/images/company-broker-6.png" alt="" />
            </div>
            <div className="item">
              <img src="./src/assets/images/company-broker-7.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* <CompareFrom />
      <CallBackFormPopUp />
      <PageTopContent page={page} template={pageTemplate} />
      <Filter />
      <div className="row brokers-list">
        <div className="small-12 columns">
          <RecommendedBroker
            recommendedBroker={pageTemplate.recommendedBroker}
            recommendedBrokerAdditionalText={
              pageTemplate.recommendedBrokerAdditionalText
            }
          />
          {currentBrokers.map(eachBroker => {
            return (
              <BrokerTableSingleItemNewView
                brokerInfo={eachBroker}
                recommendedBrokerAdditionalText={
                  pageTemplate.recommendedBrokerAdditionalText
                }
              />
            )
          })}
        </div>
        <div className="small-12 columns text-right btn-navi-wrap">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            postsPerPage={postsPerPage}
            totalPosts={filteredBrokers.length}
            noNumbers={false}
          />
        </div>
      </div>
      <div className="choose-wrap bot-text">
        <div className="row">
          <div className="medium-10 columns small-centered">
            {Parser(
              pageTemplate.bodyTextChoosing ? pageTemplate.bodyTextChoosing : ""
            )}
          </div>
        </div>
      </div> */}
    </Layout>
  )
}

export default withLocation(BrokerFinderTemplate)
