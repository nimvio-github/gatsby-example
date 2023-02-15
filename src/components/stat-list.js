import * as React from "react"
import {
  Container,
  Section,
  FlexList,
  Text,
  Kicker,
  Heading,
  Flex,
  Box,
  Icon,
  ButtonList,
  Nudge,
} from "./ui"

function Stat(props) {
  return (
    <Box>
      <Text variant="stat">{props.value}</Text>
      <Text variant="statLabel">{props.label}</Text>
    </Box>
  )
}

export default function StatList(props) {
  return (
    <Container width="fullbleed">
      <Section padding={5} radius="large" background="primary">
        <Flex responsive variant="end">
          <Box width="half">
            {props.icon && (
              <Icon alt={props.icon.AltText} src={props.icon.MediaUrl} />
            )}
            <Heading>
              {props.kicker && <Kicker>{props.kicker}</Kicker>}
              {props.heading}
            </Heading>
            {props.text && <Text variant="lead">{props.text}</Text>}
            <FlexList wrap gap={4}>
              {props.content.map((stat) => (
                <li key={stat.ContentID}>
                  <Stat {...stat.Data} />
                </li>
              ))}
            </FlexList>
            <ButtonList links={props.links} reversed />
          </Box>
          <Box width="half">
            {props.image && (
              <Nudge right={5} bottom={5}>
                <img
                  alt={props.image.AltText}
                  src={props.image.MediaUrl}
                  width="100%"
                />
              </Nudge>
            )}
          </Box>
        </Flex>
      </Section>
    </Container>
  )
}
