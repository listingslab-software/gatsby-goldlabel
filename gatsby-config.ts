import {GatsbyShape} from "./src/types"
import strapiConfig from "./strapi"
import type {GatsbyConfig} from "gatsby"

const siteTitle = "Goldlabel"
const siteDescription = "by listingslab"
const siteUrl = "https://listingslab.com/"
const siteIcon = "/svg/icons/goldlabel.svg"
const siteImage = "/png/og.png"
const siteTwitter = "@listingslab"
const siteKeywords = "goldlabel, open source, gatsby, strapi, pwa, listingslab, react, javascript"
const siteTheme = "#FFFFFF"

const siteMetadata: GatsbyShape =  {
  siteTitle,
  siteUrl,
  siteDescription,
  siteIcon,
  siteImage,
  siteKeywords,
  siteTwitter,
  siteTheme,
}

const config: GatsbyConfig = {
  siteMetadata,
  plugins: [
    { 
      resolve: `gatsby-source-strapi`, 
      options: strapiConfig
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteTitle,
        short_name: siteTitle,
        icon: `./static${siteIcon}`,
        start_url: `/`,
        background_color: siteTheme,
        theme_color: siteTheme,
        display: `standalone`,
      }
    },
    {
      resolve: 'gatsby-plugin-next-seo',
      options: {
        title: siteTitle,
        description: siteDescription,
      },
    },
    {
      resolve: 'gatsby-plugin-offline'
    }
  ],
  jsxRuntime: `automatic`,
}

export default config
