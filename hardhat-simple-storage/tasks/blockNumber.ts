import { task } from 'hardhat/config'

// hre = hardhat runtime environment === require("hardhat")
export default task('block-number', 'Вывод номера блока').setAction(
  async (args, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    console.log('Block number', blockNumber)
  }
)
