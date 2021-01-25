import React, { useState, useContext } from 'react'
import 'feather-icons'
import { withRouter } from 'react-router-dom'
import { Text } from 'rebass'
import styled, { ThemeContext } from 'styled-components'
import Link from '../components/Link'
import Panel from '../components/Panel'
import SecondHeader from '../components/SecondHeader'
import TokenLogo from '../components/TokenLogo'
import PairList from '../components/PairList'
import Loader from '../components/LocalLoader'
import { AutoRow, RowBetween, RowFixed } from '../components/Row'
import Column, { AutoColumn } from '../components/Column'
import { ButtonLight, ButtonDark } from '../components/ButtonStyled'
import TxnList from '../components/TxnList'
import TokenChart from '../components/TokenChart'
import { BasicLink } from '../components/Link'
import Search from '../components/Search'
import { formattedNum, getPoolLink, getSwapLink, localNumber } from '../utils'
import { useTokenData, useTokenTransactions, useTokenPairs } from '../contexts/TokenData'
import { TYPE, ThemedBackground } from '../Theme'
import { transparentize } from 'polished'
import { useColor } from '../hooks'
import CopyHelper from '../components/Copy'
import { useMedia } from 'react-use'
import { useDataForList } from '../contexts/PairData'
import { useEffect } from 'react'
import Warning from '../components/Warning'
import { usePathDismissed, useSavedTokens } from '../contexts/LocalStorage'
import { Hover, PageWrapper, ContentWrapper, StyledIcon } from '../components'
import { PlusCircle, Bookmark } from 'react-feather'
import FormattedName from '../components/FormattedName'
import FormattedPercent from '../components/FormattedPercent'
import { useListedTokens } from '../contexts/Application'
import { useTranslation } from 'react-i18next'

const DashboardWrapper = styled.div`
  width: 100%;
`
const TitleText = styled(TYPE.main)`
  color: ${({ theme }) => theme.text4}
`

const AddressLink = styled(Link)`
  font-size: 0.875rem;
  > div {
    color: ${({ theme }) => theme.text4}
  }
  :hover > div {
    color: ${({ theme }) => theme.text7}
  }
`
const BookMarkButton = styled(StyledIcon)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text3}
  > div {
    color: ${({ theme }) => theme.text3}
  }
  :hover {
    color: ${({ theme }) => theme.text7}
  }
  :hover > div {
    color: ${({ theme }) => theme.text7}
  }
`

const PanelWrapper = styled.div`
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: max-content;
  gap: 6px;
  display: inline-grid;
  width: 100%;
  align-items: start;
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    align-items: stretch;
    > * {
      grid-column: 1 / 4;
    }

    > * {
      &:first-child {
        width: 100%;
      }
    }
  }
`

const TokenDetailsLayout = styled.div`
  display: inline-grid;
  width: 100%;
  grid-template-columns: auto auto auto 1fr;
  column-gap: 30px;
  align-items: start;

  &:last-child {
    align-items: center;
    justify-items: end;
  }
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    align-items: stretch;
    > * {
      grid-column: 1 / 4;
      margin-bottom: 1rem;
    }

    &:last-child {
      align-items: start;
      justify-items: start;
    }
  }
`

const WarningGrouping = styled.div`
  opacity: ${({ disabled }) => disabled && '0.4'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
`

function TokenPage({ address, history }) {
  const {
    id,
    name,
    symbol,
    priceUSD,
    oneDayVolumeUSD,
    totalLiquidityUSD,
    volumeChangeUSD,
    oneDayVolumeUT,
    volumeChangeUT,
    priceChangeUSD,
    liquidityChangeUSD,
    oneDayTxns,
    txnChange,
  } = useTokenData(address)
  useEffect(() => {
    document.querySelector('body').scrollTo(0, 0)
  }, [])
  const { t } = useTranslation()
  const theme = useContext(ThemeContext)
  // detect color from token
  const backgroundColor = useColor(id, symbol)

  const allPairs = useTokenPairs(address)

  // pairs to show in pair list
  const fetchedPairsList = useDataForList(allPairs)

  // all transactions with this token
  const transactions = useTokenTransactions(address)

  // price
  const price = priceUSD ? formattedNum(priceUSD, true) : ''

  // volume
  const volume =
    oneDayVolumeUSD || oneDayVolumeUSD === 0
      ? formattedNum(oneDayVolumeUSD === 0 ? oneDayVolumeUT : oneDayVolumeUSD, true)
      : oneDayVolumeUSD === 0
        ? '$0'
        : '-'

  // mark if using untracked volume
  const [usingUtVolume, setUsingUtVolume] = useState(false)
  useEffect(() => {
    setUsingUtVolume(oneDayVolumeUSD === 0 ? true : false)
  }, [oneDayVolumeUSD])

  // liquidity
  const liquidity = totalLiquidityUSD ? formattedNum(totalLiquidityUSD, true) : totalLiquidityUSD === 0 ? '$0' : '-'


  const below1080 = useMedia('(max-width: 1080px)')
  const below800 = useMedia('(max-width: 800px)')
  const below600 = useMedia('(max-width: 600px)')
  const below500 = useMedia('(max-width: 500px)')

  // format for long symbol
  const LENGTH = below1080 ? 10 : 16
  const formattedSymbol = symbol?.length > LENGTH ? symbol.slice(0, LENGTH) + '...' : symbol

  const [dismissed, markAsDismissed] = usePathDismissed(history.location.pathname)
  const [savedTokens, addToken] = useSavedTokens()
  const listedTokens = useListedTokens()

  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    })
  }, [])

  return (
    <PageWrapper>
      <SecondHeader>
        <AutoRow align="flex-end" style={{ width: 'fit-content' }}>
          <TYPE.body>
            <BasicLink to="/tokens">{t('Tokens')}{ }</BasicLink>→ {symbol}
            {'  '}
          </TYPE.body>
          <AddressLink
            style={{ width: 'fit-content' }}
            external
            href={'https://scan.hecochain.com/address/' + address}
          >
            <Text style={{ marginLeft: '.15rem' }} fontSize={'14px'} fontWeight={400}>
              ({address.slice(0, 8) + '...' + address.slice(36, 42)})
              </Text>
          </AddressLink>
        </AutoRow>
      </SecondHeader>
      <Warning
        type={'token'}
        show={!dismissed && listedTokens && !listedTokens.includes(address)}
        setShow={markAsDismissed}
        address={address}
      />
      <ContentWrapper>

        <WarningGrouping disabled={!dismissed && listedTokens && !listedTokens.includes(address)}>
          <DashboardWrapper style={{ marginTop: below1080 ? '0' : '1rem' }}>
            <RowBetween
              style={{
                flexWrap: 'wrap',
                marginBottom: '2rem',
                alignItems: 'flex-start',
              }}
            >
              <RowFixed style={{ flexWrap: 'wrap' }}>
                <RowFixed style={{ alignItems: 'baseline' }}>
                  <TokenLogo address={address} size="32px" style={{ alignSelf: 'center' }} />
                  <TYPE.main fontSize={below1080 ? '1.5rem' : '2rem'} fontWeight={500} style={{ margin: '0 1rem' }}>
                    <RowFixed gap="6px">
                      <FormattedName text={name ? name + ' ' : ''} maxCharacters={16} style={{ marginRight: '6px' }} />{' '}
                      {formattedSymbol ? `(${formattedSymbol})` : ''}
                    </RowFixed>
                  </TYPE.main>{' '}
                  {!below1080 && (
                    <>
                      <TYPE.main fontSize={'1.5rem'} fontWeight={500} style={{ marginRight: '1rem' }}>
                        {price}
                      </TYPE.main>
                      <FormattedPercent percent={priceChangeUSD} />
                    </>
                  )}
                </RowFixed>
              </RowFixed>
              <span>
                <RowFixed ml={below500 ? '0' : '2.5rem'} mt={below500 ? '1rem' : '0'}>
                  {!!!savedTokens[address] && !below800 ? (
                    <Hover onClick={() => addToken(address, symbol)}>
                      <BookMarkButton>
                        <PlusCircle style={{ marginRight: '0.5rem' }} />
                      </BookMarkButton>
                    </Hover>
                  ) : !below1080 ? (
                    <StyledIcon>
                      <Bookmark style={{ marginRight: '0.5rem', opacity: 0.4 }} />
                    </StyledIcon>
                  ) : (
                        <></>
                      )}
                  <Link href={getPoolLink(address)} target="_blank">
                    <ButtonLight>+ {t('Add Liquidity')}</ButtonLight>
                  </Link>
                  <Link href={getSwapLink(address)} target="_blank">
                    <ButtonDark ml={'.5rem'} mr={below1080 && '.5rem'}>
                      {t('Trade')}
                    </ButtonDark>
                  </Link>
                </RowFixed>
              </span>
            </RowBetween>

            <>
              <PanelWrapper style={{ marginTop: below1080 ? '0' : '1rem' }}>
                {below1080 && price && (
                  <Panel>
                    <AutoColumn gap="20px">
                      <RowBetween>
                        <TYPE.main>{t('Price')}</TYPE.main>
                        <div />
                      </RowBetween>
                      <RowBetween align="flex-end">
                        {' '}
                        <TYPE.main fontSize={'1.5rem'} lineHeight={1} fontWeight={500}>
                          {price}
                        </TYPE.main>
                        <FormattedPercent percent={priceChangeUSD} />
                      </RowBetween>
                    </AutoColumn>
                  </Panel>
                )}
                <Panel>
                  <AutoColumn gap="20px">
                    <RowBetween>
                      <TitleText>{t('Total Liquidity')}</TitleText>
                      <div />
                    </RowBetween>
                    <RowBetween align="flex-end">
                      <TYPE.main fontSize={'1.5rem'} lineHeight={1} fontWeight={500}>
                        {liquidity}
                      </TYPE.main>
                      <FormattedPercent percent={liquidityChangeUSD} />
                    </RowBetween>
                  </AutoColumn>
                </Panel>
                <Panel>
                  <AutoColumn gap="20px">
                    <RowBetween>
                      <TitleText>{t('Volume (24hrs)')} {usingUtVolume && `(${t('Untracked')})`}</TitleText>
                      <div />
                    </RowBetween>
                    <RowBetween align="flex-end">
                      <TYPE.main fontSize={'1.5rem'} lineHeight={1} fontWeight={500}>
                        {volume}
                      </TYPE.main>
                      <FormattedPercent percent={volumeChangeUSD} />
                    </RowBetween>
                  </AutoColumn>
                </Panel>

                <Panel>
                  <AutoColumn gap="20px">
                    <RowBetween>
                      <TitleText>{t('Transactions (24H)')}</TitleText>
                      <div />
                    </RowBetween>
                    <RowBetween align="flex-end">
                      <TYPE.main fontSize={'1.5rem'} lineHeight={1} fontWeight={500}>
                        {oneDayTxns ? localNumber(oneDayTxns) : oneDayTxns === 0 ? 0 : '-'}
                      </TYPE.main>
                      <FormattedPercent percent={txnChange} />
                    </RowBetween>
                  </AutoColumn>
                </Panel>
                <Panel
                  style={{
                    gridColumn: below1080 ? '1' : '2/4',
                    gridRow: below1080 ? '' : '1/4',
                  }}
                >
                  <TokenChart address={address} base={priceUSD} />
                </Panel>
              </PanelWrapper>
            </>

            <span>
              <TYPE.main fontSize={'1.125rem'} style={{ marginTop: '2.5rem' }}>
                {t('Top Pairs')}
              </TYPE.main>
            </span>
            <Panel
              rounded
              style={{
                marginTop: '0.6875rem',
                padding: '1.125rem 0 ',
              }}
            >
              {address && fetchedPairsList ? (
                <PairList address={address} pairs={fetchedPairsList} />
              ) : (
                  <Loader />
                )}
            </Panel>
            <RowBetween mt={40} mb={'1rem'}>
              <TYPE.main fontSize={'1.125rem'}>{t('Transactions')}</TYPE.main> <div />
            </RowBetween>
            <Panel rounded>
              {transactions ? <TxnList transactions={transactions} /> : <Loader />}
            </Panel>
            <>
              <RowBetween style={{ marginTop: '2.5rem' }}>
                <TYPE.main fontSize={'1.125rem'}>{t('Token Information')}</TYPE.main>{' '}
              </RowBetween>
              <Panel
                rounded
                style={{
                  marginTop: '0.6875rem',
                }}
                p={20}
              >
                <TokenDetailsLayout>
                  <Column>
                    <TitleText>{t('Symbol')}</TitleText>
                    <Text style={{ marginTop: '.5rem' }} fontSize={24} fontWeight="500">
                      <FormattedName text={symbol} maxCharacters={12} />
                    </Text>
                  </Column>
                  <Column>
                    <TitleText>{t('Name')}</TitleText>
                    <TYPE.main style={{ marginTop: '.5rem' }} fontSize={24} fontWeight="500">
                      <FormattedName text={name} maxCharacters={16} />
                    </TYPE.main>
                  </Column>
                  <Column>
                    <TitleText>{t('Address')}</TitleText>
                    <AutoRow align="flex-end">
                      <TYPE.main style={{ marginTop: '.5rem' }} fontSize={24} fontWeight="500">
                        {address.slice(0, 8) + '...' + address.slice(36, 42)}
                      </TYPE.main>
                      <CopyHelper toCopy={address} />
                    </AutoRow>
                  </Column>
                  <ButtonLight>
                    <Link external href={'https://scan.hecochain.com/address/' + address}>
                      {t('View on Hecoscan')} ↗
                    </Link>
                  </ButtonLight>
                </TokenDetailsLayout>
              </Panel>
            </>
          </DashboardWrapper>
        </WarningGrouping>
      </ContentWrapper>
    </PageWrapper>
  )
}

export default withRouter(TokenPage)
