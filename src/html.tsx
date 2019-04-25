import React from "react"

type Props = {
  htmlAttributes: any
  headComponents: []
  bodyAttributes: any
  preBodyComponents: any
  body: string
  postBodyComponents: []
}

const HTML: React.FunctionComponent<Props> = props => (
	<html {...props.htmlAttributes} lang="en">
		<head>
			<meta charSet="utf-8" />
			<meta httpEquiv="x-ua-compatible" content="ie=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
			{props.headComponents}
		</head>
		<body {...props.bodyAttributes}>
			<noscript>JavaScript is required to view this website.</noscript>
			{props.preBodyComponents}
			<div key="body" id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
			{props.postBodyComponents}
		</body>
	</html>
)

export default HTML
