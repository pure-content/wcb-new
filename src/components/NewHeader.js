import React, { useEffect } from "react"
import $ from "jquery"
import { Link, useStaticQuery, graphql } from "gatsby"
import activeFlagImage from "../assets/images/active-flag-image.png"

export default function Header(props) {
  const menu = useStaticQuery(graphql`
    query {
      wpgraphql {
        generalSettings {
          url
        }
        menu(id: "dGVybTo0NTUy") {
          menuItems {
            nodes {
              id
              label
              url
            }
          }
        }
        acfOptionsHeader {
          optHeader {
            newHomepageLogo {
              mediaItemUrl
              altText
            }
          }
        }
      }
    }
  `)
  const { url } = menu.wpgraphql.generalSettings
  const { title } = props
  const { altText, mediaItemUrl } =
    menu.wpgraphql.acfOptionsHeader.optHeader.newHomepageLogo

  // loop through the menu items and make the links relative
  const items = menu.wpgraphql.menu.menuItems.nodes.map(item => ({
    ...item,
    url: item.url.replace(url, ""),
  }))

  useEffect(() => {
    //Delete
    // $(".toggle-topbar").on("click", function () {
    //   $(".top-bar").toggleClass("expanded")
    // })
    //New
    $(".prefix").on("click", function () {
      $("#searchform #s").toggleClass("active-search")
      $("#searchform .prefix").toggleClass("active-search-item")
    })
    $(".active-language").on("click", function () {
      $(".dropdown").toggle()
    })
    $(".burger").on("click", function () {
      $(".menu-mobile").toggleClass("hide")
    })
  })

  return (
    <header>
      <div class="row header-holder">
        <div class="burger">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="logo">
          <Link to="/">
            <img src={mediaItemUrl} alt={altText} />
          </Link>
        </div>
        <div class="menu-item-holder">
          <ul class="menu-mobile hide">
            {items.map(item => (
              <li key={item.id}>
                <Link key={item.url} to={item.url}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div class="search-language">
          <div class="search">
            <form id="searchform" action={"/search/"} method="get">
              <input
                type="text"
                name="s"
                id="s"
                placeholder="Search for broker..."
              />
              <span class="prefix" id="searchsubmit"></span>
            </form>
          </div>
          |
          <div class="language">
            <div class="active-language">
              <img src={activeFlagImage} alt="" />
            </div>
            <div class="dropdown">
              <ul>
                <li>
                  <Link to="/">
                    <img src={activeFlagImage} alt="" />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <img src={activeFlagImage} alt="" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    // <header className="new_header" style={{ backgroundColor: "#223144" }}>
    //   <div className="row large-uncollapse medium-uncollapse small-collapse">
    //     <div className="large-3 columns">
    //       <div className="logo small-only-text-center">
    //         <Link to="/" className="home">
    //           <img src={mediaItemUrl} alt={altText} />
    //         </Link>
    //       </div>
    //     </div>
    //     <div className="large-7 columns">
    //       <nav
    //         className="top-bar"
    //         data-topbar=""
    //         role="navigation"
    //         data-options="{is_hover: false, mobile_show_parent_link: true}"
    //       >
    //         <ul className="title-area">
    //           <li className="name"></li>
    //           <li className="toggle-topbar menu-icon">
    //             <a className="home">
    //               <span>Menu</span>
    //             </a>
    //           </li>
    //         </ul>
    //         <section className="top-bar-section">
    //           <div className="menu-new-header-menu-container">
    //             <ul id="menu-new-header-menu" className="menu">
    //               {items.map(item => (
    //                 <li
    //                   key={item.id}
    //                   className={`menu-item ${
    //                     title === item.label ? "current-menu-item" : ""
    //                   }`}
    //                 >
    //                   <Link key={item.url} to={item.url}>
    //                     {item.label}
    //                   </Link>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //         </section>
    //       </nav>
    //     </div>

    //     <div className="large-2 columns search-header">
    //       <form method="get" id="searchform" action={"/search/"}>
    //         <input
    //           type="text"
    //           name="s"
    //           id="s"
    //           placeholder="Search for broker..."
    //         />

    //         <input
    //           type="submit"
    //           className="prefix"
    //           id="searchsubmit"
    //           value=""
    //         />
    //       </form>
    //     </div>
    //   </div>
    // </header>
  )
}
