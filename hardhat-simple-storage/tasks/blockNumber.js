const { task } = require('hardhat/config')

// hre = hardhat runtime environment === require("hardhat")
task('block-number', 'Вывод номера блока').setAction(async (args, hre) => {
  const blockNumber = await hre.ethers.provider.getBlockNumber()
  console.log('Block number', blockNumber)
})

module.exports = {}
