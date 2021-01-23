import React from 'react'
import styled from 'styled-components'
import { AutoColumn } from '../Column'
import Title from '../Title'
import { BasicLink } from '../Link'
import { useMedia } from 'react-use'
import { transparentize } from 'polished'
import { TYPE } from '../../Theme'
import { withRouter } from 'react-router-dom'
import Link from '../Link'
import { useSessionStart } from '../../contexts/Application'
import { useDarkModeManager } from '../../contexts/LocalStorage'
import Toggle from '../Toggle'
import Language from '../Toggle/language'
import { useTranslation } from 'react-i18next'

import { ReactSVG } from 'react-svg'
import iconOverview from '../../assets/icon_overview.svg'
import iconTokens from '../../assets/icon_tokens.svg'
import iconPairs from '../../assets/icon_pairs.svg'
import iconAccounts from '../../assets/icon_accounts.svg'

const Wrapper = styled.div`
  height: ${({ isMobile }) => (isMobile ? 'initial' : '100vh')};
  background-color: ${({ theme }) => transparentize(0.4, theme.bg1)};
  color: ${({ theme }) => theme.text1};
  padding: 0.5rem 0.5rem 0.5rem 0;
  position: sticky;
  top: 0px;
  z-index: 9999;
  box-sizing: border-box;
  background: ${({ theme }) => theme.bg1};
  box-shadow: ${({ theme }) => theme.shadow};
  color: ${({ theme }) => theme.bg2};

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    position: relative;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;
  }
`

const NavLink = styled(BasicLink)`
  margin-right: 1.5rem;
  div {
    padding-top: 0.9375rem;
    padding-bottom: 0.9375rem;
  }
`
const Option = styled.div`
  position: relative;
  font-weight: 500;
  font-size: 14px;
  padding-left: 2.5rem;
  color: ${({ activeText, theme }) => (activeText ? theme.text7 : theme.text3)};
  background: ${({ activeText, theme }) => (activeText ? theme.bg5 : 'none')};
  border-radius: 0px 8px 8px 0px;
  display: flex;
  cursor: ${({ activeText }) => (activeText ? 'default' : 'pointer')};

  :hover {
    color: ${({ theme }) => theme.text7};
    span {
      color: ${({ theme }) => theme.text7};
    }
  }

  :after {
    content: "";
    display: ${({ activeText }) => (activeText ? 'block' : 'none')};
    height: 1.1875rem;
    width: 0.25rem;
    background-color: ${({ theme }) => theme.primary1};
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  span {
    color: ${({ activeText, theme }) => (activeText ? theme.text7 : theme.text4)}
  }

`

const DesktopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`

const MobileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderText = styled.div`
  margin-right: 0.75rem;
  font-size: 0.825rem;
  font-weight: 500;
  display: inline-box;
  display: -webkit-inline-box;
  opacity: 0.8;
  :hover {
    opacity: 1;
  }
  a {
    color: ${({ theme }) => theme.text3};
  }
`

const Polling = styled.div`
  position: fixed;
  display: flex;
  left: 0;
  bottom: 0;
  padding: 1rem;
  color: ${({ theme }) => theme.text1};
  opacity: 0.4;
  transition: opacity 0.25s ease;
  :hover {
    opacity: 1;
  }
`
const PollingDot = styled.div`
  width: 8px;
  height: 8px;
  min-height: 8px;
  min-width: 8px;
  margin-right: 0.5rem;
  margin-top: 3px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.green1};
`

function SideNav({ history }) {
  const below1080 = useMedia('(max-width: 1080px)')

  const below1180 = useMedia('(max-width: 1180px)')

  const seconds = useSessionStart()
  const { t } = useTranslation()
  const [isDark, toggleDarkMode] = useDarkModeManager()

  return (
    <Wrapper isMobile={below1080}>
      {!below1080 ? (
        <DesktopWrapper>
          <AutoColumn gap="2rem" style={{ marginTop: '1rem' }}>
            <Title />
            {!below1080 && (
              <AutoColumn>
                <NavLink to="/home">
                  <Option activeText={history.location.pathname === '/home' ?? undefined}>
                    <ReactSVG wrapper="span" src={iconOverview} style={{ marginRight: '.5rem' }} />
                    {t('Overview')}
                  </Option>
                </NavLink>
                <NavLink to="/tokens">
                  <Option
                    activeText={
                      (history.location.pathname.split('/')[1] === 'tokens' ||
                        history.location.pathname.split('/')[1] === 'token') ??
                      undefined
                    }
                  >
                    <ReactSVG wrapper="span" src={iconTokens} style={{ marginRight: '.5rem' }} />
                    {t('Tokens')}
                  </Option>
                </NavLink>
                <NavLink to="/pairs">
                  <Option
                    activeText={
                      (history.location.pathname.split('/')[1] === 'pairs' ||
                        history.location.pathname.split('/')[1] === 'pair') ??
                      undefined
                    }
                  >
                    <ReactSVG wrapper="span" src={iconPairs} style={{ marginRight: '.5rem' }} />
                    {t('Pairs')}
                  </Option>
                </NavLink>

                <NavLink to="/accounts">
                  <Option
                    activeText={
                      (history.location.pathname.split('/')[1] === 'accounts' ||
                        history.location.pathname.split('/')[1] === 'account') ??
                      undefined
                    }
                  >
                    <ReactSVG wrapper="span" src={iconAccounts} style={{ marginRight: '.5rem' }} />
                    {t('Accounts')}
                  </Option>
                </NavLink>
              </AutoColumn>
            )}
          </AutoColumn>
          <AutoColumn gap="0.5rem" style={{ marginLeft: '2.5rem', marginBottom: '4rem' }}>
            <HeaderText>
              <Link href="https://app.hugswap.com" target="_blank">
                Hugswap.com
              </Link>
            </HeaderText>
            <Language />
            <Toggle isActive={isDark} toggle={toggleDarkMode} />
          </AutoColumn>
          {!below1180 && (
            <Polling style={{ marginLeft: '1.5rem' }}>
              <PollingDot />
              <a href="/">
                <TYPE.small>
                  {t('Updated ago', { seconds: (!!seconds ? seconds + 's' : '-') })} <br />
                </TYPE.small>
              </a>
            </Polling>
          )}
        </DesktopWrapper>
      ) : (
          <MobileWrapper>
            <Title />
          </MobileWrapper>
        )}
    </Wrapper>
  )
}

export default withRouter(SideNav)
