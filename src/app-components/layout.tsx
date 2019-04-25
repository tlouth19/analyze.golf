import * as React from "react"
import Header from "./header"
import { Helmet } from "react-helmet"
import social from "../images/social/card.jpg"
import "normalize.css"
import "../css/range.css"

type Props = {
	children: React.ReactNode
	hideHeader?: boolean
	title: string
	description: string
}

const Layout: React.FunctionComponent<Props> = ({ children, hideHeader, title, description }) => (
	<React.Fragment>
		<Helmet
			title={title}
			htmlAttributes={{ lang: "en" }}
			meta={[
				{ name: "description", content: description },
				{ name: "keywords", content: "Swing Analysis, Golf Swing, Golf Swing Analysis, Free Golf Swing Analysis" },
				{ name: "og:url", content: "https://analyze.golf" + social },
				{ name: "og:type", content: "website" },
				{ name: "og:title", content: "Analyze.Golf | Free Browser-Based Golf Swing Analysis Tool" },
				{ name: "og:description", content: description },
				{ name: "og:image", content: "https://analyze.golf" + social },
				{ name: "og:image:secure_url", content: "https://analyze.golf" + social },
				{ name: "og:image:type", content: "image/jpg" },
				{ name: "og:site", content: "@analyze.golf" },
				{ name: "og:creator", content: "@analyze.golf" },
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:site", content: "@analyze.golf" },
				{ name: "twitter:title", content: title },
				{ name: "twitter:description", content: description },
				{ name: "twitter:image", content: "https://analyze.golf" + social }
			]}
		/>
		{!hideHeader && <Header />}
		{children}
	</React.Fragment>
)

Layout.defaultProps = {
	title: "Analyze.Golf | Free Swing Analysis Tool | No App Download",
	description:
		"Analyze.Golf is a free browser-based golf swing analysis tool. No app download or file uploading necessary."
}

export default Layout
