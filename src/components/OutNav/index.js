import React from 'react'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { RowBetween } from '../Row'
import Link from '../Link'

const OutNavWrapper = styled.div`
  
`
const OutNavText = styled.div`
  
`

function OutNav({children}) {
    // breakpoints
  const below800 = useMedia('(max-width: 800px)')


	return (
    <OutNavWrapper gap="40px">
      <OutNavText>
        <Link href="https://app.hugswap.com" target="_blank">
          Swap
        </Link>
      </OutNavText>
      <OutNavText>
        <Link href="https://app.hugswap.com" target="_blank">
          Swap
        </Link>
      </OutNavText>
      <OutNavText>
        <Link href="https://app.hugswap.com" target="_blank">
          Swap
        </Link>
      </OutNavText>
    </OutNavWrapper>
	)
}

export default OutNav