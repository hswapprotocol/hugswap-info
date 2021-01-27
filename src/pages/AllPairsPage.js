import React, { useEffect } from 'react'
import 'feather-icons'

import { TYPE } from '../Theme'
import Panel from '../components/Panel'
import SecondHeader from '../components/SecondHeader'
import OutNav from '../components/OutNav'
import { useAllPairData } from '../contexts/PairData'
import PairList from '../components/PairList'
import { PageWrapper, FullWrapper } from '../components'
import { RowBetween } from '../components/Row'
import { useMedia } from 'react-use'
import { useTranslation } from 'react-i18next'
function AllPairsPage() {
  const allPairs = useAllPairData()
  const { t } = useTranslation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const below800 = useMedia('(max-width: 800px)')

  return (
    <PageWrapper>
      <SecondHeader>
        <OutNav />
      </SecondHeader>
      <FullWrapper>
        <RowBetween marginTop={40}>
          <TYPE.largeHeader fontSize="18">{t('Top Pairs')}</TYPE.largeHeader>
        </RowBetween>
        <Panel style={{ padding: below800 && '1rem 0 0 0 ' }}>
          <PairList pairs={allPairs} disbaleLinks={true} maxItems={50} />
        </Panel>
      </FullWrapper>
    </PageWrapper>
  )
}

export default AllPairsPage
