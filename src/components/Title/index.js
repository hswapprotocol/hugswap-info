import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useDarkModeManager } from '../../contexts/LocalStorage'
import { useMedia } from 'react-use'
import { Flex } from 'rebass'
import Link from '../Link'
import { RowFixed } from '../Row'
import Logo from '../../assets/logo.svg'
import LogoWhite from '../../assets/logo_white.svg'
import Wordmark from '../../assets/wordmark.svg'
import WordmarkWhite from '../../assets/wordmark_white.svg'

const TitleWrapper = styled.div`
  text-decoration: none;
  padding-left: ${({ isMobile, below1080 }) => isMobile ? '0' : below1080 ? '1rem' : '2.5rem'};
  &:hover {
    cursor: pointer;
  }

  z-index: 10;
`

const UniIcon = styled(Link)`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

export default function Title() {
  const history = useHistory()
  const [isDark] = useDarkModeManager()
  const below1080 = useMedia('(max-width: 1080px)')
  const isMobile = useMedia('(max-width: 800px)')
  return (
    <TitleWrapper isMobile={isMobile} below1080={below1080} onClick={() => history.push('/')}>
      <Flex alignItems="center">
        <RowFixed>
          <UniIcon id="link" onClick={() => history.push('/')}>
            <img width={'18px'} src={isDark ? LogoWhite : Logo} alt="Hugswap Logo" />
          </UniIcon>
          <img width={'80px'} style={{ marginLeft: '5px', marginTop: '0px' }} src={isDark ? WordmarkWhite : Wordmark} alt="Hugswap" />
        </RowFixed>
      </Flex>
    </TitleWrapper>
  )
}
