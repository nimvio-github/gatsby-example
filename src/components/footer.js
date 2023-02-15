import * as React from "react"
import {
  Twitter,
  Twitch,
  Instagram,
  Facebook,
  Youtube,
  GitHub,
} from "react-feather"
import {
  Container,
  Flex,
  FlexList,
  Box,
  Space,
  NavLink,
  Text,
  IconLink,
  VisuallyHidden,
} from "./ui"
import BrandLogo from "./brand-logo"

const socialMedia = {
  twitter: {
    url: "https://twitter.com",
    name: "Twitter",
    icon: <Twitter />,
  },
  instagram: {
    url: "https://instagram.com",
    name: "Instagram",
    icon: <Instagram />,
  },
  facebook: {
    url: "https://facebook.com",
    name: "Facebook",
    icon: <Facebook />,
  },
  youtube: {
    url: "https://youtube.com",
    name: "YouTube",
    icon: <Youtube />,
  },
  github: {
    url: "https://github.com",
    name: "GitHub",
    icon: <GitHub />,
  },
  twitch: {
    url: "https://twitch.tv",
    name: "Twitch",
    icon: <Twitch />,
  },
}

const getSocialURL = ({ service, username }) => {
  const domain = socialMedia[service]?.url
  if (!domain) return false
  return `${domain}/${username}`
}

const getSocialIcon = ({ service }) => {
  return socialMedia[service]?.icon
}

const getSocialName = ({ service }) => {
  return socialMedia[service]?.name
}

export default function Footer({ sliceContext: { data } }) {
  console.log('footer Data', data.Data)
  const { links, meta, socialLinks, copyright } = data.Data

  return (
    <Box as="footer" paddingY={4}>
      <Container>
        <Flex variant="start" responsive>
          <NavLink to="/">
            <VisuallyHidden>Home</VisuallyHidden>
            <BrandLogo />
          </NavLink>
          <Space />
          <FlexList>
            {socialLinks &&
              socialLinks.map((link) => {
                const url = getSocialURL(link.Data)
                return (
                  url && (
                    <li key={link.ContentID}>
                      <IconLink to={url}>
                        <VisuallyHidden>{getSocialName(link.Data)}</VisuallyHidden>
                        {getSocialIcon(link.Data)}
                      </IconLink>
                    </li>
                  )
                )
              })}
          </FlexList>
        </Flex>
        <Space size={5} />
        <Flex variant="start" responsive>
          <FlexList variant="start" responsive>
            {links &&
              links.map((link) => (
                <li key={link.ContentID}>
                  <NavLink to={link.Data.href}>{link.Data.text}</NavLink>
                </li>
              ))}
          </FlexList>
          <Space />
          <FlexList>
            {meta &&
              meta.map((link) => (
                <li key={link.ContentID}>
                  <NavLink to={link.Data.href}>
                    <Text variant="small">{link.Data.text}</Text>
                  </NavLink>
                </li>
              ))}
          </FlexList>
          <Text variant="small">{copyright}</Text>
        </Flex>
      </Container>
      <Space size={3} />
    </Box>
  )
}
