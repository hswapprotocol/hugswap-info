import React, { useEffect } from 'react'
import 'feather-icons'
import styled from 'styled-components'
import TopTokenList from '../components/TokenList'
import { TYPE } from '../Theme'
import Panel from '../components/Panel'
import { useAllTokenData } from '../contexts/TokenData'
import { PageWrapper, FullWrapper } from '../components'
import SecondHeader from '../components/SecondHeader'
import OutNav from '../components/OutNav'
import { RowBetween } from '../components/Row'
import { useMedia } from 'react-use'

const SmallWrapper = styled(FullWrapper)`
  gap: 11px;
`


function AllTokensPage() {
  const allTokens = useAllTokenData()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const below600 = useMedia('(max-width: 800px)')

  return (
    <PageWrapper>
      <SecondHeader>
        <OutNav />
      </SecondHeader>
      <SmallWrapper>
        <RowBetween style={{padding: below600 ? '1rem 0 0 0' : '2.51rem 0 0 0' }}>
          <TYPE.largeHeader fontSize="18">Top Tokens</TYPE.largeHeader>
        </RowBetween>
        <Panel style={{ marginTop: '6px', padding: below600 && '1rem 0 0 0 ' }}>
          <TopTokenList tokens={allTokens} itemMax={50} />
        </Panel>
      </SmallWrapper>
    </PageWrapper>
  )
}

export default AllTokensPage
