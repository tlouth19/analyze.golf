import * as React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Img from "gatsby-image"
import { Pane } from 'evergreen-ui'
interface Props {}

const Screenshot: React.FunctionComponent<Props> = () => (
  <StaticQuery query={graphql`
    query {
      desktop: file(relativePath: { eq: "screenshot.png" }) {
        childImageSharp {
          fluid(quality: 100, maxWidth: 4160) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `}
    render={data => 
      <Pane 
        is={Img}
        width='66%' 
        marginX='auto'
        fluid={data.desktop.childImageSharp.fluid}/>
    }/>
)

export default Screenshot