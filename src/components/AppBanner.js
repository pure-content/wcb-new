import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Parser from "html-react-parser"

const AppBanner = () => {
  const appBannerInfo = useStaticQuery(graphql`
    query {
      wpgraphql {
        acfOptionsGeneralSettings {
          optGeneralSettings {
            appBannerHeader
            appBannerImage {
              mediaItemUrl
              title
            }
            appBannerText
            appBannerDownloadLinks {
              linkUrl
              linkImage {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  `)
  const {
    appBannerHeader,
    appBannerImage,
    appBannerText,
    appBannerDownloadLinks,
  } = appBannerInfo.wpgraphql.acfOptionsGeneralSettings.optGeneralSettings
  return (
    <div class="app-info">
      <div class="row">
        <h3>{appBannerHeader}</h3>

        <div class="info-holder">
          <div class="text">{Parser(appBannerText || "")}</div>
          <div class="image-and-link">
            {appBannerImage && (
              <img
                src={appBannerImage.mediaItemUrl}
                alt={appBannerImage.title}
              />
            )}
            <div class="link-app">
              {appBannerDownloadLinks.map(link => (
                <a href={link.linkUrl}>
                  <img src={link.linkImage.mediaItemUrl} alt="download app" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppBanner
