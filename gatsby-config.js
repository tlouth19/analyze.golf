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
    `gatsby-transformer-sharp`, 
    `gatsby-plugin-sharp`
  ],
};
