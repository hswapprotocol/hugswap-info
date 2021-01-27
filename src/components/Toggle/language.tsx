import React from 'react'
import styled from 'styled-components'
import i18n from 'i18next'

const IconWrapper = styled.div<{ isActive?: boolean }>`
  opacity: ${({ isActive }) => (isActive ? 0.8 : 0.4)};

  :hover {
    opacity: 1;
  }
`

const StyledToggle = styled.div`
  display: flex;
  width: fit-content;
  cursor: pointer;
  text-decoration: none;
  margin-top: 1rem;
  color: ${({ theme }) => theme.text1};

  :hover {
    text-decoration: none;
  }
`

export default function Toggle() {
    return (
        <StyledToggle>
            <span>
                <IconWrapper
                    isActive={i18n.language == 'en'}
                    onClick={() => {
                        i18n.changeLanguage('en')
                    }}
                >
                    English
        </IconWrapper>
            </span>
            <span style={{ padding: '0 .5rem' }}>{' / '}</span>
            <span>
                <IconWrapper
                    isActive={i18n.language == 'zh'}
                    onClick={() => {
                        i18n.changeLanguage('zh')
                    }}
                >
                    中文
        </IconWrapper>
            </span>
        </StyledToggle>
    )
}
