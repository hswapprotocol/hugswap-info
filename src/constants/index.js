export const FACTORY_ADDRESS = '0x96B62c4Ed38d50D71C7F2373a394b7a75F3370C6'
export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

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
  'https://raw.githubusercontent.com/hswapprotocol/token-icons/master/tokenlist.json',
]

// hide from overview list
export const OVERVIEW_TOKEN_BLACKLIST = []

// pair blacklist
export const PAIR_BLACKLIST = []

/**
 * For tokens that cause erros on fee calculations
 */
export const FEE_WARNING_TOKENS = []
