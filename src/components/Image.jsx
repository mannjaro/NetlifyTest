import React, { useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const Image = ({ filename, alt }) => {
  const edges = useStaticQuery(graphql`
    query {
      images: allFile {
        edges {
          node {
            relativePath
            name
            childImageSharp {
              fluid(maxWidth: 1000, quality: 90, pngQuality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  `).images.edges

  const image = useMemo(() => edges.find(n => n.node.relativePath.includes(filename)), [edges, filename])

  return image ? <Img alt={alt} fluid={image.node.childImageSharp.fluid} /> : null
}

export default Image