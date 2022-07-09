import { network } from 'hardhat'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { networkConfig } from '../helper-hardhat-config'

export default async ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  if (chainId != undefined) {
    const fundMe = await deploy('FundMe', {
      from: deployer,
      args: [networkConfig[chainId].ethUsdPriceFeed],
      log: true,
    })
  }
}
