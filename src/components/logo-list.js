import * as React from "react"
import { Space, Container, Section, FlexList, Text, Logo } from "./ui"

export function LogoItem(props) {
  if (!props.image) return null

  return (
    <Logo alt={props.AltText} src={props.image.MediaUrl} size="medium" />
  )
}

export default function LogoList(props) {
  return (
    <Section paddingY={4}>
      <Container width="narrow">
        {props.text && (
          <Text center variant="lead">
            {props.text}
          </Text>
        )}
        <Space size={4} />
        <FlexList gap={4} variant="center">
          {props.logos.map(
            (logo) =>
              logo && (
                <li key={logo.ContentID}>
                  <LogoItem {...logo.Data} />
                </li>
              )
          )}
        </FlexList>
      </Container>
    </Section>
  )
}
