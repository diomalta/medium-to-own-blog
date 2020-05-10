import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO({
  description,
  lang,
  meta,
  keywords,
  title,
  canonicalLink,
  image,
}) {
  const { site, avatar } = useStaticQuery(
    graphql`
      query {
        avatar: file(absolutePath: { regex: "/avatar.png/" }) {
          childImageSharp {
            fixed(width: 150, height: 150, quality: 90) {
              src
            }
          }
        }
        site {
          siteMetadata {
            siteUrl
            title
            description
            author
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const fullURL = path =>
    path ? `${site.siteMetadata.siteUrl}${path}` : site.siteUrl

  const metaDescription = description || site.siteMetadata.description
  const metaTitle = title || site.siteMetadata.title

  // If no image is provided lets use the avatar
  const socialImage = image || avatar.childImageSharp.fixed.src

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      meta={[
        { charset: 'utf-8' },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'theme-color',
          content: '#fff',
        },
        { itemprop: 'name', content: metaTitle },
        {
          name: `description`,
          content: metaDescription,
        },
        { itemprop: 'image', content: fullURL(socialImage) },
        {
          property: `og:title`,
          content: title || site.siteMetadata.title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        { property: 'og:image', content: fullURL(socialImage) },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:site`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: 'twitter:image',
          content: fullURL(socialImage),
        },
      ]
        .concat(
          keywords && keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
      link={[].concat(
        canonicalLink
          ? {
              rel: `canonical`,
              href: canonicalLink,
            }
          : []
      )}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
}

export default SEO
