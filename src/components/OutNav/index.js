import React from 'react'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import Link from '../Link'
import i18next from 'i18next'

const OutNavWrapper = styled.div`
  
`
const OutNavText = styled.span`
  padding-right: 2.5rem;
  color: ${({ theme }) => theme.text7};
  a {
    color: ${({ theme }) => theme.text4};

    :hover {
      color: ${({ theme }) => theme.text7};
    }
  }
`

function OutNav({ children }) {
  // breakpoints
  const below800 = useMedia('(max-width: 800px)')

  return (
    <>
      {!below800 && (
        <OutNavWrapper>
          <OutNavText>
            <Link href="https://app.hugswap.com" target="_blank">
              {i18next.t('Swap')}
            </Link>
          </OutNavText>
          <OutNavText>
            <Link href="https://app.hugswap.com/#/pool" target="_blank">
              {i18next.t('Liquidity')}
            </Link>
          </OutNavText>
          <OutNavText> {i18next.t('Info')}</OutNavText>
        </OutNavWrapper>
      )}
    </>
  )
}

export default OutNav