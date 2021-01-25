import React from 'react'
import { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle } from 'styled-components'
import { useDarkModeManager } from '../contexts/LocalStorage'
import styled from 'styled-components'
import { Text } from 'rebass'

export default function ThemeProvider({ children }) {
  const [darkMode] = useDarkModeManager()

  return <StyledComponentsThemeProvider theme={theme(darkMode)}>{children}</StyledComponentsThemeProvider>
}

const theme = (darkMode, color) => ({

  // special case text types
  white: '#FFFFFF',
  customColor: color,
  textColor: darkMode ? color : 'black',

  panelColor: darkMode ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0)',
  backgroundColor: darkMode ? '#6840DD' : '#F7F8FA',

  hugswapPurple: '#6840DD',

  concreteGray: darkMode ? '#292C2F' : '#FAFAFA',
  inputBackground: darkMode ? '#1F1F1F' : '#FAFAFA',
  shadowColor: darkMode ? '#000' : '#2F80ED',
  mercuryGray: darkMode ? '#333333' : '#E1E1E1',

  // text，1-5dark下颜色越来越深
  text1: darkMode ? '#FFFFFF' : '#000000',
  // 一级色 大标题、正文
  text2: darkMode ? '#E6EBEB' : '#131E1D',
  // 二级 小标题、正文
  text3: darkMode ? '#B2BCBB' : '#7F8382',
  // 三级色 辅助类提示信息
  text4: darkMode ? '#656A6A' : '#9EA8A7',
  // 四级色 输入框内弱提示
  text5: darkMode ? '#494B4B' : '#DADFDF',

  // 标准品牌色
  text6: darkMode ? '#01AFA5' : '#01AFA5',

  // 强调文字色
  text7: darkMode ? '#01AFA5' : '#01AFA5',

  // 涨色
  text8: darkMode ? '#01AFA5' : '#01AFA5',

  // 跌色
  text9: darkMode ? '#ED5B5B' : '#ED5B5B',

  // 持平色
  text10: darkMode ? '#8E9896' : '#8E9896',

  // 链接色
  text11: darkMode ? '#3C67FF' : '#3C67FF',

  // 提示文字
  text12: darkMode ? '#E18E52' : '#E18E52',

  // backgrounds / greys
  // 前景色
  bg1: darkMode ? '#1E2121' : '#FFFFFF',
  // 背景色
  bg2: darkMode ? '#121414' : '#FFFFFF',
  // 辅助bg色
  bg3: darkMode ? '#272C2C' : '#F3FCFB',
  // 小标签bg
  bg4: darkMode ? '#2C3D3C' : '#E8F9F8',
  // 小标签bg
  bgTagS: darkMode ? '#2C3D3C' : '#E8F9F8',
  // Hover色
  bg5: darkMode ? '#485150' : '#F2FAF9',
  // 分割线 & 边框色
  bg6: darkMode ? '#323636' : '#E4ECEB',

  //specialty colors
  modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
  // advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',
  advancedBG: darkMode ? 'rgba(31, 31, 51, 0.9)' : 'rgba(255,255,255,0.6)',
  onlyLight: darkMode ? '#111015' : 'transparent',
  divider: darkMode ? 'rgba(43, 43, 43, 0.435)' : 'rgba(43, 43, 43, 0.035)',

  //primary colors
  primary1: darkMode ? '#01AFA5' : '#01AFA5',
  primary2: darkMode ? '#3680E7' : '#FF8CC3',
  primary3: darkMode ? '#4D8FEA' : '#FF99C9',
  primary4: darkMode ? '#376bad70' : '#F6DDE8',
  primary5: darkMode ? '#01AFA5' : '#01AFA5',
  // 兑换按钮不可用
  disable1: darkMode ? '#363C3C' : '#F0F7F6',
  // 兑换按钮按下
  pressed1: darkMode ? '#039E95' : '#039E95',

  // color text
  primaryText1: darkMode ? '#01AFA5' : '#01AFA5',

  // secondary colors
  secondary1: darkMode ? '#01AFA5' : '#01AFA5',
  secondary2: darkMode ? '#17000b26' : '#F6DDE8',
  secondary3: darkMode ? '#01AFA5' : '#01AFA5',


  shadow1: darkMode ? '#000' : '#2F80ED',

  // other
  red1: '#FF6871',
  red2: '#F82D3A',
  green1: '#27AE60',
  yellow1: '#FFE270',
  yellow2: '#F3841E',
  blue1: '#2172E5',
  shadow: darkMode ? '0px 4px 16px 4px rgba(0, 0, 0, 0.2)' : '0px 4px 16px rgba(131, 142, 163, 0.1)',


  background: darkMode ? 'black' : `radial-gradient(49.1% 87.28% at 50.9% 50%, #eafaff 0%, rgba(255, 255, 255, 0) 100%)`,
})

const TextWrapper = styled(Text)`
  color: ${({ color, theme }) => theme[color]};
`

export const TYPE = {
  main(props) {
    return <TextWrapper fontWeight={500} fontSize={14} color={'text1'} {...props} />
  },

  body(props) {
    return <TextWrapper fontWeight={400} fontSize={14} color={'text1'} {...props} />
  },

  small(props) {
    return <TextWrapper fontWeight={500} fontSize={11} color={'text1'} {...props} />
  },

  header(props) {
    return <TextWrapper fontWeight={600} color={'text1'} {...props} />
  },

  largeHeader(props) {
    return <TextWrapper fontWeight={500} color={'text1'} fontSize={24} {...props} />
  },

  light(props) {
    return <TextWrapper fontWeight={400} color={'text3'} fontSize={14} {...props} />
  },

  pink(props) {
    return <TextWrapper fontWeight={props.faded ? 400 : 600} color={props.faded ? 'text1' : 'text1'} {...props} />
  },
}

export const Hover = styled.div`
  :hover {
    cursor: pointer;
  }
`

export const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;
  :hover {
    text-decoration: underline;
  }
  :focus {
    outline: none;
    text-decoration: underline;
  }
  :active {
    text-decoration: none;
  }
`

export const ThemedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  max-width: 100vw !important;
  height: 200vh;
  mix-blend-mode: color;
  background: ${({ backgroundColor }) =>
    `radial-gradient(50% 50% at 50% 50%, ${backgroundColor} 0%, rgba(255, 255, 255, 0) 100%)`};
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 9999;

  transform: translateY(-110vh);
`

export const GlobalStyle = createGlobalStyle`
  @import url('https://rsms.me/inter/inter.css');
  html { font-family: 'Inter', sans-serif; }
  @supports (font-variation-settings: normal) {
    html { font-family: 'Inter var', sans-serif; }
  }
  
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 14px;    
    background-color: ${({ theme }) => theme.bg2};
  }

  a {
    text-decoration: none;

    :hover {
      text-decoration: none
    }
  }

  
.three-line-legend {
	width: 100%;
	height: 70px;
	position: absolute;
	padding: 8px;
	font-size: 12px;
	color: #20262E;
	background-color: rgba(255, 255, 255, 0.23);
	text-align: left;
	z-index: 10;
  pointer-events: none;
}

.three-line-legend-dark {
	width: 100%;
	height: 70px;
	position: absolute;
	padding: 8px;
	font-size: 12px;
	color: white;
	background-color: rgba(255, 255, 255, 0.23);
	text-align: left;
	z-index: 10;
  pointer-events: none;
}

@media screen and (max-width: 800px) {
  .three-line-legend {
    display: none !important;
  }
}

.tv-lightweight-charts{
  width: 100% !important;
  

  & > * {
    width: 100% !important;
  }
}


  html {
    font-size: 1rem;
    font-variant: none;
    color: 'black';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    height: 100%;
  }
`
