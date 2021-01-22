import React from 'react'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { RowBetween } from '../Row'
import Search from '../Search'

const SecondHeaderWrapper = styled(RowBetween)`
  position: sticky;
  top: 0;
  z-index: 9998;
  padding: 0 2rem;
  box-sizing: border-box;
  transfrom: translateX(-36px);
  background: ${({ theme }) => theme.bg1};
  box-shadow: ${({ theme }) => theme.shadow};

`
const HeaderSearch = styled.div`
  padding: 0.5rem 1.25rem 1.5rem;
`

function SecondHeader({children}) {
    // breakpoints
  const below800 = useMedia('(max-width: 800px)')


	return (
    <>
      <SecondHeaderWrapper gap="0">
        {children}
        {!below800 && (<Search small={true} />)}
      </SecondHeaderWrapper>
      {below800 && (
        <HeaderSearch>
          <Search />
        </HeaderSearch>
      )}
    </>
	)
}

export default SecondHeader