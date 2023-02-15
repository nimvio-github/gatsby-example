import * as React from "react"
import Layout from "../components/layout"
import * as sections from "../components/sections"
import Fallback from "../components/fallback"
import SEOHead from "../components/head"

export default function Homepage({ pageContext: { data } }) {
  const { Data } = data
  const getSectionComp = (templateName) => {
    const sectionType = templateName.replaceAll(" ", "")
    return sections[sectionType]
  }
  console.log('homepage', Data)

  return (
    <Layout>
      {Data.content.map((content) => {
        const { ContentID, TemplateName, Data } = content
        const Component = getSectionComp(TemplateName) || Fallback
        return <Component key={ContentID} {...Data} />
      })}
    </Layout>
  )
}
export const Head = ({ pageContext: { data } }) => {
  const { Data } = data
  return <SEOHead {...Data} />
}