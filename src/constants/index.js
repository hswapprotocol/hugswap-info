export const FACTORY_ADDRESS = '0x31c220a57038eD6a22e41798B4CCBC441E450903'

export const BUNDLE_ID = '1'

export const timeframeOptions = {
  WEEK: '1 week',
  MONTH: '1 month',
  // THREE_MONTHS: '3 months',
  // YEAR: '1 year',
  ALL_TIME: 'All time',
}

// token list urls to fetch tokens from - use for warnings on tokens and pairs
export const SUPPORTED_LIST_URLS__NO_ENS = [
  'https://app.hugswap.com/tokenlist.json?v=2',
]

// hide from overview list
export const OVERVIEW_TOKEN_BLACKLIST = []

// pair blacklist
export const PAIR_BLACKLIST = []

/**
 * For tokens that cause erros on fee calculations
 */
export const FEE_WARNING_TOKENS = []
