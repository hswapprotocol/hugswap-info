import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Text } from 'rebass'

const FormattedPercent = ({percent, useBrackets = false}) => {
  const theme = useContext(ThemeContext)

  percent = parseFloat(percent)
  if (!percent || percent === 0) {
    return <Text fontWeight={500}>0%</Text>
  }

  if (percent < 0.0001 && percent > 0) {
    return (
      <Text fontWeight={500} color={theme.text8}>
        {'< 0.0001%'}
      </Text>
    )
  }

  if (percent < 0 && percent > -0.0001) {
    return (
      <Text fontWeight={500} color={theme.text9}>
        {'< 0.0001%'}
      </Text>
    )
  }

  let fixedPercent = percent.toFixed(2)
  if (fixedPercent === '0.00') {
    return '0%'
  }
  if (fixedPercent > 0) {
    if (fixedPercent > 100) {
      return (<Text fontWeight={500} color={theme.text8}>{`+${percent?.toFixed(0).toLocaleString()}%`}</Text>)
    } else {
      return (<Text fontWeight={500} color={theme.text8}>{`+${fixedPercent}%`}</Text>)
    }
  } else {
    return (<Text fontWeight={500} color={theme.text9}>{`${fixedPercent}%`}</Text>)
  }
}

export default FormattedPercent