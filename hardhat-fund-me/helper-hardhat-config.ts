export const networkConfig: {
  [key: number]: {
    name: string
    ethUsdPriceFeed: string
  }
} = {
  4: {
    name: 'rinkeby',
    ethUsdPriceFeed: '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e',
  },
}

export const developmentChains: string[] = ['hardhat', 'localhost']

export const DECIMALS = 8
export const INITIAL_PRICE = 200000000000