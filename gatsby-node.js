// Generate Pages without Gatsby GraphQL
// https://www.gatsbyjs.com/docs/how-to/querying-data/using-gatsby-without-graphql/#the-approach-fetch-data-and-use-gatsbys-createpages-api
const { getContentById } = require("./src/utils/dataFetching")

exports.createPages = async ({ actions: { createPage, createSlice } }) => {
  const { data } = await getContentById("Content_81b8facc-0e81-45fe-a9a9-2c2be581dbd9", { deep: true })
  const { data: headerLayout } = await getContentById("Content_a3231b18-5a13-47ce-b363-888fa8323cfa", { deep: true })
  const { data: footerLayout } = await getContentById("Content_30c29898-24c0-4f21-ae75-590d3040d629", { deep: true })

  createPage({
    path: '/',
    component: require.resolve("./src/templates/page.js"),
    context: {
      data
    }
  })

  createSlice({
    id: "header",
    component: require.resolve("./src/components/header.js"),
    context: {
      data: headerLayout
    }
  })
  createSlice({
    id: "footer",
    component: require.resolve("./src/components/footer.js"),
    context: {
      data: footerLayout
    }
  })
}