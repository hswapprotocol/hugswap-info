import React from 'react'
import { Flex } from 'rebass'
import { useTranslation } from 'react-i18next'
import Link from '../Link'

const links = [
  { url: 'https://app.hugswap.com', text: 'Swap' },
]

const FooterLink = ({ children, ...rest }) => (
  <Link external color="hugswapPurple" fontWeight={500} fontSize={12} mr={'8px'} {...rest}>
    {children}
  </Link>
)

const Footer = () => {
  const { t } = useTranslation()
  return (<Flex as="footer" p={24}>
    {links.map((link, index) => (
      <FooterLink key={index} href={link.url}>
        {t(link.text)}
      </FooterLink>
    ))}
  </Flex>)
}

export default Footer
