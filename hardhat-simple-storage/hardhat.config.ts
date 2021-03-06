import '@nomiclabs/hardhat-waffle'
import 'dotenv/config'
import '@nomiclabs/hardhat-etherscan'
import './tasks/blockNumber'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import '@typechain/hardhat'

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API = process.env.ETHERSCAN_API
const COINMARKETCAP_KEY = process.env.COINMARKETCAP_KEY

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
    },
    // yarn hardhat node
    // yarn hardhat run scripts/deploy.js --network localhost
    localhost: {
      url: 'http://127.0.0.1:8545/',
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API,
  },
  solidity: '0.8.4',
  gasReporter: {
    enabled: false,
    outputFile: 'gas-report.txt',
    noColors: true,
    currency: 'USD',
    coinmarketcap: COINMARKETCAP_KEY,
  },
}
