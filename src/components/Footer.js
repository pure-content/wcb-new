import React, { useEffect } from "react"
import $ from "jquery"
import "jquery-match-height"
import { Link, useStaticQuery, graphql } from "gatsby"
import Parser from "html-react-parser"
import Equalizer from "./Equalizer"
const shortid = require("shortid")

export default function Footer(props) {
  const footer = useStaticQuery(graphql`
    query {
      wpgraphql {
        generalSettings {
          url
        }
        acfOptionsFooter {
          optFooter {
            newFooterSidebarContent
            buttonsHeader
            appstoreButtonLink
            googlePlayButtonLink
            trustSubsectionLogos {
              trustSubsectionLogo {
                mediaItemUrl
              }
            }
            partnersList {
              link
              logo {
                mediaItemUrl
              }
            }
            topFooterBackground {
              mediaItemUrl
            }
            appsImage {
              mediaItemUrl
            }
            appstoreButtonImage {
              mediaItemUrl
            }
            googlePlayButtonImage {
              mediaItemUrl
            }
            footerText
            socialsList {
              link
              icon {
                mediaItemUrl
                title
              }
            }
            copyrightOptions
            firstColTitle
            firstColLinks {
              title
              link {
                ... on WPGraphQL_Post {
                  id
                  uri
                  link
                }
                ... on WPGraphQL_Page {
                  id
                  link
                  uri
                }
                ... on WPGraphQL_MediaItem {
                  id
                  uri
                  link
                }
                ... on WPGraphQL_Broker123 {
                  id
                  uri
                  link
                }
                ... on WPGraphQL_Platform123 {
                  id
                  uri
                  link
                }
                ... on WPGraphQL_Comparison123 {
                  id
                  uri
                  link
                }
                ... on WPGraphQL_CryptoCurrency123 {
                  id
                  uri
                  link
                }
                ... on WPGraphQL_BrokerComparison123 {
                  id
                  uri
                  link
                }
                ... on WPGraphQL_Article123 {
                  id
                  uri
                  link
                }
                ... on WPGraphQL_TopBroker123 {
                  id
                  uri
                  link
                }
                ... on WPGraphQL_ForexMarketNewsPage123 {
                  id
                  uri
                  link
                }
              }
              linkType
              linkText
            }
            secColTitle
            secColLinks {
              link {
                ... on WPGraphQL_Post {
                  id
                  uri
                }
                ... on WPGraphQL_Page {
                  id
                  uri
                }
                ... on WPGraphQL_MediaItem {
                  id
                  uri
                }
                ... on WPGraphQL_Broker123 {
                  id
                  uri
                }
                ... on WPGraphQL_Platform123 {
                  id
                  uri
                }
                ... on WPGraphQL_Comparison123 {
                  id
                  uri
                }
                ... on WPGraphQL_CryptoCurrency123 {
                  id
                  uri
                }
                ... on WPGraphQL_BrokerComparison123 {
                  id
                  uri
                }
                ... on WPGraphQL_Article123 {
                  id
                  uri
                }
                ... on WPGraphQL_TopBroker123 {
                  id
                  uri
                }
                ... on WPGraphQL_ForexMarketNewsPage123 {
                  id
                  uri
                }
              }
              linkText
              linkType
              title
            }
            threeColTitle
            threeColLinks {
              title
              linkType
              linkText
              link {
                ... on WPGraphQL_Post {
                  id
                  uri
                }
                ... on WPGraphQL_Page {
                  id
                  uri
                }
                ... on WPGraphQL_MediaItem {
                  id
                  uri
                }
                ... on WPGraphQL_Broker123 {
                  id
                  uri
                }
                ... on WPGraphQL_Platform123 {
                  id
                  uri
                }
                ... on WPGraphQL_Comparison123 {
                  id
                  uri
                }
                ... on WPGraphQL_CryptoCurrency123 {
                  id
                  uri
                }
                ... on WPGraphQL_BrokerComparison123 {
                  id
                  uri
                }
                ... on WPGraphQL_Article123 {
                  id
                  uri
                }
                ... on WPGraphQL_TopBroker123 {
                  id
                  uri
                }
                ... on WPGraphQL_ForexMarketNewsPage123 {
                  id
                  uri
                }
              }
            }
            fourColTitle
            fourColLinks {
              title
              linkType
              linkText
            }
            footerLogo {
              mediaItemUrl
              id
            }
          }
        }
        menu(id: "dGVybToz") {
          menuItems {
            nodes {
              id
              label
              url
            }
          }
        }
      }
    }
  `)

  useEffect(() => {
    $(".light-grey-wrap .columns").matchHeight()
    $(".fooler-col").matchHeight()
  })

  const { url } = footer.wpgraphql.generalSettings
  const contentType = props.contentType ? props.contentType.node.name : ""
  const footerOptions = footer.wpgraphql.acfOptionsFooter.optFooter
  const dt = new Date()

  // loop through the menu items and make the links relative
  const menuItems = footer.wpgraphql.menu.menuItems.nodes.map(item => ({
    ...item,
    url: item.url.replace(url, ""),
  }))

  const TrustSection = () => {
    const { trustSubsectionLogos } = footerOptions
    if (trustSubsectionLogos.length > 0) {
      return (
        <div class="company-image">
          <div class="row">
            {trustSubsectionLogos.map(logo => {
              return (
                <img
                  key={shortid.generate()}
                  className="lazy"
                  src={logo.trustSubsectionLogo.mediaItemUrl}
                />
              )
            })}
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <>
      <TrustSection />
      <footer>
        <div class="link-holder">
          <div class="row">
            <div class="main-info">
              <img src={footerOptions.footerLogo.mediaItemUrl} alt="" />
              <ul>
                {footerOptions.fourColLinks.map(eachLink => {
                  const linkTitle = eachLink.title
                  const linkType = eachLink.linkType
                  const linkItself =
                    linkType === "text"
                      ? eachLink.linkText.includes("wp-content")
                        ? eachLink.linkText
                        : eachLink.linkText.replace(url, "")
                      : eachLink.link.uri
                  return (
                    <li key={shortid.generate()}>
                      <Link to={linkItself}>{linkTitle}</Link>
                    </li>
                  )
                })}
              </ul>
              <div class="social-link">
                {footerOptions.socialsList.map(soc => {
                  return (
                    <Link
                      to={soc.link}
                      target="_blank"
                      key={shortid.generate()}
                    >
                      <img src={soc.icon.mediaItemUrl} alt={soc.icon.title} />
                    </Link>
                  )
                })}
              </div>
            </div>
            <div class="sub-info">
              <h3>{footerOptions.firstColTitle}</h3>
              <ul>
                {footerOptions.firstColLinks.map(eachLink => {
                  const linkTitle = eachLink.title
                  const linkType = eachLink.linkType
                  const linkItself =
                    linkType === "text"
                      ? eachLink.linkText.includes("wp-content")
                        ? eachLink.linkText
                        : eachLink.linkText.replace(url, "")
                      : eachLink.link.uri
                  return (
                    <li key={shortid.generate()}>
                      <Link to={linkItself}>{linkTitle}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div class="sub-info">
              <h3>{footerOptions.secColTitle}</h3>
              <ul>
                {footerOptions.secColLinks.map(eachLink => {
                  const linkTitle = eachLink.title
                  const linkType = eachLink.linkType
                  const linkItself =
                    linkType === "text"
                      ? eachLink.linkText.includes("wp-content")
                        ? eachLink.linkText
                        : eachLink.linkText.replace(url, "")
                      : eachLink.link.uri
                  return (
                    <li key={shortid.generate()}>
                      <Link to={linkItself}>{linkTitle}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div class="sub-info">
              <h3>{footerOptions.threeColTitle}</h3>
              <ul>
                {footerOptions.threeColLinks.map(eachLink => {
                  const linkTitle = eachLink.title
                  const linkType = eachLink.linkType
                  const linkItself =
                    linkType === "text"
                      ? eachLink.linkText.includes("wp-content")
                        ? eachLink.linkText
                        : eachLink.linkText.replace(url, "")
                      : eachLink.link.uri
                  return (
                    <li key={shortid.generate()}>
                      <Link to={linkItself}>{linkTitle}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div class="row email-info">
            <div class="email">
              <form action="">
                <input
                  type="text"
                  placeholder="Get Email Updates"
                  class="text"
                />
                <input type="submit" class="submit" value="Sign Up" />
              </form>
            </div>
            <div class="text-footer-info">
              <p>
                Nothing on this site constitutes advice or a recommendation –
                you use the site and its contents at your own risk. Trade
                wisely. Spread bets and CFDs are complex instruments and come
                with a high risk of losing money rapidly due to leverage.
                Between 74-89% of retail investor accounts lose money when
                trading CFDs.
              </p>
            </div>
          </div>
        </div>
        <div class="greeen-footer">
          <div class="row">
            {footerOptions.copyrightOptions.length > 0 && (
              <p class="copyright">
                &copy;
                {Parser(footerOptions.copyrightOptions)} {dt.getFullYear()}
              </p>
            )}

            <div class="link">
              <ul>
                {menuItems.map(menuItem => {
                  return (
                    <li key={shortid.generate()}>
                      <Link to={menuItem.url}>{menuItem.label}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
