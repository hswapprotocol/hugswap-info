import React, { useEffect } from 'react'
import 'feather-icons'
import { withRouter } from 'react-router-dom'
import { TYPE } from '../Theme'
import { PageWrapper, FullWrapper } from '../components'
import Panel from '../components/Panel'
import SecondHeader from '../components/SecondHeader'
import OutNav from '../components/OutNav'
import LPList from '../components/LPList'
import styled from 'styled-components'
import AccountSearch from '../components/AccountSearch'
import { useTopLps } from '../contexts/GlobalData'
import LocalLoader from '../components/LocalLoader'
import { useMedia } from 'react-use'
import { useTranslation } from 'react-i18next'
const AccountWrapper = styled.div`
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

function AccountLookup() {
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const topLps = useTopLps()
  const { t } = useTranslation()
  const below600 = useMedia('(max-width: 600px)')

  return (
    <PageWrapper>
      <SecondHeader>
        <OutNav />
      </SecondHeader>
      <FullWrapper>
        <AccountWrapper style={{ marginTop: '2rem' }}>
          <AccountSearch />
        </AccountWrapper>
        <TYPE.main fontSize={'1.125rem'} style={{ marginTop: '1rem' }}>
          {t('Top Liquidity Positions')}
        </TYPE.main>
        <Panel>{topLps && topLps.length > 0 ? <LPList lps={topLps} maxItems={200} /> : <LocalLoader />}</Panel>
      </FullWrapper>
    </PageWrapper>
  )
}

export default withRouter(AccountLookup)
