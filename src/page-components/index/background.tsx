import * as React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

interface Props {
  children: React.ReactNode
}

const Background: React.FunctionComponent<Props> = ({ children }) => (
  <StaticQuery query={graphql`
    query {
      desktop: file(relativePath: { eq: "home.jpg" }) {
        childImageSharp {
          fluid(quality: 100, maxWidth: 4160) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `}
    render={data => 
      <BackgroundImage 
        Tag="div"
        style={{ width: '100%' }}
        fluid={data.desktop.childImageSharp.fluid}
        backgroundColor='#040e18'>
          {children}
        </BackgroundImage>
    }/>
)

export default Background