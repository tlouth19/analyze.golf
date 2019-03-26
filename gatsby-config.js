module.exports = {
  siteMetadata: {
    title: 'Swingz.',
  },
  plugins: [
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: './src/images/',
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/
        }
      }
    },
    `gatsby-transformer-sharp`, 
    `gatsby-plugin-sharp`
  ],
};
