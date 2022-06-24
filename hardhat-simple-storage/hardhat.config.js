require('@nomiclabs/hardhat-waffle')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      account: [PRIVATE_KEY],
    },
  },
  solidity: '0.8.4',
}
